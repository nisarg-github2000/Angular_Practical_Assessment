import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCompanyComponent } from './add-company/add-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { ViewCompanyComponent } from './view-company/view-company.component';
import { ListCompanyComponent } from './list-company/list-company.component';
import { DataTablesModule } from 'angular-datatables';
import { MatDialogModule } from '@angular/material/dialog';
import { AddBranchComponent } from './branch-company/add-branch/add-branch.component';
import { UpdateBranchComponent } from './branch-company/update-branch/update-branch.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    AddCompanyComponent, 
    EditCompanyComponent, 
    ViewCompanyComponent, 
    ListCompanyComponent, 
    AddBranchComponent, 
    UpdateBranchComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    MatDialogModule,
    ReactiveFormsModule,
    AppRoutingModule
  ]
})
export class CompanyModule { }
