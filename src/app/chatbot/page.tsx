import { AppLayout } from "@/components/app-layout";
import { PageHeader } from "@/components/page-header";
import { ChatInterface } from "@/components/chat-interface";

export default function ChatbotPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 md:p-8 pt-6">
          <PageHeader
            title="AI Assistant"
            description="Ask questions about symptoms, treatments, or health topics."
          />
        </div>
        <div className="flex-1 overflow-hidden px-4 md:px-8 pb-4">
          <ChatInterface />
        </div>
      </div>
    </AppLayout>
  );
}
