import React, { useState, useEffect } from "react";
import { Settings, Save, Download, ToggleLeft, ToggleRight, User } from "lucide-react";
import adminAPI from "../services/adminAPI";
import TopBar from "../components/layout/TopBar";
import PageTransition from "../components/shared/PageTransition";
import { useToast } from "../hooks/useToast";

const ContentManagementPage: React.FC = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"flags" | "about" | "backup">("flags");
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [aboutData, setAboutData] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const [settingsRes, aboutRes] = await Promise.all([
        adminAPI.getSiteSettings(),
        adminAPI.getAboutContent().catch(() => null)
      ]);
      setSettings(settingsRes.settings || {});
      if (aboutRes) setAboutData(aboutRes);
    } catch {
      showToast("Failed to load content settings.", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleFlag = async (key: string, currentValue: boolean) => {
    const newValue = !currentValue;
    setSettings((prev) => ({ ...prev, [key]: newValue }));
    try {
      await adminAPI.updateSiteSettings({ [key]: newValue });
      showToast(`Updated '${key}' setting to ${newValue}`, "success");
    } catch {
      showToast("Failed to update setting.", "error");
      setSettings((prev) => ({ ...prev, [key]: currentValue }));
    }
  };

  const handleSaveAbout = async () => {
    if (!aboutData) return;
    setSaving(true);
    try {
      await adminAPI.updateAboutContent(aboutData);
      showToast("About & Profile content saved successfully!", "success");
    } catch {
      showToast("Failed to update About content.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleBackup = async () => {
    try {
      await adminAPI.triggerDatabaseBackup();
      showToast("Full database backup downloaded successfully!", "success");
    } catch {
      showToast("Failed to generate database backup.", "error");
    }
  };

  return (
    <PageTransition>
      <TopBar
        title="Website Content & Maintainability"
        subtitle="Manage website feature flags, profile content, maintenance mode, and backups"
        onRefresh={fetchData}
        actions={
          <div className="flex gap-2">
            <button
              onClick={handleBackup}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" /> Export DB Backup
            </button>
          </div>
        }
      />

      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Minimal Tabs (Google Workspace Style) */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab("flags")}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === "flags"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 font-semibold"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <Settings className="w-4 h-4" /> Feature Flags & Site Controls
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === "about"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 font-semibold"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <User className="w-4 h-4" /> Profile & Bio Content Editor
          </button>
          <button
            onClick={() => setActiveTab("backup")}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === "backup"
                ? "border-blue-600 text-blue-600 dark:text-blue-400 font-semibold"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <Download className="w-4 h-4" /> Backup & Data Maintenance
          </button>
        </div>

        {/* TAB 1: Feature Flags */}
        {activeTab === "flags" && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Settings className="w-4 h-4 text-blue-500" /> Website Feature Toggles & Emergency Controls
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {/* Maintenance Mode */}
              <div className="py-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Maintenance Mode</p>
                  <p className="text-xs text-slate-500">Temporarily display a clean maintenance landing page to visitors.</p>
                </div>
                <button onClick={() => handleToggleFlag("maintenance_mode", !!settings.maintenance_mode)}>
                  {settings.maintenance_mode ? (
                    <ToggleRight className="w-8 h-8 text-blue-600" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                  )}
                </button>
              </div>

              {/* Open to Work Badge */}
              <div className="py-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">"Open to Work" Availability Status</p>
                  <p className="text-xs text-slate-500">Displays the active green availability pill badge across hero section and contact page.</p>
                </div>
                <button onClick={() => handleToggleFlag("open_to_work", !!settings.open_to_work)}>
                  {settings.open_to_work ? (
                    <ToggleRight className="w-8 h-8 text-blue-600" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                  )}
                </button>
              </div>

              {/* Recruiter Gateway */}
              <div className="py-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Recruiter Role Gateway Modal</p>
                  <p className="text-xs text-slate-500">Prompts visitors for intent role (Recruiter, Software Engineer, Researcher) to capture lead metadata.</p>
                </div>
                <button onClick={() => handleToggleFlag("recruiter_gateway_enabled", !!settings.recruiter_gateway_enabled)}>
                  {settings.recruiter_gateway_enabled ? (
                    <ToggleRight className="w-8 h-8 text-blue-600" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                  )}
                </button>
              </div>

              {/* Contact Form Kill-Switch */}
              <div className="py-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Contact Form Submissions</p>
                  <p className="text-xs text-slate-500">Emergency switch to enable or pause incoming contact form inquiries.</p>
                </div>
                <button onClick={() => handleToggleFlag("contact_form_enabled", !!settings.contact_form_enabled)}>
                  {settings.contact_form_enabled ? (
                    <ToggleRight className="w-8 h-8 text-blue-600" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Profile & Bio Content Editor */}
        {activeTab === "about" && aboutData && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" /> Bio & Personal Snapshot Editor
              </h3>
              <button
                onClick={handleSaveAbout}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" /> {saving ? "Saving..." : "Save Profile Content"}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={aboutData.personal?.name || ""}
                  onChange={(e) =>
                    setAboutData({
                      ...aboutData,
                      personal: { ...aboutData.personal, name: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Hero Tagline</label>
                <input
                  type="text"
                  value={aboutData.personal?.tagline || ""}
                  onChange={(e) =>
                    setAboutData({
                      ...aboutData,
                      personal: { ...aboutData.personal, tagline: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Greeting / Bio Headline</label>
                <input
                  type="text"
                  value={aboutData.bio?.greeting || ""}
                  onChange={(e) =>
                    setAboutData({
                      ...aboutData,
                      bio: { ...aboutData.bio, greeting: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Call To Action Text</label>
                <textarea
                  rows={2}
                  value={aboutData.bio?.callToAction || ""}
                  onChange={(e) =>
                    setAboutData({
                      ...aboutData,
                      bio: { ...aboutData.bio, callToAction: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Backup & Maintenance */}
        {activeTab === "backup" && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Download className="w-4 h-4 text-blue-500" /> Database Backup & Content Archive
            </h3>
            <p className="text-xs text-slate-500">
              Download a complete snapshot of all portfolio projects, contact leads, metadata, and site configuration settings in structured JSON format.
            </p>

            <div className="pt-2">
              <button
                onClick={handleBackup}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" /> Download Complete JSON Backup
              </button>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default ContentManagementPage;
