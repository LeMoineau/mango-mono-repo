export default class ScraperParsingError extends Error {
  constructor(message?: string) {
    super(
      `a parsing error occured during scraping ${message && `: ${message}`}`
    );
  }
}
