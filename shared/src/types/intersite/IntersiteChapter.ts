import {
  ChapterEndpoint,
  FormattedName,
  MangaEndpoint,
  UUID,
} from "../primitives/id";
import { IntersiteField } from "./IntersiteField";

export interface IntersiteChapterInfos {
  id: IntersiteField<UUID>;
  chapterEndpoint: IntersiteField<ChapterEndpoint>;
  title: IntersiteField<string>;
  number: IntersiteField<string>;
  formattedNumber: string;
  image: IntersiteField<string>;
  releaseDate: IntersiteField<Date>;
}

export default interface IntersiteChapter extends IntersiteChapterInfos {
  manga: {
    id: IntersiteField<UUID>;
    mangaEndpoint: IntersiteField<MangaEndpoint>;
    formattedName: FormattedName;
    title: IntersiteField<string>;
  };
}
