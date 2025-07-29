import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { BlueButtonComponent } from "../../../shared/components/blue-button/blue-button.component";
import { AuthLibService } from 'authLib';
import { ToastrService } from 'ngx-toastr';
import { SocialMediaComponent } from "../../../shared/components/social-media/social-media.component";
import { Subscription } from 'rxjs';
import { LoggingService } from '../../services/logging.service';
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, RouterLink, BlueButtonComponent, SocialMediaComponent, IconField, InputIcon],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _authLibService = inject(AuthLibService);
  private readonly _loggingService = inject(LoggingService);
  private readonly toastr = inject(ToastrService);

  registerSub!: Subscription;
  typePass: boolean = false;


  registerForm: FormGroup = this._formBuilder.group({
    username: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    firstName: [null, [Validators.required, Validators.pattern(/[a-zA-Z]+$/)]],
    lastName: [null, [Validators.required, Validators.pattern(/[a-zA-Z]+$/)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    rePassword: [null],
    phone: [null, [Validators.required, Validators.pattern(/^(01)[0125][0-9]{8}$/)]],
  }, { validators: this.confirmPassword })

  submit(): void {
    if (this.registerForm.valid) {
      this.registerSub = this._authLibService.register(this.registerForm.value).subscribe({
        next: (res) => {
          this._loggingService.logData(res);
          if (res.message == 'success') {

            this.toastr.success('Success and navigate to login in 2 seconds ');
            setTimeout(() => {
              this._router.navigate(['/login']);
            }, 2000);
          }
        }
      })
    } else {
      this.registerForm.setErrors({ mismatch: true });
      this.registerForm.markAllAsTouched();
    }
  }
  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return true;
    } else {
      return { mismatch: true }
    }
  }

  showPassword():void {
    this.typePass = !this.typePass;
  }
  ngOnDestroy(): void {
    this.registerSub?.unsubscribe();
  }
}
