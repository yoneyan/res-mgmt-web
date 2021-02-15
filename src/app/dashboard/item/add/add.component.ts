import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BarcodeFormat} from '@zxing/library';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor() {
  }

  allowedFormats = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.EAN_13,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX
  ];

  public cameras: any[] = [];

  ngOnInit(): void {
  }

  camerasFoundHandler(evt: any[]): void {
    console.log('camerasFoundHandler');
    console.log(evt);
    this.cameras = evt;
  }

  scanSuccessHandler(evt: any): void {
    console.log('scanSuccessHandler');
    console.log(evt);
  }

}
