// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Provides AI-generated health education tips.
 *
 * - getHealthEducationTip - A function that returns a health education tip on a specified topic.
 * - GetHealthEducationTipInput - The input type for the getHealthEducationTip function.
 * - GetHealthEducationTipOutput - The return type for the getHealthEducationTip function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetHealthEducationTipInputSchema = z.object({
  topic: z.string().describe('The topic for the health education tip.'),
});
export type GetHealthEducationTipInput = z.infer<
  typeof GetHealthEducationTipInputSchema
>;

const GetHealthEducationTipOutputSchema = z.object({
  tip: z.string().describe('A health education tip on the specified topic.'),
});
export type GetHealthEducationTipOutput = z.infer<
  typeof GetHealthEducationTipOutputSchema
>;

export async function getHealthEducationTip(
  input: GetHealthEducationTipInput
): Promise<GetHealthEducationTipOutput> {
  return getHealthEducationTipFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getHealthEducationTipPrompt',
  input: {schema: GetHealthEducationTipInputSchema},
  output: {schema: GetHealthEducationTipOutputSchema},
  prompt: `You are a health education expert. Generate a concise and informative health education tip on the following topic: {{{topic}}}. The tip should be easy to understand and actionable for people in rural areas. Focus on preventative care and practical advice.`,
});

const getHealthEducationTipFlow = ai.defineFlow(
  {
    name: 'getHealthEducationTipFlow',
    inputSchema: GetHealthEducationTipInputSchema,
    outputSchema: GetHealthEducationTipOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

