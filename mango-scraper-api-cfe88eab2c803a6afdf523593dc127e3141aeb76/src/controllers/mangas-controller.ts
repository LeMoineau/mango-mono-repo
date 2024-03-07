import { IntersiteManga } from "../types/IntersiteManga";

class MangasController {
  public constructor() {}

  public async getAll({
    query,
  }: {
    query?: string;
  }): Promise<IntersiteManga[]> {
    return [];
  }
}

export default new MangasController();
