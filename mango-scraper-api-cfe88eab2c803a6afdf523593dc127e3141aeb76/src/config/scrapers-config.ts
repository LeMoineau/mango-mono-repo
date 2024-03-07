import mangaplusScraper from "../scrapers/mangaplus/mangaplus-scraper";
import mangasakiScraper from "../scrapers/mangasaki/mangasaki-scraper";
import { ScrapersConfig } from "../types/scrapersConfig";

export default {
  scrapers: {
    mangaplus: {
      enabled: true,
      trustLevel: 1,
      scraper: mangaplusScraper,
    },
    mangasaki: {
      enabled: true,
      trustLevel: 2,
      scraper: mangasakiScraper,
    },
  },
} as ScrapersConfig;
