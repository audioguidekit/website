"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          access_key: "07dbf778-f3e4-46d7-b1e4-7be06abea5ee",
          name: formData.name,
          email: formData.email,
          subject: `Contact Form: ${formData.name}${formData.organization ? ` from ${formData.organization}` : ""}`,
          message: `Organization: ${formData.organization || "Not provided"}\n\n${formData.message}`,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", organization: "", message: "" });

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setStatus("idle");
      }, 2000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(
        "Failed to send message. Please try again or email us directly.",
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-background border border-border rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-[20px] font-bold text-foreground">
              Get in touch
            </h2>
            <p className="text-[14px] text-muted-foreground mt-1">
              Have questions or need help? Contact us below.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-[14px] font-medium text-foreground mb-2"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 text-[15px] bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-[14px] font-medium text-foreground mb-2"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 text-[15px] bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="organization"
              className="block text-[14px] font-medium text-foreground mb-2"
            >
              Organization
            </label>
            <input
              type="text"
              id="organization"
              value={formData.organization}
              onChange={(e) =>
                setFormData({ ...formData, organization: e.target.value })
              }
              className="w-full px-3 py-2 text-[15px] bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="Organization name"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-[14px] font-medium text-foreground mb-2"
            >
              Message *
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-3 py-2 text-[15px] bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
              placeholder="Tell us about your project and requirements..."
            />
          </div>

          {status === "error" && (
            <p className="text-[14px] text-red-500">{errorMessage}</p>
          )}

          {status === "success" && (
            <p className="text-[14px] text-green-600">
              Message sent successfully!
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending" || status === "success"}
            className="w-full bg-primary text-primary-foreground hover:opacity-90 font-medium h-11 px-6 rounded-full transition-all text-[15px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {status === "sending"
              ? "Sending..."
              : status === "success"
                ? "Sent!"
                : "Send message"}
          </button>
        </form>
      </div>
    </div>
  );
}
