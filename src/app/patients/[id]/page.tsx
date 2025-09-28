
'use client';

import { useParams, useRouter } from 'next/navigation';
import { usePatientStore } from '@/hooks/use-patient-store';
import { AppLayout } from '@/components/app-layout';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle, ArrowLeft, Calendar, Heart, MapPin, User, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Patient } from '@/lib/types';
import { PersonalRecommendation } from '@/components/personal-recommendation';

const getRiskBadgeVariant = (risk: Patient['risk']) => {
    if (risk === 'High') return 'destructive';
    if (risk === 'Medium') return 'secondary';
    return 'default';
};

export default function PatientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const getPatientById = usePatientStore((state) => state.getPatientById);
  const patient = getPatientById(id);

  if (!patient) {
    return (
      <AppLayout>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
           <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Patients
            </Button>
          <div className="flex flex-col items-center justify-center text-center py-16 px-4">
            <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
            <h2 className="text-2xl font-bold text-foreground">Patient Not Found</h2>
            <p className="text-muted-foreground mt-2 max-w-sm">
              The patient profile you are looking for does not exist or may have been moved.
            </p>
          </div>
        </div>
      </AppLayout>
    );
  }

  const { name, age, gender, location, symptoms, risk, lastVisit } = patient;

  return (
    <AppLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="mb-4">
            <Button variant="outline" onClick={() => router.push('/patients')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Patient List
            </Button>
        </div>

        <PageHeader
          title={name}
          description={`Patient ID: ${patient.id}`}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-1">
                 <CardHeader>
                    <CardTitle>Patient Details</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4 text-sm">
                    <div className="flex items-center">
                        <User className="mr-3 h-5 w-5 text-muted-foreground" />
                        <span>{age} years old, {gender}</span>
                    </div>
                     <div className="flex items-center">
                        <MapPin className="mr-3 h-5 w-5 text-muted-foreground" />
                        <span>{location}</span>
                    </div>
                     <div className="flex items-center">
                        <Calendar className="mr-3 h-5 w-5 text-muted-foreground" />
                        <span>Last visit: {lastVisit}</span>
                    </div>
                     <div className="flex items-center">
                        <Heart className="mr-3 h-5 w-5 text-muted-foreground" />
                        <div className="flex items-center gap-2">
                            <span>Risk Level:</span>
                            <Badge variant={getRiskBadgeVariant(risk)} className={cn("capitalize", risk === 'Medium' && 'bg-yellow-400 text-yellow-900')}>
                                {risk}
                            </Badge>
                        </div>
                    </div>
                 </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Stethoscope className="text-primary"/>Symptoms & Diagnosis</CardTitle>
                    <CardDescription>Symptoms reported during the last visit.</CardDescription>
                 </CardHeader>
                 <CardContent>
                    <p className="italic rounded-md bg-muted p-4">"{symptoms}"</p>
                 </CardContent>
            </Card>
        </div>
        <div>
            <PersonalRecommendation patient={patient} />
        </div>
      </div>
    </AppLayout>
  );
}
