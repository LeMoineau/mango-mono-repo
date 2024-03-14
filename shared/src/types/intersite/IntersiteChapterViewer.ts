import { ChapterPage } from "../chapterViewer";
import { MangaId } from "../primitives/id";
import { IntersiteChapterInfos } from "./IntersiteChapter";
import { IntersiteField } from "./IntersiteField";

export interface IntersiteChapterViewer extends IntersiteChapterInfos {
  pages: IntersiteField<ChapterPage[]>;
  nbPages: IntersiteField<number>;
  manga: { id: IntersiteField<MangaId>; name: IntersiteField<string> };
}
