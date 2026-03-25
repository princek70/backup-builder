'use client';

import { useEffect, useState } from "react";
import { Save, AlertCircle, CheckCircle } from "lucide-react";

export default function EditLandingPage() {
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetch("/api/admin/landing-content")
      .then(res => res.json())
      .then(data => {
        setFormData(data);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/admin/landing-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Landing content updated successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to update landing content." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="animate-pulse flex items-center justify-center p-20">Loading Content Editor...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-primary tracking-tight">Edit Landing Page</h1>
          <p className="text-on-surface-variant">Customize the content shown on the public homepage.</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:translate-y-[-2px] transition-all disabled:opacity-50"
        >
          {saving ? "Saving..." : <><Save size={18} /> Save Changes</>}
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

      <form className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
        {/* Hero Section */}
        <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 space-y-6 md:col-span-2">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-outline-variant/10 pb-4">Hero Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Hero Tagline</label>
              <input name="heroTagline" value={formData.heroTagline} onChange={handleChange} className="ghost-input" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Hero Title</label>
              <input name="heroTitle" value={formData.heroTitle} onChange={handleChange} className="ghost-input" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Hero Subtitle</label>
              <textarea name="heroSubtitle" value={formData.heroSubtitle} onChange={handleChange} rows={3} className="ghost-input w-full resize-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Main CTA Button</label>
              <input name="heroCta" value={formData.heroCta} onChange={handleChange} className="ghost-input" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Secondary CTA Button</label>
              <input name="heroCtaSecondary" value={formData.heroCtaSecondary} onChange={handleChange} className="ghost-input" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1">Hero Image URL</label>
              <input name="heroImageUrl" value={formData.heroImageUrl} onChange={handleChange} className="ghost-input" />
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-outline-variant/10 pb-4">Feature Card 1</h2>
          <div className="space-y-4">
            <input name="feature1Title" value={formData.feature1Title} onChange={handleChange} placeholder="Title" className="ghost-input font-bold" />
            <textarea name="feature1Desc" value={formData.feature1Desc} onChange={handleChange} placeholder="Description" rows={3} className="ghost-input w-full resize-none text-sm" />
            <input name="feature1Icon" value={formData.feature1Icon} onChange={handleChange} placeholder="Icon Name" className="ghost-input text-xs italic" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-outline-variant/10 pb-4">Feature Card 2</h2>
          <div className="space-y-4">
            <input name="feature2Title" value={formData.feature2Title} onChange={handleChange} placeholder="Title" className="ghost-input font-bold" />
            <textarea name="feature2Desc" value={formData.feature2Desc} onChange={handleChange} placeholder="Description" rows={3} className="ghost-input w-full resize-none text-sm" />
            <input name="feature2Icon" value={formData.feature2Icon} onChange={handleChange} placeholder="Icon Name" className="ghost-input text-xs italic" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-outline-variant/10 pb-4">Feature Card 3</h2>
          <div className="space-y-4">
            <input name="feature3Title" value={formData.feature3Title} onChange={handleChange} placeholder="Title" className="ghost-input font-bold" />
            <textarea name="feature3Desc" value={formData.feature3Desc} onChange={handleChange} placeholder="Description" rows={3} className="ghost-input w-full resize-none text-sm" />
            <input name="feature3Icon" value={formData.feature3Icon} onChange={handleChange} placeholder="Icon Name" className="ghost-input text-xs italic" />
          </div>
        </div>

        {/* Editorial Section */}
        <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary border-b border-outline-variant/10 pb-4">Editorial Branding</h2>
          <div className="space-y-4">
            <input name="editorialTagline" value={formData.editorialTagline} onChange={handleChange} placeholder="Tagline" className="ghost-input uppercase tracking-wider text-[10px]" />
            <input name="editorialTitle" value={formData.editorialTitle} onChange={handleChange} placeholder="Main Title" className="ghost-input font-bold" />
            <div className="space-y-4 pt-4">
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/10">
                <input name="editorialPoint1Title" value={formData.editorialPoint1Title} onChange={handleChange} placeholder="Point 1 Title" className="bg-transparent border-none focus:outline-none font-bold text-xs w-full mb-1" />
                <textarea name="editorialPoint1Desc" value={formData.editorialPoint1Desc} onChange={handleChange} placeholder="Point 1 Description" className="bg-transparent border-none focus:outline-none text-xs w-full resize-none" rows={2} />
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/10">
                <input name="editorialPoint2Title" value={formData.editorialPoint2Title} onChange={handleChange} placeholder="Point 2 Title" className="bg-transparent border-none focus:outline-none font-bold text-xs w-full mb-1" />
                <textarea name="editorialPoint2Desc" value={formData.editorialPoint2Desc} onChange={handleChange} placeholder="Point 2 Description" className="bg-transparent border-none focus:outline-none text-xs w-full resize-none" rows={2} />
              </div>
            </div>
            <input name="editorialImageUrl" value={formData.editorialImageUrl} onChange={handleChange} placeholder="Editorial Image URL" className="ghost-input text-xs italic mt-4" />
          </div>
        </div>
      </form>
    </div>
  );
}
