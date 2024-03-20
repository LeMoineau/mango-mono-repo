import Chapter, { ChapterInfos } from "@shared/types/chapter";
import IntersiteChapter, {
  IntersiteChapterInfos,
} from "@shared/types/intersite/IntersiteChapter";
import {
  IntersiteManga,
  IntersiteMangaInfos,
} from "@shared/types/intersite/IntersiteManga";
import Manga, { MangaInfos, MangaSearchInfos } from "@shared/types/manga";
import { FormattedNumber, SourceName } from "@shared/types/primitives/id";
import { TextFormatUtils } from "./text-format-utils";
import ChapterViewer from "@shared/types/chapterViewer";
import { IntersiteChapterViewer } from "@shared/types/intersite/IntersiteChapterViewer";

export namespace IntersiteUtils {
  export function convertMangasInfosToIntersiteMangasInfos(mangasInfosBySrc: {
    [src in SourceName]?: (MangaInfos | MangaSearchInfos)[];
  }): IntersiteMangaInfos[] {
    let intersiteMangasInfos: IntersiteMangaInfos[] = [];
    for (let src of Object.keys(mangasInfosBySrc) as SourceName[]) {
      for (let manga of mangasInfosBySrc[src]!) {
        const formattedName = TextFormatUtils.formatMangaTitle(manga.name);
        let sameManga = intersiteMangasInfos.find(
          (m) => m.formattedName === formattedName
        );
        if (!sameManga) {
          sameManga = {
            id: {},
            name: {},
            formattedName,
            author: {},
            image: {},
          };
          intersiteMangasInfos.push(sameManga);
        }
        sameManga.id[src] = manga.id;
        sameManga.name[src] = manga.name;
        if (manga.author) sameManga.author[src] = manga.author;
        if (manga.image) sameManga.image[src] = manga.image;
      }
    }
    return intersiteMangasInfos;
  }

  export function convertMangasToIntersiteMangas(mangasBySrc: {
    [src in SourceName]?: Manga[];
  }): IntersiteManga[] {
    let intersiteMangas: IntersiteManga[] = [];
    let chaptersBySrcByMangas: {
      [formattedName: string]: { [src in SourceName]?: ChapterInfos[] };
    } = {};

    for (let src of Object.keys(mangasBySrc) as SourceName[]) {
      for (let manga of mangasBySrc[src]!) {
        const formattedName = TextFormatUtils.formatMangaTitle(manga.name);
        let sameManga = intersiteMangas.find(
          (m) => m.formattedName === formattedName
        );
        if (!sameManga) {
          sameManga = {
            id: {},
            name: {},
            formattedName,
            author: {},
            image: {},
            chapters: [],
          };
          chaptersBySrcByMangas[formattedName] = {};
          intersiteMangas.push(sameManga);
        }
        sameManga.id[src] = manga.id;
        sameManga.name[src] = manga.name;
        sameManga.author[src] = manga.author;
        sameManga.image[src] = manga.image;
        chaptersBySrcByMangas[formattedName][src] = manga.chapters;
      }
    }
    for (let formattedName of Object.keys(chaptersBySrcByMangas)) {
      const targetManga = intersiteMangas.find(
        (m) => m.formattedName === formattedName
      );
      if (!targetManga) {
        continue;
      }
      targetManga.chapters =
        IntersiteUtils.convertChaptersInfosToIntersiteChaptersInfos(
          chaptersBySrcByMangas[formattedName]
        );
    }
    return intersiteMangas;
  }

  export function convertChaptersInfosToIntersiteChaptersInfos(chaptersBySrc: {
    [src in SourceName]?: ChapterInfos[];
  }): IntersiteChapterInfos[] {
    let intersiteChapters: IntersiteChapterInfos[] = [];
    for (let src of Object.keys(chaptersBySrc) as SourceName[]) {
      for (let chapter of chaptersBySrc[src]!) {
        const formattedNumber = TextFormatUtils.formatChapterNumber(
          chapter.number
        );
        let sameChapter = intersiteChapters.find(
          (c) => c.formattedNumber === formattedNumber
        );
        if (!sameChapter) {
          sameChapter = {
            id: {},
            number: {},
            formattedNumber: formattedNumber,
            title: {},
            image: {},
            realeaseDate: {},
          };
          intersiteChapters.push(sameChapter);
        }
        sameChapter.id[src] = chapter.id;
        sameChapter.number[src] = chapter.number;
        sameChapter.title[src] = chapter.title;
        if (chapter.image) sameChapter.image[src] = chapter.image;
        if (chapter.releaseDate)
          sameChapter.realeaseDate[src] = chapter.releaseDate;
      }
    }
    return intersiteChapters;
  }

  export function convertChaptersToIntersiteChapters(chaptersBySrc: {
    [src in SourceName]?: Chapter[];
  }): IntersiteChapter[] {
    let intersiteChapters: IntersiteChapter[] = [];
    for (let src in chaptersBySrc) {
      for (let chapter of chaptersBySrc[src as SourceName]!) {
        const formattedMangaName = TextFormatUtils.formatMangaTitle(
          chapter.manga.title
        );
        const formattedNumber = TextFormatUtils.formatChapterNumber(
          chapter.number
        );
        let sameChapter = intersiteChapters.find(
          (c) =>
            c.formattedNumber === formattedNumber &&
            c.manga.formattedTitle === formattedMangaName
        );
        if (!sameChapter) {
          sameChapter = {
            id: {},
            number: {},
            formattedNumber: formattedNumber,
            title: {},
            image: {},
            realeaseDate: {},
            manga: {
              id: {},
              title: {},
              formattedTitle: formattedMangaName,
            },
          };
          intersiteChapters.push(sameChapter);
        }
        sameChapter.id[src] = chapter.id;
        sameChapter.number[src] = chapter.number;
        sameChapter.title[src] = chapter.title;
        sameChapter.manga.id[src] = chapter.manga.id;
        sameChapter.manga.title[src] = chapter.manga.title;
        if (chapter.image) sameChapter.image[src] = chapter.image;
        if (chapter.releaseDate)
          sameChapter.realeaseDate[src] = chapter.releaseDate;
      }
    }
    return intersiteChapters;
  }

  export function convertChapterViewerBySrcToIntersiteChapterViewer(
    chapterViewerBySrc: {
      [src in SourceName]?: ChapterViewer;
    },
    formattedNumber: FormattedNumber
  ): IntersiteChapterViewer {
    const intersiteChapterViewer: IntersiteChapterViewer = {
      id: {},
      title: {},
      number: {},
      formattedNumber: formattedNumber,
      image: {},
      nbPages: {},
      pages: {},
      realeaseDate: {},
      manga: {
        id: {},
        name: {},
      },
    };
    for (let src of Object.keys(chapterViewerBySrc) as SourceName[]) {
      const targetChapter = chapterViewerBySrc[src]!;
      intersiteChapterViewer.id[src] = targetChapter.id;
      intersiteChapterViewer.title[src] = targetChapter.title;
      intersiteChapterViewer.number[src] = targetChapter.number;
      intersiteChapterViewer.nbPages[src] = targetChapter.nbPages;
      intersiteChapterViewer.pages[src] = targetChapter.pages;
      intersiteChapterViewer.manga.id[src] = targetChapter.manga.id;
      intersiteChapterViewer.manga.name[src] = targetChapter.manga.name;
      if (targetChapter.image)
        intersiteChapterViewer.image[src] = targetChapter.image;
      if (targetChapter.releaseDate)
        intersiteChapterViewer.realeaseDate[src] = targetChapter.releaseDate;
    }
    return intersiteChapterViewer;
  }
}
