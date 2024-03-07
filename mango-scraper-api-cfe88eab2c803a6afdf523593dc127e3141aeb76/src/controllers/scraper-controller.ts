import scrapersConfig from "../config/scrapers-config";
import Scraper from "../scrapers/scraper";
import { ObjectUtils } from "../services/object-utils";
import { TextFormatUtils } from "../services/text-format-utils";
import IntersiteChapter from "../types/IntersiteChapter";
import Chapter from "../types/chapter";
import { ScraperName, ScrapersConfig } from "../types/scrapersConfig";

class ScraperController {
  private scrapersEnabled: { [scraperName in ScraperName]: Scraper } = {};
  private trustedScrapers: { [index: number]: ScraperName } = [];

  constructor(options: ScrapersConfig) {
    for (let scraperName of Object.keys(options.scrapers)) {
      const targetScraper = options.scrapers[scraperName];
      if (!targetScraper.enabled) {
        continue;
      }
      this.scrapersEnabled[scraperName] = targetScraper.scraper;
      this.trustedScrapers[targetScraper.trustLevel] = scraperName;
    }
  }

  public async getLatestChaptersOfAllScrapers(): Promise<IntersiteChapter[]> {
    const chapters: IntersiteChapter[] = [];
    await ObjectUtils.forEachKeyInObject(
      this.scrapersEnabled,
      async (scraperName, scraper) => {
        const scraperChapters = await scraper.getLatestChapters();
        this.appendChapterToIntersiteChapters(
          chapters,
          scraperChapters,
          scraperName
        );
      }
    );
    return chapters;
  }

  private appendChapterToIntersiteChapters(
    intersiteChapters: IntersiteChapter[],
    chaptersToAppend: Chapter[],
    scraperName: string
  ) {
    for (let c of chaptersToAppend) {
      let sameChapter = intersiteChapters.find((ic) =>
        this.findSameChapterFromDifferentSrc(ic, c)
      );
      if (!sameChapter) {
        sameChapter = {
          title: {},
          number: {},
          formattedNumber: TextFormatUtils.formatChapterNumber(c.number),
          image: {},
          id: {},
          manga: {
            formattedTitle: TextFormatUtils.formatMangaTitle(c.manga.title),
            title: {},
            id: {},
          },
        };
        intersiteChapters.push(sameChapter);
      }
      if (!sameChapter) {
        continue;
      }
      sameChapter.title[scraperName] = c.title;
      sameChapter.number[scraperName] = c.number;
      sameChapter.image[scraperName] = c.image;
      sameChapter.id[scraperName] = c.id;
      sameChapter.manga.title[scraperName] = c.manga.title;
      sameChapter.manga.id[scraperName] = c.manga.id;
    }
  }

  private findSameChapterFromDifferentSrc(
    intersiteChapter: IntersiteChapter,
    scrapedChapter: Chapter
  ) {
    return (
      intersiteChapter.manga.formattedTitle ===
        TextFormatUtils.formatMangaTitle(scrapedChapter.manga.title) &&
      intersiteChapter.formattedNumber ===
        TextFormatUtils.formatChapterNumber(scrapedChapter.number)
    );
  }
}

export default new ScraperController(scrapersConfig);
