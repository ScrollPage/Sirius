interface IDzn {
  id: number;
  color?: string;
  border: string;
  created: string;
  updated: string;
}

interface IEye {
  id: number;
  dzn: IDzn;
  side: 1 | 2;
  sight_sharpness?: number;
  makula?: string;
  periphery?: string;
  sight_area: string;
  created: string;
  updated: string;
}

export interface IExam {
  id: number;
  last_diagnosis?: string;
  eyes_info: IEye[];
  created: Date;
  updated: Date;
  clinic: string;
  patient: number;
}