import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchComponent} from './search/search.component';
import {AdComponent} from './ad/ad.component';
const routes: Routes = [
  // 搜索页面
  {
    path: 'search',
    component: SearchComponent
  },
  // 广告轮播图页面
  {
    path: 'ad',
    component: AdComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherRoutingModule { }
