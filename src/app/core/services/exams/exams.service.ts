import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Iexam, IExamRes } from './../../interfaces/iexam';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  constructor(private _httpClient:HttpClient) { }
  

  getAllExamsOnSubject(subjectId:string):Observable<Iexam[]>{
    return this._httpClient.get<IExamRes>(`${environment.baseUrl}/exams?subject=${subjectId}`)
    .pipe(map((res:IExamRes)=>{
      return res.exams
    }))
  }
}
