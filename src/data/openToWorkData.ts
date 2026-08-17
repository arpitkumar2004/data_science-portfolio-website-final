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
    level: 'Full-time',
    description: 'Passionate about cutting-edge ML research. Strong foundation in neural architectures, optimization, and experimental design.',
    tags: ['PyTorch', 'Computer Vision', 'NLP', 'Research Papers']
  },
  {
    title: 'ML Engineering',
    field: 'Production Systems',
    level: 'Full-time',
    description: 'Experienced in deploying ML models at scale. Skilled in MLOps, API development, and building reliable inference systems.',
    tags: ['MLOps', 'FastAPI', 'Docker', 'Model Deployment']
  },
  {
    title: 'Generative AI & LLMs',
    field: 'LLMs & RAG Systems',
    level: 'Full-time',
    description: 'Specialized in generative models and RAG architectures. Hands-on experience with transformers, fine-tuning, and multimodal AI systems.',
    tags: ['LLMs', 'RAG', 'Fine-tuning', 'Multimodal AI']
  }
];

/**
 * Calculate recruitment information for full-time April 2027 placement
 * Returns urgency messaging based on current date
 */
export const getSummerDeadlineInfo = () => {
  const now = new Date();
  const deadline = new Date('2027-04-30');
  const diffTime = deadline.getTime() - now.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    deadline: deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    daysLeft,
    isUrgent: daysLeft < 90,
  };
};
