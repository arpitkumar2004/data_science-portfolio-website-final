/** What we store in localStorage when a recruiter is verified */
export interface RecruiterProfile {
  fullName: string;
  email: string;
  company: string;
  verifiedAt: string; // ISO timestamp
}

const STORAGE_KEY = 'recruiterProfile';

/** Check if a verified recruiter profile exists */
export const getRecruiterProfile = (): RecruiterProfile | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: RecruiterProfile = JSON.parse(raw);
    // Basic sanity check
    if (parsed.email && parsed.fullName && parsed.company) return parsed;
    return null;
  } catch {
    return null;
  }
};

/** Persist recruiter profile */
export const saveRecruiterProfile = (profile: RecruiterProfile) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
};

/** Clear recruiter verification (used when switching away from Recruiter role) */
export const clearRecruiterProfile = () => {
  localStorage.removeItem(STORAGE_KEY);
};
