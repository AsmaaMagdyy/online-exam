import { Component } from '@angular/core';
import { NavSideBarComponent } from "../../../shared/components/nav-side-bar/nav-side-bar.component";
import { SearchInputComponent } from "../../../shared/components/search-input/search-input.component";
import { RouterOutlet } from '@angular/router';
import { SmallScreenNavBarComponent } from "../../../shared/components/small-screen-nav-bar/small-screen-nav-bar.component";


@Component({
  selector: 'app-main-layout',
  imports: [NavSideBarComponent, SearchInputComponent, RouterOutlet, SmallScreenNavBarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
