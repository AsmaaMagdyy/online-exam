import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Iquestions, IQuestionsDataRes } from '../../interfaces/iquestions';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private _httpClient:HttpClient) { }

  getAllQuestionsOnExam(examid:string):Observable<Iquestions[]>{
    return this._httpClient.get<IQuestionsDataRes>(`${environment.baseUrl}/questions?exam=${examid}`)
    .pipe(map((res:IQuestionsDataRes)=>{
      return res.questions;
    }));
  }
}
