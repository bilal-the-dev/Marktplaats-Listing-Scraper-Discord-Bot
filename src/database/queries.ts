import { MonitorConfig } from "../utils/typings/types.js";
import db from "./index.js";

export const upsertMonitorConfig = db.prepare<MonitorConfig>(
  `INSERT OR REPLACE INTO monitor_config (rowid, searchText) VALUES (1, @searchText)`
);

export const getMonitorConfig = db.prepare<{}, MonitorConfig>(
  `SELECT * FROM monitor_config`
);
