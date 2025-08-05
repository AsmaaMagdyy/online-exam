import { Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-small-screen-nav-bar',
  imports: [Menubar,AvatarModule],
  templateUrl: './small-screen-nav-bar.component.html',
  styleUrl: './small-screen-nav-bar.component.scss'
})
export class SmallScreenNavBarComponent {
  items: MenuItem[] | undefined;
  _router = inject(Router);


  ngOnInit() {
    this.items = [

      {
        label: `<img src="images/Final Logo 1.png" class="w-[83px]" alt="logo"> `,
      },
      {
        label: `<a class="flex items-center gap-5 cursor-pointer p-2" routerLinkActive="bg-maincolor text-white rounded-[10px]">
        <i class="fa-solid fa-table-list"></i>
        <span>Dashboard</span>

    </a>`,routerLink:['/dashboard']

      },
      {
        label: ` <a class="flex items-center gap-5 cursor-pointer p-2" routerLinkActive="bg-maincolor text-white rounded-[10px]">
        <i class="fa-solid fa-clock-rotate-left"></i>
        <span>Quiz History</span>

    </a> `,routerLink:['/quizhistory']

      },
      {
        label: ` <a class="flex items-center gap-5 cursor-pointer p-2" (click)="logout()">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Log Out</span>

    </a>`,

      }
    ]
  }

  logout(): void {  
    localStorage.removeItem('onlineExamToken');
    this._router.navigate(['/login']);
  }
}
