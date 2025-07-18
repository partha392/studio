'use server';
/**
 * @fileOverview AI-powered triage response generator in local languages.
 * 
 * - generateTriageResponse - A function that generates a triage response based on patient symptoms and preferred language.
 * - GenerateTriageResponseInput - The input type for the generateTriageResponse function.
 * - GenerateTriageResponseOutput - The return type for the generateTriageResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTriageResponseInputSchema = z.object({
  symptoms: z.string().describe('The patient\'s symptoms.'),
  language: z.enum(['Assamese', 'Hindi', 'English']).describe('The preferred language for the triage response.'),
});
export type GenerateTriageResponseInput = z.infer<typeof GenerateTriageResponseInputSchema>;

const GenerateTriageResponseOutputSchema = z.object({
  triageResponse: z.string().describe('The AI-generated triage response in the specified language.'),
});
export type GenerateTriageResponseOutput = z.infer<typeof GenerateTriageResponseOutputSchema>;

export async function generateTriageResponse(input: GenerateTriageResponseInput): Promise<GenerateTriageResponseOutput> {
  return generateTriageResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTriageResponsePrompt',
  input: {schema: GenerateTriageResponseInputSchema},
  output: {schema: GenerateTriageResponseOutputSchema},
  prompt: `You are a medical triage assistant. Generate a triage response based on the patient\'s symptoms in the specified language.

Symptoms: {{{symptoms}}}
Language: {{{language}}}

Triage Response ({{language}}):`,
});

const generateTriageResponseFlow = ai.defineFlow(
  {
    name: 'generateTriageResponseFlow',
    inputSchema: GenerateTriageResponseInputSchema,
    outputSchema: GenerateTriageResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
