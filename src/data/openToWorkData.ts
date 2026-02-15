export type OpenRole = {
  title: string;
  field: string;
  level?: string;
  description?: string;
  tags?: string[];
};

export const openToWorkPositions: OpenRole[] = [
  {
    title: 'Deep Learning Research',
    field: 'Research & Innovation',
    level: 'Internship',
    description: 'Passionate about cutting-edge ML research. Strong foundation in neural architectures, optimization, and experimental design.',
    tags: ['PyTorch', 'Computer Vision', 'NLP', 'Research Papers']
  },
  {
    title: 'ML Engineering',
    field: 'Production Systems',
    level: 'Internship',
    description: 'Experienced in deploying ML models at scale. Skilled in MLOps, API development, and building reliable inference systems.',
    tags: ['MLOps', 'FastAPI', 'Docker', 'Model Deployment']
  },
  {
    title: 'Generative AI',
    field: 'LLMs & Diffusion Models',
    level: 'Internship',
    description: 'Fascinated by generative models. Hands-on experience with transformers, prompt engineering, and multimodal AI systems.',
    tags: ['LLMs', 'RAG', 'Fine-tuning', 'Stable Diffusion']
  }
];

/**
 * Calculate deadline information for summer 2026 internships
 * Returns urgency messaging based on current date
 */
export const getSummerDeadlineInfo = () => {
  const now = new Date();
  // Summer 2026 internships typically have deadlines around March-April 2026
  const deadline = new Date('2026-04-15');
  const diffTime = deadline.getTime() - now.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    deadline: deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    daysLeft: daysLeft > 0 ? daysLeft : 0,
    isUrgent: daysLeft > 0 && daysLeft <= 60, // Show urgency if within 60 days
    isPast: daysLeft <= 0,
  };
};
