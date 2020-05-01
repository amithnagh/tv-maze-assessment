import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log(`Loader Interceptor - ${req.url}`);
        // let jsonReq: HttpRequest<any> = req.clone({
        //     setHeaders: { 'Access-Control-Allow-Origin': '*' }
        // });

        return next.handle(req);
        // .pipe(
        //     tap(event => {
        //         if (event.type === HttpEventType.Response) {
        //             console.log(event.status);
        //         }
        //     })
        // );
    }
}