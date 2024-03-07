import Scraper from "../scrapers/scraper";

export type ScraperName = "mangaplus" | string;

export interface ScraperConfig {
  enabled: boolean;
  trustLevel: number;
  scraper: Scraper;
}

export interface ScrapersConfig {
  scrapers: { [scraperName in ScraperName]: ScraperConfig };
}
