import { beforeAll, describe, expect, it, vi } from "vitest";
import { ProtoManaging } from "../../services/proto-managing";
import { Type } from "protobufjs";
import {
  exampleFinalMangaPlusChaptersJson,
  exampleWeb_homeV3Json,
} from "./test-examples/correct-response-example.spec";
import mangaPlusScraper from "./mangaplus-scraper";

describe("mangaplus-scraper", () => {
  const A_Uint8Array: Uint8Array = {} as Uint8Array;
  const A_TYPE: Type = {} as Type;
  const A_CORRECT_JSON: { [key: string]: any } = exampleWeb_homeV3Json;

  beforeAll(() => {
    vi.spyOn(ProtoManaging, "httpGetProtoFile").mockResolvedValue(A_Uint8Array);
    vi.spyOn(ProtoManaging, "loadProtoFileAsync").mockResolvedValue(A_TYPE);
    vi.spyOn(ProtoManaging, "decodeToJson").mockReturnValue(A_CORRECT_JSON);
  });

  it("should call ProtoManaging httpGetProtoFile with correct endpoint when get all chapters", async () => {
    await mangaPlusScraper.getLatestChapters();

    expect(ProtoManaging.httpGetProtoFile).toHaveBeenCalledWith(
      `${mangaPlusScraper["API_ENDPOINT"]}/web/web_homeV3?lang=fra`
    );
  });

  it("should call ProtoManaging loadProtoFileAsync when get all chapters", async () => {
    await mangaPlusScraper.getLatestChapters();

    expect(ProtoManaging.loadProtoFileAsync).toHaveBeenCalled();
  });

  it("should call decodeToJson when getting all chapters", async () => {
    await mangaPlusScraper.getLatestChapters();

    expect(ProtoManaging.decodeToJson).toHaveBeenCalled();
  });

  it("should return correct chapters json when getting all chapters", async () => {
    const chapters = await mangaPlusScraper.getLatestChapters();

    expect(chapters).toStrictEqual(exampleFinalMangaPlusChaptersJson);
  });
});
