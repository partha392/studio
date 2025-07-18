
"use client";

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Patient } from "@/lib/types";
import { cn } from "@/lib/utils";
import { User, Calendar, MapPin, AlertTriangle } from 'lucide-react';

export function PatientList({ patients }: { patients: Patient[] }) {
  const getRiskBadgeVariant = (risk: Patient['risk']) => {
    if (risk === 'High') return 'destructive';
    if (risk === 'Medium') return 'secondary';
    return 'default';
  };
  
  const getRiskIcon = (risk: Patient['risk']) => {
    if (risk === 'High') return <AlertTriangle className="h-4 w-4 text-destructive" />;
    if (risk === 'Medium') return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {patients.map((patient) => (
        <Card key={patient.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{patient.name}</CardTitle>
               <Badge variant={getRiskBadgeVariant(patient.risk)} className={cn("capitalize", patient.risk === 'Medium' && 'bg-yellow-400 text-yellow-900')}>
                {getRiskIcon(patient.risk)}
                <span className="ml-1">{patient.risk}</span>
              </Badge>
            </div>
            <CardDescription className="flex items-center gap-2 pt-1">
              <User className="h-4 w-4" /> <span>{patient.age}, {patient.gender}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-2">
             <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{patient.location}</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Last visit: {patient.lastVisit}</span>
            </div>
             <p className="text-sm pt-2 italic text-foreground/80 line-clamp-2">
                &quot;{patient.symptoms}&quot;
             </p>
          </CardContent>
          <CardFooter>
            <Link href={`/patients/${patient.id}`} className="w-full">
                <Button variant="outline" className="w-full">View Details</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
