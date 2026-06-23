export interface ConversionHistoryItem {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: number;
  rate: number;
  date: string; // ISO string
}
