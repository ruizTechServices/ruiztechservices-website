// app/contact/page.tsx
// This is the contact page server component
import { ContactForm } from '@/components/forms/ContactForm';
import { ContactInfo } from '@/components/sections/ContactInfo';

export const metadata = {
  title: 'Contact RuizTechServices|',
  description:
    'Get in touch with RuizTechServices| for web development, AI integrations, and tech support in NYC.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let&apos;s discuss your project and how 
            RuizTechServices| can help you achieve your goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="order-2 lg:order-1">
            <ContactInfo />
          </div>
          
          <div className="order-1 lg:order-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}