import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BlueButtonComponent } from "../../../shared/components/blue-button/blue-button.component";
import { AuthLibService } from 'authLib';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { LoggingService } from '../../services/logging.service';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputErrorComponent } from "../../../shared/components/input-error/input-error.component";

@Component({
  selector: 'app-login',
  imports: [InputIcon, IconField, ReactiveFormsModule, InputTextModule, FormsModule, RouterLink, BlueButtonComponent, InputErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {



  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _authLibService = inject(AuthLibService);
  private readonly _loggingService = inject(LoggingService);
  private readonly toastr = inject(ToastrService);
  loginSub!: Subscription;
  typePass: boolean = false;

  loginForm: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
  })
  submit(): void {
    if (this.loginForm.valid) {
      this._loggingService.logData("valid");
      this.loginSub = this._authLibService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this._loggingService.logData(res);
          if (res.message == 'success') {
            localStorage.setItem('onlineExamToken', res.token);
            this.toastr.success('Success  and navigate to home in 2 seconds ');
            setTimeout(() => {
              this._router.navigate(['/dashboard']);
            }, 2000);
          }
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  showPassword():void{
    this.typePass = !this.typePass;
  }
  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }

}
