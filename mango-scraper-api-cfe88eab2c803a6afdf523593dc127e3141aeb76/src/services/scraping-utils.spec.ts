import { beforeEach, describe, expect, it, vi } from "vitest";
import { ScrapingUtils } from "./scraping-utils";
import { ScrapersConfig } from "../types/scrapersConfig";
import mangaplusScraper from "../scrapers/mangaplus/mangaplus-scraper";
import WrongScrapersConfigError from "../errors/WrongScrapersConfigError";
import axios from "axios";
import * as cheerio from "cheerio";
import UnknownCheerioMethod from "../errors/UnknownCheerioMethod";

// vi.mock("cheerio", () => {
//   return {
//     load: vi.fn(),
//   };
// });

describe("scraping-utils", () => {
  let A_CORRECT_CONFIG: ScrapersConfig;
  const AN_URL: string = "an url";
  const AN_AXIOS_RESPONSE = { data: "data" };
  const A_CHEERIO_NODE: cheerio.Cheerio<any> = {
    text: vi.fn(),
    attr: vi.fn(),
  } as unknown as cheerio.Cheerio<any>;
  const AN_UNKNOWN_METHOD = "a method";

  beforeEach(() => {
    A_CORRECT_CONFIG = {
      scrapers: {
        mangaplus: {
          enabled: true,
          trustLevel: 1,
          scraper: mangaplusScraper,
        },
        another: {
          enabled: true,
          trustLevel: 2,
          scraper: mangaplusScraper,
        },
      },
    };
  });

  it("should throw wrong scrapers config error when verify scrapers config with enabled same trustLevel", () => {
    const A_CONFIG_WITH_SAME_TRUSTLEVEL = A_CORRECT_CONFIG;
    A_CONFIG_WITH_SAME_TRUSTLEVEL.scrapers.another.trustLevel = 1;
    expect(() =>
      ScrapingUtils.verifyConfig(A_CONFIG_WITH_SAME_TRUSTLEVEL)
    ).toThrowError(WrongScrapersConfigError);
  });

  it("should be ok when verify scrapers config with same trustLevel but not enabled", () => {
    const A_CONFIG_WITH_SAME_TRUSTLEVEL_BUT_NOT_ENABLED = A_CORRECT_CONFIG;
    A_CONFIG_WITH_SAME_TRUSTLEVEL_BUT_NOT_ENABLED.scrapers.another.trustLevel = 1;
    A_CONFIG_WITH_SAME_TRUSTLEVEL_BUT_NOT_ENABLED.scrapers.another.enabled =
      false;
    expect(() =>
      ScrapingUtils.verifyConfig(A_CONFIG_WITH_SAME_TRUSTLEVEL_BUT_NOT_ENABLED)
    ).not.toThrowError(WrongScrapersConfigError);
  });

  it("should call correct axios get when request to cheerio", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({ data: "" });

    await ScrapingUtils.requestToCheerioPage(AN_URL);

    expect(axios.get).toHaveBeenCalledWith(AN_URL);
  });

  it("should call cheerio load when request to cheerio", async () => {
    vi.spyOn(axios, "get").mockResolvedValue(AN_AXIOS_RESPONSE);

    await ScrapingUtils.requestToCheerioPage(AN_URL);

    expect(cheerio.load).toHaveBeenCalledWith(AN_AXIOS_RESPONSE.data);
  });
});
