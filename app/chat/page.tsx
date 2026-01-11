import { ChatbotPanel } from "@/components/main/ChatbotPanel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chat | ruizTechServices",
  description: "Chat with our advanced AI assistant.",
};

export default function ChatPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">AI Assistant</h1>
        <p className="text-muted-foreground">
          Use your credits to chat with advanced AI models. Each response costs 1 credit.
        </p>
      </div>
      <ChatbotPanel />
    </div>
  );
}
