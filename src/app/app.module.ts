import { AuthenticationService } from './Services/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule, NgxUiLoaderConfig } from  'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderComponent } from './slider/slider.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { AgmCoreModule } from '@agm/core';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ShopComponent } from './shop/shop.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { GasStaionComponent } from './gas-staion/gas-staion.component';
import { ManageServiceComponent } from './manage-service/manage-service.component';
import { WorkShopViewComponent } from './work-shop-view/work-shop-view.component';
import { SparePartViewComponent } from './spare-part-view/spare-part-view.component';
import { WinchViewComponent } from './winch-view/winch-view.component';
import { MycarsComponent } from './mycars/mycars.component';
import { WinchCompanyViewComponent } from './winch-company-view/winch-company-view.component';
import { OffersComponent } from './offers/offers.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

// 2. Add your credentials from step 1
const config = {
  apiKey: "AIzaSyAW3NAVrBb6Q_fEnDrR2Tjt0IIdd-UWyks",
  authDomain: "drivix-2906e.firebaseapp.com",
  databaseURL: "https://drivix-2906e.firebaseio.com",
  projectId: "drivix-2906e",
  storageBucket: "drivix-2906e.appspot.com",
  messagingSenderId: "675690719800",
  appId: "1:675690719800:web:45b559f4c2dbc1b3"
};



const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "#EEAB10",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 40,
  "bgsType": "ball-spin",
  "blur": 5,
  "fgsColor": "#EEAB10",
  "fgsPosition": "center-center",
  "fgsSize": 120,
  "fgsType": "three-strings",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(97,94,90,0.8)",
  "pbColor": "#EEAB10",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "please wait",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "threshold": 500
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    FooterComponent,
    ContactUsComponent,
    HomeComponent,
    PortfolioComponent,
    ShopComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    GasStaionComponent,
    ManageServiceComponent,

    WorkShopViewComponent,
    SparePartViewComponent,
    WinchViewComponent,
    MycarsComponent,
    WinchCompanyViewComponent,
    OffersComponent,
    ProductComponent,
    OrderComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAb1qML5aW84D-NJg4bnu3YPoFyNlZ387E'
    }),
    HttpClientModule,
    //firebase  
      AngularFireModule.initializeApp(config),
      AngularFirestoreModule, // firestore
      AngularFireAuthModule, // auth
      AngularFireStorageModule ,// storage
    //end firebase
    // Import NgxUiLoaderModule
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig), // import NgxUiLoaderModule
    NgxUiLoaderHttpModule.forRoot({showForeground: true}) // import NgxUiLoaderHttpModule. By default, it will show background loader.    
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
