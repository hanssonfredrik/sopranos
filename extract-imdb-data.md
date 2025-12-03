# Extract IMDB Episode Data

## Instructions to get correct IMDB episode IDs and ratings:

1. **Visit the IMDB episodes page:**
   https://www.imdb.com/title/tt0141842/episodes/

2. **For each season (1-6):**
   - Select the season from the dropdown
   - Open browser DevTools (F12)
   - Run this JavaScript code in the Console:

```javascript
// Extract episode data for the current season
const episodes = [];

// Try different selectors for IMDB's structure
const episodeCards = document.querySelectorAll('.episode-item-wrapper, .list_item, article.episode-item, [class*="episode"]');

if (episodeCards.length === 0) {
  console.log('No episodes found. Try this alternative:');
  console.log('Look for links with href containing /title/tt and nearby rating elements');
  
  // Alternative: Find all episode links
  const links = Array.from(document.querySelectorAll('a[href*="/title/tt"]')).filter(a => {
    const href = a.getAttribute('href');
    return href && href.includes('/title/tt') && href.match(/tt\d{7,}/);
  });
  
  console.log(`Found ${links.length} potential episode links`);
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    const imdbId = href.match(/(tt\d+)/)?.[1];
    
    // Try to find rating near this link
    let rating = 0;
    let parent = link.closest('div, article, li, [class*="item"]');
    if (parent) {
      const ratingText = parent.textContent.match(/(\d+\.\d+)\/10/);
      if (ratingText) {
        rating = parseFloat(ratingText[1]);
      }
    }
    
    if (imdbId) {
      episodes.push({ imdbId, rating, title: link.textContent.trim() });
    }
  });
} else {
  episodeCards.forEach(ep => {
    const titleLink = ep.querySelector('a[href*="/title/tt"]');
    const href = titleLink?.getAttribute('href') || '';
    const imdbId = href.match(/(tt\d+)/)?.[1] || '';
    
    // Try multiple rating selectors
    let rating = 0;
    const ratingText = ep.textContent.match(/(\d+\.\d+)/);
    if (ratingText) {
      rating = parseFloat(ratingText[1]);
    }
    
    if (imdbId) {
      episodes.push({ imdbId, rating });
    }
  });
}

console.log(JSON.stringify(episodes, null, 2));
console.log(`\nFound ${episodes.length} episodes`);
```

3. **Copy the output** for each season and paste below:

---

## Season 1 Data:
```json
PASTE HERE
```

## Season 2 Data:
```json
PASTE HERE
```

## Season 3 Data:
```json
PASTE HERE
```

## Season 4 Data:
```json
PASTE HERE
```

## Season 5 Data:
```json
PASTE HERE
```

## Season 6 Data:
```json
PASTE HERE
```

---

## Alternative: Manual Method

If the script doesn't work, manually collect data for each episode:

For each episode, click on it to open the episode page, then:
- Copy the URL (contains the episode ID like `tt0705229`)
- Copy the rating (displayed as "X.X/10")

Create a structure like:
```json
{
  "1": {
    "ids": ["tt0705229", "tt0705265", ...],
    "ratings": [9.2, 8.5, ...]
  }
}
```
