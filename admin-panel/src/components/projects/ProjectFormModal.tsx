import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronUp, Save, Loader2 } from "lucide-react";
import type {
  ProjectResponse,
  ProjectCreatePayload,
  ProjectCategory,
} from "../../services/adminAPI";

interface ProjectFormModalProps {
  project?: ProjectResponse | null;
  onSubmit: (data: ProjectCreatePayload) => Promise<void>;
  onClose: () => void;
}

const CATEGORY_OPTIONS: { value: ProjectCategory; label: string }[] = [
  { value: "data-science", label: "Data Science" },
  { value: "web-app", label: "Web App" },
  { value: "system-design", label: "System Design" },
  { value: "chemical-research", label: "Chemical Research" },
];

const emptyForm: ProjectCreatePayload = {
  title: "",
  description: "",
  longDescription: "",
  image: "",
  tags: [],
  objectives: [],
  technologies: [],
  type: "",
  category: "data-science",
  methods: [],
  results: [],
  role: "",
  duration: "",
  tldr: "",
  githubLink: "",
  articleLink: "",
  liveDemoLink: "",
  company: "",
  coreStack: [],
  tools: [],
  implementation: [],
  challenges: [],
  solutions: [],
  keyImpactMetrics: [],
  ProblemStatement: "",
};

