import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  logData(data:any):void{
    console.log(data);
    
  }
}
