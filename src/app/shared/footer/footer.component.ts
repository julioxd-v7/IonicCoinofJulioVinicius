import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
  readonly author = 'Julio Vinicius';
  readonly matricula = '01810246';
  readonly classe = '3MB';
  readonly materia = 'Dispositivos Móveis';
}
