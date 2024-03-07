import axios from "axios";
import { describe, expect, expectTypeOf, it, vi } from "vitest";
import mangasakiScraper from "./mangasaki-scraper";
import { ScrapingUtils } from "../../services/scraping-utils";
import { CheerioAPI, load } from "cheerio";
import { MANGASAKI_HOME_PAGE_HTML } from "./test-examples/actual-mangasaki-page.spec";
import Chapter from "../../types/chapter";

describe("mangasaki-scraper", () => {
  const A_$: CheerioAPI = load(MANGASAKI_HOME_PAGE_HTML);
  const THE_MANGASAKI_HOME_PAGE = load(MANGASAKI_HOME_PAGE_HTML);

  it("should call request cheerio page when getting latest chapters", async () => {
    vi.spyOn(ScrapingUtils, "requestToCheerioPage").mockResolvedValue(A_$);

    await mangasakiScraper.getLatestChapters();

    expect(ScrapingUtils.requestToCheerioPage).toHaveBeenCalledWith(
      mangasakiScraper["PAGE_URL"]
    );
  });

  it("should return complete chapter array when getting latest chapters", async () => {
    vi.spyOn(ScrapingUtils, "requestToCheerioPage").mockResolvedValue(
      THE_MANGASAKI_HOME_PAGE
    );

    const chapters = await mangasakiScraper.getLatestChapters();

    expect(Array.isArray(chapters)).toBeTruthy();
    expectTypeOf(chapters).toEqualTypeOf<Chapter[]>();
  });

  it("should return filled chapter array when getting latest chapters", async () => {
    vi.spyOn(ScrapingUtils, "requestToCheerioPage").mockResolvedValue(
      THE_MANGASAKI_HOME_PAGE
    );

    const chapters = await mangasakiScraper.getLatestChapters();

    expect(chapters.length).toBeGreaterThan(0);
    for (let c of chapters) {
      expect(c.id).toBeDefined();
      expect(c.image).toBeDefined();
      expect(c.number).toBeDefined();
      expect(c.title).toBeDefined();
      expect(c.manga).toBeDefined();
      expect(c.manga.title).toBeDefined();
      expect(c.manga.id).toBeDefined();
    }
  });
});
