import Chapter, { ChapterInfos } from "@shared/types/chapter";
import IntersiteChapter, {
  IntersiteChapterInfos,
} from "@shared/types/intersite/IntersiteChapter";
import {
  IntersiteManga,
  IntersiteMangaInfos,
} from "@shared/types/intersite/IntersiteManga";
import Manga, { MangaInfos } from "@shared/types/manga";
import {
  FormattedName,
  FormattedNumber,
  SourceName,
} from "@shared/types/primitives/id";
import { ArrayUtils } from "./array-utils";

export namespace IntersiteUtils {
  export function fromMangaArrayToIntersiteMangaArray<
    T extends MangaInfos | Manga,
    IT = T extends Manga ? IntersiteManga : IntersiteMangaInfos
  >(arr: T[]): IT[] {
    const res: IT[] = [];
    const grouped = ArrayUtils.groupBy(arr, (item) => item.formattedName);

    for (let formattedName in grouped) {
      const imi: IT = IntersiteUtils.emptyIntersiteManga(formattedName) as IT;
      for (let m of grouped[formattedName]) {
        IntersiteUtils.pushSrcValuesInIntersiteObject(imi, m, m.src);
      }
      res.push(imi);
    }

    return res;
  }

  export function fromChapterArrayToIntersiteChapterArray<
    T extends Chapter,
    IT = T extends Chapter ? IntersiteChapter : IntersiteChapterInfos
  >(arr: T[]): IT[] {
    const res: IT[] = [];
    const grouped = ArrayUtils.groupBy(
      arr,
      (item) => `${item.formattedNumber}-${item.manga.formattedName}`
    );

    for (let key in grouped) {
      const formattedName = grouped[key][0].manga.formattedName;
      const formattedNumber = grouped[key][0].formattedNumber;
      const imi: IT = IntersiteUtils.emptyIntersiteChapter(
        formattedNumber,
        formattedName
      ) as IT;
      for (let m of grouped[formattedName]) {
        IntersiteUtils.pushSrcValuesInIntersiteObject(imi, m, m.src);
      }
      res.push(imi);
    }

    return res;
  }

  /**
   * Create empty intersite manga infos
   * @param formattedName
   * @returns
   */
  export function emptyIntersiteMangaInfos(
    formattedName: FormattedName
  ): IntersiteMangaInfos {
    return {
      id: {},
      mangaEndpoint: {},
      formattedName,
      name: {},
      author: {},
      image: {},
    };
  }

  export function emptyIntersiteManga(
    formattedName: FormattedName
  ): IntersiteManga {
    return {
      id: {},
      mangaEndpoint: {},
      formattedName,
      name: {},
      author: {},
      image: {},
      chapters: [],
    };
  }

  export function pushSrcValuesInIntersiteObject<IT, T>(
    intersiteObject: IT,
    object: T,
    src: SourceName
  ): IT {
    const anyIntersiteObject = intersiteObject as any;
    const anyObject = object as any;
    for (let ik in anyIntersiteObject) {
      console.log(ik);
      if (typeof anyIntersiteObject[ik] !== "object") {
        continue;
      }
      if (anyObject[ik]) {
        if (
          typeof anyObject[ik] !== "object" ||
          anyObject[ik] instanceof Date
        ) {
          anyIntersiteObject[ik][src] = anyObject[ik];
        } else if (typeof anyObject[ik] === "object") {
          anyIntersiteObject[ik] = pushSrcValuesInIntersiteObject(
            anyIntersiteObject[ik],
            anyObject[ik],
            src
          );
        }
      }
    }
    return anyIntersiteObject as IT;
  }

  // export function convertMangasToIntersiteMangas(mangasBySrc: {
  //   [src in SourceName]?: Manga[];
  // }): IntersiteManga[] {
  //   let intersiteMangas: IntersiteManga[] = [];
  //   let chaptersBySrcByMangas: {
  //     [formattedName: string]: { [src in SourceName]?: ChapterInfos[] };
  //   } = {};

