import SplittingError from "../errors/SplittingError";

export namespace ArrayUtils {
  export function getLastOf<T>(arr: T[]): T {
    return arr[arr.length - 1];
  }

  /**
   * Try to split and get the n-element but return return the src if dont succeed
   * Can throw SplittingError instead of returning src in error case
   * @param arr
   * @param splitter
   * @param n
   * @param throwError
   * @returns n-element of src if error or SplittingError if throwError true
   */
  export function tryingSplitAndGet(
    arr: string,
    splitter: string,
    n: number = 1,
    throwError: boolean = false
  ): string {
    const res = arr.split(splitter)[n];
    if (res) {
      return res;
    }
    if (!res && !throwError) {
      return arr;
    }
    throw new SplittingError(arr, splitter);
  }
}
