import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Isubject } from '../../interfaces/isubjects';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  _httpClient = inject(HttpClient);



  getAllSubjects(limit?:number): Observable<Isubject[]> {
    return this._httpClient.get(`${environment.baseUrl}/api/v1/subjects?limit=${limit}`)
        .pipe(map((res:any)=>{
          return res.subjects;
        }))
  }
  getSingleSubject(subjectId:string|null): Observable<Isubject> {
    return this._httpClient.get(`${environment.baseUrl}/api/v1/subjects/${subjectId}`)
        .pipe(map((res:any)=>{
          return res.category;
        }))
  }
}
