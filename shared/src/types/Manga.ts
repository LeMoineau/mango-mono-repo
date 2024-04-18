import { Identified } from "./attributes/Identified";
import { Chapter, SourcelessChapter } from "./Chapter";
import { isSourceName, SourceName } from "./primitives/Identifiers";

export interface MangaCore {
  endpoint: string;
  src: SourceName;
  title: string;
}

export interface Manga extends MangaCore {
  author?: string;
  image?: string;
}

export interface ScrapedManga extends MangaCore {
  author: string;
  image: string;
  chapters: SourcelessChapter[];
}

export interface IdentifiedMangaCore extends MangaCore, Identified {}
export interface StoredManga extends Manga, Identified {}

/**
 * TYPES FUNCTION
 */

export function isManga(manga: any): manga is Manga {
  return manga.endpoint && isSourceName(manga.src) && manga.title;
}
