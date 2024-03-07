import { describe, expect, it, vi } from "vitest";
import { ProtoManaging } from "./proto-managing";
import protobufjs, { Message, Reader, Root, Type } from "protobufjs";
import axios from "axios";

describe("proto-managing", () => {
  const A_FILENAME = "test.proto";
  const A_TYPE_NAME = "scraper.type";
  const A_ROOT: Root = {
    lookupType: vi.fn(),
  } as unknown as Root;
  const A_TYPE: Type = {
    decode: vi.fn(),
  } as unknown as Type;
  const A_MESSAGE: Message = {
    toJSON: vi.fn(),
  } as unknown as Message;
  const A_READER: Reader = {} as Reader;
  const AN_URL: string = "an url";
  const AN_AXIOS_RESPONSE_DATA = "data";

  it("should call load when loading proto file async", () => {
    vi.spyOn(protobufjs, "load").mockImplementation(async () => A_ROOT);

    ProtoManaging.loadProtoFileAsync(A_FILENAME, A_TYPE_NAME);

    expect(protobufjs.load).toHaveBeenCalledWith(A_FILENAME, expect.anything());
  });

  it("should call decode when decode to json", () => {
    vi.spyOn(A_TYPE, "decode").mockReturnValue(A_MESSAGE);

    ProtoManaging.decodeToJson(A_TYPE, A_READER);

    expect(A_TYPE.decode).toHaveBeenCalledWith(A_READER);
  });

  it("should call toJson when decode to json", () => {
    vi.spyOn(A_TYPE, "decode").mockReturnValue(A_MESSAGE);

    ProtoManaging.decodeToJson(A_TYPE, A_READER);

    expect(A_MESSAGE.toJSON).toHaveBeenCalled();
  });

  it("should call axios get with correct parameters when http get proto file", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({ data: "" });

    await ProtoManaging.httpGetProtoFile(AN_URL);

    expect(axios.get).toHaveBeenCalledWith(AN_URL, {
      responseType: "arraybuffer",
    });
  });

  it("should return axios response data when http get proto file", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({ data: AN_AXIOS_RESPONSE_DATA });

    const data = await ProtoManaging.httpGetProtoFile(AN_URL);

    expect(data).toBe(AN_AXIOS_RESPONSE_DATA);
  });
});
