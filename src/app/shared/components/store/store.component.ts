/**
 * 商家列表项组件
 */
import {Component, Input, OnInit} from '@angular/core';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit{

  @Input() store: any; // 商家对象
  otherList: string[]; // 活动、红包、服务拼接列表

  ngOnInit(): void {
    this.otherList =  this.store.activity.concat(this.store.redPaper, this.store.service);
  }

  constructor() {}
}
