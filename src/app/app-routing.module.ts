import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PetListComponent } from './pets/pet-list/pet-list.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminWarehouseComponent } from './admin/admin-warehouse/admin-warehouse.component';
import { AdminOwnersComponent } from './admin/admin-owners/admin-owners.component';
import { LoginComponent } from './login/login.component';
import { AdminAuthGuard } from './guards/admin-auth-guard';


const routes: Routes = 
[
  { path: '', component: WelcomeComponent },
  { path: 'pets', component: PetListComponent},
  { path: 'admin', component: AdminHomeComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/warehouse', component: AdminWarehouseComponent, canActivate: [AdminAuthGuard]},
  { path: 'admin/owners', component: AdminOwnersComponent, canActivate: [AdminAuthGuard]},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
