import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestMethod, Response } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { CacheService } from './cache.service';
import { UiService } from './ui-service.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiSistema = environment.apiSistema;

  constructor(
      // tslint:disable-next-line: deprecation
      private http: Http,
    private router: Router,
    private uiService: UiService,
    private cacheService: CacheService) { }

  get(url: string) {
    // tslint:disable-next-line: deprecation
    return this.request(url, RequestMethod.Get);
  }

  getItem(url: string, id: any) {
    return this.request(url + '/' + id, RequestMethod.Get);
  }

  post(url: string, body: Object) {
    return this.request(url, RequestMethod.Post, body);
  }

  put(url: string, body: Object) {
    return this.request(url, RequestMethod.Put, body);
  }

  delete(url: string) {
    return this.request(url, RequestMethod.Delete);
  }

  request(url: string, method: RequestMethod, body?: Object) {

    const headers = new Headers();
    const jwt = this.cacheService.getItem('token');

    if (jwt != null) {
      const authRequest = `Bearer ${jwt['accessToken']}`;
      headers.append('Authorization', authRequest);
    }

    const requestOptions = new RequestOptions({
      url: `${this.apiSistema}/${url}`,
      method: method,
      headers: headers
    });

    if (body) {
      requestOptions.body = body;
    }

    const request = new Request(requestOptions);

    return this.http.request(request)
      .pipe(
        map((res: Response) => res.json()))
      .pipe(catchError((res: Response) => this.erroHandler(res)));
  }

  erroHandler(res: Response) {
    const statusCode = res.status;
    const body = res.json();

    const error = {
      statusCode: statusCode,
      error: body.error
    };

    console.log('ERRO', error);

    if (error.statusCode === 401) {
      console.log('401', 'redirect');
      this.cacheService.clear();
      this.router.navigate(['/login'], {
        queryParams: { redirectUrl: this.router.routerState.snapshot.url },
      });
    }
    if (error.statusCode >= 500 || error.statusCode === 0) {
      console.log('500', 'server error');
      this.uiService.exibirErro500();
    }

    return throwError(error);
  }

}
