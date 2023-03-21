export interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
  employeeId: string;
}

export type Props = {
  role?: string;
  uid: string;
};

export interface AllIncapacities {
  applicationId: string
  applicationDate: string;
  coverageDays: number;
  doctor:string;
  employee:string;
  employeeId:string;
  endDate:string;
  medical:string;
  medicalUnit:string;
  startDate:string;
}


