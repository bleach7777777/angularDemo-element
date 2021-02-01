/**
 * 置底菜单组件
 */
import {Component, Input} from '@angular/core';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  menuList = [
    {code: 'takeOut', name: '外卖', icon: 'iconfont icon-changyonglogo401', url: '/home/index'},
    {code: 'order', name: '订单', icon: 'iconfont icon-order', url: '/order/list'},
    {code: 'mine', name: '我的', icon: 'iconfont icon-account', url: '/mine/index'},
  ]; // 菜单列表
  @Input() active: string; // 当前菜单

  constructor() {}
}
