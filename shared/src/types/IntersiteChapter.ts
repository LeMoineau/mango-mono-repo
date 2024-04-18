import { Identified } from "./attributes/Identified";
import { IdentifiedIntersiteMangaNested } from "./attributes/MangaNested";
import { IdentifiedChapter } from "./Chapter";
import { ChapterFormattedName } from "./primitives/Identifiers";

export interface IntersiteChapterCore {
  formattedName: ChapterFormattedName;
}

export interface ParentlessIntersiteChapter
  extends IntersiteChapterCore,
    Identified {
  chapters: IdentifiedChapter[];
}

export interface IntersiteChapter extends ParentlessIntersiteChapter {
  intersiteManga: IdentifiedIntersiteMangaNested;
}
