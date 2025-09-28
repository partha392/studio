
'use client';

import React, { useState, useTransition } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Wand2, Loader2 } from 'lucide-react';
import type { Patient } from '@/lib/types';
import { getPersonalRecommendation } from '@/ai/flows/personal-recommendation';
import ReactMarkdown from 'react-markdown';

interface PersonalRecommendationProps {
  patient: Patient;
}

export function PersonalRecommendation({ patient }: PersonalRecommendationProps) {
  const [isPending, startTransition] = useTransition();
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleGetRecommendation = () => {
    startTransition(async () => {
      const { recommendation } = await getPersonalRecommendation({
        symptoms: patient.symptoms,
        age: patient.age,
        gender: patient.gender,
      });
      setRecommendation(recommendation);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Powered Personal Recommendation</CardTitle>
        <CardDescription>
          Generate a personalized health recommendation for {patient.name} based on their profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {recommendation ? (
          <div className="prose prose-sm dark:prose-invert max-w-none text-foreground prose-p:my-2 prose-ul:my-2 prose-li:my-1 prose-headings:font-headline prose-headings:text-primary">
            <ReactMarkdown>{recommendation}</ReactMarkdown>
          </div>
        ) : (
          <Button onClick={handleGetRecommendation} disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Recommendation
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
