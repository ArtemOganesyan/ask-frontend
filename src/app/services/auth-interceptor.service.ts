import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {LocalStorageService} from './local-storage.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(public localStorageService: LocalStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.localStorageService.getToken()}`
      }
    });

    return next
      .handle(req)
      .do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.headers.get('refresh-token')) {
          this.localStorageService.setToken(event.headers.get('refresh-token'));
        }
      });
  }

}
