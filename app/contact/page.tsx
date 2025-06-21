// app/contact/page.tsx
//THis is the contact page server component
'use client';
export default function ContactPage() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const message = formData.get("message") as string;
        console.log({ name, email, message });
    };
    return (
        <main className="max-w-2xl mx-auto p-6 space-y-10 md:p-10 lg:p-16">
            <h1 className="text-3xl font-bold">Contact Us</h1>
            <p className="text-lg">
                Thank you for your interest in RuizTechServices|. Please fill out the form below to get in touch:
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <label htmlFor="name" className="block">
                    <span className="text-lg">Name:</span>
                    <input type="text" id="name" name="name" required className="block w-full px-4 py-2 mt-2 text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </label>
                <label htmlFor="email" className="block">
                    <span className="text-lg">Email:</span>
                    <input type="email" id="email" name="email" required className="block w-full px-4 py-2 mt-2 text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </label>
                <label htmlFor="message" className="block">
                    <span className="text-lg">Message:</span>
                    <textarea id="message" name="message" required className="block w-full px-4 py-2 mt-2 text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </label>
                <button type="submit" className="px-6 py-2 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
                    Send
                </button>
            </form>
        </main>
    );
}