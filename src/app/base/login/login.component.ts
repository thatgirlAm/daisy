import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { Login } from '../login';
import { FormsModule } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isloaded : boolean = true ; 
  loginObj: Login = new Login();
  url : string  = 'http://127.0.0.1:8000/api/';

  constructor(private router: Router, private toastr : ToastrService, private api : ApiService)
  {}

  onLogin() {
    this.isloaded = false;
    this.api.PostData(this.url+'auth/login', this.loginObj).subscribe({
      next: (res: any) => {
        console.log(res); 
        if (res && res.data) {
          if (res.status == 200)
          {
            localStorage.setItem('userToken', res.data.token);
            this.router.navigate(['']); 
          }
          else{
            this.toastr.error('Veuillez vérifier vos identifiants et réessayer.');
          }
        } else {
          this.toastr.error('Veuillez vérifier vos identifiants et réessayer.');
        }
        this.isloaded = true;
      },
      error: (err: any) => {
        console.error(err);
        this.toastr.error('Login failed');
        this.isloaded = true;
      },

      complete : () => {
      }
    });
  }


  }

