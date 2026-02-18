import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NAV_MENUS } from '../../../shared/constants/nav-menu';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  readonly navMenus = NAV_MENUS;

  readonly helpMenus = [
    { label: 'Kontak Kami', path: '/bantuan/kontak' },
    { label: 'Laporan Pembajakan', path: '/bantuan/laporan' },
    { label: 'Kebijakan', path: '/bantuan/kebijakan' }
  ];
}
