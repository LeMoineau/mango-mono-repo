export default class WrongScrapersConfigError extends Error {
  constructor(message?: string) {
    super(
      `error encounter when parsing scrapers-config ${
        message && `: ${message}`
      }`
    );
  }
}
