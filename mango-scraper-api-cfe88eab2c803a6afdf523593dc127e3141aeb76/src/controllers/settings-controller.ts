import scrapersConfig from "../config/scrapers-config";

class SettingsController {
  public getConfig() {
    return {
      scrapersEnabled: Object.keys(scrapersConfig.scrapers).sort(
        (a, b) =>
          scrapersConfig.scrapers[a].trustLevel -
          scrapersConfig.scrapers[b].trustLevel
      ),
    };
  }
}

export default new SettingsController();
