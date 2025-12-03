/**
 * Sync Sopranos.xlsx to seasons.json with correct column mapping
 */
import fs from 'fs';
import XLSX from 'xlsx';

// IMDB episode IDs mapping (Season -> Episode -> IMDB ID)
const imdbEpisodeIds = {
  1: ['tt0705282', 'tt0705223', 'tt0705239', 'tt0705263', 'tt0705236', 'tt0705270', 'tt0705241', 'tt0705280', 'tt0705231', 'tt0705224', 'tt0705269', 'tt0705256', 'tt0705253'],
  2: ['tt0705250', 'tt0705240', 'tt0705288', 'tt0705237', 'tt0705230', 'tt0705278', 'tt0705238', 'tt0705248', 'tt0705247', 'tt0705232', 'tt0705252', 'tt0705279', 'tt0705249'],
  3: ['tt0705266', 'tt0705273', 'tt0705246', 'tt0705243', 'tt0705228', 'tt0705291', 'tt0705275', 'tt0705251', 'tt0705284', 'tt0705287', 'tt0705272', 'tt0705227', 'tt0705229'],
  4: ['tt0705245', 'tt0705268', 'tt0705234', 'tt0705286', 'tt0705271', 'tt0705244', 'tt0705292', 'tt0705265', 'tt0705295', 'tt0705283', 'tt0705233', 'tt0705242', 'tt0705294'],
  5: ['tt0705289', 'tt0705274', 'tt0705293', 'tt0705226', 'tt0705255', 'tt0705276', 'tt0705254', 'tt0705262', 'tt0705290', 'tt0705235', 'tt0705285', 'tt0705260', 'tt0705225'],
  6: ['tt0705264', 'tt0705258', 'tt0763238', 'tt0705277', 'tt0705267', 'tt0705259', 'tt0705261', 'tt0705257', 'tt0705281', 'tt0756404', 'tt0790351', 'tt0793256', 'tt0979770', 'tt0979771', 'tt0979769', 'tt0995834', 'tt0995835', 'tt0995836', 'tt0995837', 'tt0995838', 'tt0995839']
};

// Load IMDB ratings from separate file
let imdbRatings = {};
try {
  const ratingsData = fs.readFileSync('c:/Projects/Venueve/sopranos/imdb-ratings.json', 'utf-8');
  imdbRatings = JSON.parse(ratingsData);
} catch (error) {
  console.warn('Could not load IMDB ratings file:', error.message);
}

// Helper function to get IMDB link
function getImdbLink(seasonNumber, episodeInSeason) {
  const episodeId = imdbEpisodeIds[seasonNumber]?.[episodeInSeason - 1];
  return episodeId ? `https://www.imdb.com/title/${episodeId}/` : '';
}

// Helper function to get IMDB rating
function getImdbRating(seasonNumber, episodeInSeason) {
  return imdbRatings[seasonNumber]?.[episodeInSeason - 1] || 0;
}

function parseXlsxToJson() {
  const xlsxFile = 'c:/Projects/Venueve/sopranos/src/data/Sopranos.xlsx';
  
  console.log('Reading Excel file...');
  const workbook = XLSX.readFile(xlsxFile);

  // Get all sheet names that start with "Season"
  const seasonSheets = workbook.SheetNames.filter(name => name.startsWith('Season'));

  console.log(`Found ${seasonSheets.length} season sheets`);
  
  const seasons = [];
  let globalEpisodeNumber = 1;

  seasonSheets.forEach(sheetName => {
    // Extract season number more carefully
    const match = sheetName.match(/Season\s*(\d+)/i);
    const seasonNumber = match ? parseInt(match[1]) : 0;
    
    if (!seasonNumber) {
      console.warn(`Could not parse season number from sheet: ${sheetName}`);
      return;
    }
    
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert sheet to JSON with raw values
    // header: 1 means we get arrays for each row (not objects)
    const data = XLSX.utils.sheet_to_json(worksheet, { 
      header: 1,
      raw: false,
      defval: ''
    });
    
    console.log(`\nProcessing ${sheetName}...`);
    
    // First row contains headers
    const headers = data[0];
    console.log('Headers:', headers);
    
    // Find column indices by header name (case-insensitive)
    const getColumnIndex = (headerName) => {
      const index = headers.findIndex(h => 
        h && h.toString().toLowerCase().trim() === headerName.toLowerCase()
      );
      return index;
    };
    
    const colIndices = {
      number: getColumnIndex('#'),
      episode: getColumnIndex('episode'),
      title: getColumnIndex('title'),
      author: getColumnIndex('author'),
      director: getColumnIndex('director'),
      airDate: getColumnIndex('air date'),
      mistress: getColumnIndex('mistress'),
      description: getColumnIndex('description'),
      godfather: getColumnIndex('godfather'),
      music: getColumnIndex('music'),
      hboReview: getColumnIndex('hbo review')
    };
    
    console.log('Column indices:', colIndices);
    
    const episodes = [];

    // Process data rows (skip header row)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Skip empty rows
      if (!row || row.length === 0 || !row[colIndices.title]) {
        continue;
      }

      const swedishDesc = (colIndices.description >= 0 ? row[colIndices.description] : '') || '';
      const hboReview = (colIndices.hboReview >= 0 ? row[colIndices.hboReview] : '') || '';
      
      const episode = {
        episodeNumber: globalEpisodeNumber++,
        episodeInSeason: colIndices.episode >= 0 ? (parseInt(row[colIndices.episode]) || (episodes.length + 1)) : (episodes.length + 1),
        title: (colIndices.title >= 0 ? row[colIndices.title] : '') || '',
        author: (colIndices.author >= 0 ? row[colIndices.author] : '') || '',
        director: (colIndices.director >= 0 ? row[colIndices.director] : '') || '',
        airDate: (colIndices.airDate >= 0 ? row[colIndices.airDate] : '') || '',
        mistress: (colIndices.mistress >= 0 ? row[colIndices.mistress] : '') || '',
        description: hboReview || 'English translation pending', // Use HBO review as English description
        swedishDescription: swedishDesc, // Keep original Swedish description
        godfather: (colIndices.godfather >= 0 ? row[colIndices.godfather] : '') || '',
        music: (colIndices.music >= 0 ? row[colIndices.music] : '') || '',
        hboReview: hboReview,
        imdbLink: getImdbLink(seasonNumber, episodes.length + 1),
        imdbRating: getImdbRating(seasonNumber, episodes.length + 1)
      };

      episodes.push(episode);
    }

    // Extract year from first episode's air date
    const year = episodes[0]?.airDate ? 
      new Date(episodes[0].airDate).getFullYear().toString() : '';

    seasons.push({
      seasonNumber,
      year,
      episodeCount: episodes.length,
      episodes
    });

    console.log(`  Season ${seasonNumber}: ${episodes.length} episodes`);
  });

  return seasons;
}

function main() {
  const seasonsData = parseXlsxToJson();

  const outputFile = 'c:/Projects/Venueve/sopranos/src/data/seasons.json';
  console.log(`\nWriting to ${outputFile}...`);

  fs.writeFileSync(outputFile, JSON.stringify(seasonsData, null, 2), 'utf-8');

  console.log('Done!');
}

main();
