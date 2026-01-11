import portfolioimg from "../data/img/myDataSciencePortfolio.png"
import cheaimg from "../data/img/ChemicalEngineeringAssociation.png"

export interface Project {
  id: number;
  title: string;
  description: string;
  Introduction?: string;
  ProblemStatement?: string;
  scopeStudy?: string;
  LiteratureReview?: string;
  longDescription: string;
  image: string;
  tags: string[];
  objectives: string[];
  technologies: string[];
  type: string;
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
  duration: string;
  readingTime?: string;
  company?: string;
  challenges: string[];
  galleryImages?: string[];
  similarProjectIds?: number[];

}


export const projects: Project[] = [
  {
    "id": 1,
    "title": "Customer-Satisfaction Prediction Project ",
    "description": "Developed and deployed a regression model pipeline to predict customer review scores, enhancing forecasting accuracy by 20% through feature engineering and automated monitoring. Utilized MLflow for model tracking and ZenML for efficient model deployment.",
    "longDescription": "This project involved analyzing a dataset of over 100,000 orders to predict customer satisfaction based on review scores. Leveraging ZenML and MLflow, the project featured an automated pipeline for data processing, model training, and deployment. Extensive data transformations and feature engineering were applied, focusing on attributes such as order status, pricing, and payment methods to optimize prediction accuracy.",
    "image": "https://plus.unsplash.com/premium_vector-1683134673277-bfcd86efa0f7?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "tags": ["MLOps", "Regression", "MLflow", "Data Engineering", "DVC","Ongoing Project"],
    "objectives": [
      "Improve accuracy of customer review score predictions through feature engineering",
      "Automate pipeline for efficient model deployment and updates using ZenML and MLflow integration",
      "Track and monitor model performance over time for continuous improvement through MLflow tracking dashboard"
    ],
    "technologies": ["Python", "ZenML", "MLflow", "Pandas", "Scikit-learn", "Pytest", "DVC"],
    "type": "Project",
    "methods": [
      "Data preprocessing including handling missing values and normalization of numerical features",
      "Feature engineering to generate 15+ new predictive features from existing ones for enhanced accuracy",
      "Development of regression models to predict customer review scores with high accuracy metrics such as MAE and RMSE",
      "Automation of ML pipeline with ZenML and MLflow integration for efficient model deployment and updates",
      "Monitoring and model tracking for continuous performance updates through MLflow dashboard and version control with DVC"
    ],
    "results": [
      "Achieved a 20% improvement in model accuracy metrics through feature engineering and automation",
      "Streamlined pipeline with automated deployment and monitoring through ZenML and MLflow integration",
      "Enhanced feature extraction contributing to higher forecast accuracy and user satisfaction predictions for customers"
    ],
    "githubLink": "https://github.com/arpitkumar2004/customer-satisfaction-mlops",
    "articleLink": "https://medium.com/@yourusername/customer-satisfaction-mlops",
    "liveDemoLink": "https://github.com/arpitkumar2004/customer-satisfaction-mlops",
    "galleryImages": [
      "https://plus.unsplash.com/premium_vector-1683134673277-bfcd86efa0f7?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_vector-1683134673277-bfcd86efa0f7?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    "role": "Data Scientist & MLOps Engineer",
    "duration": "Jan 2024 - Mar 2024",
    "challenges": [
      "Handling missing and inconsistent data in the dataset",
      "Optimizing feature engineering to enhance model performance",
      "Integrating ZenML and MLflow for seamless pipeline automation"
    ],
    // "similarProjectIds": [2, 3, 4]

  },

  {
    "id": 2,
    "title": "House Price Prediction Pipeline with MLflow",
    "description": "Developed a dynamic, end-to-end pipeline for house price prediction, with automated deployment and real-time forecasting capabilities.",
    "longDescription": "This project aimed to predict house prices by constructing a comprehensive pipeline using ZenML, focusing on data preprocessing, feature engineering, and model optimization. Key elements included dynamic data splitting, imputation, outlier detection, and scaling to enhance model accuracy and robustness. Automated model deployment was implemented using ZenML, enabling real-time prediction services.",
    "image": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "tags": ["MLOps", "Regression", "ZenML", "Feature Engineering", "Real-time Prediction","Deployed","Completed Project"],
    "objectives": [
      "Develop robust models for accurate house price predictions",
      "Automate end-to-end pipeline for efficient model deployment",
      "Provide real-time prediction capabilities"
    ],
    "technologies": ["Python", "ZenML", "Scikit-learn", "Pandas", "Hyperparameter Tuning"],
    "type": "Project",
    "methods": [
      "Data splitting and preprocessing with imputation and outlier detection",
      "Feature engineering and scaling for optimized model input",
      "Cross-validation and hyperparameter tuning of regression models",
      "Pipeline automation with ZenML for streamlined deployment"
    ],
    "results": [
      "Improved model accuracy and robustness through optimized preprocessing",
      "Real-time prediction services enabled by automated deployment",
      "Enhanced model performance via cross-validation and tuning"
    ],
    "githubLink": "https://github.com/arpitkumar2004/prices-predictor-system",
    "articleLink": "https://medium.com/@yourusername/house-price-prediction-mlops",
    "liveDemoLink": "https://github.com/arpitkumar2004/prices-predictor-system",
    "galleryImages": [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_vector-1683134673277-bfcd86efa0f7?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    "role": "Data Scientist & MLOps Engineer",
    "duration": "Jan 2023 - Mar 2023",
    "challenges": [
      "Handling missing and inconsistent data in the dataset",
      "Optimizing feature engineering to enhance model performance",
      "Integrating ZenML and MLflow for seamless pipeline automation"
    ],
    // "similarProjectIds": [2, 3, 4]
  },

  {
    id: 3,
    title: "Customer Churn Prediction for Telecom Company",
    description:
      "Built a predictive model to identify customers at risk of churning, improving retention rates by 25%.",
    longDescription:
      "This project aimed to predict customer churn for a major telecom provider. By analyzing customer data and building a machine learning model, we were able to accurately identify customers likely to churn.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Data Analysis", "Python", "Scikit-learn", "Logistic Regression","Ongoing Project"],
    "type": "Project",
    objectives: [
      "Increase customer retention by identifying customers at risk of churning",
      "Improve targeted marketing strategies based on predictive insights",
      "Reduce churn rates by proactively addressing customer concerns",
    ],
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    methods: [
      "Data cleaning and preprocessing of customer data",
      "Exploratory data analysis to identify key factors contributing to churn",
      "Development of a logistic regression model to predict churn",
      "Evaluation of the model using precision, recall, and F1-score",
    ],
    results: [
      "25% improvement in customer retention rates",
      "10% reduction in marketing costs by targeting at-risk customers",
      "Higher engagement through personalized customer interactions",
    ],
    githubLink: "https://github.com/yourusername/customer-churn",
    articleLink: "https://medium.com/@yourusername/customer-churn-case-study",
    // liveDemoLink: "https://github.com/yourusername/customer-churn",
    role: "Data Scientist",
    duration: "Jan 2023 - Mar 2023",
    challenges: [
      "Handling imbalanced dataset",
      "Optimizing model hyperparameters",
      "Interpreting model results for business insights"
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    // similarProjectIds: [2, 3, 4]
  },


  // Add more projects as needed
  {
    id: 4,
    title: "Real-time Fraud Detection System",
    description:
      "Implemented a real-time fraud detection system for a financial institution, reducing fraudulent transactions by 40%.",
    longDescription:
      "This project aimed to predict customer churn for a major telecom provider. By analyzing customer data and building a machine learning model, we were able to accurately identify customers likely to churn.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Anomaly Detection", "Apache Spark", "Machine Learning","Ongoing Project"],
    "type": "Project",
    objectives: [
      "Increase customer retention by identifying customers at risk of churning",
      "Improve targeted marketing strategies based on predictive insights",
      "Reduce churn rates by proactively addressing customer concerns",
    ],
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    methods: [
      "Data cleaning and preprocessing of customer data",
      "Exploratory data analysis to identify key factors contributing to churn",
      "Development of a logistic regression model to predict churn",
      "Evaluation of the model using precision, recall, and F1-score",
    ],
    results: [
      "25% improvement in customer retention rates",
      "10% reduction in marketing costs by targeting at-risk customers",
      "Higher engagement through personalized customer interactions",
    ],
    githubLink: "https://github.com/arpitkumar2004/Credit-Fraud-Detection-Project",
    // articleLink: "https://medium.com/@yourusername/customer-churn-case-study",
    // liveDemoLink: "https://github.com/yourusername/customer-churn",
    role: "Data Scientist",
    duration: "Jan 2023 - Mar 2023",
    challenges: [
      "Handling imbalanced dataset",
      "Optimizing model hyperparameters",
      "Interpreting model results for business insights"
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    // similarProjectIds: [2, 3, 4]
  },
  {
    "id": 5,
    "title": "Prediction of T-20 Cricket Match Winner",
    "description": "Developed a predictive model to forecast T-20 cricket match outcomes with 86.42% accuracy, utilizing player ratings and ensemble modeling.",
    "longDescription": "This project, guided by an American Express mentor, focused on predicting the outcomes of T-20 cricket matches. Key features were engineered from batsman, bowler, and match data, including custom player ratings and correlation-based feature selection. Missing values were imputed using the mean to maintain data integrity. Three high-performing classification models—LightGBM, XGBoost, and CatBoost—were trained on these features, and an ensemble layer combining all models further enhanced prediction accuracy. The final ensemble model achieved an 86.42% accuracy and 74.28% recall, demonstrating its effectiveness in match outcome prediction.",
    "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "tags": ["Cricket Analytics", "Ensemble Learning", "LightGBM", "CatBoost","XGBoost","Completed Project"],
    "type": "Competition",
    "objectives": [
      "Develop an accurate model for predicting T-20 cricket match outcomes",
      "Utilize player ratings and feature engineering to improve prediction",
      "Combine multiple models for optimal performance using an ensemble approach"
    ],
    "technologies": ["Python", "LightGBM", "XGBoost", "CatBoost", "Pandas"],
    "methods": [
      "Feature extraction and engineering from batsman, bowler, and match data",
      "Player rating calculations and data imputation",
      "Training of classification models and ensemble learning"
    ],
    "results": [
      "Achieved an accuracy of 86.42% and a recall of 74.28%",
      "Developed a reliable model for T-20 cricket match predictions",
      "Validated model effectiveness through ensemble predictions"
    ],
    "githubLink": "https://github.com/arpitkumar2004/American_Express_Project",
    // "articleLink": "https://medium.com/@yourusername/t20-cricket-match-prediction",
    // "liveDemoLink": "https://website.com",
    "role": "Data Scientist",
    "duration": "Aug 2023 - Oct 2023",
    "challenges": [
      "Feature engineering from diverse cricket data sources",
      "Combining multiple models into an effective ensemble",
      "Handling missing values and ensuring data integrity"
    ],
    // "similarProjectIds": [2, 3, 4]
  },
  {
    "id": 6,
    "title": "DTL Quant Challenge 2024 - Alpha Generation Model",
    "description": "Developed a dynamic alpha generation model that ranked in the top 20 nationally, achieving strong scores across in-sample, out-sample, and real-time performance.",
    "longDescription": "This project involved building a sophisticated alpha generation model for the DTL Quant Challenge 2024. The model integrated multiple financial signals, including RSI, mean reversion, volatility, and trend indicators. We dynamically adjusted weights based on the model's previous alpha performance, enhancing adaptability to changing market conditions. This approach achieved scores of 2.42 in-sample, 1.32 out-sample, and 0.48 in real-time, proving its robustness across different market scenarios. Placing 19th nationally highlighted the model's strong predictive ability and innovative approach to quantitative trading.",
    "image": "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc",
    "tags": ["Quantitative Finance", "Alpha Generation", "RSI", "Mean Reversion", "Volatility"],
    "type": "Competition",
    "objectives": [
      "Develop a robust alpha model to perform in varying market conditions",
      "Enhance model adaptability by dynamically adjusting signal weights",
      "Achieve high ranking in a competitive quantitative finance simulation"
    ],
    "technologies": ["Python", "Pandas", "NumPy", "Financial Indicators"],
    "methods": [
      "Combining financial signals (RSI, mean reversion, volatility, trend)",
      "Dynamic weight adjustment based on alpha performance",
      "Performance validation across in-sample, out-sample, and real-time data"
    ],
    "results": [
      "Scored 2.42 in-sample, 1.32 out-sample, and 0.48 in real-time",
      "Ranked 19th nationally in the DTL Quant Challenge",
      "Validated model's reliability and adaptability in dynamic markets"
    ],
    "githubLink": "https://github.com/yourusername/alpha-generation-model",
    // "articleLink": "https://medium.com/@yourusername/quant-challenge-alpha-model",
    // "liveDemoLink": "https://website.com",
    "role": "Data Scientist",
    "duration": "Dec 2023 - Feb 2024",
    "challenges": [
      "Integrating multiple financial signals effectively for alpha generation",
      "Dynamically adjusting model parameters based on performance and market conditions",
      "Validating model robustness across different market conditions and scenarios"
    ],
    // "similarProjectIds": [2, 3, 4],
    "galleryImages": [
      "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc",
      "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc"
    ]
  },
  {
    "id": 7,
    "title": "General Championship Data Analytics - Social and Healthcare Risk Scorecard",
    "description": "Developed a comprehensive Social and Healthcare Risk Scorecard using decision trees and ensemble methods, achieving 82.89% accuracy and securing 1st rank.",
    "longDescription": "This project involved creating a Social and Healthcare Risk Scorecard in collaboration with Evva Health. Using decision tree algorithms and community data gathered via web scraping with BeautifulSoup and Selenium, we constructed a risk assessment tool aimed at informing resource allocation based on risk factors. Advanced statistical techniques, including Bifactor and MIRT analysis, were utilized to analyze and score responses from patient questionnaires. The deployment on Streamlit provided an accessible and interactive platform for risk analysis, with an ensemble model incorporating Voting, BERT, and Bayes Classification achieving an accuracy of 82.89%.",
    "image": "https://www.commonwealthfund.org/sites/default/files/styles/horizontal_hero_desktop/public/2023_Scorecard_cvr_1800w.png?itok=5Pw9DyJF",
    "tags": ["Healthcare", "Data Analytics", "Social Risk Scorecard", "Ensemble Methods", "Web Scraping","Deployed","Completed Project"],
    "type": "Competition",
    "objectives": [
      "Develop a risk scorecard to assess social and healthcare risk factors",
      "Utilize patient data and community resource data for informed resource allocation",
      "Achieve high accuracy in risk classification through advanced modeling"
    ],
    "technologies": ["Python", "Streamlit", "BeautifulSoup", "Selenium", "BERT", "Bayes Classification", "Voting Method"],
    "methods": [
      "Data collection using web scraping (BeautifulSoup and Selenium)",
      "Statistical analysis using Bifactor and MIRT for scorecard construction",
      "Decision tree model development and deployment via Streamlit",
      "Ensemble model incorporating Voting, BERT, and Bayes Classification for accuracy optimization"
    ],
    "results": [
      "Secured 1st place in the institute competition",
      "Achieved an accuracy of 82.89% in risk assessment",
      "Created a case study on India-based community resource allocation"
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
    "githubLink": "https://github.com/yourusername/healthcare-risk-scorecard",
    // "articleLink": "https://medium.com/@yourusername/social-health-risk-scorecard",
    // "liveDemoLink": "https://website.com",
    "role": "Data Scientist",
    "duration": "Dec 2023 - Feb 2024",
    "challenges": [
      "Integrating multiple financial signals effectively",
      "Dynamically adjusting model parameters based on performance",
      "Validating model robustness across different market conditions"
    ],
    // "similarProjectIds": [2, 3, 4],
    "galleryImages": [
      "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc",
      "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc"
    ]
  },
  {
    "id": 8,
    "title": "Open IIT Data Analytics Competition - Footfall Prediction",
    "description": "Developed a time-series model to predict city footfall, achieving 86.63% accuracy and securing 2nd place in the institute.",
    "longDescription": "In this project, we built a predictive model to forecast city footfall based on historical time-series data, as part of the Open IIT Data Analytics Competition. By scraping data using BeautifulSoup and conducting exploratory data analysis, we uncovered key patterns in the time series. Applying K-Means clustering helped identify underlying trends. Forecasting models, including FBProphet, Random Forest, and Bidirectional LSTM, were then combined in an ensemble approach that improved prediction accuracy, resulting in an 86.63% accuracy score. This ensemble model offered a robust and dynamic forecasting solution for city footfall.",
    "image": "https://imgs.search.brave.com/S8-YiFIU0XBX9jE91wgiHBftts4ZGFN46EVla9J2LJE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dHJhZnN5cy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjQv/MDIvMi1XaGF0LUlz/LUZvb3RmYWxsLUFu/YWx5dGljcy5qcGc",
    "tags": ["Data Analytics", "Time Series", "Footfall Prediction", "Ensemble Modeling", "K-Means Clustering"],
    "type": "Competition",
    "objectives": [
      "Predict city footfall using historical time-series data",
      "Improve forecasting accuracy through an ensemble approach",
      "Identify trends and clusters in footfall data for better resource allocation"
    ],
    "technologies": ["Python", "BeautifulSoup", "FBProphet", "Random Forest", "LSTM", "K-Means"],
    "methods": [
      "Web scraping using BeautifulSoup for data collection",
      "Exploratory data analysis and time series decomposition",
      "Clustering with K-Means for trend identification",
      "Ensemble modeling with FBProphet, Random Forest, and Bidirectional LSTM"
    ],
    "results": [
      "Achieved 2nd place in the institute competition",
      "Reached an accuracy of 86.63% in footfall prediction",
      "Developed a reliable footfall prediction model for urban planning"
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
    "githubLink": "https://github.com/yourusername/footfall-prediction",
    // "articleLink": "https://medium.com/@yourusername/footfall-prediction",
    // "liveDemoLink": "https://website.com",
    "role": "Data Scientist",
    "duration": "Dec 2023 - Feb 2024",
    "challenges": [
      "Integrating multiple financial signals effectively",
      "Dynamically adjusting model parameters based on performance",
      "Validating model robustness across different market conditions"
    ],
    // "similarProjectIds": [2, 3, 4],
    "galleryImages": [
      "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc",
      "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc"
    ]
  },
  {
    id: 9,
    title: "Recommendation Engine for E-commerce Platform",
    description:
      "Built a personalized recommendation engine, increasing average order value by 15% and customer engagement by 22%.",
    longDescription:
      "This project aimed to predict customer churn for a major telecom provider. By analyzing customer data and building a machine learning model, we were able to accurately identify customers likely to churn.",
    image:
      "https://images.unsplash.com/photo-1555421689-d68471e189f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Recommendation Systems", "Collaborative Filtering", "Python","Ongoing Project"],
    "type": "Project",
    objectives: [
      "Increase customer retention by identifying customers at risk of churning",
      "Improve targeted marketing strategies based on predictive insights",
      "Reduce churn rates by proactively addressing customer concerns",
    ],
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    methods: [
      "Data cleaning and preprocessing of customer data",
      "Exploratory data analysis to identify key factors contributing to churn",
      "Development of a logistic regression model to predict churn",
      "Evaluation of the model using precision, recall, and F1-score",
    ],
    results: [
      "25% improvement in customer retention rates",
      "10% reduction in marketing costs by targeting at-risk customers",
      "Higher engagement through personalized customer interactions",
    ],
//     codeSnippet: `
// import pandas as pd
// from sklearn.model_selection import train_test_split
// from sklearn.linear_model import LogisticRegression
// from sklearn.metrics import accuracy_score, precision_score, recall_score

// # Load and preprocess the data
// df = pd.read_csv('customer_data.csv')
// X = df.drop(columns=['churn'])
// y = df['churn']

// # Split data
// X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

// # Train logistic regression model
// model = LogisticRegression()
// model.fit(X_train, y_train)

// # Predictions
// y_pred = model.predict(X_test)

// # Evaluate
// print("Accuracy:", accuracy_score(y_test, y_pred))
// print("Precision:", precision_score(y_test, y_pred))
// print("Recall:", recall_score(y_test, y_pred))
//     `,
    githubLink: "https://github.com/yourusername/customer-churn",
    articleLink: "https://medium.com/@yourusername/customer-churn-case-study",
    // liveDemoLink: "https://website.com",
    "role": "Data Scientist",
    "duration": "Dec 2023 - Feb 2024",
    "challenges": [
      "Integrating multiple financial signals effectively",
      "Dynamically adjusting model parameters based on performance",
      "Validating model robustness across different market conditions"
    ],
    // "similarProjectIds": [2, 3, 4],
    "galleryImages": [
      "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc",
      "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc"
    ]
  },
  {
    "id": 10,
    "title": "Interhall Data Analytics Competition - Demand Forecasting",
    "description": "Forecasted product demand using advanced time-series models, achieving a MAPE of 17.1% with LSTM, and uncovering key sales trends and patterns.",
    "longDescription": "This demand forecasting project for the Interhall Data Analytics Competition involved analyzing 3 years of sales data to understand trends, detect outliers, and improve forecasting accuracy. Using Dynamic Time Warping, products with similar sales trends were clustered to aid in demand predictions. Models like SARIMAX, LSTM, and CatBoost were employed to compare their effectiveness, achieving Mean Absolute Percentage Errors (MAPE) of 25.7% (SARIMAX), 17.1% (LSTM), and 18.3% (CatBoost). The approach led to accurate demand forecasting, demonstrating the efficacy of advanced time-series techniques.",
    "image": "https://imgs.search.brave.com/KZ6FnWsD7yAHDbTFoKkmSFBFHG90Xye15_ccwxK7yN8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDgy/ODU4NjgzL3Bob3Rv/L3N1cHBseS1hbmQt/ZGVtYW5kLWdyYXBo/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz0zWW14RFByNUx6/LXZZcGhwb0R4aFpy/NzNuaHJqWlZVOHhp/WEpmTEE3bTNBPQ",
    "tags": ["Time Series Analysis", "LSTM", "Demand Forecasting", "Data Clustering", "SARIMAX", "CatBoost"],
    "objectives": [
      "Analyze sales data to detect trends and outliers",
      "Cluster products with similar sales patterns using Dynamic Time Warping",
      "Improve forecasting accuracy using advanced time-series models"
    ],
    "type": "Competition",
    "technologies": ["Python", "LSTM", "Pandas", "Dynamic Time Warping", "SARIMAX", "CatBoost"],
    "methods": [
      "Exploratory Data Analysis for trend detection and outlier analysis",
      "Dynamic Time Warping for clustering similar time-series patterns",
      "Modeling with SARIMAX, LSTM, and CatBoost for demand forecasting"
    ],
    "results": [
      "Achieved a MAPE of 17.1% with LSTM, 18.3% with CatBoost, and 25.7% with SARIMAX",
      "Successfully forecasted demand with improved accuracy",
      "Identified key trends and clustered products for targeted forecasting"
    ],
  //   "codeSnippet": `
  // from statsmodels.tsa.statespace.sarimax import SARIMAX
  // from tensorflow.keras.models import Sequential
  // from tensorflow.keras.layers import LSTM, Dense
  // from catboost import CatBoostRegressor
  
  // # SARIMAX model setup
  // sarimax_model = SARIMAX(data, order=(1, 1, 1), seasonal_order=(1, 1, 1, 12))
  // sarimax_fit = sarimax_model.fit(disp=False)
  
  // # LSTM model setup
  // lstm_model = Sequential()
  // lstm_model.add(LSTM(50, activation='relu', input_shape=(n_steps, n_features)))
  // lstm_model.add(Dense(1))
  // lstm_model.compile(optimizer='adam', loss='mape')
  
  // # CatBoost model setup
  // catboost_model = CatBoostRegressor()
  // catboost_model.fit(X_train, y_train)
  //     `,
    "githubLink": "https://github.com/yourusername/demand-forecasting-competition",
    "articleLink": "https://medium.com/@yourusername/demand-forecasting-case-study",
    // "liveDemoLink": "https://website.com",
    "role": "Data Scientist",
    "duration": "Dec 2023 - Feb 2024",
    "challenges": [
      "Integrating multiple financial signals effectively",
      "Dynamically adjusting model parameters based on performance",
      "Validating model robustness across different market conditions"
    ],
    // "similarProjectIds": [2, 3, 4],
    "galleryImages": [
      "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc",
      "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc"
    ]
  },
  {
    "id": 11,
    "title": "FUGACITY Fest Website Development",
    "description": "Developed a dynamic, responsive website for our department's annual fest, FUGACITY, using React, Tailwind CSS, and Node.js.for our annual fest FUGACITY of the department of Chemical engineering IIT Kharagpur",
    "longDescription": "This project involved creating a visually appealing, user-friendly website for the FUGACITY fest, designed to showcase event information, schedules, and updates. Built with React for interactive components, Tailwind CSS for styling, and Node.js for efficient backend management, the website delivered a seamless user experience with full responsiveness across devices.",
    "image": cheaimg,
    "tags": ["Web Development", "React", "Tailwind CSS", "Node.js", "Event Website", "Responsive Design","Completed Project"],
    "objectives": [
      "Create a responsive and engaging website for the FUGACITY fest",
      "Showcase event details, schedules, and updates in a user-friendly manner",
      "Optimize for fast loading and smooth navigation across devices"
    ],
    "technologies": ["React", "Tailwind CSS", "Node.js", "JavaScript"],
    "type": "Fest Website",
    "methods": [
      "Developed interactive components using React",
      "Applied Tailwind CSS for rapid and responsive styling",
      "Utilized Node.js to manage backend functionalities",
      "Implemented fully responsive design for mobile and desktop users"
    ],
    "results": [
      "Successfully launched the FUGACITY fest website, receiving positive user feedback",
      "Enhanced user engagement through an interactive and responsive design",
      "Streamlined event management with real-time updates and notifications"
    ],
    codeSnippet: `
For Live Demo Visit : https://chea-ikkswc60t-shau8122.vercel.app
    `,
    "githubLink": "https://github.com/ChemicalEngineeringAssociation/ChEA_Fugacity",
    "articleLink": "https://medium.com/@yourusername/fugacity-fest-website",
    "liveDemoLink": "https://chea-ikkswc60t-shau8122.vercel.app",
    "role": "Data Scientist",
    "duration": "Dec 2023 - Feb 2024",
    "challenges": [
      "Integrating multiple financial signals effectively",
      "Dynamically adjusting model parameters based on performance",
      "Validating model robustness across different market conditions"
    ],
    // "similarProjectIds": [2, 3, 4],
    "galleryImages": [
      "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc",
      "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc"
    ]
  },
  {
    "id": 12,
    "title": "Responsive Portfolio Website",
    "description": "Created a responsive portfolio website using React, Tailwind CSS, and Node.js to showcase projects, skills and Achievements.",
    "longDescription": "This project focused on developing a personal portfolio website to showcase projects, skills, and professional information. Using React for dynamic components, Tailwind CSS for sleek and responsive design, and Node.js for backend integration, the website provides an interactive and modern user experience, fully optimized for various screen sizes.",
    "image": portfolioimg,
    "tags": ["Web Development", "Portfolio", "React", "Tailwind CSS", "Node.js","Ongoing Project"],
    "type": "Portfolio Website",
    "objectives": [
      "Create a professional and visually engaging portfolio website",
      "Showcase projects and skills with a responsive design",
      "Optimize user interface for a seamless experience across devices"
    ],
    "technologies": ["React", "Tailwind CSS", "Node.js", "JavaScript"],
    "methods": [
      "Built dynamic components and sections using React",
      "Designed responsive and aesthetic layouts with Tailwind CSS",
      "Implemented a scalable Node.js backend for portfolio data management",
      "Ensured cross-device compatibility for consistent user experience"
    ],
    "results": [
      "Successfully launched a professional portfolio website with positive feedback",
      "Improved personal branding with an interactive showcase of projects",
      "Achieved high responsiveness and user engagement across all devices"
    ],
    codeSnippet: `
For Live Demo Visit : https://arpitkumar2004.github.io/data_science-portfolio-website-final/
    `,
    "githubLink": "https://github.com/arpitkumar2004/data_science-portfolio-website-final",
    "articleLink": "https://medium.com/@yourusername/portfolio-website",
    "liveDemoLink": "https://arpitkumar2004.github.io/data_science-portfolio-website-final/",
    "role": "Data Scientist",
    "duration": "Dec 2023 - Feb 2025",
    "challenges": [
      "Integrating multiple financial signals effectively",
      "Dynamically adjusting model parameters based on performance",
      "Validating model robustness across different market conditions"
    ],
    // "similarProjectIds": [2, 3, 4],
    "galleryImages": [
      "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc",
      "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc"
    ]
  },
  {
    id: 13,
    title: "Volatility Curve Prediction by NK Securities",
    description:
      "Optimized predictive models for volatility curve estimation using advanced quantitative techniques and novel ensembling.",
    longDescription:
      "Developed predictive models leveraging Euclidean geometry and data clustering for enhanced accuracy. Implemented Parametric Curve Fitting, Denoising Transformers, and Iterative Imputation methods. The project demonstrated strong analytical design, combining machine learning, statistical, and geometric principles for financial forecasting.",
    image: "/images/projects/volatility_curve_prediction.png",
    tags: ["Quantitative Research", "Financial Modeling", "Time Series", "Deep Learning", "Ensembling"],
    "type": "Competition",
    objectives: [
      "Design an accurate volatility curve predictor using financial data.",
      "Integrate geometric and statistical methods in ensembling."
    ],
    technologies: ["Python", "PyTorch", "NumPy", "Pandas", "Matplotlib"],
    methods: ["Geometric Ensembling", "Parametric Curve Fitting", "Iterative Imputation", "Transformers"],
    results: [
      "Improved volatility prediction accuracy using geometric averaging.",
      "Demonstrated hybrid use of geometry and ML in finance."
    ],
    codeSnippet: "https://github.com/yourusername/volatility-curve-prediction",
    githubLink: "https://github.com/yourusername/volatility-curve-prediction",
    articleLink: "#",
    role: "Quant Researcher | ML Engineer",
    duration: "May 2025 - May 2025",
    challenges: [
      "Handling volatility data noise and outliers.",
      "Maintaining model stability across time horizons."
    ],
    // similarProjectIds: [1, 4]
  },
  {
    id: 14,
    title: "Multimodal Price Prediction using Text, Image, and Tabular Data",
    description: "End-to-end ML pipeline predicting product prices using text, images, and tabular information.",
    longDescription:
      "Developed a state-of-the-art multimodal ML system for the Amazon ML Challenge 2025. The project combines BERT-based text embeddings, CLIP image representations, and structured tabular data to predict product prices with high accuracy. Leveraged UMAP for dimensionality reduction and ensemble stacking (Linear, RF, LGBM, XGB, CatBoost) to boost predictive performance and robustness. Built a modular, OOP-driven, YAML-configured experimental pipeline enabling rapid cross-validation, meta-learning, and reproducible experiments.",
    image: "/projects/multimodal-price.jpg",
    "type": "Competition",
    tags: ["Machine Learning", "Deep Learning", "Multimodal AI", "Ensemble Models","Deployed","Completed Project"],
    objectives: [
      "Integrate heterogeneous data modalities for accurate price prediction",
      "Design a modular ML pipeline for rapid experimentation and reproducibility",
      "Optimize ensemble stacking models for maximum predictive performance"
    ],
    technologies: ["Python", "PyTorch", "TensorFlow", "BERT", "CLIP", "LightGBM", "XGBoost", "CatBoost", "UMAP"],
    methods: ["Feature Embedding", "Dimensionality Reduction", "Ensemble Stacking", "Cross-validation", "OOP Pipeline Design"],
    results: ["Achieved SMAPE 42.89%", "Secured top 0.5% globally", "Built a scalable and modular ML pipeline for experimentation"],
    codeSnippet: "",
    githubLink: "https://github.com/arpitkumar2004/A_ML_2025",
    articleLink: "",
    liveDemoLink: "",
    role: "Lead Developer",
    duration: "Oct 2025",
    challenges: [
      "Combining heterogeneous text, image, and tabular data effectively",
      "Maintaining modularity for fast experimentation cycles",
      "Fine-tuning ensemble models for top-tier competition ranking"
    ],
    galleryImages: [],
    // similarProjectIds: [2]
  },
  {
    id: 15,
    title: "Deep Learning Based Text Summarization System",
    description: "Automated summarization of large-scale documents with deep learning for improved efficiency and comprehension.",
    longDescription:
      "Built a deep learning pipeline to summarize 100K+ documents automatically, reducing average summary length by 75% while retaining over 92% of original information. Designed and automated preprocessing, training, and inference pipelines, increasing throughput from 5K to 25K documents per hour. The model improved summary quality by 35% ROUGE-L F1 over extractive baselines, drastically reducing manual review workload and enabling scalable document analysis.",
    image: "/projects/text-summarizer.jpg",
    "type": "Project",
    tags: ["Deep Learning", "NLP", "Text Summarization", "Automation","Ongoing Project"],
    objectives: [
      "Reduce manual summarization workload for large document datasets",
      "Maintain high information retention in generated summaries",
      "Automate end-to-end ML pipelines for preprocessing, training, and inference"
    ],
    technologies: ["Python", "PyTorch", "TensorFlow", "Transformers", "NLTK", "Streamlit"],
    methods: ["Sequence-to-Sequence Modeling", "Pipeline Automation", "ROUGE Evaluation", "Data Preprocessing"],
    results: ["75% reduction in summary length", "35% improvement in ROUGE-L F1", "5× increase in processing throughput"],
    codeSnippet: "",
    githubLink: "https://github.com/arpitkumar2004/Text-Summarizer-Project",
    articleLink: "",
    liveDemoLink: "",
    role: "Lead Developer",
    duration: "Jun 2025",
    challenges: [
      "Processing and summarizing large-scale text datasets efficiently",
      "Maintaining abstraction quality and reducing information loss",
      "Designing automated pipelines for large-scale deployment"
    ],
    galleryImages: [],
    // similarProjectIds: [1]
  },
  {
    id: 16,
    title: "Social and Healthcare Risk Scorecard | Evva Health",
    description: "AI-driven patient risk prediction and healthcare resource optimization system.",
    longDescription:
      "Developed a voting ensemble AI model combining BERT, Naive Bayes, and Decision Tree to classify patient-reported health risks with 82.89% accuracy. Deployed a multipage Streamlit app providing real-time scoring and dynamic feedback for healthcare professionals. Scraped 1000+ patient entries using BeautifulSoup and Selenium, integrating Bifactor & MIRT modeling to optimize resource allocation across Indian healthcare case studies.",
    image: "/projects/evva-risk-score.jpg",
    "type": "Competition",
    tags: ["Healthcare Analytics", "Machine Learning", "Web Application", "NLP","Deployed","Completed Project"],
    objectives: [
      "Predict patient risk profiles accurately using AI models",
      "Deploy real-time scoring web app to assist healthcare professionals",
      "Optimize healthcare resource allocation with predictive insights"
    ],
    technologies: ["Python", "BERT", "Naive Bayes", "Decision Tree", "Streamlit", "BeautifulSoup", "Selenium"],
    methods: ["Voting Ensemble", "NLP Data Processing", "Web Deployment", "MIRT & Bifactor Models", "Data Scraping"],
    results: ["82.89% prediction accuracy", "60% reduction in manual data collection", "Optimized healthcare resources using predictive modeling"],
    codeSnippet: "",
    githubLink: "https://github.com/arpitkumar2004/DA96_webapp",
    articleLink: "",
    liveDemoLink: "",
    role: "Lead Developer",
    duration: "Mar–Apr 2024",
    challenges: [
      "Handling unstructured and noisy patient data",
      "Integrating ensemble AI models for robust predictions",
      "Deploying a responsive, multipage web application for real-time use"
    ],
    galleryImages: [],
    // similarProjectIds: []
  },
  {
    id: 17,
    title: "Advanced Process Modelling & Simulation | IIT Kharagpur",
    description: "Simulation and optimization of chemical processes for energy efficiency and sustainable production.",
    longDescription:
      "Simulated multi-stage distillation columns, flash separations, and heat exchangers under Prof. Sourav Mondal and Prof. Nikita Saxena. Performed pinch analysis and COMSOL simulations to reduce utility costs by up to 30% and improve heat transfer efficiency by 15%. Integrated neural networks to predict boiling points (R² > 0.85) and automated multicomponent flash processes, increasing benzene recovery to 95%. Focused on sustainable and energy-efficient chemical process development.",
    image: "/projects/process-modelling.jpg",
    "type": "Research Project",
    tags: ["Process Engineering", "Simulation", "Optimization", "Electrlyser Design","Completed Project"],
    objectives: [
      "Optimize chemical process efficiency and sustainability",
      "Integrate predictive ML models into traditional process simulations",
      "Improve product purity and reduce energy consumption"
    ],
    technologies: ["Aspen Plus", "Aspen Hysys", "COMSOL", "Python", "Neural Networks", "Flash Separation Models"],
    methods: ["Process Simulation", "Pinch Analysis", "Neural Network Prediction", "Energy Optimization", "Multi-Stage Column Design"],
    results: ["20% reboiler energy reduction", "98% MeOH purity achieved", "15% improvement in heat transfer efficiency"],
    codeSnippet: "",
    githubLink: "https://github.com/arpitkumar2004/Assigment-PMS",
    articleLink: "",
    liveDemoLink: "",
    role: "Researcher",
    company: "IIT Kharagpur",
    duration: "July 2025 – Nov 2025",
    challenges: [
      "Designing multi-stage separation columns with high purity",
      "Integrating ML models with chemical process simulations",
      "Ensuring industrially relevant and safe process designs"
    ],
    galleryImages: [],
    // similarProjectIds: []
  }
];
