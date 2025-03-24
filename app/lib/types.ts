export type CryptoAsset = {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null; // Some assets may not have a max supply
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string | null; // Some assets may not have a vwap24Hr value
};

export type CryptoAssetFields = {
  data: CryptoAsset[];
  timestamp: number;
};

export type CryptoAssetResponse = Promise<CryptoAssetFields>;
