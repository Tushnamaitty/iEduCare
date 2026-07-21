import { useState } from "react";
import { Loader2, CheckCircle, Send } from "lucide-react";
import { API_BASE_URL } from "../../config";

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    student_name: "",
    parent_name: "",
    phone: "",
    email: "",
    grade: "Class 10",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/inquiries/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          student_name: "",
          parent_name: "",
          phone: "",
          email: "",
          grade: "Class 10",
          message: "",
        });
      } else {
        const data = await response.json();
        setError(JSON.stringify(data) || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-10 shadow-sm max-w-xl mx-auto">
      {success ? (
        <div className="text-center py-8">
          <div className="inline-flex w-14 h-14 bg-emerald-100 rounded-full items-center justify-center text-emerald-600 mb-4">
            <CheckCircle size={28} />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 mb-2">Inquiry Submitted!</h3>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-xs mx-auto">
            Thank you for reaching out. Nilesh Rai Sir or our branch office will get in touch with you shortly.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-6 text-[#D6242A] hover:underline text-sm font-semibold"
          >
            Submit another inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight">Send a Direct Message</h3>
            <p className="text-xs text-neutral-500 mt-1">
              Fill out the details below, and we will get back to you personally.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                Student Name
              </label>
              <input
                type="text"
                required
                value={formData.student_name}
                onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                placeholder="Student's name"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-3 px-4 text-sm text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-[#D6242A] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                Parent Name
              </label>
              <input
                type="text"
                required
                value={formData.parent_name}
                onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                placeholder="Parent/Guardian's name"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-3 px-4 text-sm text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-[#D6242A] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Contact number"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-3 px-4 text-sm text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-[#D6242A] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email address"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-3 px-4 text-sm text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-[#D6242A] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
              Class / Grade
            </label>
            <select
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-3 px-4 text-sm text-neutral-950 focus:outline-none focus:border-[#D6242A] transition-colors"
            >
              <option value="Class 7">Class 7</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 10">Class 10 (Board Batch)</option>
              <option value="Other">Other / General Enquiry</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
              Your Message
            </label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="How can Nilesh Rai Sir help you? Describe classes, doubts, or board syllabus details..."
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-3 px-4 text-sm text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-[#D6242A] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#D6242A] hover:bg-[#B81E23] text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send size={16} />
                Send Inquiry
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
