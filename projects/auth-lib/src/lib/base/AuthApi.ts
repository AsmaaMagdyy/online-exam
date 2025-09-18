import { Observable } from "rxjs";
import { IAdapt, Iauth, IforgotPassword, IForgotPasswordData, IlogOut, IresetCode, IresetPass, IresetPasswordData, ISignInData, ISignUpData, IVerifyResetPasswordData } from "../interfaces/auth-interfaces";

export abstract class AuthApi{
    abstract login(data:ISignInData):Observable<IAdapt>
    abstract register(data:ISignUpData):Observable<IAdapt>
    abstract forgotPassword(data:IForgotPasswordData):Observable<IforgotPassword>
    abstract verifyResetPassword(data:IVerifyResetPasswordData):Observable<IresetCode>
    abstract resetPassword(data:IresetPasswordData):Observable<IresetPass>
    abstract logOut():Observable<IlogOut>
}