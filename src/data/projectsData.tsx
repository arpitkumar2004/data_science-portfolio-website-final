import portfolioimg from "../data/img/myDataSciencePortfolio.png";
import cheaimg from "../data/img/ChemicalEngineeringAssociation.png";

export type ProjectCategory =
  | "data-science"
  | "web-app"
  | "system-design"
  | "chemical-research";

export interface Project {
  id: number;
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
  similarProjectIds?: number[];
  standings?: string;
}

export const projects: Project[] = [
  // {
  //   id: 1,
  //   title: "Prediction of T-20 Cricket Match Winner",
  //   tldr: "Developed a predictive model to forecast T-20 cricket match outcomes with 86.42% accuracy, utilizing player ratings and ensemble modeling.",
  //   description:
  //     "Developed a predictive model to forecast T-20 cricket match outcomes with 86.42% accuracy, utilizing player ratings and ensemble modeling.",
  //   longDescription:
  //     "This project, guided by an American Express mentor, focused on predicting the outcomes of T-20 cricket matches. Key features were engineered from batsman, bowler, and match data, including custom player ratings and correlation-based feature selection. Missing values were imputed using the mean to maintain data integrity. Three high-performing classification models—LightGBM, XGBoost, and CatBoost—were trained on these features, and an ensemble layer combining all models further enhanced prediction accuracy. The final ensemble model achieved an 86.42% accuracy and 74.28% recall, demonstrating its effectiveness in match outcome prediction.",
  //   image:
  //     "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   tags: [
  //     "Cricket Analytics",
  //     "Ensemble Learning",
  //     "LightGBM",
  //     "CatBoost",
  //     "XGBoost",
  //     "Completed Project",
  //   ],
  //   type: "Competition",
  //   category: "data-science",
  //   objectives: [
  //     "Develop an accurate model for predicting T-20 cricket match outcomes",
  //     "Utilize player ratings and feature engineering to improve prediction",
  //     "Combine multiple models for optimal performance using an ensemble approach",
  //   ],
  //   technologies: ["Python", "LightGBM", "XGBoost", "CatBoost", "Pandas"],
  //   methods: [
  //     "Feature extraction and engineering from batsman, bowler, and match data",
  //     "Player rating calculations and data imputation",
  //     "Training of classification models and ensemble learning",
  //   ],
  //   results: [
  //     "Achieved an accuracy of 86.42% and a recall of 74.28%",
  //     "Developed a reliable model for T-20 cricket match predictions",
  //     "Validated model effectiveness through ensemble predictions",
  //   ],
  //   githubLink: "https://github.com/arpitkumar2004/American_Express_Project",
  //   // "articleLink": "https://medium.com/@yourusername/t20-cricket-match-prediction",
  //   // "liveDemoLink": "https://website.com",
  //   role: "Data Scientist",
  //   duration: "Aug 2023 - Oct 2023",
  //   company: "American Express",
  //   challenges: [
  //     "Feature engineering from diverse cricket data sources",
  //     "Combining multiple models into an effective ensemble",
  //     "Handling missing values and ensuring data integrity",
  //   ],
  //   // "similarProjectIds": [2, 3, 4]
  // },
  // {
  //   id: 2,
  //   title: "DTL Quant Challenge 2024 - Alpha Generation Model",
  //   description:
  //     "Developed a dynamic alpha generation model that ranked in the top 20 nationally, achieving strong scores across in-sample, out-sample, and real-time performance.",
  //   longDescription:
  //     "This project involved building a sophisticated alpha generation model for the DTL Quant Challenge 2024. The model integrated multiple financial signals, including RSI, mean reversion, volatility, and trend indicators. We dynamically adjusted weights based on the model's previous alpha performance, enhancing adaptability to changing market conditions. This approach achieved scores of 2.42 in-sample, 1.32 out-sample, and 0.48 in real-time, proving its robustness across different market scenarios. Placing 19th nationally highlighted the model's strong predictive ability and innovative approach to quantitative trading.",
  //   image:
  //     "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc",
  //   tags: [
  //     "Quantitative Finance",
  //     "Alpha Generation",
  //     "RSI",
  //     "Mean Reversion",
  //     "Volatility",
  //   ],
  //   type: "Competition",
  //   category: "data-science",
  //   standings: "Bronze",
  //   objectives: [
  //     "Develop a robust alpha model to perform in varying market conditions",
  //     "Enhance model adaptability by dynamically adjusting signal weights",
  //     "Achieve high ranking in a competitive quantitative finance simulation",
  //   ],
  //   technologies: ["Python", "Pandas", "NumPy", "Financial Indicators"],
  //   methods: [
  //     "Combining financial signals (RSI, mean reversion, volatility, trend)",
  //     "Dynamic weight adjustment based on alpha performance",
  //     "Performance validation across in-sample, out-sample, and real-time data",
  //   ],
  //   results: [
  //     "Scored 2.42 in-sample, 1.32 out-sample, and 0.48 in real-time",
  //     "Ranked 19th nationally in the DTL Quant Challenge",
  //     "Validated model's reliability and adaptability in dynamic markets",
  //   ],
  //   // githubLink: "https://github.com/yourusername/alpha-generation-model",
  //   // "articleLink": "https://medium.com/@yourusername/quant-challenge-alpha-model",
  //   // "liveDemoLink": "https://website.com",
  //   role: "Data Scientist",
  //   duration: "Dec 2023 - Feb 2024",
  //   challenges: [
  //     "Integrating multiple financial signals effectively for alpha generation",
  //     "Dynamically adjusting model parameters based on performance and market conditions",
  //     "Validating model robustness across different market conditions and scenarios",
  //   ],
  //   // "similarProjectIds": [2, 3, 4],
  //   // galleryImages: [
  //   //   "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc",
  //   //   "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc",
  //   // ],
  // },
  {
    id: 3,
    title:
      "General Championship Data Analytics - Social and Healthcare Risk Scorecard",
    description:
      "Developed a comprehensive Social and Healthcare Risk Scorecard using decision trees and ensemble methods, achieving 82.89% accuracy and securing 1st rank.",
    longDescription:
      "This project involved creating a Social and Healthcare Risk Scorecard in collaboration with Evva Health. Using decision tree algorithms and community data gathered via web scraping with BeautifulSoup and Selenium, we constructed a risk assessment tool aimed at informing resource allocation based on risk factors. Advanced statistical techniques, including Bifactor and MIRT analysis, were utilized to analyze and score responses from patient questionnaires. The deployment on Streamlit provided an accessible and interactive platform for risk analysis, with an ensemble model incorporating Voting, BERT, and Bayes Classification achieving an accuracy of 82.89%.",
    image:
      "https://www.commonwealthfund.org/sites/default/files/styles/horizontal_hero_desktop/public/2023_Scorecard_cvr_1800w.png?itok=5Pw9DyJF",
    tags: [
      "Healthcare",
      "Data Analytics",
      "Social Risk Scorecard",
      "Ensemble Methods",
      "Web Scraping",
      "Deployed",
      "Completed Project",
    ],
    type: "Competition",
    category: "data-science",
    standings: "Gold",
    objectives: [
      "Develop a risk scorecard to assess social and healthcare risk factors",
      "Utilize patient data and community resource data for informed resource allocation",
      "Achieve high accuracy in risk classification through advanced modeling",
    ],
    technologies: [
      "Python",
      "Streamlit",
      "BeautifulSoup",
      "Selenium",
      "BERT",
      "Bayes Classification",
      "Voting Method",
    ],
    methods: [
      "Data collection using web scraping (BeautifulSoup and Selenium)",
      "Statistical analysis using Bifactor and MIRT for scorecard construction",
      "Decision tree model development and deployment via Streamlit",
      "Ensemble model incorporating Voting, BERT, and Bayes Classification for accuracy optimization",
    ],
    results: [
      "Secured 1st place in the institute competition",
      "Achieved an accuracy of 82.89% in risk assessment",
      "Created a case study on India-based community resource allocation",
    ],
    //     "codeSnippet": `
    // from sklearn.ensemble import VotingClassifier
    // from sklearn.tree import DecisionTreeClassifier
    // from transformers import BertModel

    // # Example ensemble layer using Voting method
    // dt_model = DecisionTreeClassifier()
    // bert_model = BertModel.from_pretrained("bert-base-uncased")
    // voting_model = VotingClassifier(estimators=[('dt', dt_model), ('bert', bert_model)], voting='soft')

    // # Training the model
    // voting_model.fit(X_train, y_train)
    //     `,
    githubLink: "https://github.com/yourusername/healthcare-risk-scorecard",
    // "articleLink": "https://medium.com/@yourusername/social-health-risk-scorecard",
    // "liveDemoLink": "https://website.com",
    role: "Data Scientist",
    duration: "Dec 2023 - Feb 2024",
    challenges: [
      "Integrating multiple financial signals effectively",
      "Dynamically adjusting model parameters based on performance",
      "Validating model robustness across different market conditions",
    ],
    // "similarProjectIds": [2, 3, 4],
    galleryImages: [
      "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc",
      "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc",
    ],
  },
  {
    id: 4,
    title: "Open IIT Data Analytics Competition - Footfall Prediction",
    description:
      "Developed a time-series model to predict city footfall, achieving 86.63% accuracy and securing 2nd place in the institute.",
    longDescription:
      "In this project, we built a predictive model to forecast city footfall based on historical time-series data, as part of the Open IIT Data Analytics Competition. By scraping data using BeautifulSoup and conducting exploratory data analysis, we uncovered key patterns in the time series. Applying K-Means clustering helped identify underlying trends. Forecasting models, including FBProphet, Random Forest, and Bidirectional LSTM, were then combined in an ensemble approach that improved prediction accuracy, resulting in an 86.63% accuracy score. This ensemble model offered a robust and dynamic forecasting solution for city footfall.",
    image:
      "https://imgs.search.brave.com/S8-YiFIU0XBX9jE91wgiHBftts4ZGFN46EVla9J2LJE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dHJhZnN5cy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjQv/MDIvMi1XaGF0LUlz/LUZvb3RmYWxsLUFu/YWx5dGljcy5qcGc",
    tags: [
      "Data Analytics",
      "Time Series",
      "Footfall Prediction",
      "Ensemble Modeling",
      "K-Means Clustering",
    ],
    type: "Competition",
    category: "data-science",
    standings: "Silver",
    objectives: [
      "Predict city footfall using historical time-series data",
      "Improve forecasting accuracy through an ensemble approach",
      "Identify trends and clusters in footfall data for better resource allocation",
    ],
    technologies: [
      "Python",
      "BeautifulSoup",
      "FBProphet",
      "Random Forest",
      "LSTM",
      "K-Means",
    ],
    methods: [
      "Web scraping using BeautifulSoup for data collection",
      "Exploratory data analysis and time series decomposition",
      "Clustering with K-Means for trend identification",
      "Ensemble modeling with FBProphet, Random Forest, and Bidirectional LSTM",
    ],
    results: [
      "Achieved 2nd place in the institute competition",
      "Reached an accuracy of 86.63% in footfall prediction",
      "Developed a reliable footfall prediction model for urban planning",
    ],
    //     "codeSnippet": `
    // from fbprophet import Prophet
    // from sklearn.ensemble import RandomForestRegressor
    // from keras.layers import LSTM, Bidirectional
    // from keras.models import Sequential

    // # Example of Bidirectional LSTM model setup
    // model = Sequential([
    //     Bidirectional(LSTM(50, activation='relu'), input_shape=(timesteps, features)),
    //     Dense(1)
    // ])
    // model.compile(optimizer='adam', loss='mse')

    // # Train model
    // model.fit(X_train, y_train, epochs=100, validation_split=0.2)
    //     `,
    githubLink: "https://github.com/yourusername/footfall-prediction",
    // "articleLink": "https://medium.com/@yourusername/footfall-prediction",
    // "liveDemoLink": "https://website.com",
    role: "Data Scientist",
    duration: "Dec 2023 - Feb 2024",
    challenges: [
      "Integrating multiple financial signals effectively",
      "Dynamically adjusting model parameters based on performance",
      "Validating model robustness across different market conditions",
    ],
    // "similarProjectIds": [2, 3, 4],
    galleryImages: [
      "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc",
      "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc",
    ],
  },
  {
    id: 5,
    title: "FUGACITY Fest Website Development",
    description:
      "Developed a dynamic, responsive website for our department's annual fest, FUGACITY, using React, Tailwind CSS, and Node.js.for our annual fest FUGACITY of the department of Chemical engineering IIT Kharagpur",
    ProblemStatement:
      "The fest needed a single, reliable website to publish schedules, event details, and updates quickly, while staying fast and readable on mobile devices.",
    longDescription:
      "This project involved creating a visually appealing, user-friendly website for the FUGACITY fest, designed to showcase event information, schedules, and updates. Built with React for interactive components, Tailwind CSS for styling, and Node.js for efficient backend management, the website delivered a seamless user experience with full responsiveness across devices.",
    image: cheaimg,
    tags: [
      "Web Development",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Event Website",
      "Responsive Design",
      "Completed Project",
    ],
    objectives: [
      "Create a responsive and engaging website for the FUGACITY fest",
      "Showcase event details, schedules, and updates in a user-friendly manner",
      "Optimize for fast loading and smooth navigation across devices",
    ],
    technologies: ["React", "Tailwind CSS", "Node.js", "JavaScript"],
    type: "Fest Website",
    category: "web-app",
    methods: [
      "Developed interactive components using React",
      "Applied Tailwind CSS for rapid and responsive styling",
      "Utilized Node.js to manage backend functionalities",
      "Implemented fully responsive design for mobile and desktop users",
    ],
    results: [
      "Successfully launched the FUGACITY fest website, receiving positive user feedback",
      "Enhanced user engagement through an interactive and responsive design",
      "Streamlined event management with real-time updates and notifications",
    ],
    codeSnippet: `
For Live Demo Visit : https://chea-ikkswc60t-shau8122.vercel.app
    `,
    githubLink:
      "https://github.com/ChemicalEngineeringAssociation/ChEA_Fugacity",
    liveDemoLink: "https://chea-ikkswc60t-shau8122.vercel.app",
    role: "Data Scientist",
    duration: "Dec 2023 - Feb 2024",
    company: "Chemical Engineering Association, IIT Kharagpur",
    // "challenges": [
    //   "Integrating multiple financial signals effectively",
    //   "Dynamically adjusting model parameters based on performance",
    //   "Validating model robustness across different market conditions"
    // ],
    // "similarProjectIds": [2, 3, 4],
    // "galleryImages": [
    //   "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc",
    //   "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc"
    // ]
  },
  {
    id: 6,
    title: "Responsive Portfolio Website",
    description:
      "Built a production-ready personal portfolio with React, Tailwind CSS, and Node.js to showcase projects, skills, research, and impact with fast, responsive UX.",
    tldr: "A full-stack portfolio that ships a clean content system, project deep-dives, docs pages, and a mobile-first design with performance and accessibility in mind.",
    keyImpactMetrics: [
      "Lighthouse-friendly UI",
      "Mobile-first layout",
      "Modular content system",
    ],
    ProblemStatement:
      "Most portfolio templates are static, slow, and hard to maintain. I needed a scalable, data-driven site that could evolve with new projects, research, and documentation without redesigning every page.",
    longDescription:
      "This project is my end-to-end portfolio platform designed to present complex data science work in a clear, visual, and credible way. I built the UI in React and structured all content as typed data modules so each project can power cards, detail pages, and documentation views consistently. Tailwind CSS provided a clean design system with responsive layouts, while the component architecture (cards, carousels, drawers, and section blocks) keeps everything reusable across pages.\n\nOn the engineering side, I set up a Vite build with strict TypeScript types, routed pages for projects and docs, and an error boundary to keep the experience stable. I also added a lightweight data layer for project metadata and media, enabling long-form writeups, image galleries, and tags to render dynamically. The goal was to make updates fast and safe: add a new project in one place and the rest of the site updates automatically.\n\nPerformance and UX were priorities. I kept assets optimized, used lazy-friendly layouts, and ensured accessibility across headings, colors, and navigation. The final result is a scalable, professional portfolio that can evolve as I publish new research, tools, and case studies.",
    image: portfolioimg,
    tags: [
      "Web Development",
      "Portfolio",
      "React",
      "Tailwind CSS",
      "Node.js",
      "Ongoing Project",
    ],
    type: "Portfolio Website",
    category: "web-app",
    objectives: [
      "Create a scalable portfolio that updates from a single data source",
      "Present projects with clear structure, visuals, and long-form writeups",
      "Deliver fast, accessible UX across desktop and mobile",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Vite"],
    coreStack: ["React", "TypeScript", "Tailwind CSS"],
    tools: ["Vite", "ESLint", "PostCSS"],
    methods: [
      "Designed a component library for sections, cards, and layouts",
      "Implemented a typed data model to power cards and project pages",
      "Built responsive layouts with Tailwind CSS utility patterns",
      "Optimized image usage and layout structure for fast render times",
      "Validated accessibility with semantic HTML and consistent typography",
    ],
    implementation: [
      "Created a central projects data module to drive cards and detail views",
      "Added dynamic routing for project pages and documentation sections",
      "Integrated error boundaries and fallbacks for resilient UX",
      "Structured assets and tags to support filtering and future expansion",
    ],
    results: [
      "Launched a maintainable portfolio with consistent project narratives",
      "Enabled rapid content updates by editing a single data file",
      "Delivered a responsive experience across phones, tablets, and desktops",
    ],
    codeSnippet: `
For Live Demo Visit : https://arpitkumar.dev
    `,
    githubLink:
      "https://github.com/arpitkumar2004/data_science-portfolio-website-final",
    // "articleLink": "https://medium.com/@yourusername/portfolio-website",
    liveDemoLink: "https://arpitkumar.dev",
    role: "Data Scientist",
    duration: "Dec 2023 - Feb 2025",
    challenges: [
      "Keeping content scalable while avoiding repeated UI edits",
      "Balancing visual richness with fast loading times",
      "Maintaining consistent typography and spacing across sections",
    ],
    solutions: [
      "Centralized project data with strict typing to prevent drift",
      "Used a reusable component system and responsive layout tokens",
      "Optimized media usage and kept layouts grid-based for stability",
    ],
    // "similarProjectIds": [2, 3, 4],
    // "galleryImages": [
    //   "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc",
    //   "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc"
    // ]
  },
  // {
  //   id: 13,
  //   title: "Volatility Curve Prediction by NK Securities",
  //   description:
  //     "Optimized predictive models for volatility curve estimation using advanced quantitative techniques and novel ensembling.",
  //   longDescription:
  //     "Developed predictive models leveraging Euclidean geometry and data clustering for enhanced accuracy. Implemented Parametric Curve Fitting, Denoising Transformers, and Iterative Imputation methods. The project demonstrated strong analytical design, combining machine learning, statistical, and geometric principles for financial forecasting.",
  //   image: "/images/projects/volatility_curve_prediction.png",
  //   tags: ["Quantitative Research", "Financial Modeling", "Time Series", "Deep Learning", "Ensembling"],
  //   "type": "Competition",
  //   "category": "data-science",
  //   objectives: [
  //     "Design an accurate volatility curve predictor using financial data.",
  //     "Integrate geometric and statistical methods in ensembling."
  //   ],
  //   technologies: ["Python", "PyTorch", "NumPy", "Pandas", "Matplotlib"],
  //   methods: ["Geometric Ensembling", "Parametric Curve Fitting", "Iterative Imputation", "Transformers"],
  //   results: [
  //     "Improved volatility prediction accuracy using geometric averaging.",
  //     "Demonstrated hybrid use of geometry and ML in finance."
  //   ],
  //   codeSnippet: "https://github.com/yourusername/volatility-curve-prediction",
  //   githubLink: "https://github.com/yourusername/volatility-curve-prediction",
  //   articleLink: "#",
  //   role: "Quant Researcher | ML Engineer",
  //   duration: "May 2025 - May 2025",
  //   challenges: [
  //     "Handling volatility data noise and outliers.",
  //     "Maintaining model stability across time horizons."
  //   ],
  //   // similarProjectIds: [1, 4]
  // },
  {
    id: 7,
    title: "Multimodal Price Prediction using Text, Image, and Tabular Data",
    description:
      "End-to-end ML pipeline predicting product prices using text, images, and tabular information.",
    longDescription:
      "Developed a state-of-the-art multimodal ML system for the Amazon ML Challenge 2025. The project combines BERT-based text embeddings, CLIP image representations, and structured tabular data to predict product prices with high accuracy. Leveraged UMAP for dimensionality reduction and ensemble stacking (Linear, RF, LGBM, XGB, CatBoost) to boost predictive performance and robustness. Built a modular, OOP-driven, YAML-configured experimental pipeline enabling rapid cross-validation, meta-learning, and reproducible experiments.",
    image: "/projects/multimodal-price.jpg",
    type: "Competition",
    category: "data-science",
    standings: "Platinum",
    tags: [
      "Machine Learning",
      "Deep Learning",
      "Multimodal AI",
      "Ensemble Models",
      "Deployed",
      "Completed Project",
    ],
    objectives: [
      "Integrate heterogeneous data modalities for accurate price prediction",
      "Design a modular ML pipeline for rapid experimentation and reproducibility",
      "Optimize ensemble stacking models for maximum predictive performance",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "BERT",
      "CLIP",
      "LightGBM",
      "XGBoost",
      "CatBoost",
      "UMAP",
    ],
    methods: [
      "Feature Embedding",
      "Dimensionality Reduction",
      "Ensemble Stacking",
      "Cross-validation",
      "OOP Pipeline Design",
    ],
    results: [
      "Achieved SMAPE 42.89%",
      "Secured top 0.5% globally",
      "Built a scalable and modular ML pipeline for experimentation",
    ],
    codeSnippet:
      "" +
      "from transformers import AutoTokenizer, AutoModelForSeq2SeqLM\n\n" +
      "tokenizer = AutoTokenizer.from_pretrained('facebook/bart-large-cnn')\n" +
      "model = AutoModelForSeq2SeqLM.from_pretrained('facebook/bart-large-cnn')\n\n" +
      "def summarize(text: str) -> str:\n" +
      "    inputs = tokenizer(text, return_tensors='pt', max_length=1024, truncation=True)\n" +
      "    summary_ids = model.generate(**inputs, max_length=180, min_length=60, num_beams=4)\n" +
      "    return tokenizer.decode(summary_ids[0], skip_special_tokens=True)\n",
    githubLink: "https://github.com/arpitkumar2004/A_ML_2025",
    articleLink: "",
    liveDemoLink: "",
    role: "Lead Developer",
    duration: "Oct 2025",
    challenges: [
      "Combining heterogeneous text, image, and tabular data effectively",
      "Maintaining modularity for fast experimentation cycles",
      "Fine-tuning ensemble models for top-tier competition ranking",
    ],
    galleryImages: [],
    // similarProjectIds: [2]
  },
  {
    id: 8,
    title: "Deep Learning Based Text Summarization System",
    description:
      "Automated summarization of large-scale documents with deep learning for improved efficiency and comprehension.",
    tldr: "Improved ROUGE-L by +5 on SAMSum, cut training time 3x with mixed-precision + distributed PyTorch, and experimented with parallel ETL pipelines for preprocessing.",
    keyImpactMetrics: [
      "+5 ROUGE-L on SAMSum",
      "3x faster training",
      "40% lower p95 latency",
    ],
    longDescription:
      "Built an end-to-end NLP summarization system focused on both model quality and production performance. On SAMSum, I fine-tuned transformer models using curriculum sampling and mixed-precision (Apex/AMP), improving ROUGE-L by 5 points while reducing training time by 3x through distributed PyTorch pipelines. For data engineering, I designed a parallel ETL flow using containerized workers orchestrated via Docker Compose. I also experimented with serving infrastructure and model tracking tools to learn deployment best practices, cutting p95 latency by 40% through optimization and ensuring reproducible experiments.",
    image: "/projects/text-summarizer.jpg",
    type: "Project",
    category: "data-science",
    tags: [
      "Deep Learning",
      "NLP",
      "Text Summarization",
      "MLOps",
      "Streaming",
      "Automation",
      "Ongoing Project",
    ],
    objectives: [
      "Reduce manual summarization workload for large document datasets",
      "Maintain high information retention in generated summaries",
      "Automate end-to-end ML pipelines for preprocessing, training, and inference",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "Transformers",
      "Docker",
      "GitHub Actions",
    ],
    coreStack: ["Python", "PyTorch", "Transformers"],
    tools: [
      "Apex/AMP",
      "Distributed PyTorch",
      "Docker Compose",
    ],
    methods: [
      "Sequence-to-Sequence Modeling",
      "Curriculum Sampling",
      "Mixed-Precision Training",
      "Distributed Training",
      "Streaming ETL",
      "Experiment Tracking",
      "Pipeline Automation",
      "ROUGE Evaluation",
      "Data Preprocessing",
    ],
    implementation: [
      "Fine-tuned Transformer summarizers on SAMSum with curriculum sampling",
      "Enabled mixed-precision training (Apex/AMP) and distributed PyTorch execution",
      "Built parallel ETL pipeline with containerized workers via Docker Compose",
      "Experimented with model serving and tracking for deployment learning",
    ],
    results: [
      "+5 ROUGE-L on SAMSum",
      "3x faster training time",
      "40% lower p95 inference latency",
      "100% experiment reproducibility",
    ],
    codeSnippet: "",
    githubLink: "https://github.com/arpitkumar2004/Text-Summarizer-Project",
    articleLink: "",
    liveDemoLink: "",
    role: "Lead Developer",
    duration: "Jun 2025",
    ProblemStatement:
      "Manual summarization of large document volumes was slow, inconsistent, and expensive; extractive baselines lost critical context.",
    challenges: [
      "Improving ROUGE-L without increasing training cost",
      "Building efficient preprocessing for large text datasets",
      "Reducing inference latency while keeping deployments reproducible",
    ],
    solutions: [
      "Applied curriculum sampling with mixed-precision to accelerate convergence",
      "Built parallel preprocessing with containerized workers for efficient ETL",
      "Experimented with deployment tools to learn production best practices",
    ],
    discussion: [
      "Curriculum sampling stabilized training and improved ROUGE-L more than larger batch sizes.",
      "Parallel preprocessing with Docker Compose separated concerns and eliminated bottlenecks.",
      "Learning deployment tooling provided valuable experience for future production systems.",
    ],
    futureWork: [
      "Add retrieval-augmented summarization for long-document grounding.",
      "Benchmark quantized inference (INT8/FP8) for additional latency gains.",
      "Expand dataset coverage beyond SAMSum to multi-domain corpora.",
    ],
    galleryImages: [],
    // similarProjectIds: [14, 16]
  },
  // {
  //   id: 9,
  //   title: "Social and Healthcare Risk Scorecard | Evva Health",
  //   description: "AI-driven patient risk prediction and healthcare resource optimization system.",
  //   longDescription:
  //     "Developed a voting ensemble AI model combining BERT, Naive Bayes, and Decision Tree to classify patient-reported health risks with 82.89% accuracy. Deployed a multipage Streamlit app providing real-time scoring and dynamic feedback for healthcare professionals. Scraped 1000+ patient entries using BeautifulSoup and Selenium, integrating Bifactor & MIRT modeling to optimize resource allocation across Indian healthcare case studies.",
  //   image: "/projects/evva-risk-score.jpg",
  //   "type": "Competition",
  //   "category": "data-science",
  //   tags: ["Healthcare Analytics", "Machine Learning", "Web Application", "NLP","Deployed","Completed Project"],
  //   objectives: [
  //     "Predict patient risk profiles accurately using AI models",
  //     "Deploy real-time scoring web app to assist healthcare professionals",
  //     "Optimize healthcare resource allocation with predictive insights"
  //   ],
  //   technologies: ["Python", "BERT", "Naive Bayes", "Decision Tree", "Streamlit", "BeautifulSoup", "Selenium"],
  //   methods: ["Voting Ensemble", "NLP Data Processing", "Web Deployment", "MIRT & Bifactor Models", "Data Scraping"],
  //   results: ["82.89% prediction accuracy", "60% reduction in manual data collection", "Optimized healthcare resources using predictive modeling"],
  //   codeSnippet: "",
  //   githubLink: "https://github.com/arpitkumar2004/DA96_webapp",
  //   articleLink: "",
  //   liveDemoLink: "",
  //   role: "Lead Developer",
  //   duration: "Mar–Apr 2024",
  //   challenges: [
  //     "Handling unstructured and noisy patient data",
  //     "Integrating ensemble AI models for robust predictions",
  //     "Deploying a responsive, multipage web application for real-time use"
  //   ],
  //   galleryImages: [],
  //   // similarProjectIds: []
  // },
  {
    id: 9,
    title: "Advanced Process Modelling & Simulation | IIT Kharagpur",
    description:
      "Simulation and optimization of chemical processes for energy efficiency and sustainable production.",
    longDescription:
      "Simulated multi-stage distillation columns, flash separations, and heat exchangers under Prof. Sourav Mondal and Prof. Nikita Saxena. Performed pinch analysis and COMSOL simulations to reduce utility costs by up to 30% and improve heat transfer efficiency by 15%. Integrated neural networks to predict boiling points (R² > 0.85) and automated multicomponent flash processes, increasing benzene recovery to 95%. Focused on sustainable and energy-efficient chemical process development.",
    image: "/projects/process-modelling.jpg",
    type: "Research",
    category: "chemical-research",
    tags: [
      "Process Engineering",
      "Simulation",
      "Optimization",
      "Electrlyser Design",
      "Completed Project",
    ],
    objectives: [
      "Optimize chemical process efficiency and sustainability",
      "Integrate predictive ML models into traditional process simulations",
      "Improve product purity and reduce energy consumption",
    ],
    technologies: [
      "Aspen Plus",
      "Aspen Hysys",
      "COMSOL",
      "Python",
      "Neural Networks",
      "Flash Separation Models",
    ],
    methods: [
      "Process Simulation",
      "Pinch Analysis",
      "Neural Network Prediction",
      "Energy Optimization",
      "Multi-Stage Column Design",
    ],
    results: [
      "20% reboiler energy reduction",
      "98% MeOH purity achieved",
      "15% improvement in heat transfer efficiency",
    ],
    codeSnippet: "",
    githubLink: "https://github.com/arpitkumar2004/Assigment-PMS",
    articleLink: "",
    liveDemoLink: "",
    role: "Researcher",
    duration: "July 2025 – Nov 2025",
    challenges: [
      "Designing multi-stage separation columns with high purity",
      "Integrating ML models with chemical process simulations",
      "Ensuring industrially relevant and safe process designs",
    ],
    galleryImages: [],
    // similarProjectIds: []
  },
  {
    id: 10,
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
      "Transport Phenomena",
      "Sustainable Energy",
      "Carbon Capture & Utilization (CCUS)",
      "Reaction Engineering",
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
    ],
    coreStack: [
      "Matlab/Python (for Techno-Economic Analysis)",
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
  },
  {
    id: 12,
    title: "Conversational AI Platform for Employee Welfare",
    description:
      "A scalable, full-stack AI platform designed to proactively identify employee burnout and automate HR reporting using ensemble anomaly detection and LangChain-driven LLMs.",
    tldr: "Engineered a high-availability AI platform on Google Cloud that proactively flags at-risk employees using ensemble anomaly detection and automates HR reporting via LangChain LLMs, significantly reducing manual data synthesis.",
    keyImpactMetrics: [
      "Containerized FastAPI microservices on Google Cloud (GCE, GCR) for high availability",
      "Ensemble Anomaly Detection (Isolation Forest, LOF, EMA-weighted metrics)",
      "Automated HR Reporting: LangChain-driven LLM pipelines for context-aware summaries",
      "Asynchronous CRON orchestration for real-time dashboard synchronization",
    ],
    ProblemStatement:
      "Traditional employee welfare monitoring relies on reactive surveys and manual HR data synthesis, leading to delayed intervention for burnout and mental health risks. Organizations lack a scalable, real-time system to proactively identify behavioral anomalies and generate actionable insights without extensive manual effort.",
    longDescription:
      "This project involved engineering a comprehensive AI-driven platform to enhance employee welfare monitoring. The system features a multi-stage AI pipeline that integrates ensemble anomaly detection (using Isolation Forest and Local Outlier Factor) to flag behavioral deviations indicative of burnout or stress. \n\nTo bridge the gap between raw data and actionable HR insights, a LangChain-powered LLM pipeline was architected to generate context-aware well-being summaries, replacing manual reporting. The entire ecosystem was built for enterprise scalability, utilizing a modern full-stack architecture with Next.js and Expo clients, supported by containerized FastAPI microservices orchestrated on Google Cloud Platform.",
    image: "/images/employee-welfare-ai-dashboard.png",
    tags: [
      "AI for HR",
      "Full-Stack",
      "Cloud Computing",
      "Anomaly Detection",
      "NLP",
      "Employee Welfare",
    ],
    objectives: [
      "Develop a proactive risk identification engine to flag at-risk employees before burnout occurs.",
      "Automate the synthesis of complex behavioral data into readable HR reports using LLMs.",
      "Ensure high availability and cross-platform accessibility via a scalable cloud architecture.",
      "Optimize real-time data synchronization between user activity logs and analytics dashboards.",
    ],
    technologies: [
      "Next.js",
      "Expo (React Native)",
      "FastAPI",
      "LangChain",
      "Google Cloud Platform (GCE, GCR, GCS)",
      "Docker",
    ],
    coreStack: [
      "Python (FastAPI, ML libraries)",
      "TypeScript (Next.js, Expo)",
      "LLMs (Large Language Models)",
    ],
    tools: ["Isolation Forest", "Local Outlier Factor (LOF)", "CRON", "Docker"],
    type: "Development Project",
    category: "data-science",
    methods: [
      "Ensemble Anomaly Detection for robust outlier identification.",
      "Retrieval-Augmented Generation (RAG) concepts for context-aware LLM reporting.",
      "Containerization for consistent deployment across environments.",
      "Asynchronous Task Scheduling for non-blocking data processing.",
    ],
    implementation: [
      "Built a multi-platform dashboard using Next.js for web and Expo for mobile access.",
      "Deployed containerized FastAPI microservices on Google Cloud Compute Engine (GCE) and Container Registry (GCR).",
      "Implemented an ensemble model fusing Isolation Forest, LOF, and EMA-weighted metrics for risk scoring.",
      "Orchestrated asynchronous data syncing and reporting tasks using CRON jobs.",
    ],
    results: [
      "Successfully flagged behavioral anomalies with high accuracy using the ensemble approach.",
      "Reduced manual HR data analysis time by automating report generation with LangChain.",
      "Achieved seamless, high-availability performance through Google Cloud containerization.",
    ],
    discussion: [
      "The use of ensemble methods proved more robust than single-model anomaly detection for diverse user behavior patterns.",
      "LangChain's ability to manage context was crucial for generating coherent and relevant well-being summaries over time.",
    ],
    conclusion: [
      "The platform demonstrates that combining traditional anomaly detection with modern Generative AI can significantly transform proactive employee welfare management from a reactive to a predictive process.",
    ],
    limitations: [
      "Dependency on the quality and frequency of user activity data for anomaly detection accuracy.",
      "Potential latency in LLM response generation for large-scale report synthesis.",
    ],
    futureWork: [
      "Integrate more diverse data sources (e.g., calendar load, communication sentiment) to enhance risk detection.",
      "Implement real-time feedback loops to refine anomaly detection thresholds based on HR feedback.",
      "Explore edge deployment for privacy-sensitive data processing.",
    ],
    references: [],
    role: "Lead Developer",
    duration: "Mar 2024 - Aug 2024",
      // company: "Confidential",
    challenges: [
      "Ensuring the robustness of anomaly detection across diverse behavioral patterns.",
      "Managing the complexity of context in LLM-generated reports.",
    ],
    solutions: [
      "Implemented an ensemble approach to anomaly detection to capture a wider range of behavioral deviations.",
      "Leveraged LangChain's context management capabilities to maintain coherent report generation over time.",
    ],
  },
];
