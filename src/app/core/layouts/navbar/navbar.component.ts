import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
    selector: 'app-navbar',
    imports: [Menubar],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [

            {
                label: '<span class = "text-black">English</span>',

                items: [
                    {
                        label: 'Arabic',

                    }
                ]
            },
            {
                label: '<b>Sign in</b>', routerLink: ['./login']

            },
            {
                label: '<span class ="border rounded-[15px] inline-block py-2 px-3 border-grayborder shadow-[0_10px_30px_0_#4461F20D] " >Register</span>', routerLink: ['./register']

            }
        ]
    }

}
