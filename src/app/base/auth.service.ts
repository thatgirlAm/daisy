import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from '../base/login';
import { Signup } from '../base/signup';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  toastr= inject(ToastrService);
  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  register(registerForm : Signup){
    return this.http.post<any>(`${this.apiUrl}/register`, registerForm).pipe(
      tap(res => {
        console.log(res);
        if(res.status){
          this.toastr.success('Compte créé ! Vous pouvez désormais vous connecter.')
          this.router.navigate(['login']);
        }
        else{
          this.toastr.error(res.message); 
        }
      })
    );
  }
  login(loginData: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      tap(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          
        }

      })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        this.router.navigate(['/login']);
      })
    );
  }

  checkmdp(number : number, mdp:string )
  {
    return this.http.post<any>(`${this.apiUrl}/confirmPassword`, {number, mdp}) ; 
  }

  changePassword(newPassword : string){
    return this.http.post<any>(`${this.apiUrl}/changePassword`, {newPassword});
  }

  //--isPlatformBrowser -> verifier qu'on est bien dans le browser pour eviter l'erreur server-side 'localstorage is not defined'--//
  checkLogin(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('userToken');
      return !!token;
    }
    return false;
  }
}
