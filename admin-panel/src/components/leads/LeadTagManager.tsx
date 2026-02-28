import React, { useState } from "react";
import { X, Plus } from "lucide-react";

interface LeadTagManagerProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

const SUGGESTED_TAGS = ["hot-lead", "follow-up", "hiring", "collaboration", "student", "enterprise", "startup", "referral"];

const LeadTagManager: React.FC<LeadTagManagerProps> = ({ tags, onTagsChange }) => {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addTag = (tag: string) => {
    const trimmed = tag.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      onTagsChange([...tags, trimmed]);
    }
    setInput("");
    setShowSuggestions(false);
  };

  const removeTag = (tag: string) => {
    onTagsChange(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      addTag(input);
    }
  };

  const unusedSuggestions = SUGGESTED_TAGS.filter((t) => !tags.includes(t));

  return (
    <div>
      <h4 className="text-sm font-bold text-slate-900 mb-3">Tags</h4>
      
      {/* Current Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
            >
              <X size={10} />
            </button>
          </span>
        ))}
        {tags.length === 0 && (
          <span className="text-xs text-slate-400 italic">No tags added</span>
        )}
      </div>

      {/* Add Tag Input */}
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder="Add a tag..."
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />

        {/* Suggestions dropdown */}
        {showSuggestions && unusedSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10 p-2">
            <div className="text-[10px] text-slate-400 uppercase font-bold px-2 mb-1">Suggestions</div>
            <div className="flex flex-wrap gap-1">
              {unusedSuggestions.map((tag) => (
                <button
                  key={tag}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => addTag(tag)}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-slate-50 text-slate-600 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-colors border border-slate-200"
                >
                  <Plus size={10} />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadTagManager;
