export class BranchDetails {
    branchId: string;
    branchName: string;
    address: string;
  }
  
  export class CompanyModel {
    id: number;
    email: string;
    name: string;
    totalEmployee: number;
    address: string;
    isCompanyActive: boolean;
    totalBranch: number;
    companyBranch: BranchDetails[];
    branchesVisible: boolean = false;
  }
  
