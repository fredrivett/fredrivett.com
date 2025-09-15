import React, { useState } from "react";

import { Mail } from "lucide-react";

import { cn } from "lib/cn";

interface EmailSubscribeProps {
  className?: string;
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
  title?: string;
  description?: string;
}

const EmailSubscribe: React.FC<EmailSubscribeProps> = ({
  className = "",
  placeholder = "[Your email address]",
  buttonText = "Subscribe",
  successMessage = "Thanks! Please check your inbox to confirm your email address.",
  title = "Stay in touch?",
  description = "Should you want to stay up to date with my posts, pop your email in below:",
}) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        const data = await response.json();
        setStatus("error");
        setErrorMessage(
          data.error || "Something went wrong. Please try again.",
        );
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <div
      className={cn(
        "p-6 bg-gray-100 border border-gray-300 dark:border-gray-900 dark:bg-gray-900/50 rounded-md max-w-[34rem] my-10",
        className,
      )}
    >
      <h3 className="text-xl font-semibold !mt-0 mb-2 flex items-baseline gap-2">
        <Mail
          size={18}
          className="text-gray-600 dark:text-gray-600 translate-y-px"
        />
        {title}
      </h3>
      {description && (
        <p className="text-gray-600 dark:text-gray-600 mb-4 text-sm">
          {description}
        </p>
      )}

      {status === "success" ? (
        <div className="p-4 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <p className="text-green-800 text-sm mb-0 dark:text-green-200 text-center">
            {successMessage}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              disabled={status === "loading"}
              className="flex-1 px-3 py-2 bg-transparent border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 placeholder:text-gray-600 dark:placeholder:text-gray-600 focus:outline-none focus:border-gray-400 dark:focus:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            />
            <button
              type="submit"
              disabled={status === "loading" || !email}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            >
              {status === "loading" ? "Subscribing..." : buttonText}
            </button>
          </div>
          {status === "error" && (
            <p className="text-red-600 text-sm">{errorMessage}</p>
          )}
        </form>
      )}
    </div>
  );
};

export default EmailSubscribe;