  //   for (let src of Object.keys(mangasBySrc) as SourceName[]) {
  //     for (let manga of mangasBySrc[src]!) {
  //       const formattedName = TextFormatUtils.formatMangaTitle(manga.name);
  //       let sameManga = intersiteMangas.find(
  //         (m) => m.formattedName === formattedName
  //       );
  //       if (!sameManga) {
  //         sameManga = {
  //           id: {},
  //           name: {},
  //           formattedName,
  //           author: {},
  //           image: {},
  //           chapters: [],
  //         };
  //         chaptersBySrcByMangas[formattedName] = {};
  //         intersiteMangas.push(sameManga);
  //       }
  //       sameManga.id[src] = manga.id;
  //       sameManga.name[src] = manga.name;
  //       sameManga.author[src] = manga.author;
  //       sameManga.image[src] = manga.image;
  //       chaptersBySrcByMangas[formattedName][src] = manga.chapters;
  //     }
  //   }
  //   for (let formattedName of Object.keys(chaptersBySrcByMangas)) {
  //     const targetManga = intersiteMangas.find(
  //       (m) => m.formattedName === formattedName
  //     );
  //     if (!targetManga) {
  //       continue;
  //     }
  //     targetManga.chapters =
  //       IntersiteUtils.convertChaptersInfosToIntersiteChaptersInfos(
  //         chaptersBySrcByMangas[formattedName]
  //       );
  //   }
  //   return intersiteMangas;
  // }

  // export function convertChaptersInfosToIntersiteChaptersInfos(chaptersBySrc: {
  //   [src in SourceName]?: ChapterInfos[];
  // }): IntersiteChapterInfos[] {
  //   let intersiteChapters: IntersiteChapterInfos[] = [];
  //   for (let src of Object.keys(chaptersBySrc) as SourceName[]) {
  //     for (let chapter of chaptersBySrc[src]!) {
  //       const formattedNumber = TextFormatUtils.formatChapterNumber(
  //         chapter.number
  //       );
  //       let sameChapter = intersiteChapters.find(
  //         (c) => c.formattedNumber === formattedNumber
  //       );
  //       if (!sameChapter) {
  //         sameChapter = {
  //           id: {},
  //           number: {},
  //           formattedNumber: formattedNumber,
  //           title: {},
  //           image: {},
  //           releaseDate: {},
  //         };
  //         intersiteChapters.push(sameChapter);
  //       }
  //       sameChapter.id[src] = chapter.id;
  //       sameChapter.number[src] = chapter.number;
  //       sameChapter.title[src] = chapter.title;
  //       if (chapter.image) sameChapter.image[src] = chapter.image;
  //       if (chapter.releaseDate)
  //         sameChapter.releaseDate[src] = chapter.releaseDate;
  //     }
  //   }
  //   return intersiteChapters;
  // }

  // export function convertChaptersToIntersiteChapters(chaptersBySrc: {
  //   [src in SourceName]?: Chapter[];
  // }): IntersiteChapter[] {
  //   let intersiteChapters: IntersiteChapter[] = [];
  //   for (let src in chaptersBySrc) {
  //     for (let chapter of chaptersBySrc[src as SourceName]!) {
  //       const formattedMangaName = TextFormatUtils.formatMangaTitle(
  //         chapter.manga.title
  //       );
  //       const formattedNumber = TextFormatUtils.formatChapterNumber(
  //         chapter.number
  //       );
  //       let sameChapter = intersiteChapters.find(
  //         (c) =>
  //           c.formattedNumber === formattedNumber &&
  //           c.manga.formattedTitle === formattedMangaName
  //       );
  //       if (!sameChapter) {
  //         sameChapter = {
  //           id: {},
  //           number: {},
  //           formattedNumber: formattedNumber,
  //           title: {},
  //           image: {},
  //           releaseDate: {},
  //           manga: {
  //             id: {},
  //             title: {},
  //             formattedTitle: formattedMangaName,
  //           },
  //         };
  //         intersiteChapters.push(sameChapter);
  //       }
  //       sameChapter.id[src] = chapter.id;
  //       sameChapter.number[src] = chapter.number;
  //       sameChapter.title[src] = chapter.title;
  //       sameChapter.manga.id[src] = chapter.manga.id;
  //       sameChapter.manga.title[src] = chapter.manga.title;
  //       if (chapter.image) sameChapter.image[src] = chapter.image;
  //       if (chapter.releaseDate)
  //         sameChapter.releaseDate[src] = chapter.releaseDate;
  //     }
  //   }
  //   return intersiteChapters;
  // }

