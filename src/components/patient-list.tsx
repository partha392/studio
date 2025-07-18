"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Patient } from "@/lib/types";
import { cn } from "@/lib/utils";

export function PatientList({ patients }: { patients: Patient[] }) {
  const getRiskBadgeVariant = (risk: Patient['risk']) => {
    if (risk === 'High') return 'destructive';
    if (risk === 'Medium') return 'secondary';
    return 'default';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Patients</CardTitle>
        <CardDescription>A list of all registered patients.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Age</TableHead>
                <TableHead className="hidden md:table-cell">Gender</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{patient.age}</TableCell>
                  <TableCell className="hidden md:table-cell">{patient.gender}</TableCell>
                  <TableCell>{patient.location}</TableCell>
                  <TableCell>
                    <Badge variant={getRiskBadgeVariant(patient.risk)} className={cn(patient.risk === 'Medium' && 'bg-yellow-400 text-yellow-900')}>
                      {patient.risk}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
