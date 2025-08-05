import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Iexam } from './../../interfaces/iexam';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  constructor(private _httpClient:HttpClient) { }
  

  getAllExamsOnSubject(subjectId:string|null):Observable<Iexam[]>{
    return this._httpClient.get(`${environment.baseUrl}/api/v1/exams?subject=${subjectId}`)
    .pipe(map((res:any)=>{
      return res.exams
    }))
  }
}
