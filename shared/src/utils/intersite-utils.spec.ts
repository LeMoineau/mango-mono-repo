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
import Chapter from "../types/chapter";
import IntersiteChapter from "../types/intersite/IntersiteChapter";

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

  // describe("addSrcInfosIn", () => {
  //   it("should add src infos in intersite chapters", () => {
  //     const A_FORMATTED_NUMBER = "100";
  //     const A_FORMATTED_NAME = "naruto";
  //     const AN_INTERSITE_CHAPTER = IntersiteUtils.emptyIntersiteChapter(
  //       A_FORMATTED_NUMBER,
  //       A_FORMATTED_NAME
  //     );
  //     const A_CHAPTER: Chapter = {
  //       ...MANGAPLUS_CHAPTER_1_DANDADAN,
  //       manga: { title: "dandadan", mangaId: "123" },
  //     };
  //     const A_SRC = "mangaplus";

  //     const res = IntersiteUtils.addSrcInfosIn(
  //       AN_INTERSITE_CHAPTER,
  //       A_CHAPTER,
  //       A_SRC
  //     );

  //     expect(res.id[A_SRC]).toBe(A_CHAPTER.id);
  //     expect(res.title[A_SRC]).toBe(A_CHAPTER.title);
  //     expect(res.number[A_SRC]).toBe(A_CHAPTER.number);
  //     expect(res.image[A_SRC]).toBe(A_CHAPTER.image);
  //     expect(res.releaseDate[A_SRC]).toBe(A_CHAPTER.releaseDate);
  //     expect(res.manga.id[A_SRC]).toBe(A_CHAPTER.manga.id);
  //     expect(res.manga.title[A_SRC]).toBe(A_CHAPTER.manga.title);
  //   });
  // });

  describe("pushSrcValuesInIntersiteObject", () => {
    it("should push src values of chapters in intersite chapters", () => {
      const A_CHAPTER: Chapter = {
        id: "14306187-3585-454f-90c4-312dc0ec9e39",
        src: "mangaplus",
        chapterEndpoint: "7001156",
        formattedNumber: "102",
        number: "102",
        title: "Histoire 102: Le furieux",
        image:
          "https://mangaplus.shueisha.co.jp/drm/title/700017/title_thumbnail_portrait_list/333962.jpg?key=e16d692a24cb227ab5768cbe105fb544&duration=86400",
        releaseDate: new Date("2024-03-13 13:36:19.495"),
        manga: {
          title: "Akane-banashi",
          formattedName: "akanebanashi",
          mangaEndpoint: "700017",
          id: "5358702e-fe81-40bc-88ca-4c7a5578b7d6",
        },
      };
      const AN_INTERSITE_CHAPTER: IntersiteChapter =
        IntersiteUtils.emptyIntersiteChapter("102", "akanebanashi");

      expect(
        IntersiteUtils.pushSrcValuesInIntersiteObject(
          AN_INTERSITE_CHAPTER,
          A_CHAPTER,
          "mangaplus"
        )
      ).toStrictEqual({
        chapterEndpoint: {
          mangaplus: "7001156",
        },
        formattedNumber: "102",
        id: {
          mangaplus: "14306187-3585-454f-90c4-312dc0ec9e39",
        },
        image: {
          mangaplus:
            "https://mangaplus.shueisha.co.jp/drm/title/700017/title_thumbnail_portrait_list/333962.jpg?key=e16d692a24cb227ab5768cbe105fb544&duration=86400",
        },
        manga: {
          formattedName: "akanebanashi",
          id: {
            mangaplus: "5358702e-fe81-40bc-88ca-4c7a5578b7d6",
          },
          mangaEndpoint: {
            mangaplus: "700017",
          },
          title: {
            mangaplus: "Akane-banashi",
          },
        },
        number: {
          mangaplus: "102",
        },
        releaseDate: {
          mangaplus: expect.any(Date),
        },
        title: {
          mangaplus: "Histoire 102: Le furieux",
        },
      });
    });
  });
});
