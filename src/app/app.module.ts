import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardModule } from 'src/app/dashboard/dashboard.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ApiInterceptorService } from 'src/app/services/interceptors/api-interceptor.service';
import { ErrorHandlerInterceptor } from 'src/app/services/interceptors/errorhandler.interceptor';
import { ApiCommonService } from 'src/app/services/api-common.service';
import { OAuthComponentGuard } from 'src/app/services/oauth.component.guard';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.doubleBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      backdropBorderRadius: '4px',
      primaryColour: '#d35400',
      secondaryColour: '#d35400',
      tertiaryColour: '#d35400'
    }),
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    NgSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    ApiCommonService,
    OAuthComponentGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
