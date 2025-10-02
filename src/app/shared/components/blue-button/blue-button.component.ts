import { Component, EventEmitter, input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-blue-button',
  imports: [ButtonModule],
  templateUrl: './blue-button.component.html',
  styleUrl: './blue-button.component.scss'
})
export class BlueButtonComponent {

  label =input.required<string>();
  marginTop =input<string>();
  paddingBlock =input<string>();
  paddingInline =input<string>();
  form =input<boolean>(false);
 @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }

}
