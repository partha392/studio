import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { PatientList } from "@/components/patient-list";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import type { Patient } from "@/lib/types";

const DUMMY_PATIENTS: Patient[] = [
    { id: 'PAT001', name: 'Aarav Sharma', age: 45, gender: 'Male', location: 'Guwahati', symptoms: 'Persistent cough, fever', risk: 'High', lastVisit: '2024-05-10' },
    { id: 'PAT002', name: 'Binita Das', age: 32, gender: 'Female', location: 'Jorhat', symptoms: 'Shortness of breath', risk: 'Medium', lastVisit: '2024-05-12' },
    { id: 'PAT003', name: 'Chandan Kumar', age: 28, gender: 'Male', location: 'Dibrugarh', symptoms: 'Skin rash, itching', risk: 'Low', lastVisit: '2024-05-15' },
    { id: 'PAT004', name: 'Deepa Singh', age: 55, gender: 'Female', location: 'Nagaon', symptoms: 'Fatigue, paleness', risk: 'High', lastVisit: '2024-05-08' },
    { id: 'PAT005', name: 'Emon Hazarika', age: 60, gender: 'Male', location: 'Tezpur', symptoms: 'Chest pain, cough', risk: 'High', lastVisit: '2024-05-14' },
];

export default function PatientsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Patient Records" description="Manage and view patient profiles.">
        <Link href="/patients/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Patient
          </Button>
        </Link>
      </PageHeader>
      <PatientList patients={DUMMY_PATIENTS} />
    </div>
  );
}
