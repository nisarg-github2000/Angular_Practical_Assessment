import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCompanyComponent } from './add-company/add-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { ViewCompanyComponent } from './view-company/view-company.component';
import { ListCompanyComponent } from './list-company/list-company.component';
import { DataTablesModule } from 'angular-datatables';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [AddCompanyComponent, EditCompanyComponent, ViewCompanyComponent, ListCompanyComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    MatDialogModule
  ]
})
export class CompanyModule { }
