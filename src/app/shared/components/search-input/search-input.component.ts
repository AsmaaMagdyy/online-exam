import { Component} from '@angular/core';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { BlueButtonComponent } from "../blue-button/blue-button.component";


@Component({
  selector: 'app-search-input',
  imports: [InputIcon, IconField, InputTextModule, FormsModule,BlueButtonComponent],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  
}
