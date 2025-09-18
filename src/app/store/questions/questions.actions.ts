import { createAction, props } from "@ngrx/store";
import { Iquestions } from "../../core/interfaces/iquestions";
import { IuserChoices } from "../../core/interfaces/iuser-choices";

export const loadQuestions = createAction(
    '[questions] Load Questions',
    props<{ examId: string }>());

export const setQuestions = createAction(
    '[questions] Set Questions',
    props<{ questions: Iquestions[] }>());

export const setUserChoices = createAction(
    '[userChoices] Set User Choices',
    props<{ userChoices: IuserChoices[] }>());
