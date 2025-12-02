// Sopranos data types and interfaces

export interface Episode {
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  originalTitle: string;
  writer: string;
  director: string;
  airDate: string;
  mistress: string;
  description: string;
  music: string[];
  hboReview: string;
  godfatherReference: string;
}

export interface Season {
  number: number;
  episodes: number;
  year: number;
  episodeList: Episode[];
}

export interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

export interface TopListItem {
  rank: number;
  title: string;
  description: string;
}

export interface TopListCategory {
  name: string;
  items: TopListItem[];
}

export interface Award {
  name: string;
  wins: number;
  nominations: number;
}

export interface SeriesInfo {
  title: string;
  description: string;
  seasons: number;
  totalEpisodes: number;
  originalRun: string;
  network: string;
}

// Data loaded from the sopranos.xml file
export const seriesInfo: SeriesInfo = {
  title: "The Sopranos",
  description: "The Sopranos is an American crime drama television series created by David Chase. The series revolves around Tony Soprano, a New Jersey-based Italian-American mobster, portraying the difficulties that he faces as he tries to balance his family life with his role as leader of a criminal organization.",
  seasons: 6,
  totalEpisodes: 86,
  originalRun: "1999-2007",
  network: "HBO"
};

// Sample episodes from Season 1 - more will be loaded from XML
export const seasons: Season[] = [
  {
    number: 1,
    episodes: 13,
    year: 1999,
    episodeList: [
      {
        seasonNumber: 1,
        episodeNumber: 1,
        title: "The Sopranos",
        originalTitle: "The Sopranos",
        writer: "David Chase",
        director: "David Chase",
        airDate: "January 10, 1999",
        mistress: "None",
        description: "Tony Soprano is a New Jersey mob boss who starts seeing a psychiatrist after suffering a panic attack. He struggles to balance his family life with his criminal organization while dealing with his domineering mother and rebellious nephew. The pilot episode introduces us to Tony's world of violence, family dysfunction, and the stress of leading a crime family.",
        music: ["Woke Up This Morning - Alabama 3", "The Beast in Me - Johnny Cash"],
        hboReview: "HBO's groundbreaking series premiere that redefined television drama. James Gandolfini's portrayal of Tony Soprano is nothing short of magnificent, creating a complex antihero that viewers simultaneously love and fear. The writing is sharp, the direction is cinematic, and the series sets a new standard for HBO's original programming.",
        godfatherReference: "Tony's therapy sessions mirror the confessional nature of classic mafia films, while his family dynamics echo the generational conflicts seen in The Godfather saga."
      },
      {
        seasonNumber: 1,
        episodeNumber: 5,
        title: "College",
        originalTitle: "College",
        writer: "James Manos Jr. & David Chase",
        director: "Allen Coulter",
        airDate: "February 7, 1999",
        mistress: "None",
        description: "Tony takes Meadow on a college tour in Maine, but the trip becomes complicated when he spots Febby Petrulio, a former associate who entered witness protection. This episode is pivotal as it's the first time we see Tony commit murder on screen, while simultaneously showing his role as a caring father. The duality of his nature is perfectly captured.",
        music: ["The Captain - Kasey Chambers", "Tiny Tears - Tindersticks"],
        hboReview: "Widely considered one of the series' finest episodes, \"College\" perfectly balances Tony's dual nature as both a loving father and a cold-blooded killer. The moral complexity is handled with exceptional skill.",
        godfatherReference: "The episode's exploration of maintaining family normalcy while conducting violent business reflects Michael Corleone's struggle to separate his two worlds."
      }
    ]
  }
];

