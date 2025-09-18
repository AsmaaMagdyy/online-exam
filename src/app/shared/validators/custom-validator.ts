import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password')?.value;
  const rePassword = group.get('rePassword')?.value;

  return password === rePassword ? null : { mismatch: true };
};

