import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private snackBar: MatSnackBar,
  ) {
  }

  public toString(data: string | null): string {
    if (data === null) {
      return 'null';
    } else {
      return data;
    }
  }

  public random(len: number): string {
    const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const cl = c.length;
    let result = '';
    for (let i = 0; i < len; i++) {
      result += c[Math.floor(Math.random() * cl)];
    }
    return result;
  }

  public openBar(message: string, time: number): void {
    this.snackBar.open(message, 'done', {
      duration: time,
    });
  }
}
