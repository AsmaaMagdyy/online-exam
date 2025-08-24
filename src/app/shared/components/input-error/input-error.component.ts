import { Component, computed, input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  imports: [],
  templateUrl: './input-error.component.html',
  styleUrl: './input-error.component.scss'
})
export class InputErrorComponent {
  control = input.required<AbstractControl | null>();
  fieldName = input.required<string>();
  message = input<string>();
 
  
}
