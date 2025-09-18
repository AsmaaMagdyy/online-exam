import { Component, computed, input, Signal } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  imports: [],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss'
})
export class FormErrorComponent {
  form = input.required<FormGroup>();
  control = input.required<AbstractControl>();
  errorKey = input.required<string>();
  message = input.required<string>();

showError = computed(() => {
  const form = this.form();
  const control = this.control();
  const errorKey = this.errorKey();

  if (!errorKey) return false;

  const controlHasError = control?.hasError(errorKey);
  const formHasError = form?.hasError(errorKey);
  const controlInteracted = control?.dirty || control?.touched;

  return (controlHasError || formHasError) && controlInteracted;
});


}
