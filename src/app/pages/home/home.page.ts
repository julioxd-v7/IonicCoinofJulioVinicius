import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonSpinner,
  IonNote,
  IonBadge,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { swapVerticalOutline, cloudOfflineOutline } from 'ionicons/icons';

import {
  ExchangeRateService,
  SUPPORTED_CURRENCIES,
} from '../../services/exchange-rate.service';
import { StorageService } from '../../services/storage.service';
import { ConversionHistoryItem } from '../../models/conversion-history.model';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent,
    IonSpinner,
    IonNote,
    IonBadge,
    FooterComponent,
  ],
})
export class HomePage implements OnInit {
  currencies = SUPPORTED_CURRENCIES;

  fromCurrency = 'USD';
  toCurrency = 'BRL';
  amount: number = 1;
  result: number | null = null;
  currentRate: number | null = null;

  loading = false;
  isOffline = false;
  lastUpdateDate = '';

  private ratesCache: { [currency: string]: number } = {};

  constructor(
    private exchangeRateService: ExchangeRateService,
    private storageService: StorageService,
    private toastController: ToastController
  ) {
    addIcons({ swapVerticalOutline, cloudOfflineOutline });
  }

  ngOnInit(): void {
    this.fetchRatesAndConvert();
  }

  fetchRatesAndConvert(): void {
    this.loading = true;
    this.exchangeRateService.getLatestRates(this.fromCurrency).subscribe({
      next: (result) => {
        this.loading = false;
        this.ratesCache = result.rates;
        this.isOffline = result.fromCache;
        this.lastUpdateDate = result.date;

        if (this.isOffline && Object.keys(result.rates).length === 0) {
          this.presentToast(
            'Sem conexão e sem dados salvos para esta moeda.'
          );
          return;
        }

        if (this.isOffline) {
          this.presentToast(
            'Você está offline. Mostrando últimas taxas salvas.'
          );
        }

        this.convert();
      },
      error: () => {
        this.loading = false;
        this.presentToast('Erro ao buscar taxas de câmbio.');
      },
    });
  }

  convert(): void {
    if (!this.amount || this.amount <= 0) {
      this.result = null;
      return;
    }

    const rate = this.ratesCache[this.toCurrency];
    if (rate === undefined) {
      this.result = null;
      this.currentRate = null;
      return;
    }

    this.currentRate = rate;
    this.result = this.amount * rate;

    this.saveToHistory(rate);
  }

  private saveToHistory(rate: number): void {
    const item: ConversionHistoryItem = {
      id: `${Date.now()}`,
      fromCurrency: this.fromCurrency,
      toCurrency: this.toCurrency,
      amount: this.amount,
      result: this.amount * rate,
      rate,
      date: new Date().toISOString(),
    };
    this.storageService.addHistoryItem(item);
  }

  onCurrencyChange(): void {
    this.fetchRatesAndConvert();
  }

  swapCurrencies(): void {
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;
    this.fetchRatesAndConvert();
  }

  private async presentToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'bottom',
    });
    await toast.present();
  }
}
