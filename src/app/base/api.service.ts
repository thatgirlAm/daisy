import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; 
import { Inject } from '@angular/core';
import { lastValueFrom, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url : string  = 'http://127.0.0.1:8000/api/';
  data!: string | null;


  constructor(private router: Router, private http: HttpClient, @Inject(ToastrService) private toastr: ToastrService) { 
  }

   public getFunction(url_:string)
   {
    this.http.get<any[]>(this.url+ url_).subscribe({
      next: (res:any)=>{
        return res;
      }
    });
   }

   getData(url_: string) {
      return this.http.get<any>(url_);
  }


  getStatus(url_: string) {
    this.http.get<any>(this.url+url_).subscribe({
      next : (res:any) =>{
        return res.status
      } ,
      error : (err) => 
        {
          return this.toastr.error(err);
        }
    })
    } 
  

  PostStatus(url_: string, data: any) {
      this.http.post<any>(this.url+url_, data).subscribe({
        next : (res:any) =>{
          return res.status
        } ,
        error : (err) => 
          {
            return this.toastr.error(err);
          }
      })
    }
  

  logout() {
    return this.http.post(`${this.url}/logout`, {}).subscribe({
      next: () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout error', error);
      }
    });
  }

  // public PostData(url_: string, input: any) {
  //   this.http.post<any>(this.url+url_, input).subscribe({
  //     next : (res:any) =>{
  //       return res.data
  //     } ,
  //     error : (err) => 
  //       {
  //         return this.toastr.error(err);
  //       }
  //   })
  //   } 
  
  PostData(url: string, data: any): Observable<any> {
    return this.http.post<any>(url, data);
  }
}


