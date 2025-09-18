import { createReducer, on } from "@ngrx/store";
import { initialQuestionsState } from "./questions.state";
import { setQuestions, setUserChoices} from "./questions.actions";


export const questionsReducer = createReducer(
    initialQuestionsState,
    on(setQuestions, (state, { questions }) => ({
        ...state,
        questions
    })),
    on(setUserChoices, (state, { userChoices }) => ({
        ...state,
        userChoices
    })));