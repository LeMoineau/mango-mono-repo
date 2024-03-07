import axios from "axios";
import WrongScrapersConfigError from "../errors/WrongScrapersConfigError";
import { ScrapersConfig } from "../types/scrapersConfig";
import * as cheerio from "cheerio";
import { JsonObject } from "../types/jsonObject";
import UnknownCheerioMethod from "../errors/UnknownCheerioMethod";

export namespace ScrapingUtils {
  export function verifyConfig(config: ScrapersConfig) {
    const trustLevels: number[] = [];
    for (let scraperName of Object.keys(config.scrapers)) {
      const targetScraper = config.scrapers[scraperName];
      if (!targetScraper.enabled) {
        continue;
      }
      if (trustLevels.includes(targetScraper.trustLevel)) {
        throw new WrongScrapersConfigError(
          "same trustLevel for at least 2 of enabled scrapers"
        );
      }
      trustLevels.push(targetScraper.trustLevel);
    }
  }

  export async function requestToCheerioPage(
    url: string
  ): Promise<cheerio.CheerioAPI> {
    return await axios.get(url).then((res) => cheerio.load(res.data));
  }
}
