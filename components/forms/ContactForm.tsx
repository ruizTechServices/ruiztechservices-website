"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { CheckCircle, AlertCircle, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitContactForm } from "@/lib/actions/contact";
import { serviceOptions, site } from "@/lib/content/site";

function SubmitButton({ byEmail }: { byEmail: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button className="cta w-full" type="submit" disabled={pending}>
      {pending
        ? "Sending your request…"
        : byEmail
          ? "Continue in email"
          : "Send request for review"}
      <ArrowRight size={18} aria-hidden="true" />
    </Button>
  );
}

export function ContactForm({
  initialService = "general",
  source = "",
  backendAvailable = true,
}: {
  initialService?: string;
  source?: string;
  backendAvailable?: boolean;
}) {
  const [state, action] = useActionState(submitContactForm, {});
  const [service, setService] = useState(initialService);
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
    websiteUrl: "",
    location: "",
    platform: "",
    timing: "",
  });
  const [consent, setConsent] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const update = (key: keyof typeof values, value: string) =>
    setValues((current) => ({ ...current, [key]: value }));
  const websiteService =
    service === "tech-rescue" || service === "web-development";
  const emailBody = [
    `Name: ${values.name}`,
    `Reply to: ${values.email}`,
    `Service: ${service}`,
    values.websiteUrl && `Website: ${values.websiteUrl}`,
    values.location && `Location: ${values.location}`,
    values.platform && `Platform: ${values.platform}`,
    values.timing && `Timing: ${values.timing}`,
    "",
    values.message,
  ]
    .filter(Boolean)
    .join("\n");
  const emailHref = `mailto:${site.email}?subject=${encodeURIComponent("Website inquiry: " + service)}&body=${encodeURIComponent(emailBody)}`;

  if (state.success)
    return (
      <div className="form-panel form-success" role="status">
        <CheckCircle size={36} aria-hidden="true" />
        <h2>Request received.</h2>
        <p>
          Your request is saved for Gio to review. This is an inquiry, not a
          confirmed booking or accepted Tech Rescue job.
        </p>
        <p>
          For a website fix, I’ll review the issue and agree on scope, timing,
          and the success criterion with you before payment.
        </p>
        <Link href="/projects" className="text-link">
          Explore the projects while you’re here
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    );

  return (
    <div className="form-panel">
      <h2>Tell me what you need.</h2>
      <p className="form-intro">
        {backendAvailable
          ? "No account or payment needed to send a request."
          : "Fill in the details, then continue in your email app. Review the prepared message and press Send there."}
      </p>
      <form
        action={backendAvailable ? action : undefined}
        onSubmit={(event) => {
          if (!backendAvailable) {
            event.preventDefault();
            window.location.href = emailHref;
          }
        }}
        className="space-y-5"
      >
        <div className="form-row">
          <div className="field">
            <Label htmlFor="name">Your name</Label>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>
          <div className="field">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <Label htmlFor="service">What can I help with?</Label>
          <Select
            name="service"
            value={service}
            onValueChange={setService}
            required
          >
            <SelectTrigger id="service" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {websiteService && (
          <>
            <div className="field">
              <Label htmlFor="websiteUrl">
                Website link{" "}
                {service === "tech-rescue" ? "" : "(if you have one)"}
              </Label>
              <Input
                id="websiteUrl"
                name="websiteUrl"
                type="url"
                autoComplete="url"
                placeholder="https://your-website.com"
                required={service === "tech-rescue"}
                maxLength={500}
                value={values.websiteUrl}
                onChange={(e) => update("websiteUrl", e.target.value)}
              />
            </div>
            <div className="field">
              <Label htmlFor="platform">
                Platform, hosting, or repository (optional)
              </Label>
              <Input
                id="platform"
                name="platform"
                maxLength={250}
                placeholder="Tell me what you know — ‘not sure’ is fine"
                value={values.platform}
                onChange={(e) => update("platform", e.target.value)}
              />
            </div>
          </>
        )}
        {service === "local-tech-help" && (
          <div className="field">
            <Label htmlFor="location">Neighborhood or borough</Label>
            <Input
              id="location"
              name="location"
              placeholder="For example: Fordham, Bronx"
              maxLength={150}
              value={values.location}
              onChange={(e) => update("location", e.target.value)}
            />
            <p className="field-hint">
              A neighborhood is enough for now. No street address needed.
            </p>
          </div>
        )}
        <div className="field">
          <Label htmlFor="message">What’s the problem or goal?</Label>
          <Textarea
            id="message"
            name="message"
            required
            minLength={20}
            maxLength={5000}
            rows={5}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="What should happen? What happens instead? Include your device or affected page, and what you’ve tried."
            aria-describedby="message-help"
          />
          <p id="message-help" className="field-hint">
            Please leave out passwords, payment details, and private customer
            data.
          </p>
        </div>
        <div className="field">
          <Label htmlFor="timing">Preferred timing (optional)</Label>
          <Input
            id="timing"
            name="timing"
            maxLength={150}
            placeholder="Any deadline or preferred day?"
            value={values.timing}
            onChange={(e) => update("timing", e.target.value)}
          />
        </div>
        <div className="form-honeypot" aria-hidden="true">
          <label htmlFor="companyWebsite">Leave this field empty</label>
          <input
            id="companyWebsite"
            name="companyWebsite"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <input type="hidden" name="source" value={source} />
        <label className="privacy-check">
          <input
            type="checkbox"
            name="privacy"
            value="accepted"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <span>
            I’ve read the{" "}
            <Link href="/privacy" target="_blank">
              privacy notice
            </Link>{" "}
            and understand my details will be used to respond to this request.
          </span>
        </label>
        {state.error && (
          <div className="form-error" role="alert">
            <AlertCircle size={20} aria-hidden="true" />
            <p>{state.error}</p>
          </div>
        )}
        <SubmitButton byEmail={!backendAvailable} />
      </form>
      <div className="email-fallback">
        <p>Prefer email{state.error ? " or need another way to send" : ""}?</p>
        <a href={emailHref} className="text-link">
          <Mail size={18} aria-hidden="true" />
          Email your request
        </a>
        <p className="field-hint">
          Opens your email app with your message. Review it, then press Send.
        </p>
        {(state.error || !backendAvailable) && (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(emailBody);
                  setCopyStatus(
                    "Copied. Paste it into an email to " + site.email,
                  );
                } catch {
                  setCopyStatus(
                    "Copy your message from the form and email " + site.email,
                  );
                }
              }}
            >
              Copy request text
            </Button>
            <p role="status" className="field-hint">
              {copyStatus}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
