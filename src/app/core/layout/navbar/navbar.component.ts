import { Component, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NAV_MENUS } from '../../../shared/constants/nav-menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  readonly menus = NAV_MENUS;
  private readonly SCROLL_THRESHOLD = 50;

  isScrolled = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const currentScroll = window.scrollY;
    this.isScrolled = currentScroll > this.SCROLL_THRESHOLD;
  }
}
