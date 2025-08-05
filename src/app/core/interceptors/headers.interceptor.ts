import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if(localStorage.getItem('userToken') !== null){

  if (!req.url.includes('auth'))  {
    req = req.clone({
      setHeaders: { token : localStorage.getItem('onlineExamToken') !}
    })
  }
 
}
  return next(req);
};
