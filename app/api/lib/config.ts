const CRYPTO_API_BASE_URL = "https://rest.coincap.io/v3";

export const SSR_API_ENDPOINTS = {
  projects: "/projects",
  crypto: `${CRYPTO_API_BASE_URL}/assets?apiKey=${process.env.API_KEY}`,
};

export const CSR_API_ENDPOINTS = {
  projects: "/projects",
  crypto: `${CRYPTO_API_BASE_URL}/assets?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
};
