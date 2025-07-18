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
  response: z.string().describe('The response from the AI chatbot, formatted in Markdown. It can include links, images, and YouTube video embeds.'),
});
export type VoiceEnabledChatbotOutput = z.infer<typeof VoiceEnabledChatbotOutputSchema>;

export async function voiceEnabledChatbot(input: VoiceEnabledChatbotInput): Promise<VoiceEnabledChatbotOutput> {
  return voiceEnabledChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'voiceEnabledChatbotPrompt',
  input: {schema: VoiceEnabledChatbotInputSchema},
  output: {schema: VoiceEnabledChatbotOutputSchema},
  prompt: `You are a professional AI medical assistant for health workers in rural areas. Your goal is to provide accurate, helpful, and comprehensive information.

Answer the user's question clearly and concisely.

When appropriate, enhance your response with the following resources to make it more helpful:
- **External Links:** Provide links to reputable medical resources (e.g., World Health Organization, CDC, WebMD, Wikipedia). Use Markdown format: [Link Text](URL)
- **Images:** If a visual aid would be helpful, include an image. Use Markdown format: ![Alt Text](Image URL)
- **YouTube Videos:** If a video explanation would be beneficial, embed a relevant YouTube video. Use the format: [YOUTUBE](VIDEO_ID) (e.g., [YOUTUBE](dQw4w9WgXcQ))

Always prioritize providing safe, reliable information.

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
