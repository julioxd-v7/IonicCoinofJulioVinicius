import { Injectable } from '@angular/core';
import { ConversionHistoryItem } from '../models/conversion-history.model';
import { CachedRates } from '../models/exchange-rates.model';

const HISTORY_KEY = 'ioniccoin_history';
const RATES_CACHE_KEY = 'ioniccoin_rates_cache';
const SETTINGS_KEY = 'ioniccoin_settings';

export interface AppSettings {
  updateFrequency: 'manual' | 'hourly' | 'daily';
  notifyOnBigChange: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  updateFrequency: 'manual',
  notifyOnBigChange: false,
};

/**
 * Serviço responsável por toda a persistência local do app.
 * Usa localStorage diretamente (funciona tanto rodando via `ionic serve`
 * quanto empacotado pelo Capacitor em Android/iOS).
 */
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // ---------- Histórico de conversões ----------

  getHistory(): ConversionHistoryItem[] {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as ConversionHistoryItem[];
    } catch {
      return [];
    }
  }

  addHistoryItem(item: ConversionHistoryItem): void {
    const history = this.getHistory();
    history.unshift(item); // mais recente primeiro
    // Mantém no máximo 100 itens para não inchar o localStorage
    const trimmed = history.slice(0, 100);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  }

  clearHistory(): void {
    localStorage.removeItem(HISTORY_KEY);
  }

  removeHistoryItem(id: string): void {
    const history = this.getHistory().filter((h) => h.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }

  // ---------- Cache de taxas de câmbio (modo offline) ----------

  getCachedRates(base: string): CachedRates | null {
    const raw = localStorage.getItem(`${RATES_CACHE_KEY}_${base}`);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as CachedRates;
    } catch {
      return null;
    }
  }

  saveCachedRates(cache: CachedRates): void {
    localStorage.setItem(
      `${RATES_CACHE_KEY}_${cache.base}`,
      JSON.stringify(cache)
    );
  }

  // ---------- Configurações ----------

  getSettings(): AppSettings {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } as AppSettings;
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }

  saveSettings(settings: AppSettings): void {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }
}
