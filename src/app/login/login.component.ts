import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {CommonService} from '../service/common.service';
import {AuthService} from '../service/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {interval, Subscription} from 'rxjs';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private http: HttpClient,
  ) {
  }

  public hide = true;
  public email = new FormControl('');
  public password = new FormControl();
  private updateSubscription: Subscription | undefined;


  ngOnInit(): void {
    this.getTmpToken();
    // ユーザの20分ごとに一時Tokenを更新
    this.updateSubscription = interval(1200000).subscribe(
      (val) => {
        this.getTmpToken();
      });
  }

  public getTmpToken(): void {
    sessionStorage.clear();
    sessionStorage.setItem('ClientID', this.commonService.random(30));
    this.http.get(environment.api.url + environment.api.path + '/token/init', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        USER_TOKEN: this.commonService.toString(sessionStorage.getItem('ClientID'))
      }),
    }).toPromise().then(r => {
      const response: any = r;
      console.log('response: ' + JSON.stringify(response));
      sessionStorage.setItem('TmpKey', response.token);
    }).catch(r => {
      console.log(r);
      this.commonService.openBar('一時Tokenの取得に失敗しました。\nページをリロードしてください。', 10000);
    });
  }

  getErrorMessage(): any {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  loginMail(): void {
    this.authService.loginWithMail(this.email.value, this.password.value);
  }
}
