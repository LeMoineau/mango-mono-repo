import { ChapterInfos } from "./chapter";
import { MangaId } from "./primitives/id";

export interface ChapterPage {
  url: string;
  decryptionKey?: string;
}

export default interface ChapterViewer extends ChapterInfos {
  pages: ChapterPage[];
  nbPages: number;
  manga: {
    id: MangaId;
    name: string;
  };
}
