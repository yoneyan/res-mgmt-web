import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from './error/error.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {AuthGuard} from './guard/auth.guard';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: '', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
  {path: 'error', component: ErrorComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
