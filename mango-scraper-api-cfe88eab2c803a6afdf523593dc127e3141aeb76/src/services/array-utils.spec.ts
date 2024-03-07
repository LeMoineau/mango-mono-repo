import { beforeEach, describe, expect, it } from "vitest";
import { ArrayUtils } from "./array-utils";
import SplittingError from "../errors/SplittingError";

describe("array-utils", () => {
  let AN_ARRAY: any[] = [];
  const THE_LAST_ITEM = 4;

  beforeEach(() => {
    AN_ARRAY = [1, 2, 3];
  });

  it("should return last of array", () => {
    AN_ARRAY.push(THE_LAST_ITEM);

    const res = ArrayUtils.getLastOf(AN_ARRAY);

    expect(res).toBe(THE_LAST_ITEM);
  });

  it("should return n from splitting when trying splitting and get", () => {
    const A_STRING = "a,b";
    const A_SPLITTER = ",";
    const AN_INDEX = 1;

    const res = ArrayUtils.tryingSplitAndGet(A_STRING, A_SPLITTER, AN_INDEX);

    expect(res).toBe("b");
  });

  it("should send src when trying splitting and get on wrong string", () => {
    const A_STRING = "ab";
    const A_SPLITTER = ",";
    const AN_INDEX = 1;

    const res = ArrayUtils.tryingSplitAndGet(A_STRING, A_SPLITTER, AN_INDEX);

    expect(res).toBe(A_STRING);
  });

  it("should throw splitting error when trying splitting and get on wrong string and throwError true", () => {
    const A_STRING = "ab";
    const A_SPLITTER = ",";
    const AN_INDEX = 1;

    expect(() =>
      ArrayUtils.tryingSplitAndGet(A_STRING, A_SPLITTER, AN_INDEX, true)
    ).toThrow(SplittingError);
  });
});
