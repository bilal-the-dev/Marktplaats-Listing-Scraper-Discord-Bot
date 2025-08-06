import db from "./index.js";

db.exec(`
  CREATE TABLE IF NOT EXISTS monitor_config (
    searchText TEXT NOT NULL PRIMARY KEY
  );
  `);
