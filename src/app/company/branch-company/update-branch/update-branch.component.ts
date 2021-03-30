import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  throwMatDialogContentAlreadyAttachedError,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BranchDetails, CompanyModel } from 'src/app/models/company-model';
import { AlertService } from '../../../services/alert.service';
import { ConfigService } from '../../../services/config.service';
import { AddBranchComponent } from '../add-branch/add-branch.component';

@Component({
  selector: 'app-update-branch',
  templateUrl: './update-branch.component.html',
  styleUrls: ['./update-branch.component.css']
})
export class UpdateBranchComponent implements OnInit {

  branchesForm: FormGroup;
  branchSubmitted = false;
  branches: BranchDetails[] = [];
  company: CompanyModel;
  branch: BranchDetails;

  constructor(
    private builder: FormBuilder,
    private alertService: AlertService,
    private configService: ConfigService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddBranchComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.branchesForm = this.builder.group({
      branchName: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.company = data.company;
    this.branch = data.branch;
    console.log(this.company, this.branch);
   }

  ngOnInit(): void {
    this.branchesForm.patchValue(this.branch);
  }

  get branchesControl() {
    return this.branchesForm.controls;
  }

  onBranchSubmit() {
    this.branchSubmitted = true;
    if (this.branchesForm.valid) {
      let data = JSON.parse(JSON.stringify(this.branchesForm.value));
      data.branchId = this.branch.branchId;
      let index = this.company.companyBranch.indexOf(this.branch);
      this.company.companyBranch[index] = data;
      //this.company.totalBranch = this.company.companyBranch.length;
      this.configService.editCompany(this.company).subscribe((resp: any) => {
        if (resp) {
          this.toastr.success('Branch added successfully', 'Success!');
          this.dialogRef.close({ success: true });
        } else {
          this.toastr.error('Operation Failed', 'Failed!');
          this.closeDialog();
        }
      });
      this.branchesForm.reset();
    }
  }

  closeDialog() {
    this.dialogRef.close({ success: false });
  }

}
