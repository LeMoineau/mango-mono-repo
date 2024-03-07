import Chapter from "../../types/chapter";
import Manga from "../../types/manga";
import Scraper from "../scraper";
import { ScrapingUtils } from "../../services/scraping-utils";
import { ArrayUtils } from "../../services/array-utils";

class MangaSakiScraper implements Scraper {
  private PAGE_URL = process.env.MANGASAKI_URL ?? "https://mangasaki.org";
  async getLatestChapters(): Promise<Chapter[]> {
    const $ = await ScrapingUtils.requestToCheerioPage(this.PAGE_URL);
    const chapters: Chapter[] = [];
    $("ul#latest-list > li").each((i) => {
      const currentMangaPath = `ul#latest-list > li:nth-child(${i + 1})`;
      $(`${currentMangaPath} .item-list ul li .item-list ul li`).each((j) => {
        const currentChapterPath = `${currentMangaPath} .item-list ul li .item-list ul li:nth-child(${
          j + 1
        })`;
        try {
          chapters.push({
            image: $(`${currentMangaPath} a:first-child img`).attr("src")!,
            manga: {
              title: $(
                `${currentMangaPath} .item-list ul li .tl a strong`
              ).text(),
              id: ArrayUtils.getLastOf(
                $(`${currentMangaPath} .item-list ul li .tl a`)
                  .attr("href")!
                  .split("/")
              ),
            },
            number: ArrayUtils.getLastOf(
              $(`${currentChapterPath} a`).text().split(" ")
            ),
            title: $(`${currentChapterPath} a`).text(),
            id: ArrayUtils.getLastOf(
              $(`${currentChapterPath} a`).attr("href")!.split("/")
            ),
          });
        } catch (e) {}
      });
    });
    return chapters;
  }
  async getMangas({ q }: { q?: string | undefined }): Promise<Manga[]> {
    throw Error("not yet implemented");
  }
  async getManga(name: string): Promise<Manga> {
    throw Error("not yet implemented");
  }
}

export default new MangaSakiScraper();
