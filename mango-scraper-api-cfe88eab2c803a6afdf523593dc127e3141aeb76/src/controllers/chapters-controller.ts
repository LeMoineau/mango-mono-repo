import IntersiteChapter from "../types/IntersiteChapter";
import scraperController from "./scraper-controller";

class ChaptersController {
  public constructor() {}

  public async getAll(): Promise<IntersiteChapter[]> {
    return await scraperController.getLatestChaptersOfAllScrapers();
  }
}

export default new ChaptersController();
