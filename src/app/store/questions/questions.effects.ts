import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap} from "rxjs";
import { Store } from "@ngrx/store";
import { QuestionsService } from "../../core/services/questions/questions.service";
import { loadQuestions, setQuestions } from "./questions.actions";


export class questionsEffects{
    _questionsService=inject(QuestionsService);
    _action=inject(Actions);
    _store=inject(Store);
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
                // tap((data)=>{
                //     // console.log('log From Effect');
                //     // console.log(data);
                // }),
                map((data)=> this._store.dispatch(setQuestions({questions:data})))
            )
            )
        ),{
            dispatch:false
        }
    )
} 