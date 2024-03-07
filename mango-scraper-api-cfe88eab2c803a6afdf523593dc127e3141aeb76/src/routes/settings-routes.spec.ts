import { beforeAll, describe, expect, it, vi } from "vitest";
import request from "supertest";
import express from "express";
import settingsRouter from "./settings-routes";
import settingsController from "../controllers/settings-controller";

describe("chapters-routes", () => {
  const app = express();

  beforeAll(() => {
    app.use("/settings", settingsRouter);
  });

  it("should call settings controller get config when getting settings", async () => {
    vi.spyOn(settingsController, "getConfig");

    await request(app).get("/settings");

    expect(settingsController.getConfig).toHaveBeenCalled();
  });
});
