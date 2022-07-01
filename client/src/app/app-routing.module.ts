import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { RentTrackerComponent } from './components/rent-tracker/rent-tracker.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'MichaelsManagement/login', pathMatch: 'full' },
  { path: 'MichaelsManagement/login', component: LoginComponent},
  { path: 'MichaelsManagement/register', component: RegisterComponent},
  { path: "MichaelsManagement/home", component: HomeComponent},
  { path: 'MichaelsManagement/properties', component: PropertiesComponent},
  { path: 'MichaelsManagement/api/v1/properties/:pid', component: PropertyDetailComponent},
  { path: 'MichaelsManagement/rent', component: RentTrackerComponent},
  { path: 'MichaelsManagement/admin', component: AdminComponent},
  { path: 'documents', component: DocumentsComponent},
  { path: 'MichaelsManagement/api/v1/properties/:pid/documents', component: DocumentsComponent},
  { path: 'MichaelsManagement/user', component: UserDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
