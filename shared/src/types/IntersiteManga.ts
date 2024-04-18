import { Identified } from "./attributes/Identified";
import { ParentlessStoredManga, StoredManga } from "./Manga";
import { MangaFormattedName } from "./primitives/Identifiers";

export interface IntersiteMangaCore {
  formattedName: MangaFormattedName;
}

export interface IdentifiedIntersiteMangaCore
  extends IntersiteMangaCore,
    Identified {}

export interface IntersiteManga extends IdentifiedIntersiteMangaCore {
  mangas: ParentlessStoredManga[];
}
