import { TestBed } from '@angular/core/testing';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthInterceptor } from './auth.interceptor';
describe('AuthInterceptor', () => {
  const interceptor: HttpInterceptor = {
    intercept: (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
      return next.handle(req);
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
