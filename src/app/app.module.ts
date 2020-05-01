import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ShowsListComponent } from './components/shows-list/shows-list.component';
import { ShowCardComponent } from './components/show-card/show-card.component';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { ShowDetailComponent } from './pages/show-detail/show-detail.component';
import { LabelComponent } from './components/label/label.component'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavBarComponent,
    ShowsListComponent,
    ShowCardComponent,
    PageNotFoundComponent,
    ShowDetailComponent,
    LabelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
