import customFetch from "../utils/customFetch.js";
import { MarktplaatsListingsResponse } from "../utils/typings/marktplaat.js";

import fs from "fs/promises";

async function testAndSave() {
  const path = `/lrp/api/search?attributesById[]=0&attributesByKey[]=offeredSince%3AVandaag&limit=30&offset=0&query=cars&searchInTitleAndDescription=true&viewOptions=list-view`;

  const data = await customFetch<MarktplaatsListingsResponse>({ path });

  await fs.writeFile(`${import.meta.dirname}/test.json`, JSON.stringify(data));
}

testAndSave();
