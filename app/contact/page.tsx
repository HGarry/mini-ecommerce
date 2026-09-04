"use client";

import { FormEvent, useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined"
type FormData = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

const initialFormData: FormData = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitted(true);
    setFormData(initialFormData);
  };

  return (
    <div className="w-full min-w-0 box-border bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header Section */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-600 sm:text-sm">
            Get in touch
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            We'd Love to Hear from You
          </h1>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Have a question about an order, products, or anything else? Send us a
            message and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 items-start lg:grid-cols-12">
          {/* Contact Details Cards */}
          <div className="space-y-4 lg:col-span-5">
            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="shrink-0 rounded-xl bg-fuchsia-50 p-3 text-fuchsia-600">
                <PhoneIcon />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Phone</h3>
                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                  Mon - Sat, 9am - 6pm
                </p>
                <a
                  href="tel:+959123456789"
                  className="mt-2 block text-sm font-semibold text-slate-800 transition-colors hover:text-fuchsia-600"
                >
                  +95 9 123 456 789
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="shrink-0 rounded-xl bg-fuchsia-50 p-3 text-fuchsia-600">
                <EmailIcon />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Email</h3>
                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                  Replies within 24 hours
                </p>
                <a
                  href="mailto:support@shopper.com"
                  className="mt-2 block text-sm font-semibold text-slate-800 transition-colors hover:text-fuchsia-600"
                >
                  support@shopper.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="shrink-0 rounded-xl bg-fuchsia-50 p-3 text-fuchsia-600">
                <LocationOnIcon />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Store Location
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  No. 123, Pyay Road, Kamayut Township,
                  <br />
                  Yangon, Myanmar
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="shrink-0 rounded-xl bg-fuchsia-50 p-3 text-fuchsia-600">
                <AccessTimeIcon />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Opening Hours
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Monday – Saturday: 9:00 AM – 7:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
            {isSubmitted ? (
              <div className="space-y-4 py-10 text-center">
                <div className="inline-flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircleOutlineIcon sx={{ fontSize: 36 }} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Message Sent!
                </h2>
                <p className="mx-auto max-w-md text-sm text-slate-600">
                  Thank you for reaching out. We have received your message and
                  will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 inline-block rounded-lg bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="mb-6 text-xl font-bold text-slate-900">
                  Send us a Message
                </h2>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField
                    label="Full Name"
                    value={formData.fullName}
                    error={errors.fullName}
                    placeholder="John Doe"
                    onChange={(val) => handleChange("fullName", val)}
                  />
                  <FormField
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    error={errors.email}
                    placeholder="john@example.com"
                    onChange={(val) => handleChange("email", val)}
                  />
                </div>

                <FormField
                  label="Subject"
                  value={formData.subject}
                  error={errors.subject}
                  placeholder="Order Inquiry, Product Info, etc."
                  onChange={(val) => handleChange("subject", val)}
                />

                <label className="block text-xs font-semibold text-slate-700 sm:text-sm">
                  Message
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="How can we help you?"
                    className={`mt-1.5 w-full rounded-lg border bg-white p-3 text-sm font-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-100 ${
                      errors.message ? "border-red-400" : "border-slate-300"
                    }`}
                  />
                  {errors.message && (
                    <span className="mt-1 block text-xs font-normal text-red-600">
                      {errors.message}
                    </span>
                  )}
                </label>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:w-auto"
                >
                  <SendIcon sx={{ fontSize: 18 }} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  value,
  error,
  placeholder,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  error?: string;
  placeholder?: string;
  type?: string;
  onChange: (val: string) => void;
}) {
  return (
    <label className="block w-full text-xs font-semibold text-slate-700 sm:text-sm">
      {label}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1.5 w-full rounded-lg border bg-white px-3 py-2.5 text-sm font-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-100 ${
          error ? "border-red-400" : "border-slate-300"
        }`}
      />
      {error && (
        <span className="mt-1 block text-xs font-normal text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}