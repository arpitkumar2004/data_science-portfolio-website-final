export type OpenRole = {
  title: string;
  field: string;
  level?: string;
  description?: string;
  tags?: string[];
};

export const openToWorkPositions: OpenRole[] = [
  {
    title: 'Research Intern',
    field: 'Deep Learning',
    level: 'Intern',
    description: 'Hands-on research internships focusing on model development, experiments, and papers.',
    tags: ['Neural Networks', 'Optimization', 'PyTorch']
  },
  {
    title: 'Machine Learning',
    field: 'Production ML',
    level: 'Intern',
    description: 'Build scalable ML systems, model deployment, and monitoring in production.',
    tags: ['MLOps', 'Inference', 'API']
  },
  {
    title: 'Generative AI',
    field: 'AI/ML Ops',
    level: 'Intern',
    description: 'Mathematical modeling, stochastic processes, and data-driven simulation for decision-making.',
    tags: ['Modeling', 'Statistics', 'Time Series']
  }
];
