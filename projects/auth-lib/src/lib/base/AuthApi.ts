import { Observable } from "rxjs";
import { Iauth, IforgotPassword, IresetCode, IresetPass } from "../interfaces/auth-interfaces";

export abstract class AuthApi{
    abstract login(data:any):Observable<Iauth>
    abstract register(data:any):Observable<Iauth>
    abstract forgotPassword(data:any):Observable<IforgotPassword>
    abstract verifyResetPassword(data:any):Observable<IresetCode>
    abstract resetPassword(data:any):Observable<IresetPass>
}