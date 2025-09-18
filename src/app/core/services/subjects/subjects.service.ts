import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ISingleSubjectRes, Isubject, ISubjectRes } from '../../interfaces/isubjects';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  _httpClient = inject(HttpClient);



  getAllSubjects(limit?:number): Observable<Isubject[]> {
    return this._httpClient.get<ISubjectRes>(`${environment.baseUrl}/subjects?limit=${limit}`)
        .pipe(map((res:ISubjectRes)=>{
          return res.subjects;
        }))
  }
  getSingleSubject(subjectId:string): Observable<Isubject> {
    return this._httpClient.get<ISingleSubjectRes>(`${environment.baseUrl}/subjects/${subjectId}`)
        .pipe(map((res:ISingleSubjectRes)=>{
          return res.category;
        }))
  }
}
