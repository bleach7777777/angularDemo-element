import {NgModule} from '@angular/core';
import {StoreListComponent} from './list/list.component';
import {StoreRoutingModule} from './store-routing.module';
@NgModule({
  declarations: [
    StoreListComponent,
  ],
  imports: [
    StoreRoutingModule
  ]
})
export class StoreModule {}
