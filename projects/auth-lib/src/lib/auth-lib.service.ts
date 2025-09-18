import { inject, Injectable } from '@angular/core';
import { AuthApi } from './base/AuthApi';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthApiAdaptorService } from './adaptor/auth-api-adaptor.service';
import { AuthEndPoints } from './enums/AuthEndPoints';
import { IAdapt, Iauth,IforgotPassword, IForgotPasswordData, IlogOut, IresetCode, IresetPass, IresetPasswordData, ISignInData, ISignUpData, IVerifyResetPasswordData } from './interfaces/auth-interfaces';
import { BASE_URL } from './base-url';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthLibService implements AuthApi{

  _httpClient=inject(HttpClient);
  _authApiAdaptorService=inject(AuthApiAdaptorService);
  _base_URL=inject(BASE_URL);
  _router = inject(Router);

   login(data: ISignInData): Observable<IAdapt> {
    return this._httpClient.post<Iauth>(this._base_URL + AuthEndPoints.LOGIN,data)
    .pipe(
      map((res:Iauth)=> this._authApiAdaptorService.adapt(res)),
      catchError(err=> of(err))
      
    )
  }
   register(data: ISignUpData): Observable<IAdapt> {
    return this._httpClient.post<Iauth>(this._base_URL + AuthEndPoints.REGISTER,data)
    .pipe(
      map((res:Iauth)=> this._authApiAdaptorService.adapt(res)),
      catchError(err=> of(err))
      
    )
  }
  forgotPassword(data: IForgotPasswordData): Observable<IforgotPassword> {
    return this._httpClient.post(this._base_URL + AuthEndPoints.FORGOTPASS,data)
    .pipe(
      map(res => res as IforgotPassword),
      catchError(err=> of(err))
      
    )
  }
  verifyResetPassword(data: IVerifyResetPasswordData): Observable<IresetCode> {
    return this._httpClient.post(this._base_URL + AuthEndPoints.VERIFYCODE,data)
    .pipe(
      map(res => res as IresetCode),
      catchError(err=> of(err))
      
    )
  }
  resetPassword(data: IresetPasswordData): Observable<IresetPass> {
    return this._httpClient.put(this._base_URL + AuthEndPoints.RESETPASS,data)
    .pipe(
      map(res => res as IresetPass),
      catchError(err=> of(err))
      
    )
  }
   logOut(): Observable<IlogOut> {
    return this._httpClient.get<IlogOut>(this._base_URL + AuthEndPoints.LOGOUT);
    
  }
}
