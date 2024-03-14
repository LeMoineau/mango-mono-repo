import { Env } from '../types/Env'

class Config {
    constructor() {}

    public getEnv(): Env {
        return {
            MANGO_SCRAPER_API_ENDPOINT: import.meta.env
                .VITE_MANGO_SCRAPER_API_ENDPOINT,
        }
    }
}

export default new Config()
