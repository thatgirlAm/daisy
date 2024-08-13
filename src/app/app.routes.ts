import { Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { EcartsComponent } from './base/ecarts/ecarts.component';
import { TransactionsComponent } from './base/transactions/transactions.component';
import { CompteComponent } from './base/compte/compte.component';
import { LoginComponent } from './base/login/login.component';
import { AuthGuard } from './base/auth.guard';
import { AntiAuthGuard } from './base/anti-auth.guard';
import { AppComponent } from './app.component';
import { HomeComponent } from './base/home/home.component';


export const routes: Routes = [
    { path: '', component: AppComponent, children: 
        [ {path: '', component: BaseComponent, children: 
            [
                { path: 'home', component: HomeComponent},
                { path: 'ecarts', component: EcartsComponent},
                { path: 'transactions', component: TransactionsComponent},
                { path: 'compte', component: CompteComponent},
                 ]
            }
        ]
    , canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent, canActivate:[AntiAuthGuard]},
 
];
