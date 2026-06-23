import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonCard,
  IonCardContent,
  ToastController,
} from '@ionic/angular/standalone';

import { StorageService, AppSettings } from '../../services/storage.service';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonCard,
    IonCardContent,
    FooterComponent,
  ],
})
export class SettingsPage implements OnInit {
  settings: AppSettings = {
    updateFrequency: 'manual',
    notifyOnBigChange: false,
  };

  constructor(
    private storageService: StorageService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.settings = this.storageService.getSettings();
  }

  onSettingsChange(): void {
    this.storageService.saveSettings(this.settings);
    this.presentToast('Configurações salvas.');
  }

  private async presentToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
}
