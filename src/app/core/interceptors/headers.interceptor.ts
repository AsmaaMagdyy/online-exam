import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem('onlineExamToken') !== null) {
    const isAuthUrl = req.url.includes('auth');
    const isLogoutUrl = req.url.includes('auth/logout');
    if (!isAuthUrl || isLogoutUrl) {
      req = req.clone({
        setHeaders: { token: localStorage.getItem('onlineExamToken')! }
      });
    }

  }
  return next(req);
};
