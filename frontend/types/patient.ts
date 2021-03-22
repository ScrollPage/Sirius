export interface IPatient {
  id: number;
  birth_date: Date;
  first_name?: string;
  last_name?: string;
  created: Date;
  updated: Date;
  sex: boolean;
}