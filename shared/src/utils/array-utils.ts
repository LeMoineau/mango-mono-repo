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

  /**
   * Transform each item of an array<A> into an array<B>
   * @param array source array<A> from where change items
   * @param transformater function which transform an item of type A to type B
   * @returns result array<B>
   */
  export function transformEachItemOf<A, B>(
    array: A[],
    transformater: (item: A) => B | undefined
  ): B[] {
    let res: B[] = [];
    for (let item of array) {
      const transform = transformater(item);
      if (transform) res.push(transform);
    }
    return res;
  }

  /**
   * Check if target array include all items of src array
   * @param src
   * @param target
   * @returns true if target contains all src items, false else
   */
  export function includesAll<T>(src: T[], target: T[]): boolean {
    for (let t of target) {
      if (!src.includes(t)) return false;
    }
    return true;
  }
}
