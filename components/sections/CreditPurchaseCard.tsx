'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Zap } from "lucide-react";
import { createCheckoutSession } from "@/lib/actions/stripe";
import { useAuth } from "@/hooks/use-auth";
import { useFormStatus } from "react-dom";

function PurchaseButton() {
    const { pending } = useFormStatus();
    const { user } = useAuth();

    return (
        <Button
            type="submit"
            size="lg"
            disabled={pending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 py-6 text-lg font-bold"
        >
            {pending ? "Processing..." : user ? "Purchase Now" : "Sign in to Purchase"}
        </Button>
    );
}

export function CreditPurchaseCard() {
    return (
        <Card className="border-blue-500 border-2 shadow-xl bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Coins className="h-24 w-24 text-blue-600" />
            </div>

            <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full w-fit mb-4">
                    <Zap className="h-6 w-6 text-blue-600 animate-pulse" />
                </div>
                <CardTitle className="text-2xl font-bold">AI Credit Pack</CardTitle>
                <CardDescription className="text-blue-600 dark:text-blue-400 font-semibold p-2">
                    Boost your productivity with AI
                </CardDescription>
            </CardHeader>

            <CardContent className="text-center pt-4">
                <div className="mb-6">
                    <span className="text-5xl font-extrabold text-gray-900 dark:text-white">$10</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">/ 100 credits</span>
                </div>

                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300 mb-8 text-left max-w-[200px] mx-auto">
                    <li className="flex items-center gap-2 font-medium">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        100 High-Speed Inferences
                    </li>
                    <li className="flex items-center gap-2 font-medium">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        Mistral & GPT-4 Access
                    </li>
                    <li className="flex items-center gap-2 font-medium">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        Commercial Usage Rights
                    </li>
                </ul>

                <form action={createCheckoutSession}>
                    <PurchaseButton />
                </form>

                <p className="mt-4 text-xs text-gray-400">
                    Secure payment via Stripe. Credits added instantly.
                </p>
            </CardContent>
        </Card>
    );
}
