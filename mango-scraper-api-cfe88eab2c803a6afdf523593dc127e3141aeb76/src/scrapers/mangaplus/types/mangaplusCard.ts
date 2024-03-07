import { MangaPlusChapter } from "./mangaplusChapter";

export interface MangaPlusCard {
  mangaTitle: string;
  latestChapter: string;
  chapter: MangaPlusChapter;
}
