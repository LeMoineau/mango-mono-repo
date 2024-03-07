export namespace TextFormatUtils {
  export function formatChapterNumber(chapterNumber: string): string {
    let res = chapterNumber.trim();
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
}
