import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { WinchCompanyViewComponent } from './winch-company-view/winch-company-view.component';
import { WinchViewComponent } from './winch-view/winch-view.component';
import { MycarsComponent } from './mycars/mycars.component';
import { WorkShopViewComponent } from './work-shop-view/work-shop-view.component';
import { ManageServiceComponent } from './manage-service/manage-service.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './shop/shop.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GasStaionComponent } from './gas-staion/gas-staion.component';
import { SparePartViewComponent } from './spare-part-view/spare-part-view.component';
import { OffersComponent } from './offers/offers.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'contact_us',component:ContactUsComponent},
  {path:'home',component:HomeComponent},
  {path:'portfolio',component:PortfolioComponent},
  {path:'shop',component:ShopComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile',component:ProfileComponent},
  {path:'gasStaion',component:GasStaionComponent},
  {path:'manageService',component:ManageServiceComponent},
  {path:'workshopView/:id/:type',component:WorkShopViewComponent},
  {path:'wichDriverView/:id/:type',component:WinchViewComponent},
  {path:'winchCompanyView/:id/:type',component:WinchCompanyViewComponent},
  {path:'sparePartsView/:id/:type',component:SparePartViewComponent},
  {path:'myCars',component:MycarsComponent},
  {path:'offer',component:OffersComponent},
  {path:'product',component:ProductComponent},
  {path:'order',component:OrderComponent},
  {path:'**', component:HomeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
