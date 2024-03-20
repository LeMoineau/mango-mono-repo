import { describe, expect, it } from "vitest";
import { IntersiteUtils } from "./intersite-utils";
import {
  INTERSITE_CHAPTER_140_DANDADAN,
  INTERSITE_CHAPTER_141_DANDADAN,
  INTERSITE_CHAPTER_1_DANDADAN,
  INTERSITE_CHAPTER_2_DANDADAN,
} from "./__tests-examples__/intersite-chapters.spec";
import { MANGAPLUS_MANGA_DANDADAN } from "./__tests-examples__/mangas.spec";
import { INTERSITE_MANGA_DANDADAN } from "./__tests-examples__/intersite-mangas.spec";
import {
  MANGAPLUS_CHAPTER_140_DANDADAN,
  MANGAPLUS_CHAPTER_141_DANDADAN,
  MANGAPLUS_CHAPTER_1_DANDADAN,
  MANGAPLUS_CHAPTER_2_DANDADAN,
} from "./__tests-examples__/chapters.spec";

describe("IntersiteUtils", () => {
  describe("convertMangasToIntersiteMangas", () => {
    it("should convert a manga to intersiteManga", () => {
      expect(
        IntersiteUtils.convertMangasToIntersiteMangas({
          mangaplus: [MANGAPLUS_MANGA_DANDADAN],
        })
      ).toStrictEqual([INTERSITE_MANGA_DANDADAN]);
    });
  });

  describe("convertChaptersInfosToIntersiteChaptersInfos", () => {
    it("should convert a list of chapters into intersite chapters infos", () => {
      expect(
        IntersiteUtils.convertChaptersInfosToIntersiteChaptersInfos({
          mangaplus: [
            MANGAPLUS_CHAPTER_1_DANDADAN,
            MANGAPLUS_CHAPTER_2_DANDADAN,
            MANGAPLUS_CHAPTER_140_DANDADAN,
            MANGAPLUS_CHAPTER_141_DANDADAN,
          ],
        })
      ).toStrictEqual([
        INTERSITE_CHAPTER_1_DANDADAN,
        INTERSITE_CHAPTER_2_DANDADAN,
        INTERSITE_CHAPTER_140_DANDADAN,
        INTERSITE_CHAPTER_141_DANDADAN,
      ]);
    });
  });
});
