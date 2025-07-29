import { inject, Injectable } from '@angular/core';
import { AuthApi } from './base/AuthApi';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthApiAdaptorService } from './adaptor/auth-api-adaptor.service';
import { AuthEndPoints } from './enums/AuthEndPoints';
import { Iauth,IforgotPassword, IresetCode, IresetPass } from './interfaces/auth-interfaces';
import { BASE_URL } from './base-url';

@Injectable({
  providedIn: 'root'
})
export class AuthLibService implements AuthApi{

  _httpClient=inject(HttpClient);
  _authApiAdaptorService=inject(AuthApiAdaptorService);
  _base_URL=inject(BASE_URL);

   login(data: any): Observable<Iauth> {
    return this._httpClient.post(this._base_URL + AuthEndPoints.LOGIN,data)
    .pipe(
      map(res=> this._authApiAdaptorService.adapt(res)),
      catchError(err=> of(err))
      
    )
  }
   register(data: any): Observable<Iauth> {
    return this._httpClient.post(this._base_URL + AuthEndPoints.REGISTER,data)
    .pipe(
      map(res=> this._authApiAdaptorService.adapt(res)),
      catchError(err=> of(err))
      
    )
  }
  forgotPassword(data: any): Observable<(IforgotPassword)> {
    return this._httpClient.post(this._base_URL + AuthEndPoints.FORGOTPASS,data)
    .pipe(
      map(res => res as IforgotPassword),
      catchError(err=> of(err))
      
    )
  }
  verifyResetPassword(data: any): Observable<IresetCode> {
    return this._httpClient.post(this._base_URL + AuthEndPoints.VERIFYCODE,data)
    .pipe(
      map(res => res as IresetCode),
      catchError(err=> of(err))
      
    )
  }
  resetPassword(data: any): Observable<IresetPass> {
    return this._httpClient.put(this._base_URL + AuthEndPoints.RESETPASS,data)
    .pipe(
      map(res => res as IresetPass),
      catchError(err=> of(err))
      
    )
  }
}
