export namespace TextFormatUtils {
  export function formatChapterNumber(chapterNumber: string): string {
    let res = chapterNumber.trim().replace(/[^0-9\-]+/g, "");
    try {
      const numberRes = Number(res); // to remove left 0 as "045"
      if (!Number.isNaN(numberRes)) {
        res = `${numberRes}`;
      }
    } catch {}
    return res;
  }

  export function formatMangaTitle(title: string): string {
    let res = title
      .trim()
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, "");
    return res;
  }

  export function isNumber(str: string): boolean {
    return !Number.isNaN(Number(str));
  }

  /**
   * Remove a string from a string
   * @param strToRemove string to remove
   * @returns string without the string to remove
   */
  export function stringWithout(src: string, strToRemove: string): string {
    const regex = new RegExp(`${strToRemove}`, "g");
    return src.replace(regex, "").trim();
  }
}
