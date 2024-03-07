import Chapter from "./chapter";

export default interface Manga {
  name: string;
  chapters?: Chapter[];
}
