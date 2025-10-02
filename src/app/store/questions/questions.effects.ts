import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap} from "rxjs";
import { QuestionsService } from "../../core/services/questions/questions.service";
import { loadQuestions, setQuestions } from "./questions.actions";

@Injectable()
export class QuestionsEffects{
    _questionsService=inject(QuestionsService);
    _action=inject(Actions);
    callApi = createEffect(
        ()=>this._action.pipe(
            ofType(loadQuestions),
            
            // tap((action)=>{
                
            //      this._questionsService.getAllQuestionsOnExam(action.examId).subscribe({
            //     next:(res)=>{
            //         this._store.dispatch(setQuestions({questions:res}));
            //     }
            // })
                
                
            // })
            switchMap((action)=>
            this._questionsService.getAllQuestionsOnExam(action.examId).pipe(
                tap((data)=>{
                    console.log('log From Effect');
                    console.log(data);
                }),
                map((data)=> setQuestions({ questions: data }))
            )
            )
        )
    )
} 