import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CompanyModel } from '../../models/company-model';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  company: CompanyModel;
  updateForm: FormGroup;
  submitted = false;

  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<EditCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) data: CompanyModel,
    private toastr: ToastrService,
    private configService : ConfigService
  ) { 
    this.company = data;
    this.updateForm = this.builder.group({
      name: [this.company.name, Validators.required],
      email: [this.company.email, [Validators.required, Validators.email]],
      address: [this.company.address, Validators.required],
      totalEmployee: [
        this.company.totalEmployee,
        [Validators.required, Validators.min(0)],
      ],
      totalBranch: [this.company.totalBranch || 0, [Validators.min(0)]],
      isCompanyActive: [
        this.company.isCompanyActive || true,
        [Validators.required],
      ],
    });
  }

  ngOnInit(): void {
  }

  get f() {
    return this.updateForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.updateForm.valid) {
      let data = JSON.parse(JSON.stringify(this.updateForm.value));
      data.id = this.company.id;
      data.companyBranch = this.company.companyBranch;
      this.configService.editCompany(data).subscribe((resp: any) => {
        if (resp) {
          this.toastr.success('Company Updated Successfully', 'Success!');
          this.dialogRef.close({ success: true });
        } else {
          this.toastr.error('Operation Failed!', 'Failed!');
          this.closeDialog();
        }
      });
    }
  }

  closeDialog() {
    this.dialogRef.close({ success: false });
  }

}
