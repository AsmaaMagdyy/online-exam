import { IAdapt, Iauth } from "./auth-interfaces";

export interface Adaptor {
    adapt(data:Iauth):IAdapt
}
