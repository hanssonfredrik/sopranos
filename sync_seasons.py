"""
Sync sopranos-original.xml to seasons.json with correct column mapping
"""
import xml.etree.ElementTree as ET
import json
from datetime import datetime

def parse_xml_to_json(xml_file):
    tree = ET.parse(xml_file)
    root = tree.getroot()
    
    # Namespace
    ns = {'ss': 'urn:schemas-microsoft-com:office:spreadsheet'}
    
    seasons = []
    
    # Find all worksheets (seasons)
    worksheets = root.findall('.//ss:Worksheet', ns)
    
    for worksheet in worksheets:
        worksheet_name = worksheet.get('{urn:schemas-microsoft-com:office:spreadsheet}Name')
        
        # Skip non-season worksheets
        if not worksheet_name.startswith('Season'):
            continue
        
        season_num = int(worksheet_name.replace('Season', ''))
        
        # Get rows
        rows = worksheet.findall('.//ss:Row', ns)
        
        episodes = []
        global_episode_num = sum(len(s['episodes']) for s in seasons) + 1
        
        # Skip header row (index 0)
        for row in rows[1:]:
            cells = row.findall('.//ss:Cell', ns)
            
            if len(cells) < 3:  # Skip rows without enough data
                continue
            
            # Extract cell data
            def get_cell_text(index):
                if index < len(cells):
                    data = cells[index].find('.//ss:Data', ns)
                    if data is not None:
                        return data.text or ""
                return ""
            
            episode_in_season = get_cell_text(1)  # Column B (Episode)
            title = get_cell_text(2)  # Column C (Title)
            
            # Skip if no episode number or title
            if not episode_in_season or not title:
                continue
            
            try:
                episode_in_season = int(episode_in_season)
            except:
                continue
            
            # Build episode object with correct column mapping
            episode = {
                "episodeNumber": global_episode_num,
                "episodeInSeason": episode_in_season,
                "title": title,
                "author": get_cell_text(3),  # Column D (Author)
                "director": get_cell_text(4),  # Column E (Director)
                "airDate": get_cell_text(5),  # Column F (Air date)
                "mistress": get_cell_text(6),  # Column G (Mistress)
                "description": get_cell_text(7),  # Column H (Description)
                "godfather": get_cell_text(8),  # Column I (Godfather)
                "music": get_cell_text(9),  # Column J (Music)
                "hboReview": get_cell_text(10)  # Column K (HBO review)
            }
            
            episodes.append(episode)
            global_episode_num += 1
        
        if episodes:
            seasons.append({
                "season": season_num,
                "episodes": episodes
            })
    
    return seasons

def main():
    xml_file = 'c:/Projects/Venueve/sopranos/src/data/sopranos-original.xml'
    output_file = 'c:/Projects/Venueve/sopranos/src/data/seasons.json'
    
    print("Parsing XML file...")
    seasons_data = parse_xml_to_json(xml_file)
    
    print(f"Found {len(seasons_data)} seasons")
    for season in seasons_data:
        print(f"  Season {season['season']}: {len(season['episodes'])} episodes")
    
    print(f"\nWriting to {output_file}...")
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(seasons_data, f, indent=2, ensure_ascii=False)
    
    print("Done!")

if __name__ == '__main__':
    main()
