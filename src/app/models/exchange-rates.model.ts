export interface ExchangeRatesResponse {
  amount: number;
  base: string;
  date: string;
  rates: { [currency: string]: number };
}

export interface CachedRates {
  base: string;
  date: string;
  rates: { [currency: string]: number };
  fetchedAt: string; // ISO string - quando foi salvo localmente
}
