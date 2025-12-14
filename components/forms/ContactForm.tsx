'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { submitContactForm, type ContactFormState } from '@/lib/actions/contact';
import { CheckCircle, AlertCircle, Check } from 'lucide-react';
import {
  helpTypeOptions,
  supportTypeOptions,
  urgencyOptions,
  budgetOptions,
  successMessage,
  formLabels,
} from '@/lib/forms/contactFields';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button 
      type="submit" 
      className="w-full" 
      disabled={pending}
    >
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export function ContactForm() {
  const initialState: ContactFormState = {};
  const [state, formAction] = useActionState(submitContactForm, initialState);

  if (state.success) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <CardTitle className="text-green-800 dark:text-green-400">
            {successMessage.title}
          </CardTitle>
          <CardDescription className="text-base">
            {successMessage.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              What happens next:
            </h4>
            <ul className="space-y-2">
              {successMessage.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Get In Touch</CardTitle>
        <CardDescription>
          Tell me about your challenge. The more context, the better.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-5">
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{formLabels.name}</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{formLabels.email}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* Help Type */}
          <div className="space-y-2">
            <Label htmlFor="helpType">{formLabels.helpType}</Label>
            <Select name="helpType" required>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {helpTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Support Type & Urgency Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supportType">{formLabels.supportType}</Label>
              <Select name="supportType" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  {supportTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency">{formLabels.urgency}</Label>
              <Select name="urgency" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Budget (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="budget">{formLabels.budget}</Label>
            <Select name="budget">
              <SelectTrigger>
                <SelectValue placeholder="Select range (optional)" />
              </SelectTrigger>
              <SelectContent>
                {budgetOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">{formLabels.message}</Label>
            <Textarea
              id="message"
              name="message"
              required
              placeholder="Describe your situation, what's broken, what you're trying to build, or any context that helps..."
              rows={4}
            />
          </div>

          <SubmitButton />

          {state.error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-red-800 text-sm">
                {state.error}
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
