/**
 * ProjectsContext
 *
 * Fetches projects from the backend API (PostgreSQL via Neon) on app mount
 * and provides them globally to all pages/components.
 *
 * Falls back to a small static dataset when the API is unreachable so the
 * projects page is never completely blank.
 *
 * Usage in any component:
 *   const { projects, loading, error } = useProjects();
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';
import type { Project } from '../data/projectsData';

/* ─── Static fallback projects (shown when the API is down) ─── */
const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1001,
    title: 'Amazon ML Challenge — Top 0.5%',
    description:
      'Built an end-to-end ML pipeline for product attribute extraction from images, placing in the top 0.5% out of 75,000+ participants.',
    longDescription:
      'Developed a multi-modal deep learning system combining vision transformers with OCR-based text extraction to predict product attributes from e-commerce images. The pipeline included automated data cleaning, feature engineering, and ensemble inference.',
    image: '/placeholder-project.png',
    tags: ['Computer Vision', 'NLP', 'PyTorch', 'Top 0.5%'],
    type: 'Competition',
    category: 'data-science',
    objectives: ['Extract product attributes from images at scale', 'Achieve top ranking among 75k+ teams'],
    technologies: ['Python', 'PyTorch', 'Transformers', 'EasyOCR'],
    methods: ['Vision Transformers', 'OCR text extraction', 'Ensemble methods'],
    results: ['Top 0.5% ranking', 'Processed 1M+ product images'],
    role: 'ML Engineer',
    duration: 'Oct 2024',
  },
  {
    id: 1002,
    title: 'Portfolio & Admin Platform',
    description:
      'Full-stack portfolio website with a production-grade admin panel, role-based access, and automated lead intelligence pipeline.',
    longDescription:
      'Designed and built this very portfolio site using React, Tailwind CSS, FastAPI, and PostgreSQL. Features include dynamic role gating, recruiter verification, automated email workflows, and a separate admin panel with real-time analytics.',
    image: '/placeholder-project.png',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'Full Stack', 'Deployed'],
    type: 'Personal Project',
    category: 'web-app',
    objectives: ['Build a production-grade portfolio', 'Implement role-based access control'],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'PostgreSQL'],
    methods: ['REST API design', 'JWT auth', 'Role-based gating'],
    results: ['Live at arpitkumar.dev', 'Serves 50k+ visitors'],
    role: 'Full Stack Developer',
    duration: 'Jan 2025 – Present',
  },
  {
    id: 1003,
    title: 'Healthcare Risk Scorecard',
    description:
      'Social & healthcare risk scorecard using decision trees and ensemble methods, achieving 82.89% accuracy and 1st rank in IIT KGP competition.',
    longDescription:
      'Created a Social and Healthcare Risk Scorecard in collaboration with Evva Health. Used decision tree algorithms and web-scraped community data. Advanced statistical techniques including Bifactor and MIRT analysis were used to score patient questionnaire responses.',
    image: '/placeholder-project.png',
    tags: ['Healthcare', 'Data Analytics', 'Ensemble Methods', 'Gold'],
    type: 'Competition',
    category: 'data-science',
    objectives: ['Develop a risk scorecard for healthcare assessment', 'Achieve high classification accuracy'],
    technologies: ['Python', 'Streamlit', 'BERT', 'scikit-learn'],
    methods: ['Ensemble learning', 'Bifactor analysis', 'Decision trees'],
    results: ['1st place', '82.89% accuracy'],
    role: 'Data Scientist',
    duration: 'Dec 2023 – Feb 2024',
  },
];

interface ProjectsContextValue {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextValue>({
  projects: [],
  loading: true,
  error: null,
  refetch: async () => {},
});

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const url = buildApiUrl(API_ENDPOINTS.PROJECTS_PUBLIC);
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch projects: ${res.status} ${res.statusText}`);
      }
      const data: Project[] = await res.json();
      setProjects(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load projects';
      setError(message);
      console.error('ProjectsContext: fetch error:', message);
      // Use fallback data so the page is never blank
      setProjects(FALLBACK_PROJECTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <ProjectsContext.Provider value={{ projects, loading, error, refetch: fetchProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

/**
 * Hook to access projects from the database.
 * Returns { projects, loading, error, refetch }.
 */
export const useProjects = (): ProjectsContextValue => {
  return useContext(ProjectsContext);
};

export default ProjectsContext;
