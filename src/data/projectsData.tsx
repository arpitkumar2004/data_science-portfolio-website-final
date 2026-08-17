import portfolioimg from "../data/img/myDataSciencePortfolio.png";
import cheaimg from "../data/img/ChemicalEngineeringAssociation.png";

export type ProjectCategory =
  | "data-science"
  | "web-app"
  | "system-design"
  | "chemical-research";

export interface Project {
  id: number | string;
  slug?: string;
  title: string;
  description: string;
  tldr?: string;
  keyImpactMetrics?: string[];
  ProblemStatement?: string;
  LiteratureReview?: string;
  longDescription: string;
  image: string;
  tags: string[];
  objectives: string[];
  technologies: string[];
  coreStack?: string[];
  tools?: string[];
  type: string;
  category: ProjectCategory;
  methods: string[];
  implementation?: string[];
  results: string[];
  discussion?: string[];
  conclusion?: string[];
  limitations?: string[];
  futureWork?: string[];
  references?: string[];
  acknowledgements?: string[];
  codeSnippet?: string;
  githubLink?: string;
  articleLink?: string;
  liveDemoLink?: string;
  role: string;
  company?: string;
  duration: string;
  challenges?: string[];
  solutions?: string[];
  galleryImages?: string[];
  similarProjectIds?: (number | string)[];
  standings?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "social-healthcare-risk-scorecard",
    title:
      "General Championship Data Analytics - Social and Healthcare Risk Scorecard",
    description:
      "An AI-driven social and healthcare risk scorecard engineered in collaboration with Evva Health, fusing psychometrics, web scraping, and ensemble NLP to quantify patient vulnerability and optimize medical resource allocation.",
    tldr: "Secured 1st rank in institute data analytics by building an 82.89% accurate risk scorecard that combines statistical psychometrics (MIRT & Bifactor models) with an ensemble of BERT, Bayes Classification, and Decision Trees deployed on Streamlit.",
    keyImpactMetrics: [
      "1st Rank Gold Medal out of all competing institute teams",
      "82.89% Classification Accuracy across patient risk profiles",
      "Integrated Psychometric Scoring (MIRT & Bifactor models) for survey data",
      "Deployed Multipage Interactive Dashboard on Streamlit",
    ],
    ProblemStatement:
      "Healthcare providers and civic organizations often struggle to allocate limited community medical resources effectively because patient risk profiles are multifaceted—encompassing social determinants of health (SDOH), environmental factors, and unstructured questionnaire responses. Traditional linear risk models fail to capture non-linear interactions between social stress factors and medical vulnerabilities.",
    longDescription:
      "Developed in collaboration with Evva Health for the General Championship Data Analytics competition at IIT Kharagpur, this project addresses the complex challenge of evaluating community health and social risk profiles. We constructed a comprehensive patient risk assessment engine using a hybrid statistical and machine learning workflow.\n\nFirst, we harvested community resource data and regional socioeconomic indicators using custom web scraping pipelines built with BeautifulSoup and Selenium. To analyze patient-reported questionnaire responses rigorously, we applied advanced psychometric techniques—specifically Multidimensional Item Response Theory (MIRT) and Bifactor modeling—to extract latent risk traits while accounting for item difficulty and response bias.\n\nFor predictive modeling, we engineered an ensemble classification layer combining decision tree algorithms, Naive Bayes classifiers, and fine-tuned BERT text embeddings to process open-ended patient symptom notes. Soft-voting aggregation across these models achieved an 82.89% classification accuracy. The platform was deployed as an interactive multipage Streamlit web app, enabling healthcare coordinators to input survey data, visualize risk heatmaps, and dynamically prioritize patient resource allocation.",
    image:
      "https://www.commonwealthfund.org/sites/default/files/styles/horizontal_hero_desktop/public/2023_Scorecard_cvr_1800w.png?itok=5Pw9DyJF",
    tags: [
      "Healthcare Analytics",
      "Data Analytics",
      "Social Risk Scorecard",
      "Ensemble Methods",
      "Web Scraping",
      "Psychometrics",
      "Streamlit",
      "Completed Project",
    ],
    type: "Competition",
    category: "data-science",
    standings: "Gold",
    objectives: [
      "Quantify social determinants of health (SDOH) and clinical risk using questionnaire metrics.",
      "Harvest regional community healthcare data via automated web scraping.",
      "Combine latent psychometric traits with ensemble ML classifiers for high-accuracy scoring.",
      "Deliver an intuitive web dashboard for real-time risk assessment and decision support.",
    ],
    technologies: [
      "Python",
      "Streamlit",
      "BeautifulSoup",
      "Selenium",
      "BERT",
      "Bayes Classification",
      "MIRT",
      "Scikit-Learn",
    ],
    coreStack: [
      "Python (Data & Modeling)",
      "Streamlit (UI & Deployment)",
      "BERT & Scikit-Learn (NLP & ML)",
    ],
    tools: [
      "BeautifulSoup",
      "Selenium",
      "MIRT Models",
      "Bifactor Analysis",
      "Streamlit Cloud",
    ],
    methods: [
      "Web scraping regional indicators using BeautifulSoup and Selenium",
      "Statistical psychometric scoring using Bifactor and MIRT models",
      "Ensemble modeling with Soft Voting over Decision Trees, Naive Bayes, and BERT embeddings",
      "Multipage web dashboard implementation on Streamlit for clinical workflows",
    ],
    implementation: [
      "Scraped and aggregated 1,000+ patient entries and community resource datasets.",
      "Applied Bifactor and MIRT algorithms to scale raw questionnaire responses into calibrated risk scores.",
      "Constructed a multi-model voting ensemble fusing text embeddings with tabular survey features.",
      "Built interactive Streamlit interfaces with dynamic parameter tuning and visual risk breakdowns.",
    ],
    results: [
      "Secured 1st place (Gold Medal) in the institute-wide General Championship competition.",
      "Achieved 82.89% overall accuracy in patient risk classification.",
      "Created a reusable case study framework for community resource optimization in Indian healthcare.",
    ],
    discussion: [
      "Integrating psychometric MIRT models stabilized latent risk estimates significantly compared to raw survey summing.",
      "Ensembling BERT text representations with traditional tabular classifiers improved performance on open-ended clinical notes.",
    ],
    conclusion: [
      "Demonstrated that combining psychometric theory with ensemble machine learning creates actionable, transparent tools for public health resource distribution.",
    ],
    limitations: [
      "Web scraping pipelines require updates if external regional data sources modify their page layouts.",
      "Fine-tuning BERT embeddings requires dedicated GPU resources during offline training phases.",
    ],
    futureWork: [
      "Integrate geospatial GIS mapping for real-time spatial heatmaps of health risk clusters.",
      "Extend language support to regional Indian languages using multilingual mBERT.",
    ],
    references: [
      "Reise, S. P. (2012). The rediscovery of bifactor measurement models. Multivariate Behavioral Research.",
      "Reckase, M. D. (2009). Multidimensional Item Response Theory. Springer.",
    ],
    acknowledgements: [
      "Evva Health team for problem context and dataset access.",
      "General Championship Technology Committee, IIT Kharagpur.",
    ],
    githubLink: "https://github.com/arpitkumar2004/DA96_webapp",
    role: "ML Engineer",
    duration: "Dec 2023 - Feb 2024",
    company: "Evva Health & IIT Kharagpur",
    challenges: [
      "Extracting structured risk signals from unstandardized, noisy patient questionnaire responses.",
      "Fusing high-dimensional text embeddings from BERT with low-dimensional survey scores.",
      "Building a lightweight, responsive UI that runs complex inferences in real-time.",
    ],
    solutions: [
      "Applied MIRT and Bifactor statistical models to normalize questionnaire variances before feeding into ML models.",
      "Implemented a Soft-Voting Ensemble layer with probability calibration across text and tabular models.",
      "Optimized Streamlit caching (`st.cache_data`) to prevent redundant inference calls during user interactions.",
    ],
    galleryImages: [
      "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc",
    ],
    similarProjectIds: [2, 5, 9],
  },
  {
    id: 2,
    slug: "footfall-prediction-analytics",
    title: "Open IIT Data Analytics Competition - Footfall Prediction",
    description:
      "A hybrid spatio-temporal forecasting system combining K-Means spatial clustering with an ensemble of FBProphet, Random Forest, and Bidirectional LSTM models to predict urban footfall with 86.63% accuracy.",
    tldr: "Secured 2nd rank (Silver Medal) by engineering an urban mobility forecasting pipeline that uses K-Means spatial clustering and a tri-model ensemble (FBProphet + Random Forest + BiLSTM) to model complex city footfall patterns.",
    keyImpactMetrics: [
      "2nd Rank Silver Medal in Open IIT Data Analytics",
      "86.63% Prediction Accuracy on multi-step city traffic forecasting",
      "Spatial-Temporal Clustering using K-Means for urban zone identification",
      "Tri-Model Ensemble: FBProphet + Random Forest + Bidirectional LSTM",
    ],
    ProblemStatement:
      "Urban planning and commercial logistics rely heavily on accurate pedestrian footfall predictions. However, footfall signals exhibit complex multi-scale patterns: strong daily/weekly seasonality, sudden event-driven spikes, and spatial dependencies across city clusters that standard linear time-series models cannot capture.",
    longDescription:
      "Built for the Open IIT Data Analytics Competition, this project presents an end-to-end framework for modeling and forecasting pedestrian traffic across diverse urban zones. The goal was to provide city planners and commercial operators with reliable footfall forecasts to optimize crowd management and municipal resource distribution.\n\nOur pipeline began with automated data extraction and cleaning using BeautifulSoup, followed by multi-scale time-series decomposition to isolate underlying trends, seasonal cycles, and holiday shocks. To capture spatial similarities between different city locations, we applied K-Means clustering on temporal feature profiles, grouping geographic points with similar traffic behavior.\n\nTo maximize forecasting precision, we designed a hybrid ensemble architecture combining three complementary modeling approaches:\n1. **FBProphet**: Captured additive trend dynamics and multiple periodic seasonalities (daily, weekly, annual).\n2. **Random Forest Regressor**: Modeled non-linear interactions between exogenous features like weather, calendar events, and weekend indicators.\n3. **Bidirectional LSTM (BiLSTM)**: Modeled complex sequential dependencies by processing temporal contexts in both forward and backward directions.\n\nCombining predictions from these models via variance-weighted ensembling achieved an overall accuracy of 86.63%, providing a robust and interpretable tool for urban mobility planning.",
    image:
      "https://imgs.search.brave.com/S8-YiFIU0XBX9jE91wgiHBftts4ZGFN46EVla9J2LJE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dHJhZnN5cy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjQv/MDIvMi1XaGF0LUlz/LUZvb3RmYWxsLUFu/YWx5dGljcy5qcGc",
    tags: [
      "Data Analytics",
      "Time Series",
      "Footfall Prediction",
      "Ensemble Modeling",
      "K-Means Clustering",
      "BiLSTM",
      "FBProphet",
    ],
    type: "Competition",
    category: "data-science",
    standings: "Silver",
    objectives: [
      "Deconstruct multi-scale time-series footfall signals into trend, seasonal, and event components.",
      "Cluster geographic zones based on footfall behavior using K-Means.",
      "Combine statistical, machine learning, and deep sequence models into a robust ensemble.",
      "Deliver high-accuracy predictions to support urban mobility and store logistics.",
    ],
    technologies: [
      "Python",
      "BeautifulSoup",
      "FBProphet",
      "Random Forest",
      "PyTorch",
      "Keras/BiLSTM",
      "Scikit-Learn",
      "Pandas",
    ],
    coreStack: [
      "Python (Data Processing & EDA)",
      "FBProphet & Scikit-Learn (Time-Series & Ensembling)",
      "Keras / PyTorch (BiLSTM Sequence Modeling)",
    ],
    tools: [
      "BeautifulSoup",
      "FBProphet",
      "K-Means",
      "TensorBoard",
    ],
    methods: [
      "Web scraping footfall data using BeautifulSoup",
      "Time-series decomposition and lag feature engineering",
      "Unsupervised zone clustering using K-Means",
      "Tri-model ensemble forecasting (FBProphet + Random Forest + BiLSTM)",
    ],
    implementation: [
      "Extracted and preprocessed multi-zone temporal traffic logs.",
      "Engineered lag features, rolling statistics, and calendar event flags.",
      "Trained BiLSTM networks with dropout layers to prevent overfitting on sequential dependencies.",
      "Built a variance-weighted ensemble layer blending predictions from all three models.",
    ],
    results: [
      "Secured 2nd Place (Silver Medal) in Open IIT Data Analytics Competition.",
      "Achieved 86.63% accuracy in multi-horizon footfall forecasting.",
      "Provided an interpretable temporal analytics breakdown for urban zoning.",
    ],
    discussion: [
      "BiLSTM captured non-linear temporal context effectively, while FBProphet stabilized long-term seasonal baselines.",
      "K-Means clustering grouped similar locations together, allowing shared parameters across spatial zones.",
    ],
    conclusion: [
      "Combining parametric seasonal models with deep recurrent networks yields significantly superior temporal forecasting compared to single-model baselines.",
    ],
    limitations: [
      "Extreme unexpected external events (e.g., sudden weather anomalies) require real-time exogenous inputs to adjust predictions.",
    ],
    futureWork: [
      "Incorporate real-time mobile GPS mobility feeds for dynamic recalibration.",
      "Apply Graph Neural Networks (GNNs) to model spatial traffic flow networks explicitly.",
    ],
    references: [
      "Taylor, S. J., & Letham, B. (2018). Forecasting at scale (FBProphet). The American Statistician.",
      "Hochreiter, S., & Schmidhuber, J. (1997). Long short-term memory. Neural Computation.",
    ],
    githubLink: "https://github.com/arpitkumar2004/footfall-prediction",
    role: "ML Engineer",
    duration: "Dec 2023 - Feb 2024",
    company: "IIT Kharagpur",
    challenges: [
      "Managing non-stationary signals and abrupt holiday spikes in urban footfall data.",
      "Aligning spatial clustering with temporal time-series feature spaces.",
      "Preventing overfitting in deep BiLSTM networks with limited historical traffic samples.",
    ],
    solutions: [
      "Used explicit holiday and calendar event indicators within FBProphet and Random Forest feature sets.",
      "Normalized spatial features before applying K-Means to ensure scale invariance across locations.",
      "Introduced recurrent dropout and early stopping during BiLSTM training cycles.",
    ],
    galleryImages: [],
    similarProjectIds: [1, 5, 6],
  },
  {
    id: 3,
    slug: "fugacity-fest-website",
    title: "FUGACITY Fest Website Development",
    description:
      "A high-performance, responsive web application built with React, Tailwind CSS, and Node.js for FUGACITY—the annual chemical engineering fest at IIT Kharagpur.",
    tldr: "Architected and launched the official portal for FUGACITY fest, delivering a mobile-first, zero-downtime event site with real-time schedule updates, interactive schedule drawers, and smooth animations.",
    keyImpactMetrics: [
      "Zero Downtime during peak fest traffic",
      "Sub-second Page Loads across mobile & desktop devices",
      "1,000+ Active Event Visitors served seamlessly",
      "Mobile-First Responsive Layout with Tailwind CSS",
    ],
    ProblemStatement:
      "Annual departmental festivals require a centralized, high-speed digital hub to publish schedules, manage event registrations, and deliver real-time notifications to thousands of participants. Static templates often break on mobile devices under high concurrency during fest days.",
    longDescription:
      "As part of the Chemical Engineering Association (ChEA) at IIT Kharagpur, I designed and developed the official web portal for our department's annual flagship fest, FUGACITY. The project aimed to deliver a fast, modern, and intuitive digital experience for attendees, sponsors, and event organizers.\n\nThe frontend was built using React and TypeScript, leveraging a modular component structure to keep event schedules, speaker profiles, registration forms, and announcements cleanly separated. Styling was executed with Tailwind CSS, enforcing a cohesive design system with dark/light theme support, responsive typography, and mobile-optimized touch interactions. For backend handling, Node.js microservices managed dynamic event schedules and real-time updates.\n\nTo ensure peak performance under high mobile traffic, asset payloads were optimized, fonts were subsetted, and routes were lazy-loaded. The resulting application was deployed on Vercel, serving thousands of pageviews during fest operations with sub-second page loads and zero downtime.",
    image: cheaimg,
    tags: [
      "Web Development",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Event Website",
      "Responsive Design",
      "Frontend Architecture",
      "Completed Project",
    ],
    objectives: [
      "Architect a mobile-first, responsive portal for FUGACITY fest operations.",
      "Deliver real-time schedule updates, rulebooks, and event registration forms.",
      "Ensure fast page load speed and smooth UX on mobile networks.",
      "Build reusable modular components for easy annual content updates.",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Vite", "Vercel"],
    coreStack: ["React", "TypeScript", "Tailwind CSS"],
    tools: ["Vite", "ESLint", "PostCSS", "Git"],
    type: "Fest Website",
    category: "web-app",
    methods: [
      "Modular React component hierarchy for sections and drawers",
      "Utility-first responsive design system using Tailwind CSS",
      "Node.js microservice routes for schedule updates",
      "Performance optimization with lazy loading and asset compression",
    ],
    implementation: [
      "Created structured JSON content modules for event rules, schedules, and guest speakers.",
      "Built responsive navigation drawers, interactive timelines, and modal overlays.",
      "Configured automated Vercel CI/CD deployment pipelines for instant live updates.",
      "Enforced accessibility standards with semantic HTML5 tags and aria attributes.",
    ],
    results: [
      "Successfully launched the live FUGACITY fest platform with zero downtime.",
      "Received overwhelming positive feedback from fest participants and faculty.",
      "Handled high mobile traffic spikes during live competition announcements seamlessly.",
    ],
    discussion: [
      "Component-driven design allowed rapid last-minute schedule edits without structural layout breakage.",
      "Tailwind utility classes reduced total CSS bundle size dramatically compared to generic framework stylesheets.",
    ],
    conclusion: [
      "Demonstrated how clean component engineering and modern build tooling create resilient, high-engagement web applications for large-scale events.",
    ],
    limitations: [
      "Real-time push notifications relied on polling rather than WebSockets in initial launch version.",
    ],
    futureWork: [
      "Integrate WebSockets for live competition scoreboard updates.",
      "Add offline PWA (Progressive Web App) support for offline schedule viewing.",
    ],
    codeSnippet: `
// Example: Dynamic event schedule filter component
import React, { useState } from 'react';

export const ScheduleFilter = ({ events, onSelect }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  return (
    <div className="flex gap-2 overflow-x-auto py-2">
      {['all', 'flagship', 'workshops', 'guest-lectures'].map((cat) => (
        <button
          key={cat}
          onClick={() => { setActiveCategory(cat); onSelect(cat); }}
          className={\`px-4 py-2 rounded-full text-xs font-semibold capitalize transition \${
            activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
          }\`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
    `,
    githubLink:
      "https://github.com/ChemicalEngineeringAssociation/ChEA_Fugacity",
    liveDemoLink: "https://chea-ikkswc60t-shau8122.vercel.app",
    role: "Lead Frontend Developer",
    duration: "Dec 2023 - Feb 2024",
    company: "Chemical Engineering Association, IIT Kharagpur",
    challenges: [
      "Balancing rich visual assets and smooth animations with fast mobile page loads on 3G networks.",
      "Managing frequent live schedule changes from competition heads during fest days.",
      "Ensuring seamless cross-browser layout consistency across varied mobile screen sizes.",
    ],
    solutions: [
      "Implemented WebP image compression and lazy loading (`loading=\"lazy\"`) for all media.",
      "Structured event data as decoupled JSON modules enabling 1-minute content updates.",
      "Utilized Tailwind's mobile-first breakpoint system (`sm:`, `md:`, `lg:`) for dynamic layouts.",
    ],
    similarProjectIds: [4, 9, 10],
  },
  {
    id: 4,
    slug: "responsive-portfolio-platform",
    title: "Responsive Portfolio Website",
    description:
      "A production-grade, highly optimized developer portfolio platform engineered with React, TypeScript, Tailwind CSS, and Vite, featuring dynamic data loading, smooth micro-animations, and full accessibility.",
    tldr: "Architected a scalable, data-driven portfolio platform featuring a 3-tier state architecture (localStorage -> static typed module -> background API sync), rich glassmorphism UI, and structured JSON-LD SEO.",
    keyImpactMetrics: [
      "Lighthouse 95+ Performance & Accessibility Scores",
      "3-Tier Resilient Data Sync (localStorage -> Static Fallback -> API)",
      "100% Type Safety with TypeScript strict mode",
      "Dynamic Route Matching by numeric ID or string slug",
    ],
    ProblemStatement:
      "Traditional portfolio websites are often static, hard to maintain, and suffer from slow asset loads or rigid layouts. Presenting complex machine learning research, interactive code snapshots, and structured case studies requires a data-driven platform that updates seamlessly without redesigning pages.",
    longDescription:
      "This project represents my personal engineering portfolio platform—designed to showcase machine learning systems, deep learning research, and software engineering projects with maximum visual clarity and technical rigor.\n\nBuilt on a modern stack featuring React, TypeScript, and Vite, the core architecture revolves around a centralized data context (`ProjectsContext`) implementing a resilient 3-tier loading strategy: instant state recovery from `localStorage` cache, static typed data fallback for zero-downtime rendering, and background synchronization against a PostgreSQL/FastAPI backend.\n\nThe UI system utilizes Vanilla CSS custom properties alongside Tailwind CSS utility classes, incorporating dark mode tokens, subtle glassmorphism cards, and cursor-following radial animations powered by Framer Motion. Every project page features structured breakdown sections (Abstract, Problem Statement, Methodology, Implementation, Results, and Code Snapshots), complete with syntax-highlighted code blocks, interactive image modals, and dynamic route resolution by both numeric IDs and string slugs.\n\nSEO best practices are automatically applied using `react-helmet-async` for canonical tags, OpenGraph previews, and structured JSON-LD schema markup to ensure research attribution and fast search indexing.",
    image: portfolioimg,
    tags: [
      "Web Development",
      "Portfolio Platform",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Vite",
      "SEO & Analytics",
      "Ongoing Project",
    ],
    type: "Portfolio Website",
    category: "web-app",
    objectives: [
      "Create a single source of truth portfolio platform with strict TypeScript typing.",
      "Implement a zero-downtime 3-tier data synchronization architecture (Cache -> Static -> API).",
      "Deliver a modern visual aesthetic featuring glassmorphism and cursor-following animations.",
      "Ensure production-grade SEO with automated JSON-LD schema generation.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Framer Motion",
      "React Router",
      "Lucide Icons",
      "SyntaxHighlighter",
    ],
    coreStack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    tools: ["Vite", "ESLint", "PostCSS", "Git", "Google Analytics 4"],
    methods: [
      "3-tier fallback state architecture for resilient content delivery",
      "Design token mapping for dark/light mode glassmorphism themes",
      "Framer Motion cursor-following radial gradient animations",
      "Dynamic routing and canonical URL generation for SEO optimization",
    ],
    implementation: [
      "Engineered `ProjectsContext` with version-checked background API sync.",
      "Implemented `ProjectDetail` view with category-aware section headers and syntax highlighting.",
      "Added `SEOHead` component injecting OpenGraph tags and JSON-LD CreativeWork schema.",
      "Optimized build output with Vite code splitting and asset hashing.",
    ],
    results: [
      "Launched a highly maintainable portfolio platform driving project views and recruiter engagement.",
      "Achieved sub-100ms client-side navigation with React Router and Vite code-splitting.",
      "Eliminated blank-screen fallback states entirely via resilient 3-tier state caching.",
    ],
    discussion: [
      "Decoupling project content into typed TypeScript data structures eliminated layout drift and UI duplication.",
      "Loose slug and ID route resolution improved backward compatibility when updating project keys.",
    ],
    conclusion: [
      "Building a data-first frontend platform ensures long-term scalability as new research papers and software projects are added.",
    ],
    limitations: [
      "High-resolution hero images require WebP optimization to maintain top-tier mobile performance.",
    ],
    futureWork: [
      "Add interactive live code execution playgrounds for Python ML snippets.",
      "Integrate automated MDX writeups for full blog and research post publishing.",
    ],
    codeSnippet: `
// 3-Tier Data Loading Logic in ProjectsContext
const getInitialProjects = (): { projects: Project[]; source: DataSource } => {
  const cached = readCache();
  if (cached && cached.projects.length > 0) {
    return { projects: cached.projects, source: 'cache' };
  }
  return { projects: staticProjects, source: 'static' };
};
    `,
    githubLink:
      "https://github.com/arpitkumar2004/data_science-portfolio-website-final",
    liveDemoLink: "https://arpitkumar.dev",
    role: "Full-Stack Engineer & Designer",
    duration: "Dec 2023 - Present",
    challenges: [
      "Preventing page flicker or blank states during background backend wake-ups.",
      "Maintaining high frame rates (60fps) during heavy cursor-following CSS gradient animations.",
      "Ensuring precise SEO meta tag hydration across client-side rendered routes.",
    ],
    solutions: [
      "Implemented instant render from static/localStorage fallback while running async background version checks.",
      "Throttled animation frame requests (`requestAnimationFrame`) in `ProjectCard` mouse move listeners.",
      "Integrated `react-helmet-async` with automated canonical URL generation per route.",
    ],
    similarProjectIds: [3, 9, 10],
  },
  {
    id: 5,
    slug: "multimodal-price-prediction",
    title: "Multimodal Price Prediction using Text, Image, and Tabular Data",
    description:
      "A state-of-the-art multimodal machine learning system combining BERT text embeddings, CLIP visual representations, and tabular feature engineering to predict product prices.",
    tldr: "Ranked Top 0.5% globally among 50,000+ participants in Amazon ML Challenge 2025 by building PrismPrice—a multimodal fusion pipeline with SBERT text, CLIP visual features, unit signals, and stacked ensembles.",
    keyImpactMetrics: [
      "Top 0.5% globally among 50,000+ participants (Amazon ML Challenge 2025)",
      "SMAPE 25.45 on 5-fold stacked ensemble validation",
      "Multimodal Data Fusion: SBERT/TF-IDF (Text) + CLIP/ResNet (Vision) + Tabular Signals",
      "Production FastAPI serving layer at 469ms p95 latency, MLflow & DVC tracking",
    ],
    ProblemStatement:
      "E-commerce product pricing requires understanding heterogeneous data sources—unstructured text descriptions, product images, and structured metadata. Single-modality baselines struggle because critical pricing cues (e.g., brand logos, subtle material specs, packaging quantities) are split across text and images.",
    longDescription:
      "Developed for the prestigious Amazon ML Challenge 2025, this project engineered an end-to-end multimodal machine learning pipeline to predict product prices across millions of e-commerce listings. Our solution fused representations from three distinct data modalities:\n\n1. **Textual Modality**: Extracted fine-grained semantic features from product titles and descriptions using pre-trained BERT (`bert-base-uncased`) Transformer embeddings.\n2. **Visual Modality**: Captured rich visual representation vectors (brand aesthetics, packaging size, material texture) using OpenAI's CLIP (`clip-vit-base-patch32`) vision-language encoder.\n3. **Structured Tabular Modality**: Engineered domain features including unit-of-measure extractions, numerical ratio scaling, and TF-IDF n-grams.\n\nTo prevent the curse of dimensionality when concatenating dense text and image vectors, we applied Uniform Manifold Approximation and Projection (UMAP) to project high-dimensional embeddings into lower-dimensional non-linear manifolds while preserving global topological structure.\n\nFor regression, we built an Object-Oriented, YAML-configured meta-learning ensemble stack. Out-of-fold predictions from LightGBM, XGBoost, CatBoost, and Random Forest were combined using a constrained Linear Ridge meta-regressor, achieving a competitive SMAPE score of 42.89% and securing 42nd rank globally out of 8,690 competing teams.",
    image: "/projects/multimodal-price.jpg",
    type: "Competition",
    category: "data-science",
    standings: "Platinum",
    tags: [
      "Machine Learning",
      "Deep Learning",
      "Multimodal AI",
      "Ensemble Models",
      "BERT",
      "CLIP",
      "LightGBM",
      "XGBoost",
      "UMAP",
      "Completed Project",
    ],
    objectives: [
      "Fuse text, visual, and tabular data into a unified predictive vector space.",
      "Mitigate curse of dimensionality using UMAP manifold projection.",
      "Architect a modular, reproducible Meta-Learning ensemble pipeline.",
      "Maximize SMAPE accuracy on highly skewed e-commerce pricing distributions.",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "BERT",
      "CLIP",
      "LightGBM",
      "XGBoost",
      "CatBoost",
      "UMAP",
      "Scikit-Learn",
      "YAML",
    ],
    coreStack: [
      "Python (PyTorch & Hugging Face)",
      "BERT & CLIP (Pretrained Multimodal Encoders)",
      "LightGBM, XGBoost, CatBoost (Gradient Boosted Ensembles)",
    ],
    tools: [
      "PyTorch",
      "Hugging Face Transformers",
      "UMAP-learn",
      "YAML Configs",
      "Optuna",
    ],
    methods: [
      "Multimodal Feature Embedding (BERT for text, CLIP for images)",
      "Non-linear Manifold Dimensionality Reduction using UMAP",
      "Stratified K-Fold Cross-Validation with target log-transformation",
      "Meta-Learning Ensemble Stacking (Level-0 Boosters -> Level-1 Ridge Regressor)",
    ],
    implementation: [
      "Extracted 768-dim BERT text embeddings and 512-dim CLIP visual features for all listings.",
      "Applied UMAP reduction to compress multimodal features to 32 dense components.",
      "Constructed a modular OOP pipeline driven by YAML configuration files for rapid experimentation.",
      "Trained Level-0 models (LGBM, XGB, CatBoost, RF) with out-of-fold prediction stacking.",
    ],
    results: [
      "Achieved 42nd place globally out of 8,690 competing teams (Top 0.5%).",
      "Reached a benchmark SMAPE of 42.89% on hidden test evaluation.",
      "Published open-source modular pipeline architecture on GitHub.",
    ],
    discussion: [
      "CLIP visual features provided crucial signals for premium luxury goods where text descriptions were sparse.",
      "UMAP manifold projection preserved local cluster distance far better than linear PCA reduction.",
      "Stacking heterogeneous gradient boosting models reduced error variance significantly over single models.",
    ],
    conclusion: [
      "Multimodal fusion combined with stacked meta-ensembles represents the state-of-the-art paradigm for complex e-commerce valuation tasks.",
    ],
    limitations: [
      "Extracting CLIP embeddings for millions of images requires substantial GPU compute time during batch preprocessing.",
    ],
    futureWork: [
      "Experiment with end-to-end joint fine-tuning of vision-language backbones.",
      "Integrate cross-attention transformers for direct inter-modality token alignment.",
    ],
    references: [
      "Radford, A., et al. (2021). Learning Transferable Visual Models From Natural Language Supervision (CLIP). ICML.",
      "McInnes, L., et al. (2018). UMAP: Uniform Manifold Approximation and Projection for Dimension Reduction.",
    ],
    githubLink: "https://github.com/arpitkumar2004/A_ML_2025",
    role: "Lead ML Developer",
    duration: "Oct 2025",
    company: "Amazon ML Challenge 2025",
    challenges: [
      "Handling extreme price variance and long-tailed target distributions.",
      "Managing memory limits when concatenating large dense text and image vectors.",
      "Avoiding data leakage across cross-validation folds during meta-stacking.",
    ],
    solutions: [
      "Applied logarithmic transformation `log1p(price)` to stabilize target variance during training.",
      "Used UMAP dimensionality reduction to compress dense embeddings without sacrificing semantic topological information.",
      "Implemented strict Out-Of-Fold (OOF) prediction generation for Level-1 meta-regressor training.",
    ],
    galleryImages: [],
    similarProjectIds: [1, 2, 6, 10],
  },
  {
    id: 6,
    slug: "text-summarizer-system",
    title: "Deep Learning Based Text Summarization System",
    description:
      "An automated abstractive NLP text summarization framework fine-tuning Transformer models (BART/T5) with curriculum sampling, mixed-precision training, and distributed PyTorch pipelines.",
    tldr: "Improved ROUGE-L by +5 points on the SAMSum dialogue dataset, accelerated model training by 3x using PyTorch AMP mixed-precision, and reduced p95 inference latency by 40%.",
    keyImpactMetrics: [
      "+5 ROUGE-L Score Improvement on SAMSum dialogue benchmark",
      "3x Faster Training Speed with PyTorch AMP Mixed-Precision",
      "40% Lower p95 Inference Latency via ONNX optimization",
      "100% Reproducible Pipeline containerized with Docker Compose",
    ],
    ProblemStatement:
      "Information overload from long-form documents, chat transcripts, and customer support logs reduces organizational productivity. Extractive summarization baselines produce disjointed sentences, while naive abstractive fine-tuning is computationally expensive and susceptible to exposure bias.",
    longDescription:
      "This project designed and optimized an end-to-end natural language processing pipeline for abstractive text summarization. The core goal was to balance summarization accuracy (information retention and coherence) with production inference performance.\n\nUsing Hugging Face Transformers, we fine-tuned sequence-to-sequence models (BART-large and T5) on the SAMSum conversational dialogue dataset. To mitigate exposure bias during autoregressive decoding, we implemented a curriculum sampling strategy that gradually transitions from teacher forcing to model-generated token feedback during training.\n\nTo solve computational training bottlenecks, we integrated PyTorch Automatic Mixed Precision (AMP / Apex) and Distributed Data Parallel (DDP) execution, cutting model training times by 3x while reducing GPU VRAM usage by 45%. For preprocessing and ingestion, we built a multi-stage containerized ETL pipeline using Docker Compose, enabling parallel tokenization and batch chunking.\n\nThe final model achieved a +5 point improvement in ROUGE-L score compared to standard baselines. Serving experiments with ONNX Runtime optimization yielded a 40% reduction in p95 inference latency, establishing a scalable blueprint for production NLP deployments.",
    image: "/projects/text-summarizer.jpg",
    type: "Project",
    category: "data-science",
    tags: [
      "Deep Learning",
      "NLP",
      "Text Summarization",
      "Transformers",
      "BART",
      "PyTorch",
      "MLOps",
      "Docker",
      "Ongoing Project",
    ],
    objectives: [
      "Automate high-quality abstractive summarization for dialogue and document corpora.",
      "Accelerate sequence-to-sequence transformer training using mixed-precision PyTorch AMP.",
      "Mitigate autoregressive exposure bias via curriculum sampling.",
      "Deploy containerized microservices optimized for low-latency inference.",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "Transformers (BART, T5)",
      "Docker",
      "Docker Compose",
      "FastAPI",
      "ONNX Runtime",
      "ROUGE Metrics",
    ],
    coreStack: [
      "Python (PyTorch & Hugging Face)",
      "PyTorch AMP / DDP (Distributed & Mixed Precision)",
      "Docker & FastAPI (Deployment Infrastructure)",
    ],
    tools: [
      "Apex/AMP",
      "Distributed PyTorch",
      "Docker Compose",
      "MLflow",
      "ONNX Runtime",
    ],
    methods: [
      "Sequence-to-Sequence Autoregressive Fine-Tuning",
      "Curriculum Sampling Token Decoding",
      "Mixed-Precision (FP16) Acceleration via PyTorch AMP",
      "Containerized Parallel ETL Pipeline with Docker Compose",
      "ONNX Graph Optimization for Fast CPU/GPU Inference",
    ],
    implementation: [
      "Fine-tuned BART-large model on 15,000+ SAMSum dialogue transcripts.",
      "Implemented custom PyTorch trainer incorporating curriculum learning logic.",
      "Configured Docker Compose orchestration for parallel text preprocessing workers.",
      "Exported PyTorch weights to ONNX format for accelerated runtime execution.",
    ],
    results: [
      "Gained +5 ROUGE-L points over standard baseline models.",
      "Cut model training time by 3x (from 12 hours to 4 hours per run).",
      "Reduced p95 inference latency by 40% using ONNX runtime execution.",
    ],
    discussion: [
      "Curriculum sampling stabilized long-sequence generation, reducing repetitive text generation.",
      "Mixed-precision training enabled doubling batch sizes without out-of-memory errors.",
    ],
    conclusion: [
      "Combining curriculum learning techniques with hardware-aware runtime optimization yields highly efficient production NLP summarization pipelines.",
    ],
    limitations: [
      "Extremely long input documents (>2048 tokens) require sliding window chunking to fit transformer context windows.",
    ],
    futureWork: [
      "Integrate Longformer / LED (Longformer Encoder-Decoder) for multi-page document summarization.",
      "Explore Low-Rank Adaptation (LoRA) for parameter-efficient fine-tuning on domain-specific corpora.",
    ],
    references: [
      "Lewis, M., et al. (2019). BART: Denoising Sequence-to-Sequence Pre-training for Natural Language Generation.",
      "Gliwa, B., et al. (2019). SAMSum Corpus: A Human-annotated Dialogue Summarization Dataset.",
    ],
    githubLink: "https://github.com/arpitkumar2004/Text-Summarizer-Project",
    role: "Lead NLP Developer",
    duration: "Jun 2025",
    challenges: [
      "Preventing exposure bias where autoregressive models accumulate errors over long sequences.",
      "Managing high GPU memory consumption during long-sequence sequence-to-sequence backpropagation.",
      "Serving transformer inference at acceptable latency thresholds for real-time applications.",
    ],
    solutions: [
      "Introduced curriculum sampling to expose model to its own prediction errors during late training epochs.",
      "Activated PyTorch AMP FP16 mixed precision to reduce memory footprint by 45%.",
      "Converted model graph to ONNX runtime format to optimize operator execution.",
    ],
    galleryImages: [],
    similarProjectIds: [5, 9, 10],
  },
  {
    id: 7,
    slug: "advanced-process-modelling-simulation",
    title: "Advanced Process Modelling & Simulation | IIT Kharagpur",
    description:
      "Chemical process simulation, thermodynamic optimization, and machine learning integration for multi-stage separation columns and heat exchanger networks.",
    tldr: "Achieved 20% reboiler energy reduction and 98% methanol purity by integrating Pinch Analysis, COMSOL Multiphysics, and Neural Network boiling point predictors into chemical process simulations.",
    keyImpactMetrics: [
      "20% Reboiler Heat Duty Reduction in distillation column operations",
      "98% Methanol Purity achieved in multi-stage separation systems",
      "15% Thermal Efficiency Gain via Pinch Analysis Heat Exchanger Networks",
      "Neural Network Surrogate Model predicting non-ideal boiling points (R² > 0.85)",
    ],
    ProblemStatement:
      "Industrial chemical manufacturing is highly energy-intensive. Traditional process designs rely on static thermodynamic approximations, leading to excessive utility consumption in separation columns and sub-optimal heat recovery across heat exchanger networks.",
    longDescription:
      "Conducted under the faculty guidance of Prof. Sourav Mondal and Prof. Nikita Saxena at the Department of Chemical Engineering, IIT Kharagpur, this research project focused on modeling, simulating, and optimizing complex chemical separation processes for enhanced energy efficiency and product purity.\n\nThe project encompassed three main engineering pillars:\n1. **Process Simulation & Optimization**: Developed rigorous Aspen Plus and Aspen HYSYS models for multi-stage distillation columns and multicomponent flash separation units. Applied thermodynamic equations of state (NRTL, UNIQUAC) to optimize reflux ratios and feed tray locations, achieving 98% methanol recovery while reducing reboiler heat duty by 20%.\n2. **Energy Integration (Pinch Analysis)**: Conducted composite curve and grand composite curve analysis to design optimal Heat Exchanger Networks (HEN), lowering utility heating and cooling requirements by 30% and improving overall thermal efficiency by 15%.\n3. **Machine Learning Hybridization**: Trained artificial neural network (ANN) regression models on experimental VLE (Vapor-Liquid Equilibrium) dataset to predict non-ideal boiling points (R² > 0.85). Embedding these neural surrogate models directly into automated flash calculation routines significantly accelerated complex convergence loops.",
    image: "/projects/process-modelling.jpg",
    type: "Research",
    category: "chemical-research",
    tags: [
      "Chemical Engineering",
      "Process Simulation",
      "Aspen Plus",
      "Aspen Hysys",
      "Pinch Analysis",
      "Neural Networks",
      "Optimization",
      "Completed Project",
    ],
    objectives: [
      "Optimize thermodynamic separation efficiency for multi-component chemical feeds.",
      "Design minimum-utility Heat Exchanger Networks using Pinch Analysis.",
      "Integrate neural network surrogate models to speed up convergence of non-ideal VLE calculations.",
      "Reduce carbon footprint and utility energy consumption in process units.",
    ],
    technologies: [
      "Aspen Plus",
      "Aspen HYSYS",
      "COMSOL Multiphysics",
      "Python",
      "PyTorch / Scikit-Learn",
      "MATLAB",
    ],
    coreStack: [
      "Aspen Plus & HYSYS (Chemical Simulation Engine)",
      "COMSOL Multiphysics (Transport Phenomena Modeling)",
      "Python & PyTorch (ML Surrogate Models)",
    ],
    tools: [
      "Aspen Plus V12",
      "Aspen HYSYS",
      "COMSOL Multiphysics",
      "MATLAB Process Control Toolbox",
    ],
    methods: [
      "Rigorous Multi-Stage Distillation Modeling with NRTL/UNIQUAC thermodynamics",
      "Composite Curve Pinch Analysis for Heat Exchanger Network Synthesis",
      "COMSOL Finite Element Transport Phenomena Simulation",
      "Artificial Neural Network (ANN) Surrogate Modeling for Boiling Point Estimation",
    ],
    implementation: [
      "Configured multi-stage column models in Aspen Plus with tray-by-tray hydraulic sizing.",
      "Calculated minimum hot/cold utility targets via Pinch temperature analysis.",
      "Constructed 2D COMSOL CFD transport models for species mass diffusion.",
      "Trained ANN regression models in Python and integrated predictions into MATLAB flash loops.",
    ],
    results: [
      "Achieved 20% reduction in reboiler heat duty while attaining 98% methanol purity.",
      "Lowered industrial utility heating requirement by 30% via optimized HEN design.",
      "Accelerated non-ideal flash calculation convergence loops by 4x using ANN surrogates.",
    ],
    discussion: [
      "Pinch Analysis revealed substantial scope for process-to-process heat integration previously unexploited.",
      "Neural surrogate models maintained high accuracy (R² > 0.85) while bypassing expensive iterative thermodynamic solver calls.",
    ],
    conclusion: [
      "Hybridizing classical chemical engineering process simulation with machine learning surrogates provides a powerful path toward sustainable energy optimization.",
    ],
    limitations: [
      "Neural surrogate predictions require validation when operating outside trained pressure/temperature ranges.",
    ],
    futureWork: [
      "Implement real-time Model Predictive Control (MPC) on simulated separation columns.",
      "Extend optimization framework to green hydrogen electrolyzer thermal management.",
    ],
    references: [
      "Smith, R. (2005). Chemical Process Design and Integration. Wiley.",
      "Seider, W. D., et al. (2016). Product and Process Design Principles. Wiley.",
    ],
    acknowledgements: [
      "Prof. Sourav Mondal and Prof. Nikita Saxena, Department of Chemical Engineering, IIT Kharagpur.",
    ],
    githubLink: "https://github.com/arpitkumar2004/Assigment-PMS",
    role: "Lead Researcher",
    duration: "July 2025 – Nov 2025",
    company: "IIT Kharagpur",
    challenges: [
      "Converging highly non-ideal multicomponent separation loops in Aspen Plus.",
      "Designing complex heat exchanger networks without temperature cross violations.",
      "Ensuring neural surrogate predictions strictly satisfy mass and energy balance conservation laws.",
    ],
    solutions: [
      "Used NRTL thermodynamic physical property method with binary interaction parameter tuning.",
      "Constructed Grand Composite Curves to identify exact pinch temperatures and utility placement.",
      "Enforced physics-informed penalty constraints during neural network model training.",
    ],
    galleryImages: [],
    similarProjectIds: [8],
  },
  {
    id: 8,
    slug: "co2-to-methanol-transport-analysis",
    title:
      "Transport Analysis of Electrochemical Conversion of Carbon-dioxide to Methanol",
    description:
      "A comprehensive systems-level engineering analysis identifying transport phenomena as the primary bottleneck for commercializing CO₂-to-methanol conversion, proposing a Zero-Gap GDE-MEA architecture to bridge the critical 3.1x rate gap.",
    tldr: "Commercial viability is stalled by a 'rate gap' (40 vs 130 mA/cm²), not selectivity. This project establishes that fluid dynamics and reactor architecture—specifically Zero-Gap MEAs with liquid anolyte loops—are the decisive factors for scaling, rather than catalyst discovery.",
    keyImpactMetrics: [
      "Viability Gap: 3.1x disparity between state-of-the-art (~40 mA/cm²) and commercial targets",
      "Target Current Density: >130 mA/cm² (1300 A/m²)",
      "Target Energy Efficiency (EE): >40%",
      "Target Faradaic Efficiency (FE): >90%",
      "Specific Energy Consumption: 15.2 kWh/kg Methanol (Calculated)",
      "Thermal Load: ~50% of electrical energy input dissipated as waste heat",
    ],
    ProblemStatement:
      "Despite high Faradaic efficiencies in laboratory settings, the direct electrochemical conversion of CO₂ to methanol remains stuck at TRL 3 due to a critical 'rate gap'. Current systems achieve ~40 mA/cm² but require >130 mA/cm² for economic viability. Scaling to these rates triggers catastrophic transport failures: carbonate crossover, membrane dehydration, and reactant starvation, which current reactor designs cannot manage.",
    LiteratureReview:
      "The review analyzed three conversion routes, selecting 'Route 2' (Direct Electrochemical) for its simplicity and potential efficiency (>60%) compared to indirect hydrogenation. It evaluated catalyst performance (Cu, Pd-Cu alloys, CoPc), finding that while selectivity (FE ~80%) is near-commercial, reaction rates are insufficient. The review contrasted reactor architectures, establishing that H-cells are fundamentally limited by CO₂ solubility (33mM), necessitating a shift to Gas Diffusion Electrodes (GDEs).",
    longDescription:
      "This research project conducts a rigorous systems-level engineering analysis of the direct electrochemical reduction of Carbon Dioxide (CO₂) to Methanol (CH₃OH). Moving beyond traditional catalyst discovery, the study isolates transport phenomena—specifically mass, charge, and heat transfer—as the primary bottleneck preventing this technology from advancing beyond its current Laboratory Readiness Level (TRL 3). \n\nKey findings reveal that the reaction proceeds via a mobile *CO intermediate, transforming the system into a complex 3D reaction-diffusion problem where fluid dynamics dictate selectivity. The study quantifies a specific 'rate gap'—the inability to transport reactants and heat fast enough to support commercial current densities. \n\nTo solve this, the project proposes a novel Zero-Gap Membrane Electrode Assembly (MEA) architecture with a liquid anolyte loop. This design minimizes ohmic resistance (boosting EE) while actively managing the thermal loads and carbonate crossover that currently cause system failure at high currents.",
    image: "/images/co2-methanol-reactor-schematic.png",
    tags: [
      "Chemical Engineering",
      "Electrochemistry",
      "Sustainable Energy",
      "Carbon Capture & Utilization (CCUS)",
      "Reaction Engineering",
      "Transport Phenomena",
    ],
    objectives: [
      "Deconstruct the multi-scale coupling between 6-electron kinetics and reactor-scale transport.",
      "Quantify the 'Commercial Viability Gap' between state-of-the-art and techno-economic targets.",
      "Analyze critical transport failure modes: Solubility, Mobile Intermediate Transport, Carbonate Crossover, and Thermal Management.",
      "Define a transport-centric research roadmap focusing on GDE design and multi-physics modeling.",
    ],
    technologies: [
      "Gas Diffusion Electrodes (GDE)",
      "Zero-Gap Membrane Electrode Assembly (MEA)",
      "Anion Exchange Membranes (AEM)",
      "Liquid Anolyte Loops",
      "Techno-Economic Analysis (TEA)",
      "Python / MATLAB",
    ],
    coreStack: [
      "Matlab/Python (Techno-Economic Analysis)",
      "Transport Modeling Frameworks",
      "Electrochemical Engineering Principles",
    ],
    tools: [
      "Techno-Economic Analysis (TEA)",
      "Thermodynamic Analysis",
      "Mass-Energy Balance Modeling",
    ],
    type: "Research Project (Bachelor Thesis Part I)",
    category: "chemical-research",
    methods: [
      "Techno-Economic Analysis (TEA) to derive viability targets.",
      "Mechanistic Analysis of the 6-electron/6-proton pathway.",
      "Transport Phenomena Analysis (Mass, Charge, Heat).",
      "Comparative Analysis of Reactor Architectures (H-Cell vs. GDE vs. MEA).",
    ],
    implementation: [
      "Modeled a 'Target Case' scenario based on 1.0 L/min CO₂ feed to size the reactor stack.",
      "Selected a Zero-Gap MEA architecture to minimize Ohmic loss (IR drop).",
      "Integrated a liquid anolyte loop strategy to solve the 'Thermal Management' failure mode identified in gas-fed systems.",
    ],
    results: [
      "Quantified the Rate Gap: Commercial viability requires increasing current density from ~40 mA/cm² to >130 mA/cm².",
      "Identified the 'Mobile Intermediate' mechanism as a critical control lever, proving that fluid dynamics (flow rate) can dictate product selectivity.",
      "Established Carbonate Crossover as the primary 'Ohmic' failure mode in AEM electrolyzers.",
    ],
    discussion: [
      "The Viability Gap is a 'Rate' problem, not a 'Selectivity' problem. Current catalysts have sufficient FE (~80%) but lack the throughput.",
      "Increasing rate by 3x creates an exponential strain on transport systems: 300% more heat and 300% more carbonate formation, which current static models fail to predict.",
      "GDEs solve the bulk mass transport problem but introduce micro-scale pore flooding challenges.",
    ],
    conclusion: [
      "Transport phenomena, not catalyst activity, are the primary bottleneck for commercialization.",
      "A 3-4x increase in reaction rate is required to close the levelized cost gap.",
      "Future success depends on engineering the GDE pore structure and membrane interface, not just synthesizing new catalyst materials.",
    ],
    limitations: [
      "Carbonate Crossover in AEMs leads to feedstock loss and anode contamination.",
      "High thermal loads at >130 mA/cm² cause membrane dehydration in standard gas-fed designs.",
      "Lack of validated multi-physics models coupling kinetics with continuum transport.",
    ],
    futureWork: [
      "Develop a 3D Computational Fluid Dynamics (CFD) model to simulate the mobile *CO intermediate transport.",
      "Conduct a heat and mass transfer simulation to design the optimal liquid anolyte cooling strategy.",
      "Perform parametric optimization of GDE geometry (tortuosity, porosity) to balance reactant supply and water removal.",
    ],
    references: [
      "Adnan, M. A., & Kibria, M. G. (2020). Comparative techno-economic and life-cycle assessment of power-to-methanol synthesis pathways. Applied Energy.",
      "Varhade, S., et al. (2024). Electrochemical CO2 reduction: Commercial innovations and prospects. ChemElectroChem.",
      "Leonzio, G., et al. (2024). CO2 electrochemical reduction: A state-of-the-art review with economic and environmental analyses. Chemical Engineering Research and Design.",
    ],
    acknowledgements: [
      "Prof. Sourav Mondal for their mentorship and guidance.",
      "Department of Chemical Engineering, IIT Kharagpur for providing the resources and support to conduct this research.",
      "My peers and colleagues for their valuable feedback and discussions throughout the project.",
    ],
    role: "Lead Researcher",
    duration: "Aug 2025 – Dec 2025",
    company: "IIT Kharagpur",
    challenges: [
      "Isolating transport phenomena as the primary bottleneck amidst complex multi-scale interactions.",
      "Quantifying the 'rate gap' and its implications for commercial viability.",
      "Designing a novel reactor architecture to manage the extreme transport demands at commercial current densities.",
    ],
    solutions: [
      "Developing a 3D CFD model to simulate the mobile *CO intermediate transport.",
      "Conducting heat and mass transfer simulations to design the optimal liquid anolyte cooling strategy.",
      "Performing parametric optimization of GDE geometry (tortuosity, porosity) to balance reactant supply and water removal.",
    ],
    articleLink: "https://arpitkumar.dev/BTP%201-%20CO%E2%82%82%20to%20CH%E2%82%83OH%20Conversion%20Report.pdf",
    similarProjectIds: [7],
  },
  {
    id: 9,
    slug: "conversational-ai-employee-welfare",
    title: "Conversational AI Platform for Employee Welfare",
    description:
      "An enterprise AI platform combining ensemble anomaly detection (Isolation Forest, LOF) and LangChain LLM pipelines to proactively flag workplace burnout and automate HR welfare reports.",
    tldr: "Won 1st Place (Gold Medal) at GC OpenSoft '25 (Deloitte-sponsored) by building an LLM-powered RAG employee support platform with GPT-4o, LangChain, LangGraph, and 5 specialized agents—cutting resolution time by 35% and hallucination rate by 40%.",
    keyImpactMetrics: [
      "1st Place Gold Medalist, GC OpenSoft '25 (Deloitte-sponsored)",
      "35% Reduction in Employee Support Resolution Time",
      "40% Reduction in Hallucination Rate via Dual-Knowledge RAG",
      "50% Increase in API Throughput via Async FastAPI & Concurrent Agents",
    ],
    ProblemStatement:
      "Organizations rely on periodic, self-reported HR surveys to monitor employee well-being. These surveys suffer from low response rates and lagging indicators, leaving HR teams unaware of burnout until after employee turnover occurs.",
    longDescription:
      "This project developed an end-to-end, privacy-preserving AI platform designed to transform workplace mental health monitoring from reactive survey collection into proactive behavioral risk detection.\n\nSystem Architecture & ML Engineering:\n1. **Ensemble Anomaly Detection Engine**: Processes anonymized user activity indicators (e.g., shift duration variance, off-hours workload spikes, response latency drift). We combined Isolation Forest (for global outlier detection) and Local Outlier Factor (LOF, for local density anomalies) with an Exponential Moving Average (EMA) smoothing layer to score individual burnout risk without false positives.\n2. **LangChain-Driven Welfare Summarizer**: Built a RAG pipeline using LangChain and Large Language Models. When risk thresholds are triggered, the engine synthesizes behavioral patterns into structured, empathetic HR recommendations, protecting raw employee privacy while delivering actionable insights.\n3. **Cloud Infrastructure**: Architected as containerized FastAPI microservices deployed on Google Cloud Platform (GCE, GCR, GCS). Frontend dashboards were built with Next.js for web and Expo (React Native) for mobile, synchronized via asynchronous CRON background workers.",
    image: "/images/employee-welfare-ai-dashboard.png",
    tags: [
      "AI for HR",
      "Full-Stack AI",
      "Google Cloud Platform",
      "FastAPI",
      "LangChain",
      "Anomaly Detection",
      "NLP",
      "Completed Project",
    ],
    objectives: [
      "Develop a non-intrusive, proactive risk identification engine to detect early signs of employee burnout.",
      "Automate complex behavioral data aggregation into readable HR action reports using LLMs.",
      "Ensure high availability and cross-platform access via containerized cloud architecture.",
      "Optimize real-time data synchronization between activity logs and analytics dashboards.",
    ],
    technologies: [
      "Next.js",
      "Expo (React Native)",
      "FastAPI",
      "LangChain",
      "Google Cloud Platform (GCE, GCR, GCS)",
      "Docker",
      "Isolation Forest",
      "Local Outlier Factor",
    ],
    coreStack: [
      "Python (FastAPI, Scikit-Learn, LangChain)",
      "TypeScript (Next.js & Expo Frontend)",
      "Google Cloud Platform (GCE & GCR Infrastructure)",
    ],
    tools: ["Isolation Forest", "Local Outlier Factor (LOF)", "CRON", "Docker"],
    type: "Development Project",
    category: "data-science",
    methods: [
      "Ensemble Anomaly Detection combining Isolation Forest and LOF",
      "LangChain Retrieval-Augmented Generation for automated text synthesis",
      "FastAPI microservice containerization with Docker",
      "Asynchronous background task scheduling via CRON jobs",
    ],
    implementation: [
      "Built multi-platform frontend dashboards in Next.js (Web) and Expo (Mobile).",
      "Deployed containerized FastAPI microservices on Google Cloud Compute Engine.",
      "Fused Isolation Forest, LOF, and EMA metrics into a unified anomaly scoring pipeline.",
      "Orchestrated automated data syncing and report generation routines.",
    ],
    results: [
      "Successfully flagged behavioral anomalies with high precision, reducing false alerts.",
      "Reduced manual HR reporting synthesis time by 80% via automated LangChain summaries.",
      "Achieved 99.9% platform uptime on Google Cloud containerized microservices.",
    ],
    discussion: [
      "Ensembling global (Isolation Forest) and local (LOF) anomaly detection captured nuanced behavioral stress patterns better than single statistical thresholds.",
      "LangChain's prompt templates enabled consistent generation of empathetic, non-punitive HR guidance.",
    ],
    conclusion: [
      "Fusing traditional anomaly detection with generative AI transforms workplace well-being management into a proactive, predictive capability.",
    ],
    limitations: [
      "Anomaly detection accuracy relies on consistent logging of anonymized workplace metadata.",
    ],
    futureWork: [
      "Incorporate calendar load and meeting density features into the anomaly scoring engine.",
      "Implement feedback loops where HR managers can adjust anomaly sensitivity parameters.",
    ],
    references: [
      "Liu, F. T., et al. (2008). Isolation Forest. IEEE International Conference on Data Mining.",
      "Breunig, M. M., et al. (2000). LOF: Identifying Density-Based Local Outliers. ACM SIGMOD.",
    ],
    role: "Lead Developer",
    duration: "Mar 2024 - Aug 2024",
    company: "Google Cloud Platform",
    challenges: [
      "Detecting subtle behavioral anomalies without triggering high false positive rates.",
      "Ensuring employee privacy while synthesizing actionable HR narrative summaries.",
      "Synchronizing real-time mobile and web dashboard views under asynchronous background loads.",
    ],
    solutions: [
      "Fused global Isolation Forest scores with local density LOF metrics and EMA smoothing.",
      "Designed strict PII-stripping sanitization layers before passing behavioral metrics to LangChain LLMs.",
      "Utilized Redis caching and lightweight background CRON workers for state sync.",
    ],
    galleryImages: [],
    similarProjectIds: [4, 6, 10],
  },
  {
    id: 10,
    slug: "docureason-multimodal-rag-framework",
    title: "DocuReason RAG: Multimodal Document Retrieval & Reasoning Framework",
    description:
      "An enterprise-grade tri-path multimodal RAG framework designed for grounded document retrieval and reasoning across text, complex financial/scientific tables, and visual PDF documents.",
    tldr: "Engineered a Tri-Path Multimodal RAG framework combining dense BM25S retrieval, DuckDB Text-to-SQL, BLIP-2 vision retrieval, weighted RRF, cross-encoder reranking, and NLI attribution—improving RAG baselines by 13.7%–19.8% across 10 benchmarks and mitigating 91% of known RAG failure modes.",
    keyImpactMetrics: [
      "13.7%–19.8% Baseline Improvement across 10 set benchmarks",
      "91% Mitigation of Known RAG Failure Modes during robustness testing",
      "0.612 Recall@5, 0.552 nDCG@5, 0.578 SQL Execution Success, 0.657 Attribution Precision",
      "Productionized via PyPI packaging, GitHub Actions CI, vulnerability auditing, and 22D eval harness",
    ],
    ProblemStatement:
      "Enterprise documents (financial reports, research papers, technical specs) contain complex multimodal information spanning structured tables, dense text, and visual charts. Standard text-chunking RAG engines fail on spatial and tabular context, leading to high hallucination rates and lost context in document Q&A.",
    longDescription:
      "DocuReason is an enterprise-grade tri-path multimodal RAG framework designed under the guidance of Prof. Shyamal Kumar Das Mandal at SRIC, IIT Kharagpur. The framework addresses the core vulnerabilities of traditional text-only RAG by processing document pages through three specialized execution paths:\n\n1. **Visual Vision-Language Path**: Employs ColPali (`colpali-engine`) with Hugging Face Transformers (`transformers`, `peft`, `accelerate`) to generate fine-grained vision embeddings directly from document page images, preserving layout, typography, and visual charts.\n2. **Structured Tabular Path**: Leverages Docling parser and DuckDB for structured SQL execution over complex financial and scientific tables, enabling precise numerical aggregation.\n3. **Hybrid Lexical & Vector Path**: Combines BM25s exact keyword search with Qdrant vector database indexing for robust multi-page retrieval.\n\nThe entire system is containerized with async FastAPI inference microservices, validated on benchmark datasets, and published to PyPI as `docureason-framework`.",
    image: "/images/docureason-rag-architecture.png",
    tags: [
      "Multimodal RAG",
      "ColPali",
      "Qdrant",
      "DuckDB",
      "FastAPI",
      "PyPI Package",
      "Transformers",
      "Production ML",
    ],
    objectives: [
      "Eliminate document layout and table information loss in RAG pipelines.",
      "Integrate vision-language models for native visual page retrieval.",
      "Achieve high-precision numerical reasoning over document tables using DuckDB.",
      "Deploy a lightweight, production-ready microservice published to PyPI.",
    ],
    technologies: [
      "PyTorch",
      "ColPali",
      "Transformers",
      "Qdrant",
      "DuckDB",
      "BM25s",
      "FastAPI",
      "Docling",
      "EasyOCR",
      "Pydantic",
    ],
    coreStack: [
      "Python (PyTorch, ColPali, Transformers)",
      "FastAPI & Pydantic (Inference API)",
      "Qdrant & DuckDB (Data Layer)",
    ],
    tools: ["ColPali Engine", "Qdrant Vector DB", "DuckDB", "BM25s", "Docling", "PyPI"],
    type: "Project",
    category: "system-design",
    methods: [
      "Vision-Language Page Embedding using ColPali (colpali-engine)",
      "Tri-Path Hybrid Retrieval: Lexical (BM25s), Dense Vector (Qdrant), and Tabular (DuckDB)",
      "Document Parsing & Table Extraction via Docling and EasyOCR",
      "Async Microservice Architecture using FastAPI and Pydantic validation",
    ],
    implementation: [
      "Engineered vision-language embedding pipeline with ColPali to index raw page images without textual layout loss.",
      "Constructed DuckDB execution engine for automated SQL query generation over extracted tabular data.",
      "Integrated BM25s hybrid re-ranking layer with Qdrant vector search for multi-page retrieval grounding.",
      "Packaged and published the complete engine to PyPI as docureason-framework with complete CLI and API interface.",
    ],
    results: [
      "Published open-source framework to PyPI as docureason-framework",
      "Slashed retrieval hallucination rate by 45% on multi-page technical and financial PDFs",
      "Sub-second end-to-end retrieval and reasoning latency with async vector batching",
    ],
    discussion: [
      "Direct vision-language page embeddings outperform OCR-then-text RAG on complex multi-column documents.",
      "Decoupling tabular data execution to DuckDB eliminates LLM math hallucinations on numerical data.",
    ],
    conclusion: [
      "DocuReason demonstrates that combining vision-language embeddings with hybrid tri-path execution bridges the gap between raw PDF documents and accurate enterprise AI reasoning.",
    ],
    limitations: [
      "Higher VRAM footprint during initial ColPali vision embedding generation.",
      "Requires GPU acceleration for ultra-high throughput document ingestion.",
    ],
    futureWork: [
      "Extend multi-GPU parallel ingestion for 10,000+ page enterprise document stores.",
      "Implement adaptive dynamic routing between visual and tabular paths based on page composition.",
    ],
    references: [
      "Fevry et al. (2024). ColPali: Efficient Document Retrieval with Vision Language Models.",
      "DuckDB Documentation & High-Performance Analytical SQL Engine.",
    ],
    githubLink: "https://github.com/arpitkumar2004/DocuReason",
    articleLink: "https://github.com/arpitkumar2004/DocuReason/blob/main/SRIC_Report_Arpit_Kumar'26.pdf",
    liveDemoLink: "https://pypi.org/project/docureason-framework/",
    role: "AI Research Intern",
    duration: "June 2026 – July 2026",
    company: "Sponsored Research & Industrial Consultancy (SRIC), IIT Kharagpur",
    challenges: [
      "Preserving spatial chart and table context during multi-page PDF processing.",
      "Optimizing multimodal retrieval latency across vector DB and SQL engine.",
    ],
    solutions: [
      "Integrated ColPali vision-language embeddings to eliminate text chunking loss.",
      "Constructed async tri-path execution pipeline with Qdrant vector DB and DuckDB in-memory execution.",
    ],
    similarProjectIds: [5, 6, 9],
  },
];
