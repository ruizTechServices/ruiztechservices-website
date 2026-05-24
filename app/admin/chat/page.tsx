import { ChatbotPanel } from "@/components/main/ChatbotPanel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin AI Chat | RuizTechServices",
  description: "Internal AI assistant for RuizTechServices admins.",
};

export default function AdminChatPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Admin AI Assistant</h1>
          <p className="text-muted-foreground">
            Internal chatbot access for admin users.
          </p>
        </div>
        <ChatbotPanel />
      </div>
    </main>
  );
}