  // export function convertChapterViewerBySrcToIntersiteChapterViewer(
  //   chapterViewerBySrc: {
  //     [src in SourceName]?: ChapterViewer;
  //   },
  //   formattedNumber: FormattedNumber
  // ): IntersiteChapterViewer {
  //   const intersiteChapterViewer: IntersiteChapterViewer = {
  //     id: {},
  //     title: {},
  //     number: {},
  //     formattedNumber: formattedNumber,
  //     image: {},
  //     nbPages: {},
  //     pages: {},
  //     releaseDate: {},
  //     manga: {
  //       id: {},
  //       name: {},
  //     },
  //   };
  //   for (let src of Object.keys(chapterViewerBySrc) as SourceName[]) {
  //     const targetChapter = chapterViewerBySrc[src]!;
  //     intersiteChapterViewer.id[src] = targetChapter.id;
  //     intersiteChapterViewer.title[src] = targetChapter.title;
  //     intersiteChapterViewer.number[src] = targetChapter.number;
  //     intersiteChapterViewer.nbPages[src] = targetChapter.nbPages;
  //     intersiteChapterViewer.pages[src] = targetChapter.pages;
  //     intersiteChapterViewer.manga.id[src] = targetChapter.manga.id;
  //     intersiteChapterViewer.manga.name[src] = targetChapter.manga.name;
  //     if (targetChapter.image)
  //       intersiteChapterViewer.image[src] = targetChapter.image;
  //     if (targetChapter.releaseDate)
  //       intersiteChapterViewer.releaseDate[src] = targetChapter.releaseDate;
  //   }
  //   return intersiteChapterViewer;
  // }

  /**
   * Generate empty intersite Chapter
   * @param formattedNumber
   * @param formattedName
   * @returns
   */
  export function emptyIntersiteChapter(
    formattedNumber: FormattedNumber,
    formattedName: FormattedName
  ): IntersiteChapter {
    return {
      ...emptyIntersiteChapterInfos(formattedNumber),
      manga: {
        title: {},
        formattedName: formattedName,
        id: {},
        mangaEndpoint: {},
      },
    };
  }

  /**
   * Generate empty intersite chapter infos
   * @param formattedNumber
   * @returns
   */
  export function emptyIntersiteChapterInfos(
    formattedNumber: FormattedNumber
  ): IntersiteChapterInfos {
    return {
      id: {},
      formattedNumber: formattedNumber,
      image: {},
      number: {},
      releaseDate: {},
      title: {},
      chapterEndpoint: {},
    };
  }

  /**
   * Add src infos in all field of a intersite chapter / chapter infos
   * @param intersiteFields
   * @param chapter
   * @returns updated with src infos intersite chapter / chapter infos
   */
  // export function addSrcInfosIn<T = IntersiteChapter | IntersiteChapterInfos>(
  //   intersiteFields: T,
  //   chapter: Chapter | ChapterInfos,
  //   src: SourceName
  // ): T {
  //   const anyIntersite: any = intersiteFields as any;
  //   const anyChapter: any = chapter as any;
  //   for (let k of Object.keys(anyIntersite)) {
  //     if (anyChapter[k]) {
  //       if (k === "manga") {
  //         for (let k2 of Object.keys(anyChapter[k])) {
  //           anyIntersite[k][k2][src] = anyChapter[k][k2];
  //         }
  //       } else {
  //         anyIntersite[k][src] = anyChapter[k];
  //       }
  //     }
  //   }
  //   return anyIntersite as T;
  // }
}