const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  project,
  onSubmit,
  onClose,
}) => {
  const isEdit = !!project;
  const [form, setForm] = useState<ProjectCreatePayload>({ ...emptyForm });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when editing
  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || "",
        description: project.description || "",
        longDescription: project.longDescription || "",
        image: project.image || "",
        tags: project.tags || [],
        objectives: project.objectives || [],
        technologies: project.technologies || [],
        type: project.type || "",
        category: project.category || "data-science",
        methods: project.methods || [],
        results: project.results || [],
        role: project.role || "",
        duration: project.duration || "",
        tldr: project.tldr || "",
        githubLink: project.githubLink || "",
        articleLink: project.articleLink || "",
        liveDemoLink: project.liveDemoLink || "",
        company: project.company || "",
        coreStack: project.coreStack || [],
        tools: project.tools || [],
        implementation: project.implementation || [],
        challenges: project.challenges || [],
        solutions: project.solutions || [],
        keyImpactMetrics: project.keyImpactMetrics || [],
        ProblemStatement: project.ProblemStatement || "",
      });
    }
  }, [project]);

  const setField = (key: keyof ProjectCreatePayload, value: string | string[] | number[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.longDescription.trim())
      errs.longDescription = "Long description is required";
    if (!form.image.trim()) errs.image = "Image URL is required";
    if (!form.type.trim()) errs.type = "Type is required";
    if (!form.role.trim()) errs.role = "Role is required";
    if (!form.duration.trim()) errs.duration = "Duration is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      // Clean up empty optional fields
      const cleaned = { ...form };
      if (!cleaned.tldr) delete cleaned.tldr;
      if (!cleaned.githubLink) delete cleaned.githubLink;
      if (!cleaned.articleLink) delete cleaned.articleLink;
      if (!cleaned.liveDemoLink) delete cleaned.liveDemoLink;
      if (!cleaned.company) delete cleaned.company;
      if (!cleaned.ProblemStatement) delete cleaned.ProblemStatement;
      if (cleaned.coreStack?.length === 0) delete cleaned.coreStack;
      if (cleaned.tools?.length === 0) delete cleaned.tools;
      if (cleaned.implementation?.length === 0) delete cleaned.implementation;
      if (cleaned.challenges?.length === 0) delete cleaned.challenges;
      if (cleaned.solutions?.length === 0) delete cleaned.solutions;
      if (cleaned.keyImpactMetrics?.length === 0) delete cleaned.keyImpactMetrics;
      await onSubmit(cleaned);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-10"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-3xl bg-white rounded-xl shadow-2xl mx-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">
              {isEdit ? "Edit Project" : "Add New Project"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={18} className="text-slate-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Core fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Title *"
                value={form.title}
                onChange={(v) => setField("title", v)}
                error={errors.title}
                placeholder="e.g. ML Pipeline for Fraud Detection"
              />
              <TextInput
                label="Type *"
                value={form.type}
                onChange={(v) => setField("type", v)}
                error={errors.type}
                placeholder="e.g. Competition, Research, Development"
              />
            </div>

            <TextArea
              label="Short Description *"
              value={form.description}
              onChange={(v) => setField("description", v)}
              error={errors.description}
              placeholder="A brief 1-2 sentence project summary"
              rows={2}
            />

            <TextArea
              label="Long Description *"
              value={form.longDescription}
              onChange={(v) => setField("longDescription", v)}
              error={errors.longDescription}
              placeholder="Full detailed description of the project"
              rows={4}
            />

            <TextInput
              label="Image URL *"
              value={form.image}
              onChange={(v) => setField("image", v)}
              error={errors.image}
              placeholder="https://images.unsplash.com/..."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SelectInput
                label="Category *"
                value={form.category}
                onChange={(v) => setField("category", v)}
                options={CATEGORY_OPTIONS}
              />
              <TextInput
                label="Role *"
                value={form.role}
                onChange={(v) => setField("role", v)}
                error={errors.role}
                placeholder="e.g. Lead Developer"
              />
              <TextInput
                label="Duration *"
                value={form.duration}
                onChange={(v) => setField("duration", v)}
                error={errors.duration}
                placeholder="e.g. Jan 2024 - Mar 2024"
              />
            </div>

            <TextInput
              label="Company (optional)"
              value={form.company || ""}
              onChange={(v) => setField("company", v)}
              placeholder="e.g. Google, IIT Kharagpur"
            />

            <TagsInput
              label="Tags"
              value={form.tags}
              onChange={(v) => setField("tags", v)}
              placeholder="Press Enter to add a tag"
            />

            <TagsInput
              label="Technologies"
              value={form.technologies}
              onChange={(v) => setField("technologies", v)}
              placeholder="Press Enter to add a technology"
            />

            <ListInput
              label="Objectives"
              value={form.objectives}
              onChange={(v) => setField("objectives", v)}
              placeholder="Add an objective"
            />

            <ListInput
              label="Methods"
              value={form.methods}
              onChange={(v) => setField("methods", v)}
              placeholder="Add a method"
            />

            <ListInput
              label="Results"
              value={form.results}
              onChange={(v) => setField("results", v)}
              placeholder="Add a result"
            />

            {/* Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TextInput
                label="GitHub Link"
                value={form.githubLink || ""}
                onChange={(v) => setField("githubLink", v)}
                placeholder="https://github.com/..."
              />
              <TextInput
                label="Article Link"
                value={form.articleLink || ""}
                onChange={(v) => setField("articleLink", v)}
                placeholder="https://medium.com/..."
              />
              <TextInput
                label="Live Demo Link"
                value={form.liveDemoLink || ""}
                onChange={(v) => setField("liveDemoLink", v)}
                placeholder="https://..."
              />
            </div>

            {/* Advanced Section */}
            <div className="border-t border-slate-200 pt-4">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {showAdvanced ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
                Advanced Fields
              </button>

              {showAdvanced && (
                <div className="mt-4 space-y-4">
                  <TextArea
                    label="TL;DR"
                    value={form.tldr || ""}
                    onChange={(v) => setField("tldr", v)}
                    placeholder="One-liner summary"
                    rows={2}
                  />

                  <TextArea
                    label="Problem Statement"
                    value={form.ProblemStatement || ""}
                    onChange={(v) => setField("ProblemStatement", v)}
                    placeholder="What problem does this project solve?"
                    rows={3}
                  />

                  <TagsInput
                    label="Core Stack"
                    value={form.coreStack || []}
                    onChange={(v) => setField("coreStack", v)}
                    placeholder="Press Enter to add"
                  />

                  <TagsInput
                    label="Tools"
                    value={form.tools || []}
                    onChange={(v) => setField("tools", v)}
                    placeholder="Press Enter to add"
                  />

                  <ListInput
                    label="Implementation Steps"
                    value={form.implementation || []}
                    onChange={(v) => setField("implementation", v)}
                    placeholder="Add an implementation step"
                  />

                  <ListInput
                    label="Key Impact Metrics"
                    value={form.keyImpactMetrics || []}
                    onChange={(v) => setField("keyImpactMetrics", v)}
                    placeholder="Add a metric"
                  />

                  <ListInput
                    label="Challenges"
                    value={form.challenges || []}
                    onChange={(v) => setField("challenges", v)}
                    placeholder="Add a challenge"
                  />

                  <ListInput
                    label="Solutions"
                    value={form.solutions || []}
                    onChange={(v) => setField("solutions", v)}
                    placeholder="Add a solution"
                  />
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                {isEdit ? "Update Project" : "Create Project"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectFormModal;

// ============= Reusable Sub-Components =============

function TextInput({
  label,
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
          error
            ? "border-red-300 focus:ring-red-500"
            : "border-slate-200 focus:ring-blue-500 focus:border-blue-500"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  error,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors resize-y ${
          error
            ? "border-red-300 focus:ring-red-500"
            : "border-slate-200 focus:ring-blue-500 focus:border-blue-500"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function SelectInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function TagsInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput("");
  };

  const removeTag = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">
        {label}
      </label>
      <div className="flex flex-wrap gap-1.5 p-2 border border-slate-200 rounded-lg min-h-[40px] bg-white">
        {value.map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(idx)}
              className="hover:text-blue-900"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          onBlur={addTag}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] outline-none text-sm bg-transparent"
        />
      </div>
    </div>
  );
}

function ListInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");

  const addItem = () => {
    const trimmed = input.trim();
    if (trimmed) {
      onChange([...value, trimmed]);
      setInput("");
    }
  };

  const removeItem = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">
        {label}
      </label>
      <div className="space-y-1.5">
        {value.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2 px-3 py-1.5 bg-slate-50 rounded-lg group"
          >
            <span className="text-xs text-slate-400 mt-0.5 select-none">
              {idx + 1}.
            </span>
            <span className="flex-1 text-sm text-slate-700">{item}</span>
            <button
              type="button"
              onClick={() => removeItem(idx)}
              className="p-0.5 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem();
              }
            }}
            placeholder={placeholder}
            className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addItem}
            disabled={!input.trim()}
            className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-40"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
