import { create } from 'zustand';
import type { Patient } from '@/lib/types';
import { persist } from 'zustand/middleware';

const DUMMY_PATIENTS: Patient[] = [
    { id: 'PAT001', name: 'Aarav Sharma', age: 45, gender: 'Male', location: 'Guwahati', symptoms: 'Persistent cough, fever', risk: 'High', lastVisit: '2024-05-10' },
    { id: 'PAT002', name: 'Binita Das', age: 32, gender: 'Female', location: 'Jorhat', symptoms: 'Shortness of breath', risk: 'Medium', lastVisit: '2024-05-12' },
    { id: 'PAT003', name: 'Chandan Kumar', age: 28, gender: 'Male', location: 'Dibrugarh', symptoms: 'Skin rash, itching', risk: 'Low', lastVisit: '2024-05-15' },
    { id: 'PAT004', name: 'Deepa Singh', age: 55, gender: 'Female', location: 'Nagaon', symptoms: 'Fatigue, paleness', risk: 'High', lastVisit: '2024-05-08' },
    { id: 'PAT005', name: 'Emon Hazarika', age: 60, gender: 'Male', location: 'Tezpur', symptoms: 'Chest pain, cough', risk: 'High', lastVisit: '2024-05-14' },
];


interface PatientState {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  getPatientById: (id: string) => Patient | undefined;
}

export const usePatientStore = create<PatientState>()(
  persist(
    (set, get) => ({
      patients: DUMMY_PATIENTS,
      addPatient: (patient) => set((state) => ({ patients: [patient, ...state.patients] })),
      getPatientById: (id) => get().patients.find((p) => p.id === id),
    }),
    {
      name: 'patient-storage', // name of the item in the storage (must be unique)
    }
  )
);
