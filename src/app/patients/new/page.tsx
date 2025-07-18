import { PageHeader } from "@/components/page-header";
import { PatientForm } from "@/components/patient-form";

export default function NewPatientPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="New Patient Profile"
        description="Fill in the details to create a new patient record and get AI-powered suggestions."
      />
      <div className="max-w-4xl mx-auto">
        <PatientForm />
      </div>
    </div>
  );
}
