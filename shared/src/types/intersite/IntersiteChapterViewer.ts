import { ChapterPage } from "../chapterViewer";
import { MangaEndpoint } from "../primitives/id";
import { IntersiteChapterInfos } from "./IntersiteChapter";
import { IntersiteField } from "./IntersiteField";

export interface IntersiteChapterViewer extends IntersiteChapterInfos {
  pages: IntersiteField<ChapterPage[]>;
  nbPages: IntersiteField<number>;
  manga: { id: IntersiteField<MangaEndpoint>; name: IntersiteField<string> };
}
