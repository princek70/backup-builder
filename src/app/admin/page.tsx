'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  MousePointerClick, 
  Settings as SettingsIcon, 
  Clock, 
  CheckCircle2 
} from "lucide-react";

export default function AdminOverview() {
  const [stats, setStats] = useState({
    siteName: "",
    lastUpdated: "",
    settingsCount: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const [settingsRes, contentRes] = await Promise.all([
        fetch("/api/admin/settings"),
        fetch("/api/admin/landing-content")
      ]);
      
      const settings = await settingsRes.json();
      const content = await contentRes.json();
      
      setStats({
        siteName: settings.site_name || "ArchitectAI",
        lastUpdated: new Date(content.updatedAt).toLocaleDateString(),
        settingsCount: Object.keys(settings).length
      });
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-black text-primary tracking-tight mb-2">Dashboard Overview</h1>
        <p className="text-on-surface-variant">Welcome back. Here's a summary of your application's state.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border border-outline-variant/10">
          <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary mb-4">
            <CheckCircle2 size={24} />
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Site Identity</div>
          <div className="text-xl font-bold text-primary">{stats.siteName}</div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border border-outline-variant/10">
          <div className="w-12 h-12 rounded-xl bg-secondary/5 flex items-center justify-center text-secondary mb-4">
            <SettingsIcon size={24} />
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Total Settings</div>
          <div className="text-xl font-bold text-primary">{stats.settingsCount} Keys</div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border border-outline-variant/10">
          <div className="w-12 h-12 rounded-xl bg-tertiary/5 flex items-center justify-center text-tertiary mb-4">
            <Clock size={24} />
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">Content Sync</div>
          <div className="text-xl font-bold text-primary">Last: {stats.lastUpdated}</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-primary mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/landing" className="group">
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all hover:translate-y-[-4px] shadow-sm hover:shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <MousePointerClick size={20} />
                </div>
                <h3 className="font-bold text-lg text-primary">Edit Landing Page</h3>
              </div>
              <p className="text-on-surface-variant text-sm">Update hero text, images, and feature descriptions displayed on the homepage.</p>
            </div>
          </Link>

          <Link href="/admin/settings" className="group">
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all hover:translate-y-[-4px] shadow-sm hover:shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <SettingsIcon size={20} />
                </div>
                <h3 className="font-bold text-lg text-primary">Global Settings</h3>
              </div>
              <p className="text-on-surface-variant text-sm">Manage site name, footer copyright, and contact information used across the application.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
