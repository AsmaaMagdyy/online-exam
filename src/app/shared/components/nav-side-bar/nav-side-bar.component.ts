import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-side-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-side-bar.component.html',
  styleUrl: './nav-side-bar.component.scss'
})
export class NavSideBarComponent {
  _router = inject(Router);

  logout(): void {
    localStorage.removeItem('onlineExamToken');
    this._router.navigate(['/login']);
  }
}
