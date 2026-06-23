import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ExchangeRatesResponse, CachedRates } from '../models/exchange-rates.model';
import { StorageService } from './storage.service';

// Frankfurter: API pública e gratuita de câmbio (dados de bancos centrais),
// não exige chave de API. Documentação: https://frankfurter.dev/
const API_BASE_URL = 'https://api.frankfurter.dev/v1';

// Lista enxuta de moedas suportadas pela Frankfurter, com nome amigável em PT-BR.
export const SUPPORTED_CURRENCIES: { code: string; name: string }[] = [
  { code: 'USD', name: 'Dólar Americano' },
  { code: 'EUR', name: 'Euro' },
  { code: 'BRL', name: 'Real Brasileiro' },
  { code: 'GBP', name: 'Libra Esterlina' },
  { code: 'JPY', name: 'Iene Japonês' },
  { code: 'CHF', name: 'Franco Suíço' },
  { code: 'CAD', name: 'Dólar Canadense' },
  { code: 'AUD', name: 'Dólar Australiano' },
  { code: 'CNY', name: 'Yuan Chinês' },
  { code: 'ARS', name: 'Peso Argentino' },
  { code: 'MXN', name: 'Peso Mexicano' },
  { code: 'INR', name: 'Rupia Indiana' },
  { code: 'NZD', name: 'Dólar Neozelandês' },
  { code: 'SEK', name: 'Coroa Sueca' },
  { code: 'NOK', name: 'Coroa Norueguesa' },
  { code: 'ZAR', name: 'Rand Sul-Africano' },
  { code: 'SGD', name: 'Dólar de Singapura' },
  { code: 'HKD', name: 'Dólar de Hong Kong' },
];

export interface RatesResult {
  base: string;
  date: string;
  rates: { [currency: string]: number };
  fromCache: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  /**
   * Busca as taxas de câmbio mais recentes para uma moeda base.
   * Se a requisição falhar (ex: offline), tenta usar o cache local.
   */
  getLatestRates(base: string): Observable<RatesResult> {
    const url = `${API_BASE_URL}/latest?from=${base}`;

    return this.http.get<ExchangeRatesResponse>(url).pipe(
      tap((response) => {
        // Salva no cache local sempre que a requisição der certo
        const cache: CachedRates = {
          base: response.base,
          date: response.date,
          rates: response.rates,
          fetchedAt: new Date().toISOString(),
        };
        this.storage.saveCachedRates(cache);
      }),
      map((response) => ({
        base: response.base,
        date: response.date,
        rates: response.rates,
        fromCache: false,
      })),
      catchError((err) => {
        console.error('Falha ao buscar taxas de câmbio:', err);
        // Modo offline: usa a última versão salva localmente
        const cached = this.storage.getCachedRates(base);
        if (cached) {
          return of({
            base: cached.base,
            date: cached.date,
            rates: cached.rates,
            fromCache: true,
          });
        }
        // Sem internet e sem cache: não há o que mostrar
        return of({
          base,
          date: '',
          rates: {},
          fromCache: true,
        });
      })
    );
  }

  /**
   * Histórico de variação (últimos N dias) entre duas moedas,
   * usado no gráfico de cotações.
   */
  getHistoricalRates(
    base: string,
    target: string,
    days: number = 30
  ): Observable<{ date: string; rate: number }[]> {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);

    const fmt = (d: Date) => d.toISOString().split('T')[0];
    const url = `${API_BASE_URL}/${fmt(start)}..${fmt(end)}?from=${base}&to=${target}`;

    return this.http.get<{ rates: { [date: string]: { [c: string]: number } } }>(url).pipe(
      map((response) => {
        return Object.entries(response.rates)
          .map(([date, value]) => ({ date, rate: value[target] }))
          .sort((a, b) => a.date.localeCompare(b.date));
      }),
      catchError(() => of([]))
    );
  }
}
