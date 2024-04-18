import { Identified } from "./attributes/Identified";
import { StoredManga } from "./Manga";
import { MangaFormattedName } from "./primitives/Identifiers";

export interface IntersiteMangaCore {
  formattedName: MangaFormattedName;
}

export interface IntersiteManga extends IntersiteMangaCore, Identified {
  mangas: StoredManga[];
}
