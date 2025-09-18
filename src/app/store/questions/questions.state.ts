import { Iquestions } from "../../core/interfaces/iquestions";
import { IuserChoices } from "../../core/interfaces/iuser-choices";

export interface questionState{
    questions : Iquestions[];
    userChoices:IuserChoices[]
}
export const initialQuestionsState:questionState={
    questions:[]as Iquestions [],
    userChoices:[] as IuserChoices []
}