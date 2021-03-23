export interface IExam {
  id: number;
  created: Date;
  updated: Date;
  diagnosis: string | null;
  clinic: string;
  patient: number;
}