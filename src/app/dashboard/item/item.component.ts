import {Component, OnInit} from '@angular/core';
import {ItemService} from '../../service/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  constructor(
    public itemService: ItemService
  ) {
  }

  public items: any;

  ngOnInit(): void {
    this.itemService.getAll().then(response => {
      console.log(response);
      this.items = response;
    });
  }
}
