import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabComponent} from './tab/tab.component'; // 菜单组件（首页）
import {StoreComponent} from './store/store.component'; // 商家组件（首页）
import {MenuComponent} from './menu/menu.component'; // 置底菜单栏（首页）
import {SwiperComponent} from './swiper/swiper.component'; // 轮播图组件（首页2）
import {LoadingComponent} from './loading/loading.component'; // 加载中组件（首页）
import {BulletComponent} from './bullet/bullet.component'; // 弹框组件（首页4）
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TabComponent,
    StoreComponent,
    MenuComponent,
    SwiperComponent,
    LoadingComponent,
    BulletComponent,
  ],
  exports: [
    TabComponent,
    StoreComponent,
    MenuComponent,
    SwiperComponent,
    LoadingComponent,
    BulletComponent,
  ],
})
export class SharedComponentModule {}
