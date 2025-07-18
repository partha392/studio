# **App Name**: Swasth AI

## Core Features:

- User Authentication: User Authentication via Firebase Auth (email/phone-based)
- Patient Profile: Patient Profile Creation: Collect name, age, gender, location, symptoms; X-ray image upload (Firebase Storage)
- AI Diagnosis: Analyze symptoms and suggest likely diagnoses using the Gemini API. The diagnoses may include TB, pneumonia, anemia, skin infections.
- AI Triage: Generate triage responses in the appropriate regional language using a tool with the Gemini API. Languages to include: Assamese, Hindi, English.
- AI Chatbot: Voice-Enabled Chatbot using Gemini API + local speech-to-text.
- Doctor Alerts: Trigger alerts to remote doctors for high-risk cases (via Firebase Cloud Messaging).
- Health Education: Include health education tips in-app, using a tool leveraging Gemini-generated text

## Style Guidelines:

- Primary color: Gentle cyan (#79D6C7) to evoke a sense of calm and trust, suitable for healthcare applications.
- Background color: Light cyan (#E2F8F3), subtly tinted toward the primary color for a harmonious and clean interface.
- Accent color: Soft green (#A8E6CE), analogous to cyan, to highlight interactive elements and key information, reinforcing a sense of health.
- Body and headline font: 'PT Sans' (humanist sans-serif) for a modern yet approachable and easily readable text, suitable for multilingual support and users with varying levels of literacy.
- Use illustrative icons with a hand-drawn feel to represent medical concepts and app features. These icons should be clear, easily understandable, and culturally relevant to the target users in rural areas.
- Design a mobile-first, responsive layout with large touch targets and minimal text. Ensure that navigation is intuitive for low-literacy users. Prioritize essential information to avoid overwhelming the interface.
- Use subtle, non-distracting animations for feedback and transitions. Animations should enhance usability without being flashy or causing cognitive overload. Examples include loading spinners and confirmation animations.