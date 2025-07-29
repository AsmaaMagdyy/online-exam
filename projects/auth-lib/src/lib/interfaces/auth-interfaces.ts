export interface Iauth {
  message: string;
  token: string;
  email: string;
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