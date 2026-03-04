// ===== About Me Page Data Types & Local Fallback =====
// All data is fetched from /api/about at runtime.
// This file provides TypeScript types + a fallback so the page works offline.

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  tagline: string;
  photo: string;
  availability: string;
  animatedRoles: string[];
  socialLinks: SocialLink[];
  calendlyUrl: string;
}

export interface Stat {
  value: string;
  label: string;
  color: "default" | "blue" | "purple" | "green";
}

export interface Education {
  degree: string;
  specialization: string;
  institution: string;
  graduation: string;
}

export interface BioParagraph {
  label: string | null;
  text: string;
}

export interface Bio {
  greeting: string;
  paragraphs: BioParagraph[];
  callToAction: string;
}

export interface Milestone {
  icon: string;
  date: string;
  title: string;
  subtitle: string;
  category: string;
}

export interface TechItem {
  name: string;
  level: string;
  category: string;
}

export interface SelectedWork {
  title: string;
  status: string;
  statusColor: string;
  tags: string[];
  projectUrl: string;
}

export interface CTAData {
  heading: string;
  description: string;
  cvLink: string;
  meetingLink: string;
}

export interface AboutData {
  personal: PersonalInfo;
  stats: Stat[];
  education: Education;
  bio: Bio;
  milestones: Milestone[];
  techStack: TechItem[];
  selectedWork: SelectedWork[];
  cta: CTAData;
}

// ===== Fallback Data (mirrors backend/data/about.json) =====
export const aboutFallbackData: AboutData = {
  personal: {
    name: "Arpit Kumar",
    tagline: "Applied ML Engineer | IIT Kharagpur '27",
    photo: "/img/me/my_photo2.png",
    availability: "Available for Summer 2026",
    animatedRoles: [
      "ML Engineer",
      "Deep Learning Researcher",
      "Data Scientist",
    ],
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/arpitkumar2004", icon: "Github" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/arpit-kumar-shivam", icon: "Linkedin" },
    ],
    calendlyUrl: "https://calendly.com/kumararpit17773/30min",
  },
  stats: [
    { value: "7.86", label: "CGPA (Top 15%)", color: "default" },
    { value: "5+", label: "Production Projects", color: "blue" },
  ],
  education: {
    degree: "B.Tech + M.Tech (5-Year Integrated)",
    specialization: "Chemical Engineering + AI/ML",
    institution: "IIT Kharagpur",
    graduation: "May 2027",
  },
  bio: {
    greeting: "Hi! I'm Arpit — a Chemical Engineer who fell in love with AI and never looked back.",
    paragraphs: [
      {
        label: "The Origin Story",
        text: "It started in my sophomore year when I tried to optimize a distillation column using spreadsheets. After hours of manual calculations, I thought, \"There has to be a better way.\" That weekend, I learned Python and built my first neural network to predict optimal operating conditions. The model wasn't great (MAE of 15%!), but I was hooked. I realized I could combine engineering intuition with ML to solve real problems.",
      },
      {
        label: null,
        text: "Fast forward to today: I'm finishing my 5-year Integrated Dual Degree at IIT Kharagpur (graduating May 2027), specializing in Chemical Engineering with a deep focus on AI/ML. I've built production systems serving thousands of users, competed in national ML challenges (Top 0.5% in Amazon ML Challenge 2025), and published research on using neural networks for industrial process optimization.",
      },
      {
        label: null,
        text: "At Developers' Society (DevSoc), IIT Kharagpur's premier tech club, I serve as Technical Advisor—mentoring 30+ developers, architecting scalable systems, and shipping features every sprint. Before that, I led the entire tech team, where we dramatically improved deployment efficiency and implemented CI/CD pipelines that are still in use.",
      },
      {
        label: "What I bring to the table",
        text: "Strong fundamentals in math and engineering, hands-on experience building and deploying ML systems (PyTorch, TensorFlow, FastAPI, Docker), and the ability to translate business problems into technical solutions. I don't just build models—I build systems that work in production.",
      },
    ],
    callToAction: "Looking for Summer 2026 internships in ML Engineering, Data Science, or AI Infrastructure. Ideal fit: teams building production ML systems, working on LLMs/NLP, or optimizing complex systems at scale.",
  },
  milestones: [
    { icon: "GraduationCap", date: "2022 - 2027", title: "IIT Kharagpur", subtitle: "Integrated Dual Degree (ChemE + AI). Top decile CGPA; research track in applied ML.", category: "education" },
    { icon: "Briefcase", date: "2023 - Present", title: "Developers' Society (DevSoc), IIT KGP", subtitle: "Technical Advisor (ex-Head of Tech). Mentor 30+ developers, review PRs, architect systems. Dramatically improved deployment efficiency via CI/CD automation and best practices.", category: "leadership" },
    { icon: "Trophy", date: "2023-2024", title: "Competitive ML & Quant", subtitle: "Ranked 42nd/8,690 teams (Top 0.5%) in Amazon ML Challenge 2025. Rank 19 (National) DTL Quant Competition. Multiple hackathon wins.", category: "competition" },
    { icon: "Microscope", date: "2024-Present", title: "Research: Industrial ML", subtitle: "Neural network optimization for chemical processes: achieved 18-22% energy reduction in distillation columns. Working on electrochemical modeling with ML.", category: "research" },
  ],
  techStack: [
    { name: "Python", level: "Advanced", category: "core" },
    { name: "PyTorch", level: "Advanced", category: "ml" },
    { name: "TensorFlow", level: "Advanced", category: "ml" },
    { name: "scikit-learn", level: "Advanced", category: "ml" },
    { name: "FastAPI", level: "Advanced", category: "backend" },
    { name: "React", level: "Intermediate", category: "frontend" },
    { name: "PostgreSQL", level: "Advanced", category: "data" },
    { name: "Docker", level: "Intermediate", category: "devops" },
    { name: "LangChain", level: "Advanced", category: "ml" },
    { name: "XGBoost", level: "Advanced", category: "ml" },
    { name: "Pandas", level: "Advanced", category: "data" },
    { name: "NumPy", level: "Advanced", category: "core" },
  ],
  selectedWork: [
    {
      title: "Conversational AI Platform for Employee Welfare",
      status: "Production",
      statusColor: "green",
      tags: ["FastAPI", "LangChain", "Next.js", "Google Cloud"],
      projectUrl: "/projects",
    },
    {
      title: "Neural Process Optimizer",
      status: "Research",
      statusColor: "blue",
      tags: ["PyTorch", "Pandas", "NumPy"],
      projectUrl: "/projects",
    },
    {
      title: "Amazon ML Challenge 2025 Solution",
      status: "Top 0.5%",
      statusColor: "purple",
      tags: ["TensorFlow", "XGBoost", "Transformers"],
      projectUrl: "/projects",
    },
  ],
  cta: {
    heading: "Ready for Summer 2026 internships",
    description: "Looking for roles where I can build production ML systems, work with real data at scale, and learn from experienced engineers. Ideal fit: ML Engineering, Data Science, or AI Infrastructure teams. Available May-July 2026.",
    cvLink: "/request-cv",
    meetingLink: "https://calendly.com/kumararpit17773/30min",
  },
};
