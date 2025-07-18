import { PageHeader } from "@/components/page-header";
import { ChatInterface } from "@/components/chat-interface";

export default function ChatbotPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="p-4 md:p-8 pt-6">
        <PageHeader
          title="AI Assistant"
          description="Ask questions about symptoms, treatments, or health topics."
        />
      </div>
      <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-4">
        <ChatInterface />
      </div>
    </div>
  );
}
