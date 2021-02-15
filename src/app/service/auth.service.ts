import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CommonService} from './common.service';
import {environment} from '../../environments/environment';
import * as shaJS from 'sha.js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient;

  constructor(
    public router: Router,
    private commonService: CommonService,
    http: HttpClient
  ) {
    this.http = http;
  }


  loginWithMail(name: string, pass: string): void {
    const hash: string = shaJS('sha256').update(pass + sessionStorage.getItem('TmpKey')).digest('hex');
    console.log('pass: ' + pass);
    console.log('tmpKey: ' + sessionStorage.getItem('TmpKey'));
    console.log('hash: ' + hash);
    this.http.get(environment.api.url + environment.api.path + '/token', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        USER_TOKEN: this.commonService.toString(sessionStorage.getItem('ClientID')),
        HASH_PASS: hash,
        Name: name
      }),
    }).toPromise().then(r => {
      const response: any = r;
      sessionStorage.setItem('AccessToken', response.token[0].access_token);
      this.router.navigate(['/dashboard']).then();
    }).catch(error => {
      console.log('error: ' + JSON.stringify(error.error));
      this.commonService.openBar(JSON.stringify(error.error.error), 5000);
    });
  }

  logOut(): void {
    // ts
    this.http.delete(environment.api.url + environment.api.path + '/token', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        USER_TOKEN: this.commonService.toString(sessionStorage.getItem('ClientID')),
        ACCESS_TOKEN: this.commonService.toString(sessionStorage.getItem('AccessToken')),
      }),
    }).toPromise().then(r => {
      const response: any = r;
      console.log('response: ' + JSON.stringify(response));
      sessionStorage.clear();
      this.router.navigate(['/']).then();
    }).catch(error => console.log(error));
  }
}
