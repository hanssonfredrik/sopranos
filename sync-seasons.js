/**
 * Sync sopranos-original.xml to seasons.json with correct column mapping
 */
import fs from 'fs';
import xml2js from 'xml2js';

async function parseXmlToJson() {
  const xmlContent = fs.readFileSync(
    'c:/Projects/Venueve/sopranos/src/data/sopranos-original.xml',
    'utf-8'
  );

  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(xmlContent);

  const seasons = [];
  const worksheets = result.Workbook.Worksheet;

  let globalEpisodeNum = 1;

  for (const worksheet of worksheets) {
    const worksheetName = worksheet.$['ss:Name'];

    // Skip non-season worksheets
    if (!worksheetName.startsWith('Season')) {
      continue;
    }

    const seasonNum = parseInt(worksheetName.replace('Season', ''));
    const rows = worksheet.Table[0].Row;

    const episodes = [];

    // Skip header row (index 0)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const cells = row.Cell || [];

      if (cells.length < 3) {
        continue;
      }

      // Extract cell text helper - handles both explicit index and empty cells
      const getCellText = (targetColumnIndex) => {
        let currentColumnIndex = 0;
        
        for (const cell of cells) {
          // Check if cell has explicit index (ss:Index attribute)
          const explicitIndex = cell.$?.['ss:Index'];
          if (explicitIndex) {
            currentColumnIndex = parseInt(explicitIndex) - 1; // Excel uses 1-based indexing
          }
          
          // Check if this is the target column
          if (currentColumnIndex === targetColumnIndex) {
            if (cell.Data && cell.Data[0]) {
              const data = cell.Data[0];
              if (typeof data === 'string') {
                return data;
              } else if (data._) {
                return data._;
              }
            }
            return '';
          }
          
          // Move to next column for next iteration
          currentColumnIndex++;
        }
        
        return '';
      };

      const episodeInSeason = getCellText(1); // Column B (Episode)
      const title = getCellText(2); // Column C (Title)

      // Skip if no episode number or title
      if (!episodeInSeason || !title) {
        continue;
      }

      const episodeInSeasonNum = parseInt(episodeInSeason);
      if (isNaN(episodeInSeasonNum)) {
        continue;
      }

      // Build episode object with CORRECT column mapping
      const episode = {
        episodeNumber: globalEpisodeNum,
        episodeInSeason: episodeInSeasonNum,
        title: title,
        author: getCellText(3),      // Column D (Author)
        director: getCellText(4),    // Column E (Director)
        airDate: getCellText(5),     // Column F (Air date)
        mistress: getCellText(6),    // Column G (Mistress)
        description: getCellText(7), // Column H (Description)
        godfather: getCellText(8),   // Column I (Godfather) - WAS SWAPPED
        music: getCellText(9),       // Column J (Music) - WAS SWAPPED
        hboReview: getCellText(10)   // Column K (HBO review)
      };

      episodes.push(episode);
      globalEpisodeNum++;
    }

    if (episodes.length > 0) {
      seasons.push({
        season: seasonNum,
        episodes: episodes
      });
    }
  }

  return seasons;
}

async function main() {
  console.log('Parsing XML file...');
  const seasonsData = await parseXmlToJson();

  console.log(`Found ${seasonsData.length} seasons`);
  for (const season of seasonsData) {
    console.log(`  Season ${season.season}: ${season.episodes.length} episodes`);
  }

  const outputFile = 'c:/Projects/Venueve/sopranos/src/data/seasons.json';
  console.log(`\nWriting to ${outputFile}...`);

  fs.writeFileSync(outputFile, JSON.stringify(seasonsData, null, 2), 'utf-8');

  console.log('Done!');
}

main().catch(console.error);
