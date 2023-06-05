import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {zip} from 'rxjs/observable/zip';
import {of} from 'rxjs/observable/of';
import {interval} from 'rxjs/observable/interval';
import {HTTP_DELAY} from '../app.config';

export class HttpHelper {

  static getErrorMessage(err: HttpErrorResponse): string {
    if (err.status === 0) {
      return 'Service unavailable';
    }

    if ((err as any).stack) {
      return (err as any).stack;
    }

    if (err.error && err.error.message) {
      return err.error.message;
    }

    if (err.message) {
      return err.message;
    }

    return err.statusText;
  }

  static slowDown<T>(observable$: Observable<T>): Observable<T> {
    return zip(
      observable$.catch(err => of({$$error$$: err})),
      interval(HTTP_DELAY)
    )
      .map((item: [any, number]) => {
        if (item[0].$$error$$) {
          throw new HttpErrorResponse(item[0].$$error$$);
        } else {
          return item[0];
        }
      });
  }
}
