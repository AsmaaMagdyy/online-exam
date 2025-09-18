import { Component, inject, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthLibService } from 'authLib';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-side-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-side-bar.component.html',
  styleUrl: './nav-side-bar.component.scss'
})


export class NavSideBarComponent implements OnDestroy {
  _router = inject(Router);
  _authLibService = inject(AuthLibService);
  logOutSub!:Subscription;

  logout(): void {
    this.logOutSub = this._authLibService.logOut().subscribe({
      next: (res) => {
        if (res.message == "success") {
          localStorage.removeItem('onlineExamToken');
          this._router.navigate(['/login']);
          console.log('from lib logout')

        }
      }
    })

  }

  ngOnDestroy(): void {
    this.logOutSub?.unsubscribe();
  }

}
