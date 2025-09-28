'use server';
/**
 * @fileOverview Generates personalized health recommendations for a patient.
 *
 * - getPersonalRecommendation - A function that returns a personalized health recommendation.
 * - PersonalRecommendationInput - The input type for the getPersonalRecommendation function.
 * - PersonalRecommendationOutput - The return type for the getPersonalRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalRecommendationInputSchema = z.object({
  symptoms: z.string().describe('The symptoms reported by the patient.'),
  age: z.number().describe("The patient's age."),
  gender: z.string().describe("The patient's gender."),
});
export type PersonalRecommendationInput = z.infer<
  typeof PersonalRecommendationInputSchema
>;

const PersonalRecommendationOutputSchema = z.object({
  recommendation: z.string().describe('A personalized health recommendation in Markdown format.'),
});
export type PersonalRecommendationOutput = z.infer<
  typeof PersonalRecommendationOutputSchema
>;

export async function getPersonalRecommendation(
  input: PersonalRecommendationInput
): Promise<PersonalRecommendationOutput> {
  return personalRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalRecommendationPrompt',
  input: {schema: PersonalRecommendationInputSchema},
  output: {schema: PersonalRecommendationOutputSchema},
  prompt: `You are a medical assistant providing personalized recommendations for a patient in a rural area.

Patient Details:
- Age: {{{age}}}
- Gender: {{{gender}}}
- Symptoms: {{{symptoms}}}

Based on these details, provide a personalized health recommendation. The recommendation should be clear, actionable, and formatted in Markdown. Include advice on home care, when to seek further help, and potential next steps.`,
});

const personalRecommendationFlow = ai.defineFlow(
  {
    name: 'personalRecommendationFlow',
    inputSchema: PersonalRecommendationInputSchema,
    outputSchema: PersonalRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
