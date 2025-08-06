declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      LISTING_CHANNEL_ID: string;
      LOGS_CHANNEL_ID: string;
      MARKTPLAATS_BASE_URL: string;
      NODE_ENV: "development" | "production";
      USER_AGENT: string;
    }
  }
}

// // If this file has no import/export statements (i.e. is a script)
// // convert it into a module by adding an empty export statement.
export {};
