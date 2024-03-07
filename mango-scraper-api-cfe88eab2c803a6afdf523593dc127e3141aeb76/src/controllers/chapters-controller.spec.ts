import { describe, expect, it, vi } from "vitest";
import ChaptersController from "./chapters-controller";
import mangaPlusScraper from "../scrapers/mangaplus/mangaplus-scraper";
import scraperController from "./scraper-controller";
import chaptersController from "./chapters-controller";

describe("chapters-controller", () => {
  it("should call scraper controller getLatestChapters method", async () => {
    vi.spyOn(
      scraperController,
      "getLatestChaptersOfAllScrapers"
    ).mockImplementation(async () => []);

    await chaptersController.getAll();

    expect(scraperController.getLatestChaptersOfAllScrapers).toHaveBeenCalled();
  });
});
