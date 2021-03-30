import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { Subject } from 'rxjs';
import { ViewCompanyComponent } from '../view-company/view-company.component';
import { MatDialog } from '@angular/material/dialog';
import { CompanyModel, BranchDetails } from 'src/app/models/company-model';
import { AddBranchComponent } from '../branch-company/add-branch/add-branch.component';
import { EditCompanyComponent } from '../edit-company/edit-company.component';
import { UpdateBranchComponent } from '../branch-company/update-branch/update-branch.component';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.css']
})
export class ListCompanyComponent implements OnInit, OnDestroy {

  title = 'List of Companies';
  companyList: CompanyModel[] = [];

  constructor(
    private configService: ConfigService,
    private router: Router,
    private dialog: MatDialog,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true,
    // };
    this.fetchData();
  }
  fetchData() {
    this.configService.getAllCompanies().subscribe((list) => {
      this.companyList = list;
      console.log(this.companyList);

      // this.dtTrigger.next();
    });
  }
  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }

  viewCompany(id: string) {
    this.router.navigate([`/company/view/${id}`]);
  }

  addBranch(company: CompanyModel) {
    let dialog = this.dialog.open(AddBranchComponent, {
      data: company,
      width: '40%',
    });

    dialog.afterClosed().subscribe((result: any) => {
      if (result.success) {
        this.fetchData();
      }
    });
  }

  updateCompany(company: CompanyModel) {
    let dialog = this.dialog.open(EditCompanyComponent, {
      width: '40%',
      data: company,
    });

    dialog.afterClosed().subscribe((resp: any) => {
      if (resp.success) {
        this.fetchData();
      }
    });
  }

  updateBranch(company: CompanyModel, branch: BranchDetails) {
    let dialog = this.dialog.open(UpdateBranchComponent, {
      width: '40%',
      data: { company, branch },
    });
    dialog.afterClosed().subscribe((resp: any) => {
      if (resp.success) {
        this.fetchData();
      }
    });
  }

  deleteBranch(company: CompanyModel, branch: BranchDetails) {
    this.alertService
      .confirmationAlert(
        'Delete Branch?',
        'Do you really want to delete branch?'
      )
      .then((result) => {
        if (result.isConfirmed) {
          let index = company.companyBranch.indexOf(branch);
          company.companyBranch.splice(index, 1);
          company.totalBranch -= 1;
          this.configService.editCompany(company).subscribe((resp: any) => {
            if (resp) {
              this.alertService.successAlert(
                'Deleted!',
                'Branch deleted successfully'
              );
            } else {
              this.alertService.failureAlert(
                'Failed!',
                'Delete operation has failed'
              );
            }
          });
        }
      });
  }

  deleteCompany(id: number) {
    this.alertService
      .confirmationAlert(
        'Delete Company?',
        'Do you really want to delete company?'
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.configService.deleteCompany(id).subscribe((resp: any) => {
            console.log(resp);
            if (resp) {
              this.alertService.successAlert(
                'Deleted Successful!',
                'Company is deleted!'
              );
            } else {
              this.alertService.failureAlert(
                'Failed!',
                'Delete operation failed'
              );
            }
          });
        }
      });
  }
}

