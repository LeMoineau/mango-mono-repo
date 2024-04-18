import { IntersiteField } from "./IntersiteField";
import { IntersiteChapterInfos } from "./IntersiteChapter";
import { FormattedName, MangaEndpoint, UUID } from "../primitives/id";

export interface IntersiteMangaInfos {
  id: IntersiteField<UUID>;
  mangaEndpoint: IntersiteField<MangaEndpoint>;
  name: IntersiteField<string>;
  formattedName: FormattedName;
  author: IntersiteField<string>;
  image: IntersiteField<string>;
}

export interface IntersiteManga extends IntersiteMangaInfos {
  chapters: IntersiteChapterInfos[];
}