export const recipes: Recipe[] = [
  {
    name: "Tony's Gabagool Sandwich",
    description: "A classic Italian-American cold cut sandwich featuring capicola, provolone, and traditional fixings",
    ingredients: [
      "Capicola (Gabagool) - sliced thin",
      "Provolone cheese",
      "Italian bread or sub roll",
      "Lettuce",
      "Tomato",
      "Red onion",
      "Olive oil",
      "Red wine vinegar",
      "Salt and pepper"
    ],
    instructions: [
      "Split the Italian bread lengthwise",
      "Drizzle with olive oil and red wine vinegar",
      "Layer the capicola and provolone cheese",
      "Add lettuce, tomato, and red onion",
      "Season with salt and pepper",
      "Serve immediately"
    ]
  },
  {
    name: "Carmela's Ziti",
    description: "A hearty baked pasta dish that appears frequently in the Soprano household",
    ingredients: [
      "1 lb ziti pasta",
      "2 cups ricotta cheese",
      "2 cups mozzarella cheese, shredded",
      "1 cup Parmesan cheese, grated",
      "4 cups marinara sauce",
      "1 lb ground beef or Italian sausage",
      "2 cloves garlic, minced",
      "1 onion, diced",
      "Fresh basil",
      "Salt and pepper"
    ],
    instructions: [
      "Cook ziti according to package directions",
      "Brown the meat with onion and garlic",
      "Add marinara sauce and simmer",
      "Mix pasta with ricotta and half the mozzarella",
      "Layer pasta mixture and meat sauce in baking dish",
      "Top with remaining mozzarella and Parmesan",
      "Bake at 375°F for 30 minutes until bubbly"
    ]
  }
];

export const topListCategories: TopListCategory[] = [
  {
    name: "Best Episodes",
    items: [
      {
        rank: 1,
        title: "Pine Barrens (Season 3, Episode 11)",
        description: "Christopher and Paulie get lost in the Pine Barrens while trying to collect money from a Russian. This episode is famous for its dark humor and survival elements."
      },
      {
        rank: 2,
        title: "College (Season 1, Episode 5)",
        description: "Tony takes Meadow on a college tour but encounters a former associate in witness protection. The duality of Tony as father and killer is perfectly captured."
      },
      {
        rank: 3,
        title: "Long Term Parking (Season 5, Episode 12)",
        description: "The shocking death of Adriana La Cerva in one of the series' most emotionally devastating episodes."
      },
      {
        rank: 4,
        title: "Made in America (Season 6, Episode 21)",
        description: "The controversial series finale that left viewers debating Tony's fate with its ambiguous ending at Holsten's diner."
      },
      {
        rank: 5,
        title: "Whoever Did This (Season 4, Episode 9)",
        description: "Tony discovers Ralph's involvement in the fire that killed Pie-O-My, leading to a brutal confrontation."
      }
    ]
  },
  {
    name: "Most Memorable Characters",
    items: [
      {
        rank: 1,
        title: "Tony Soprano",
        description: "The complex mob boss struggling with family, business, and mental health. James Gandolfini's iconic performance defined the antihero of prestige television."
      },
      {
        rank: 2,
        title: "Paulie 'Walnuts' Gualtieri",
        description: "The superstitious and unpredictable soldier known for his loyalty to Tony and his memorable one-liners."
      },
      {
        rank: 3,
        title: "Christopher Moltisanti",
        description: "Tony's nephew and protégé whose Hollywood dreams conflict with his criminal responsibilities."
      },
      {
        rank: 4,
        title: "Dr. Jennifer Melfi",
        description: "Tony's psychiatrist who provides insight into his psychological complexities while struggling with the ethical implications of treating a criminal."
      },
      {
        rank: 5,
        title: "Silvio Dante",
        description: "Tony's consigliere and loyal friend, known for his calm demeanor and Michael Corleone impressions."
      }
    ]
  }
];

export const awards: Award[] = [
  { name: "Emmy Awards", wins: 21, nominations: 111 },
  { name: "Golden Globe Awards", wins: 5, nominations: 12 },
  { name: "Screen Actors Guild Awards", wins: 3, nominations: 16 },
  { name: "Peabody Award", wins: 1, nominations: 1 }
];