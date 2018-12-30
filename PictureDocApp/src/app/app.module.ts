import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPictureComponent } from './addpicture/addpicture.component'
import { PicturesListComponent } from './pictureslist/pictureslist.component'
import { CommonService } from './common/common.service'

@NgModule({
  declarations: [
    AppComponent,
    PicturesListComponent,
    AddPictureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
