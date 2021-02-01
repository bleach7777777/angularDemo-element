import {NgModule} from '@angular/core';
import {HttpService} from '../service/http.service';
@NgModule({
  providers: [
    HttpService
  ],
})
export class SharedServiceModule { }
