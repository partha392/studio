// src/ai/flows/voice-enabled-chatbot.ts
'use server';

/**
 * @fileOverview A voice-enabled chatbot flow that allows health workers to ask questions about patient symptoms and receive helpful information.
 *
 * - voiceEnabledChatbot - A function that handles the chatbot conversation.
 * - VoiceEnabledChatbotInput - The input type for the voiceEnabledChatbot function.
 * - VoiceEnabledChatbotOutput - The return type for the voiceEnabledChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoiceEnabledChatbotInputSchema = z.object({
  query: z.string().describe('The question asked by the health worker.'),
});
export type VoiceEnabledChatbotInput = z.infer<typeof VoiceEnabledChatbotInputSchema>;

const VoiceEnabledChatbotOutputSchema = z.object({
  response: z.string().describe('The response from the AI chatbot.'),
});
export type VoiceEnabledChatbotOutput = z.infer<typeof VoiceEnabledChatbotOutputSchema>;

export async function voiceEnabledChatbot(input: VoiceEnabledChatbotInput): Promise<VoiceEnabledChatbotOutput> {
  return voiceEnabledChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'voiceEnabledChatbotPrompt',
  input: {schema: VoiceEnabledChatbotInputSchema},
  output: {schema: VoiceEnabledChatbotOutputSchema},
  prompt: `You are a helpful AI chatbot assisting health workers in rural areas. Answer their questions about patient symptoms and provide helpful information in a concise and easy-to-understand manner.

Question: {{{query}}}`,
});

const voiceEnabledChatbotFlow = ai.defineFlow(
  {
    name: 'voiceEnabledChatbotFlow',
    inputSchema: VoiceEnabledChatbotInputSchema,
    outputSchema: VoiceEnabledChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
