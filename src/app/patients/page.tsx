
"use client";

import Link from "next/link";
import { AppLayout } from "@/components/app-layout";
import { PageHeader } from "@/components/page-header";
import { PatientList } from "@/components/patient-list";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { usePatientStore } from "@/hooks/use-patient-store";

export default function PatientsPage() {
  const patients = usePatientStore((state) => state.patients);

  return (
    <AppLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <PageHeader title="Patients" description="Manage and view patient profiles.">
          <Link href="/patients/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </Link>
        </PageHeader>
        {patients.length > 0 ? (
          <PatientList patients={patients} />
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4 border-2 border-dashed rounded-lg">
            <h2 className="text-xl font-semibold text-foreground">No Patients Found</h2>
            <p className="text-muted-foreground mt-2 mb-4 max-w-sm">
              It looks like there are no patient profiles yet. Get started by adding a new patient.
            </p>
            <Link href="/patients/new">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Patient
              </Button>
            </Link>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
