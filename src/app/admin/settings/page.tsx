'use client';

import { useEffect, useState } from "react";
import { Save, AlertCircle, CheckCircle } from "lucide-react";

export default function EditSiteSettings() {
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then(res => res.json())
      .then(data => {
        setFormData(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Global settings updated successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to update settings." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="animate-pulse flex items-center justify-center p-20">Loading Settings...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-primary tracking-tight">Site Settings</h1>
          <p className="text-on-surface-variant">Global configurations for your application identity.</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:translate-y-[-2px] transition-all disabled:opacity-50"
        >
          {saving ? "Saving..." : <><Save size={18} /> Save Settings</>}
        </button>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl flex items-center gap-3 font-semibold text-sm ${
          message.type === "success" ? "bg-green-50 text-green-700" : "bg-error-container text-on-error-container"
        }`}>
          {message.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {message.text}
        </div>
      )}

      <div className="bg-surface-container-lowest p-10 rounded-2xl border border-outline-variant/10 max-w-2xl">
        <form className="space-y-10">
          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Application Name</label>
            <input name="site_name" value={formData.site_name} onChange={handleChange} className="ghost-input text-lg font-bold" placeholder="e.g. ArchitectAI" />
            <p className="text-[10px] text-on-surface-variant px-1 italic">Displays in the header and page titles.</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Footer Copyright</label>
            <input name="footer_copyright" value={formData.footer_copyright} onChange={handleChange} className="ghost-input" placeholder="e.g. © 2024 ArchitectAI" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Contact Email</label>
            <input name="contact_email" value={formData.contact_email} onChange={handleChange} type="email" className="ghost-input" placeholder="hello@site.com" />
          </div>
        </form>
      </div>
    </div>
  );
}
