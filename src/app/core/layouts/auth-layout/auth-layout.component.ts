import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from "../navbar/navbar.component";
import {AuthSideBarComponent } from "../../../shared/components/auth-side-bar/auth-side-bar.component";

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, AuthSideBarComponent, NavbarComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
