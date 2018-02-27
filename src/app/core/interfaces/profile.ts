export interface IEducation {
  dateRange: string;
  field: string;
  logo?: string;
  school: string;
}

export interface IExperience {
  company: string;
  dateRange: string;
  description: string;
  employment: string;
  logo?: string;
  title: string;
}
export interface IProfile {
  education: IEducation[];
  experience: IExperience[];
  headline: string;
  location: string;
  name: string;
  photo: string;
  skills: string[];
  summary: string;
}
