import {NgModule} from '@angular/core';
import {OtherRoutingModule} from './other-routing.module';
import {SearchComponent} from './search/search.component';
import {AdComponent} from './ad/ad.component';
@NgModule({
  imports: [
    OtherRoutingModule
  ],
  declarations: [
    SearchComponent,
    AdComponent,
  ]
})
export class OtherModule { }
