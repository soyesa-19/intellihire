"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const InterviewForm = ({ userId }: { userId: string }) => {
  const [form, setForm] = useState({
    type: "",
    role: "",
    level: "",
    techstack: "",
    amount: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const levels = ["Fresher", "Intermediate", "Advanced", "Expert"];

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.type) newErrors.type = "Type is required";
    if (!form.role) newErrors.role = "Role is required";
    if (!form.level) newErrors.level = "Level is required";
    if (!form.techstack) newErrors.techstack = "Techstack is required";
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) < 1)
      newErrors.amount = "No. of questions must be a positive number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          userId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setForm({
          type: "technical",
          role: "",
          level: "",
          techstack: "",
          amount: "",
        });
        alert("Interview generated successfully!");
        router.push("/");
      }
    } catch (err) {
      setErrors({ submit: "Failed to generate interview. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-border w-[70%] mx-auto mt-12 shadow-2xl rounded-2xl bg-light-900">
      <form className="flex flex-col gap-7 py-10 px-8" onSubmit={handleSubmit}>
        <h3 className="text-3xl font-bold text-primary-100 mb-4 text-center tracking-wide">
          Interview Generation
        </h3>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="type"
            className="text-base font-semibold text-primary-200 mb-1"
          >
            Type
          </label>
          <select
            name="type"
            id="type"
            value={form.type}
            onChange={handleChange}
            className="input bg-light-800 border border-light-700 rounded-lg px-4 py-2 text-primary-100 focus:outline-primary-200"
          >
            <option value="">Select Type</option>
            <option value="technical">Technical</option>
          </select>
          {errors.type && (
            <span className="text-red-500 text-sm mt-1">{errors.type}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="role"
            className="text-base font-semibold text-primary-200 mb-1"
          >
            Role
          </label>
          <input
            type="text"
            name="role"
            id="role"
            value={form.role}
            onChange={handleChange}
            className="input bg-light-800 border border-light-700 rounded-lg px-4 py-2 text-primary-100 focus:outline-primary-200"
            placeholder="e.g. Frontend Developer"
          />
          {errors.role && (
            <span className="text-red-500 text-sm mt-1">{errors.role}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="level"
            className="text-base font-semibold text-primary-200 mb-1"
          >
            Level
          </label>
          <select
            name="level"
            id="level"
            value={form.level}
            onChange={handleChange}
            className="input bg-light-800 border border-light-700 rounded-lg px-4 py-2 text-primary-100 focus:outline-primary-200"
          >
            <option value="">Select Level</option>
            {levels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
          {errors.level && (
            <span className="text-red-500 text-sm mt-1">{errors.level}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="techstack"
            className="text-base font-semibold text-primary-200 mb-1"
          >
            Techstack
          </label>
          <input
            type="text"
            name="techstack"
            id="techstack"
            value={form.techstack}
            onChange={handleChange}
            className="input bg-light-800 border border-light-700 rounded-lg px-4 py-2 text-primary-100 focus:outline-primary-200"
            placeholder="e.g. React, Node.js"
          />
          {errors.techstack && (
            <span className="text-red-500 text-sm mt-1">
              {errors.techstack}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="amount"
            className="text-base font-semibold text-primary-200 mb-1"
          >
            No. of Questions
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={form.amount}
            onChange={handleChange}
            className="input bg-light-800 border border-light-700 rounded-lg px-4 py-2 text-primary-100 focus:outline-primary-200"
            min={1}
            placeholder="e.g. 5"
          />
          {errors.amount && (
            <span className="text-red-500 text-sm mt-1">{errors.amount}</span>
          )}
        </div>

        {errors.submit && (
          <span className="text-red-500 text-sm mt-2 text-center">
            {errors.submit}
          </span>
        )}
        {success && (
          <span className="text-green-600 text-sm mt-2 text-center">
            Interview generated successfully!
          </span>
        )}

        <Button
          className="btn-primary mt-6 w-full py-3 text-lg font-semibold rounded-lg"
          type="submit"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Interview"}
        </Button>
      </form>
    </div>
  );
};

export default InterviewForm;
