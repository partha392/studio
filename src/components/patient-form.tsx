"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Stethoscope, MessageSquareQuote, AlertTriangle, Loader2 } from "lucide-react";
import React, { useState, useTransition } from "react";
import { suggestDiagnosis } from "@/ai/flows/suggest-diagnosis";
import { generateTriageResponse } from "@/ai/flows/generate-triage-response";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const patientFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  age: z.coerce.number().min(0, "Age cannot be negative.").max(120),
  gender: z.enum(["Male", "Female", "Other"]),
  location: z.string().min(2, "Location is required."),
  symptoms: z.string().min(10, "Please describe symptoms in at least 10 characters."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Patient consent is required to process data." }),
  }),
});

type PatientFormValues = z.infer<typeof patientFormSchema>;

export function PatientForm() {
  const [isPending, startTransition] = useTransition();
  const [isTriagePending, startTriageTransition] = useTransition();
  const [diagnoses, setDiagnoses] = useState<string[]>([]);
  const [triageResponse, setTriageResponse] = useState<string>("");
  const [triageLanguage, setTriageLanguage] = useState<"English" | "Hindi" | "Assamese">("English");
  const { toast } = useToast();

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: "",
      age: undefined,
      symptoms: "",
      location: "",
      consent: false,
    },
  });

  const onSubmit = (data: PatientFormValues) => {
    setDiagnoses([]);
    setTriageResponse("");
    startTransition(async () => {
      try {
        const result = await suggestDiagnosis({ symptoms: data.symptoms });
        setDiagnoses(result.diagnoses);
      } catch (error) {
        console.error("Diagnosis error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to get diagnosis. Please try again.",
        });
      }
    });
  };

  const handleGenerateTriage = () => {
    const symptoms = form.getValues("symptoms");
    if (!symptoms) {
      form.setError("symptoms", { message: "Symptoms are needed for triage." });
      return;
    }
    setTriageResponse("");
    startTriageTransition(async () => {
      try {
        const result = await generateTriageResponse({ symptoms, language: triageLanguage });
        setTriageResponse(result.triageResponse);
      } catch (error) {
        console.error("Triage error:", error);
         toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to generate triage response.",
        });
      }
    });
  };
  
  const handleAlertDoctor = () => {
    toast({
      title: "Alert Sent",
      description: "A notification has been sent to the supervising doctor.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
            <CardDescription>Enter the patient's demographic and symptom details.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField name="name" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl><Input placeholder="e.g. Aarav Sharma" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField name="age" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl><Input type="number" placeholder="e.g. 42" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField name="gender" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField name="location" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Location / Village</FormLabel>
                  <FormControl><Input placeholder="e.g. Guwahati" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:col-span-2">
               <FormField name="symptoms" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Symptoms</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe patient symptoms in detail (e.g., persistent cough for 3 weeks, evening fever, weight loss)..." className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className="md:col-span-2">
                <FormLabel>Upload X-Ray (Optional)</FormLabel>
                 <div className="mt-2 flex justify-center rounded-lg border border-dashed border-border px-6 py-10">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 hover:text-primary/80"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-muted-foreground">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
            </div>
            <div className="md:col-span-2">
               <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Consent to Process Data
                      </FormLabel>
                      <FormDescription>
                        You confirm that you have patient consent to collect and process their health information.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
             <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Stethoscope className="mr-2 h-4 w-4" />
              Get AI Diagnosis
            </Button>
          </CardFooter>
        </Card>

        {isPending && (
          <div className="flex items-center justify-center gap-2 text-muted-foreground p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="text-lg">Analyzing symptoms...</span>
          </div>
        )}

        {diagnoses.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Stethoscope className="text-primary"/>AI Suggested Diagnoses</CardTitle>
              <CardDescription>Based on the symptoms provided, here are some likely possibilities. This is not a final diagnosis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="list-disc list-inside space-y-1">
                {diagnoses.map((dx, i) => <li key={i}>{dx}</li>)}
              </ul>
              <div className="pt-4 flex flex-wrap items-center gap-2">
                 <Select value={triageLanguage} onValueChange={(val: any) => setTriageLanguage(val)}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="Assamese">Assamese</SelectItem>
                    </SelectContent>
                  </Select>
                 <Button type="button" onClick={handleGenerateTriage} disabled={isTriagePending}>
                    {isTriagePending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <MessageSquareQuote className="mr-2 h-4 w-4"/>
                    Generate Triage Response
                  </Button>
              </div>
            </CardContent>
             {isTriagePending && (
              <div className="flex items-center gap-2 text-muted-foreground px-6 pb-4">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Generating response in {triageLanguage}...</span>
              </div>
            )}
            {triageResponse && (
               <CardFooter className="flex flex-col items-start gap-2 border-t pt-4">
                  <h4 className="font-semibold">Triage Response ({triageLanguage}):</h4>
                  <p className="text-sm rounded-md bg-secondary p-3 w-full text-secondary-foreground">{triageResponse}</p>
                   <Button type="button" variant="destructive" onClick={handleAlertDoctor} className="mt-2">
                    <AlertTriangle className="mr-2 h-4 w-4"/>
                    This is a high-risk case. Alert Doctor.
                  </Button>
               </CardFooter>
            )}
          </Card>
        )}
      </form>
    </Form>
  );
}
