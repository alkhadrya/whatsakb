import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AddDiscComponent } from './add-disc/add-disc.component';



import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,AddDiscComponent, HomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,FormsModule,AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
