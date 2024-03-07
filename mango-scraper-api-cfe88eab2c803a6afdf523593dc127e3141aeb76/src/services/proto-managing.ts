import axios from "axios";
import { Reader, Type, load } from "protobufjs";

export namespace ProtoManaging {
  export async function loadProtoFileAsync(
    filename: string,
    type: string
  ): Promise<Type> {
    const res = await new Promise<Type>((resolve, reject) => {
      load(filename, (err, root) => {
        if (err) {
          reject(err);
          return;
        }
        const Message = root?.lookupType(type);
        if (!Message) {
          reject(`proto look up on type ${type} failed!`);
          return;
        }

        resolve(Message);
      });
    }).catch((err) => {
      throw err;
    });
    return res;
  }

  export async function httpGetProtoFile(url: string): Promise<any> {
    return await axios
      .get(url, {
        responseType: "arraybuffer",
      })
      .then((res) => res.data);
  }

  export function decodeToJson(
    type: Type,
    toDecode: Reader | Uint8Array
  ): { [key: string]: any } {
    return type.decode(toDecode).toJSON();
  }
}
