import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCompanyComponent } from './company/list-company/list-company.component';
import { ViewCompanyComponent } from './company/view-company/view-company.component';

const routes: Routes = [
  { path: '', component: ListCompanyComponent },
  { path: 'view', component: ViewCompanyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
