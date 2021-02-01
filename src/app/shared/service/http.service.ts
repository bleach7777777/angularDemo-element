import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable()
export class HttpService {
  constructor(
    private http: HttpClient
  ) {}

  /**
   * json-get
   * @returns any
   */
  get(url: string, obj?: any): Observable<any> {
    const options = {
      params: obj
    };
    return this.http.get(url, options);
  }
}
