import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { BlueButtonComponent } from "../../../shared/components/blue-button/blue-button.component";
import { AuthLibService } from 'authLib';
import { ToastrService } from 'ngx-toastr';
import { SocialMediaComponent } from "../../../shared/components/social-media/social-media.component";
import { LoggingService } from '../../../core/services/logging.service';
import { Subscription } from 'rxjs';
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, FormsModule, InputTextModule, RouterLink, BlueButtonComponent, SocialMediaComponent, IconField, InputIcon],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnDestroy {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _authLibService = inject(AuthLibService);
  private readonly toastr = inject(ToastrService);
  private readonly _loggingService = inject(LoggingService);

  step: number = 1;
  typePass: boolean = false;

  forgotPasswordSub!: Subscription;
  verifyResetPasswordSub!: Subscription;
  resetPasswordSub!: Subscription;

  emailForm: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  })
  verifyForm: FormGroup = this._formBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^\w{5,6}$/)]],
  })
  resetPasswordForm: FormGroup = this._formBuilder.group({
    newPassword: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    rePassword: [null]
  }, { validators: this.confirmPassword })

  callForgotPasswordApi(): void {
    this.forgotPasswordSub = this._authLibService.forgotPassword(this.emailForm.value).subscribe({
      next: (res) => {
        if (res.message == 'success') {
          this.toastr.success('OTP sent to your email');
          setTimeout(() => {
            this.step = 2;
          }, 2000);
        }
      }
    })
  }

  submitEmailForm(): void {
    if (this.emailForm.valid) {
      this.callForgotPasswordApi();
    } else {
      this.emailForm.markAllAsTouched();

    }
  }
  submitVerifyForm(): void {
    if (this.verifyForm.valid) {

      this.verifyResetPasswordSub = this._authLibService.verifyResetPassword(this.verifyForm.value).subscribe({
        next: (res) => {
          if (res.status == 'Success') {
            this.toastr.success(res.status);
            setTimeout(() => {
              this.step = 3;
            }, 2000);
          }
        }
      })
    } else {
      this.emailForm.markAllAsTouched();
    }
  }
  resendCodeAgain(): void {
    this.callForgotPasswordApi();
  }
  submitResetPassForm(): void {
    let emailValue = this.emailForm.get('email')?.value;
    if (this.resetPasswordForm.valid) {
      let resetPassObj = {
        email: emailValue,
        newPassword: this.resetPasswordForm.get('newPassword')?.value
      }
      this._loggingService.logData(emailValue);
      this._loggingService.logData(resetPassObj);
      this.resetPasswordSub = this._authLibService.resetPassword(resetPassObj).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            localStorage.setItem('onlineExamToken', res.token);
            this.toastr.success('Success and navigate to home in 2 seconds ');
            setTimeout(() => {
              this._router.navigate(['/home']);
            }, 2000);

          }
        }
      })
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }
  confirmPassword(g: AbstractControl) {
    if (g.get('newPassword')?.value === g.get('rePassword')?.value) {
      return true;
    } else {
      return { mismatch: true }
    }
  }
  showPassword(): void {
    this.typePass = !this.typePass;
  }
  ngOnDestroy(): void {
    this.forgotPasswordSub?.unsubscribe()
    this.verifyResetPasswordSub?.unsubscribe()
    this.resetPasswordSub?.unsubscribe()
  }

}
