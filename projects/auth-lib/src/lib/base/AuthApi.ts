import { Observable } from "rxjs";

export abstract class AuthApi{
    abstract login(data:any):Observable<any>
    abstract register(data:any):Observable<any>
    abstract forgotPassword(data:any):Observable<any>
    abstract verifyResetPassword(data:any):Observable<any>
    abstract resetPassword(data:any):Observable<any>
}