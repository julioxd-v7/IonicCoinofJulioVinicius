import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonButton,
  IonIcon,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, trashBinOutline, arrowForwardOutline, timeOutline } from 'ionicons/icons';

import { StorageService } from '../../services/storage.service';
import { ConversionHistoryItem } from '../../models/conversion-history.model';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-history',
  standalone: true,
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    IonButton,
    IonIcon,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    FooterComponent,
  ],
})
export class HistoryPage implements OnInit {
  history: ConversionHistoryItem[] = [];

  constructor(
    private storageService: StorageService,
    private alertController: AlertController
  ) {
    addIcons({ trashOutline, trashBinOutline, arrowForwardOutline, timeOutline });
  }

  ngOnInit(): void {
    this.loadHistory();
  }

  ionViewWillEnter(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.history = this.storageService.getHistory();
  }

  removeItem(id: string): void {
    this.storageService.removeHistoryItem(id);
    this.loadHistory();
  }

  async confirmClearAll(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Limpar histórico',
      message: 'Tem certeza que deseja apagar todo o histórico de conversões?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Limpar',
          role: 'destructive',
          handler: () => {
            this.storageService.clearHistory();
            this.loadHistory();
          },
        },
      ],
    });
    await alert.present();
  }
}
