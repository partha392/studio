export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  location: string;
  symptoms: string;
  xrayUrl?: string;
  risk?: 'High' | 'Medium' | 'Low';
  lastVisit: string;
};
