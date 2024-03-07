import { describe, expect, it } from "vitest";
import settingsController from "./settings-controller";
import scrapersConfig from "../config/scrapers-config";

describe("settings-controller", () => {
  it("should return scrapers enabled when getting config", () => {
    const res = settingsController.getConfig();

    for (let scraperName of Object.keys(scrapersConfig.scrapers)) {
      expect(res.scrapersEnabled).toContainEqual(scraperName);
    }
  });

  it("should return scrapers enabled order by trust level when getting config", () => {
    const res = settingsController.getConfig();

    let previousTrustLevel = 0;
    for (let scraperName of res.scrapersEnabled) {
      expect(
        scrapersConfig.scrapers[scraperName].trustLevel
      ).toBeGreaterThanOrEqual(previousTrustLevel);
      previousTrustLevel = scrapersConfig.scrapers[scraperName].trustLevel;
    }
  });
});
