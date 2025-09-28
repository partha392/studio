import { config } from 'dotenv';
config();

import '@/ai/flows/generate-triage-response.ts';
import '@/ai/flows/health-education-tips.ts';
import '@/ai/flows/suggest-diagnosis.ts';
import '@/ai/flows/voice-enabled-chatbot.ts';
import '@/ai/flows/personal-recommendation.ts';
