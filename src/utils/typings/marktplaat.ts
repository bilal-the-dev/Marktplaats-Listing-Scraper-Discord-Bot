export interface MarktplaatsListingsResponse {
  listings: MarktplaatsListing[];
}

export interface MarktplaatsListing {
  itemId: string;
  title: string;
  description: string;
  categorySpecificDescription: string;
  thinContent: boolean;
  priceInfo: {
    priceCents: number;
    priceType: "FIXED" | "FAST_BID" | "MIN_BID";
  };
  location: {
    cityName: string;
    countryName: string;
    countryAbbreviation: string;
    distanceMeters: number;
    isBuyerLocation: boolean;
    onCountryLevel: boolean;
    abroad: boolean;
    latitude: number;
    longitude: number;
  };
  date: string;
  imageUrls?: string[];
  sellerInformation: {
    sellerId: number;
    sellerName: string;
    showSoiUrl: boolean;
    showWebsiteUrl: boolean;
    sellerLogoUrl?: string;
    isVerified: boolean;
  };
  categoryId: number;
  priorityProduct?: string;
  opvallStickerText?: string;
  videoOnVip: boolean;
  urgencyFeatureActive: boolean;
  napAvailable: boolean;
  trustIndicators?: TrustIndicator[];
  highlights?: Highlight[];
  attributes: Attribute[];
  extendedAttributes?: ExtendedAttribute[];
  traits?: string[];
  verticals?: string[];
  pictures: Picture[];
  searchType: string;
  reserved: boolean;
  vipUrl: string;
}

export interface TrustIndicator {
  key: string;
}

export interface Highlight {
  key: string;
}

export interface Attribute {
  key: string;
  value: string;
  unit?: string;
  values: string[];
}

export interface ExtendedAttribute {
  key: string;
  value: string;
  values: string[];
}

export interface Picture {
  id: number;
  mediaId: string;
  url: string;
  extraSmallUrl: string;
  mediumUrl: string;
  largeUrl: string;
  extraExtraLargeUrl: string;
  aspectRatio: {
    width: number;
    height: number;
  };
}
