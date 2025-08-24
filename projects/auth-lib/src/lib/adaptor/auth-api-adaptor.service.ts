import { Injectable } from '@angular/core';
import { Adaptor } from '../interfaces/adaptor';
import { IAdapt, Iauth } from '../interfaces/auth-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthApiAdaptorService implements Adaptor{

  adapt(data:Iauth):IAdapt{
    return {
      message:data.message,
      token:data.token,
      email:data.user.email,
    }
  }
}
