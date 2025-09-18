import { createFeatureSelector, createSelector } from "@ngrx/store"
import { questionState } from "./questions.state"

export const selectQuestionsState =createFeatureSelector<questionState>('questions');

export const selectAllQuestions = createSelector(
    selectQuestionsState,
    (state)=>state.questions
); 

export const selectAllUserChoices = createSelector(
    selectQuestionsState,
    (state)=>state.userChoices
);