import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorCodeService {
  url: string = 'http://127.0.0.1:8000/api/error_code';

  constructor(private http: HttpClient) { }
  getErrorCodes(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}