
# Swasth AI: AI-Powered Healthcare Assistant

Swasth AI is a modern, responsive web application designed to empower rural health workers with AI-driven diagnostic assistance and patient management tools. Built with Next.js and powered by Google's Gemini model through Genkit, this app provides a comprehensive suite of features to aid in preliminary diagnosis, patient tracking, and health education.

![Swasth AI Dashboard](https://picsum.photos/seed/dashboard/1200/630)

---

## ✨ Key Features

- **📊 Interactive Dashboard:** Get a quick overview of daily activities, including patients seen, high-risk alerts, and recent activities.
- **👥 Patient Management System:**
    - **Register New Patients:** A comprehensive form to capture patient details, symptoms, and consent.
    - **Persistent Storage:** Patient data is saved to the browser's local storage, ensuring no data is lost on reload.
    - **Patient List & Details:** View all registered patients with their risk levels, and click to see a detailed profile for each one.
- **🤖 AI-Powered Diagnostic Suite:**
    - **Symptom Analysis:** Get AI-suggested diagnoses based on reported symptoms.
    - **Multi-Lingual Triage:** Generate triage responses in English, Hindi, or Assamese to communicate effectively with patients.
    - **Personalized Recommendations:** On the patient detail page, generate personalized health advice, complete with links to reputable medical sources (e.g., WHO, CDC).
- **💬 AI Assistant Chatbot:**
    - **Conversational Interface:** Ask complex medical questions about symptoms, treatments, or health topics.
    - **Rich Content Responses:** The chatbot delivers well-formatted Markdown responses, including tables, lists, images, and embedded YouTube videos for comprehensive explanations.
- **💡 Health Education Tips:** Instantly generate AI-powered health tips on crucial topics like Nutrition, Hygiene, and Maternal Care.
- **📱 Fully Responsive Design:** A mobile-first interface that works beautifully on desktops, tablets, and smartphones, making it perfect for use in the field.

---

## 🛠️ Tech Stack & Languages

This project is built with a modern, production-ready tech stack, prioritizing performance, developer experience, and scalability.

- **Languages:**
  - **TypeScript (98%):** The primary language used for its strong typing, which helps prevent bugs and improves code quality.
  - **CSS & Other (2%):** Used for global styling definitions and configuration files.

- **Core Framework:**
  - **[Next.js](https://nextjs.org/) (App Router):** For building a fast, server-rendered React application.

- **Generative AI:**
  - **[Google Gemini](https://deepmind.google/technologies/gemini/):** The underlying large language model for all AI features.
  - **[Genkit](https://firebase.google.com/docs/genkit):** The open-source framework used to build, deploy, and monitor the AI flows.

- **UI & Styling:**
  - **[React](https://react.dev/):** The core library for building the user interface.
  - **[ShadCN UI](https://ui.shadcn.com/):** A collection of beautifully designed, accessible, and reusable components.
  - **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapid styling.
  - **[Lucide React](https://lucide.dev/):** For clean and consistent icons.

- **State Management & Forms:**
  - **[Zustand](https://github.com/pmndrs/zustand):** For simple, lightweight global state management (e.g., patient list).
  - **[React Hook Form](https://react-hook-form.com/):** For performant and flexible form handling.
  - **[Zod](https://zod.dev/):** For schema validation to ensure data integrity.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install NPM packages:**
   ```sh
   npm install
   ```

3. **Set up Environment Variables:**
   - Create a new file named `.env` in the root of your project.
   - Add your Google Gemini API key to this file.
     ```.env
     GOOGLE_API_KEY=YOUR_API_KEY_HERE
     ```
   - You can get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4. **Run the development server:**
   ```sh
   npm run dev
   ```
   Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
