export interface PatientPagination {
  data: IPatient[];
  page_num: number;
}

export interface IPatient {
  id: number;
  birth_date: Date;
  name?: string;
  created: Date;
  updated: Date;
  sex: boolean;
}