"use client";

import React, { useState, useTransition } from "react";
import { Lightbulb, Loader2 } from "lucide-react";
import { getHealthEducationTip } from "@/ai/flows/health-education-tips";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const topics = ["Nutrition", "Hygiene", "Maternal Care", "Child Health"];

export function HealthTips() {
  const [isPending, startTransition] = useTransition();
  const [tip, setTip] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleGetTip = (topic: string) => {
    setSelectedTopic(topic);
    setTip(null);
    startTransition(async () => {
      const result = await getHealthEducationTip({ topic });
      setTip(result.tip);
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          <CardTitle>AI Health Education Tips</CardTitle>
        </div>
        <CardDescription>
          Get instant, AI-powered health tips on various topics.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Button
              key={topic}
              variant="outline"
              onClick={() => handleGetTip(topic)}
              disabled={isPending}
            >
              {isPending && selectedTopic === topic ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Get Tip on {topic}
            </Button>
          ))}
        </div>
        {isPending && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Generating tip on {selectedTopic}...</span>
          </div>
        )}
        {tip && (
          <Card className="bg-secondary">
            <CardContent className="p-4">
              <p className="text-secondary-foreground">{tip}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
