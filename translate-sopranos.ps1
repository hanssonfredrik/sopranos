# PowerShell script to extract and translate Sopranos data from XML
# This script processes sopranos-original.xml and creates a translated JSON output

param(
    [string]$InputFile = ".\src\data\sopranos-original.xml",
    [string]$OutputFile = ".\src\data\seasons.json"
)

Write-Host "Loading XML file..." -ForegroundColor Cyan
$xml = [xml](Get-Content $InputFile -Raw -Encoding UTF8)

# Function to translate Swedish text to English using LibreTranslate API (free, no API key required)
function Translate-Text {
    param(
        [string]$Text,
        [string]$SourceLang = "sv",
        [string]$TargetLang = "en"
    )
    
    if ([string]::IsNullOrWhiteSpace($Text)) {
        return ""
    }
    
    try {
        # Use LibreTranslate API (free, open source)
        $uri = "https://libretranslate.com/translate"
        $body = @{
            q = $Text
            source = $SourceLang
            target = $TargetLang
            format = "text"
        } | ConvertTo-Json
        
        $response = Invoke-RestMethod -Uri $uri -Method Post -Body $body -ContentType "application/json" -TimeoutSec 30
        
        if ($response.translatedText) {
            Write-Host "." -NoNewline -ForegroundColor Green
            return $response.translatedText
        }
        else {
            Write-Host "!" -NoNewline -ForegroundColor Yellow
            return $Text
        }
    }
    catch {
        Write-Host "X" -NoNewline -ForegroundColor Red
        Write-Host "`nTranslation error: $($_.Exception.Message)" -ForegroundColor Yellow
        return $Text
    }
    
    Start-Sleep -Milliseconds 500  # Rate limiting
}

# Function to clean and extract cell data
function Get-CellData {
    param($Cell)
    
    if ($null -eq $Cell) {
        return ""
    }
    
    $data = $Cell.Data.'#text'
    if ([string]::IsNullOrEmpty($data)) {
        $data = $Cell.Data
    }
    
    # Clean up the text
    if ($data) {
        $data = $data.ToString().Trim()
        # Replace special characters
        $data = $data -replace '&#10;', "`n"
        $data = $data -replace '&quot;', '"'
        $data = $data -replace '&amp;', '&'
        $data = $data -replace '&lt;', '<'
        $data = $data -replace '&gt;', '>'
    }
    
    return $data
}

# Initialize seasons array
$seasons = @()

Write-Host "`nProcessing seasons..." -ForegroundColor Cyan

# Process each worksheet (Season1-Season6)
for ($seasonNum = 1; $seasonNum -le 6; $seasonNum++) {
    $worksheetName = "Season$seasonNum"
    $worksheet = $xml.Workbook.Worksheet | Where-Object { $_.Name -eq $worksheetName }
    
    if ($null -eq $worksheet) {
        Write-Host "`nWarning: $worksheetName not found!" -ForegroundColor Yellow
        continue
    }
    
    Write-Host "`n`nProcessing Season $seasonNum..." -ForegroundColor Cyan
    
    $rows = $worksheet.Table.Row
    $episodes = @()
    
    # Skip header row (index 0), process data rows
    for ($i = 1; $i -lt $rows.Count; $i++) {
        $row = $rows[$i]
        $cells = $row.Cell
        
        if ($null -eq $cells -or $cells.Count -eq 0) {
            continue
        }
        
        # Extract all cell data
        $episodeNum = Get-CellData $cells[0]
        $episodeInSeason = Get-CellData $cells[1]
        $title = Get-CellData $cells[2]
        $author = Get-CellData $cells[3]
        $director = Get-CellData $cells[4]
        $airDate = Get-CellData $cells[5]
        $mistress = Get-CellData $cells[6]
        $descriptionSV = Get-CellData $cells[7]
        $godfatherSV = Get-CellData $cells[8]
        $musicSV = Get-CellData $cells[9]
        $hboReview = Get-CellData $cells[10]
        
        if ([string]::IsNullOrWhiteSpace($episodeNum)) {
            continue
        }
        
        Write-Host "`nEpisode $episodeNum - $title" -ForegroundColor Yellow
        
        # Translate Swedish text to English
        Write-Host "  Translating description... " -NoNewline
        $description = if ($descriptionSV) { Translate-Text $descriptionSV } else { "" }
        Write-Host " Done"
        
        Write-Host "  Translating godfather notes... " -NoNewline
        $godfather = if ($godfatherSV) { Translate-Text $godfatherSV } else { "" }
        Write-Host " Done"
        
        Write-Host "  Translating music notes... " -NoNewline
        $music = if ($musicSV) { Translate-Text $musicSV } else { "" }
        Write-Host " Done"
        
        # Create episode object
        $episode = [PSCustomObject]@{
            episodeNumber = [int]$episodeNum
            episodeInSeason = [int]$episodeInSeason
            title = $title
            author = $author
            director = $director
            airDate = $airDate
            mistress = $mistress
            description = $description
            godfather = $godfather
            music = $music
            hboReview = $hboReview
        }
        
        $episodes += $episode
    }
    
    # Create season object
    $season = [PSCustomObject]@{
        season = $seasonNum
        episodes = $episodes
    }
    
    $seasons += $season
    
    Write-Host "`nSeason $seasonNum complete: $($episodes.Count) episodes processed" -ForegroundColor Green
}

# Convert to JSON and save
Write-Host "`n`nSaving to $OutputFile..." -ForegroundColor Cyan
$jsonOutput = $seasons | ConvertTo-Json -Depth 10
$jsonOutput | Out-File -FilePath $OutputFile -Encoding UTF8

Write-Host "`nComplete! Processed $($seasons.Count) seasons." -ForegroundColor Green
Write-Host "Output saved to: $OutputFile" -ForegroundColor Green
