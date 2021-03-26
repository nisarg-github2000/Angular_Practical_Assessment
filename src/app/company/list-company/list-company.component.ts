import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { Subject } from 'rxjs';
import { ViewCompanyComponent } from '../view-company/view-company.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-company',
  templateUrl: './list-company.component.html',
  styleUrls: ['./list-company.component.css']
})
export class ListCompanyComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  companyList: any = [];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private configService: ConfigService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.configService.getAllCompanies().subscribe(list => {
      console.log(list);

      this.companyList = list;
      this.dtTrigger.next();
    })
  }

  viewCompanyDetails(id: number) {
    const dialogRef = this.dialog.open(ViewCompanyComponent, {
      width: '50%',
      data: { company: this.companyList[id] }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
