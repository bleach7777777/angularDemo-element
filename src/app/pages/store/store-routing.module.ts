import {NgModule} from '@angular/core';
import {StoreListComponent} from './list/list.component';
import {Routes, RouterModule} from '@angular/router';
const routes: Routes = [
  {
    path: 'list',
    component: StoreListComponent
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {}
