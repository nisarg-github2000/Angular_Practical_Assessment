import { Component, OnInit } from '@angular/core';
import { CompanyModel } from 'src/app/models/company-model';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {
  companyId: number;
  company: CompanyModel = new CompanyModel();

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.companyId = this.route.snapshot.params.id;
    this.configService
      .getCompanyById(this.companyId)
      .subscribe((resp: CompanyModel) => {
        this.company = resp;
      });
  }

}
