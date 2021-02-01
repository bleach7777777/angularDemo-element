import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeService} from './service/home.service';
import {HomeRoutingModule} from './home-routing.module';
import {SharedComponentModule} from '../../shared/components/shared-component.module';
import {IndexComponent} from './index.component';
@NgModule({
  providers: [
    HomeService,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedComponentModule,
  ],
  declarations: [
    IndexComponent,
  ]
})
export class HomeModule { }
