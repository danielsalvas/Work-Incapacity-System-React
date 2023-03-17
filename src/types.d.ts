export interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export type Props = {
  role?: string;
  uid: string;
};

export interface AllIncapacities {
  applicationDate: string;
  coverageDays: number;
  doctor:string;
  employee:string;
  employeeeId:string;
  endDate:string;
  medical:string;
  medicalUnit:string;
  startDate:string;
}

export interface InfoUser {
  email: string;
  name: string;
  role: string;
}
