import { MangaPlusManga } from "./mangaplusManga";

export interface MangaPlusChapter {
  manga: MangaPlusManga;
  chapter: string;
  id: number;
  title: string;
}
