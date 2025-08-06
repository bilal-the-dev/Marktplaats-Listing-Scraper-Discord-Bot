export const genApiURL = (searchText: string, offset: number = 0) => {
  return `/lrp/api/search?attributesById[]=0&attributesByKey[]=offeredSince%3AVandaag&limit=100&offset=${offset}&query=${searchText}&searchInTitleAndDescription=true&viewOptions=list-view`;
};
