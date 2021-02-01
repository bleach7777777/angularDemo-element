import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index.component';
const routers: Routes = [
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routers)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
