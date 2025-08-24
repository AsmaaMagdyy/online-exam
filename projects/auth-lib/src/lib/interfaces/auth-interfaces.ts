export interface Iauth {
  message: string;
  token: string;
  user: User;
}
export interface IAdapt {
  message: string;
  token: string;
  email: string;
}

export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  passwordResetCode: string;
  passwordResetExpires: string;
  resetCodeVerified: boolean;
}
export interface IforgotPassword {
  message: string;
  info: string;
}
export interface IresetCode {
  status: string;
}
export interface IresetPass {
  message: string;
  token: string;
}

export interface ISignUpData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}
export interface ISignInData {
  email: string;
  password: string;
}
export interface IForgotPasswordData {
  email: string;
}
export interface IVerifyResetPasswordData {
  resetCode: string;
}
export interface IresetPasswordData {
  email: string;
  newPassword: string;
}
export interface IlogOut {
  message: string;
}