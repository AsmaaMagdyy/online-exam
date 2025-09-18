import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  logData<T>(data: T): void {
    console.log(data);
  }
}
