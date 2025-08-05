"use client";
import { useState } from "react";

export default function CopyInterviewLink({
  interviewId,
}: {
  interviewId?: string;
}) {
  const [copied, setCopied] = useState(false);
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/interview/${interviewId}`
      : `/${interviewId}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="ml-2 p-2 rounded-full hover:bg-light-200 transition relative"
      title="Copy interview link"
    >
      <svg
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 20 20"
        className="text-primary-200"
      >
        <path
          d="M7 13V17C7 18.1046 7.89543 19 9 19H15C16.1046 19 17 18.1046 17 17V11C17 9.89543 16.1046 9 15 9H13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="3"
          y="3"
          width="8"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      {copied && (
        <span className="absolute top-[-28px] left-1/2 -translate-x-1/2 bg-primary-200 text-white text-xs px-2 py-1 rounded shadow">
          Copied!
        </span>
      )}
    </button>
  );
}
