import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BranchDetails, CompanyModel } from '../../models/company-model';
import { AlertService } from 'src/app/services/alert.service';
import { ConfigService } from 'src/app/services/config.service';


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  addForm: FormGroup;
  branchesForm: FormGroup;
  submitted = false;
  branchSubmitted = false;
  addBranchVisible = false;
  branches: BranchDetails[] = [];
  id: number;
  branchId: number;

  constructor(
    private builder: FormBuilder,
    private alertService: AlertService,
    private configService: ConfigService,
    private toastr: ToastrService
  ) {
    this.addForm = this.builder.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      totalEmployee: ['', [Validators.required, Validators.min(0)]],
      isCompanyActive: [true, [Validators.required]],
    });

    this.branchesForm = this.builder.group({
      branchId: ['', Validators.required],
      branchName: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCompanyId();
  }

  getCompanyId(){
    this.configService.getId().then((id: number) => {
      this.id = id;
      this.addForm.patchValue({ id: this.id });
    });
  }

  get f() {
    return this.addForm.controls;
  }

  get branchesControl() {
    return this.branchesForm.controls;
  }

  async addCompany() {
    let data = JSON.parse(JSON.stringify(this.addForm.getRawValue()));
    data.totalBranch = this.branches.length;
    data.companyBranch = this.branches;
    let isExist = await this.configService.ifCompanyExist(data);

    if (!isExist) {
      this.configService.addCompany(data).subscribe((resp: any) => {
        if (resp != null) {
          this.alertService.successAlert('Success', 'Company has been added');
          this.getCompanyId();
        } else {
          this.alertService.failureAlert('Failed', 'Company not added');
        }
        this.addForm.reset();
        this.submitted = false;
      });
    } else {
      this.alertService.failureAlert(
        'Already Exist',
        `Company with name ${data.name.toLowerCase()} already exist`
      );
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.valid) {
      if (this.branches.length == 0) {
        this.alertService
          .confirmationAlert(
            'No Branch is Added!',
            'Do you still want to continue?'
          )
          .then((result) => {
            if (result.isConfirmed) {
              this.addCompany();
            } else {
              this.alertService.successAlert(
                'Add Branches!',
                'You can add Branch by clicking Add branch button '
              );
            }
          });
      } else {
        this.addCompany();
      }
    }
  }

  onBranchSubmit() {
    this.branchSubmitted = true;
    if (this.branchesForm.valid) {
      let branchId = this.branchesControl.branchId.value;
      let bName = this.branchesControl.branchName.value;
      let bAddress = this.branchesControl.address.value;
      this.branches.push({ branchId, branchName: bName, address: bAddress });
      this.branchesForm.reset();
    }
  }

  addBranch() {
    this.addBranchVisible = true;
    this.branchId = this.branches.length + 1;
    this.branchesForm.patchValue({ branchId: this.branchId });
  }
  removeBranch(index: number) {
    this.branches.slice(index, 1);
  }
}
