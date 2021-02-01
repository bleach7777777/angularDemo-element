/**
 * 可左右滑动的tab组件
 */
import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @Input() tabList: any; // 菜单列表
  currTab = 0; // 当前菜单下标
  @Output() clickTab = new EventEmitter(); // 菜单点击事件

  ngOnInit(): void { }

  constructor() { }

  /**
   * 切换tab
   * @param  {any} item tab对象
   * @param  {number} index tab下标
   * @returns void
   */
  changeTab(item: any, index: number): void {
    this.currTab = index;
    this.clickTab.emit(item);
  }
}
