import dotenv from "dotenv";
import { ScrapingUtils } from "../services/scraping-utils";
import scrapersConfig from "./scrapers-config";

dotenv.config();
ScrapingUtils.verifyConfig(scrapersConfig);
