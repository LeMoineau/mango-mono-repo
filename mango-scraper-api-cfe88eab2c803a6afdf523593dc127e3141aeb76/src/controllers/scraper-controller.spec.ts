import { beforeEach, describe, expect, it, vi } from "vitest";
import scraperController from "./scraper-controller";
import scrapersConfig from "../config/scrapers-config";
import { ObjectUtils } from "../services/object-utils";
import Scraper from "../scrapers/scraper";
import IntersiteChapter from "../types/IntersiteChapter";
import Chapter from "../types/chapter";

describe("scraper-controller", () => {
  const A_CHAPTER: Chapter = {
    id: "naruto-1",
    image: "an url",
    manga: {
      title: "naruto",
      id: "naruto",
    },
    number: "1",
    title: "new beginning",
  };
  let A_INTERSITE_CHAPTER: IntersiteChapter;
  const A_SCRAPER_NAME = "mangaplus";

  beforeEach(() => {
    A_INTERSITE_CHAPTER = {
      title: { mangaplus: A_CHAPTER.title },
      number: { mangaplus: A_CHAPTER.number },
      formattedNumber: "1",
      image: { mangaplus: A_CHAPTER.image },
      id: { mangaplus: A_CHAPTER.id },
      manga: {
        formattedTitle: "naruto",
        title: { mangaplus: A_CHAPTER.manga.title },
        id: { mangaplus: A_CHAPTER.manga.id },
      },
    };
  });

  it("should store enabled scrapers from config when initialize", () => {
    for (let scraperName of Object.keys(scrapersConfig.scrapers)) {
      if (scrapersConfig.scrapers[scraperName].enabled) {
        expect(scraperController["scrapersEnabled"][scraperName]).toBe(
          scrapersConfig.scrapers[scraperName].scraper
        );
      }
    }
  });

  it("should store scraper trustLevels from config when initialize", () => {
    for (let scraperName of Object.keys(scrapersConfig.scrapers)) {
      if (scrapersConfig.scrapers[scraperName].enabled) {
        expect(
          scraperController["trustedScrapers"][
            scrapersConfig.scrapers[scraperName].trustLevel
          ]
        ).toBe(scraperName);
      }
    }
  });

  it("should call getLatestChapters of every enabled chapters when getting latests chapters of all scrapers", async () => {
    ObjectUtils.forEachKeyInObject(
      scraperController["scrapersEnabled"],
      (_, v: Scraper) => {
        vi.spyOn(v, "getLatestChapters").mockImplementation(async () => []);
      }
    );

    await scraperController.getLatestChaptersOfAllScrapers();

    ObjectUtils.forEachKeyInObject(
      scraperController["scrapersEnabled"],
      (_, v: Scraper) => {
        expect(v.getLatestChapters).toHaveBeenCalled();
      }
    );
  });

  it("should append chapter to intersite chapters when chapter not exist", () => {
    const intersiteChapters: IntersiteChapter[] = [];
    const chapters: Chapter[] = [A_CHAPTER];

    scraperController["appendChapterToIntersiteChapters"](
      intersiteChapters,
      chapters,
      A_SCRAPER_NAME
    );

    expect(intersiteChapters).toStrictEqual([A_INTERSITE_CHAPTER]);
  });

  it("should append src to intersite chapter when chapter exist", () => {
    const intersiteChapters: IntersiteChapter[] = [A_INTERSITE_CHAPTER];
    const chapters: Chapter[] = [A_CHAPTER];
    const ANOTHER_SCRAPER_NAME = "mangasaki";

    scraperController["appendChapterToIntersiteChapters"](
      intersiteChapters,
      chapters,
      ANOTHER_SCRAPER_NAME
    );

    expect(intersiteChapters).toStrictEqual([
      {
        title: { mangaplus: A_CHAPTER.title, mangasaki: A_CHAPTER.title },
        number: { mangaplus: A_CHAPTER.number, mangasaki: A_CHAPTER.number },
        formattedNumber: "1",
        image: { mangaplus: A_CHAPTER.image, mangasaki: A_CHAPTER.image },
        id: { mangaplus: A_CHAPTER.id, mangasaki: A_CHAPTER.id },
        manga: {
          formattedTitle: "naruto",
          title: {
            mangaplus: A_CHAPTER.manga.title,
            mangasaki: A_CHAPTER.manga.title,
          },
          id: { mangaplus: A_CHAPTER.manga.id, mangasaki: A_CHAPTER.manga.id },
        },
      },
    ]);
  });

  it("should find scraped chapter same of intersite chapter", () => {
    expect(
      scraperController["findSameChapterFromDifferentSrc"](
        A_INTERSITE_CHAPTER,
        A_CHAPTER
      )
    ).toBeTruthy();
  });

  it("should not find scraped chapter same of not same intersite chapter when not same number", () => {
    A_INTERSITE_CHAPTER.formattedNumber = "2";
    expect(
      scraperController["findSameChapterFromDifferentSrc"](
        A_INTERSITE_CHAPTER,
        A_CHAPTER
      )
    ).toBeFalsy();
  });

  it("should not find scraped chapter same of not same intersite chapter when not same manga title", () => {
    A_INTERSITE_CHAPTER.manga.formattedTitle = "onepiece";
    expect(
      scraperController["findSameChapterFromDifferentSrc"](
        A_INTERSITE_CHAPTER,
        A_CHAPTER
      )
    ).toBeFalsy();
  });
});
