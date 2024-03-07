import ScraperParsingError from "../../errors/ScraperParsingError";
import { ArrayUtils } from "../../services/array-utils";
import { ProtoManaging } from "../../services/proto-managing";
import { TextFormatUtils } from "../../services/text-format-utils";
import Chapter from "../../types/chapter";
import Manga from "../../types/manga";
import Scraper from "../scraper";
import { MangaPlusCard } from "./types/mangaplusCard";

class MangaPlusScraper implements Scraper {
  private API_ENDPOINT =
    process.env.MANGAPLUS_API_ENDPOINT ??
    "https://jumpg-webapi.tokyo-cdn.com/api";

  public async getLatestChapters(): Promise<Chapter[]> {
    const res = await ProtoManaging.httpGetProtoFile(
      `${this.API_ENDPOINT}/web/web_homeV3?lang=fra`
    );
    const Message = await ProtoManaging.loadProtoFileAsync(
      `${__dirname}/protos/web_homeV3.proto`,
      "mangaplus.Web_homeV3"
    );
    const jsonRes = ProtoManaging.decodeToJson(Message, res);
    const chapters: Chapter[] = [];
    try {
      for (let s of jsonRes.parent.data.sections) {
        chapters.push(
          ...s.cards.map((c: MangaPlusCard) => {
            return {
              number: TextFormatUtils.formatChapterNumber(
                ArrayUtils.tryingSplitAndGet(c.chapter.chapter, "#", 1)
              ),
              id: c.chapter.id.toString(),
              image: c.chapter.manga.portraitThumbnail,
              title: c.chapter.title,
              manga: {
                title: c.mangaTitle,
                id: c.chapter.manga.id.toString(),
              },
            } as Chapter;
          })
        );
      }
    } catch (error) {
      console.error(error);
      throw new ScraperParsingError(
        "json recieved from manga plus api not have the expected format"
      );
    }
    return chapters;
  }

  public async getMangas({ q }: { q?: string | undefined }): Promise<Manga[]> {
    throw new Error("Function not implemented.");
  }

  public async getManga(name: string): Promise<Manga> {
    throw new Error("Function not implemented.");
  }
}

export default new MangaPlusScraper();
