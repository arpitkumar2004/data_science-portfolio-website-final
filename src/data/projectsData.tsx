import portfolioimg from "../data/img/myDataSciencePortfolio.png"
import cheaimg from "../data/img/ChemicalEngineeringAssociation.png"

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  objectives: string[];
  technologies: string[];
  methods: string[];
  results: string[];
  codeSnippet: string;
  githubLink: string;
  articleLink: string;
  liveDemoLink?: string;
}


export const projects: Project[] = [
  {
    "id": 1,
    "title": "Customer-Satisfaction using MLOps (ZenML)",
    "description": "Developed and deployed a regression model pipeline to predict customer review scores, enhancing forecasting accuracy by 20% through feature engineering and automated monitoring.",
    "longDescription": "This project involved analyzing a dataset of over 100,000 orders to predict customer satisfaction based on review scores. Leveraging ZenML and MLflow, the project featured an automated pipeline for data processing, model training, and deployment. Extensive data transformations and feature engineering were applied, focusing on attributes such as order status, pricing, and payment methods to optimize prediction accuracy.",
    "image": "https://plus.unsplash.com/premium_vector-1683134673277-bfcd86efa0f7?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "tags": ["MLOps", "Regression", "ZenML", "MLflow", "Data Engineering"],
    "objectives": [
      "Improve accuracy of customer review score predictions",
      "Automate pipeline for efficient model deployment and updates",
      "Track and monitor model performance over time"
    ],
    "technologies": ["Python", "ZenML", "MLflow", "Pandas", "Scikit-learn"],
    "methods": [
      "Data preprocessing including handling missing values and normalization",
      "Feature engineering to generate 15+ new predictive features",
      "Development of regression models to predict customer review scores",
      "Automation of ML pipeline with ZenML and MLflow integration",
      "Monitoring and model tracking for continuous performance updates"
    ],
    "results": [
      "Achieved a 20% improvement in model accuracy metrics",
      "Streamlined pipeline with automated deployment and monitoring",
      "Enhanced feature extraction contributing to higher forecast accuracy"
    ],
    "codeSnippet": `
  import zenml.pipelines as zp
  from sklearn.linear_model import LinearRegression
  from sklearn.preprocessing import StandardScaler
  from sklearn.pipeline import Pipeline
  
  # Example: Setting up a preprocessing and regression pipeline
  scaler = StandardScaler()
  model = LinearRegression()
  
  pipeline = Pipeline([
      ('scaler', scaler),
      ('regression', model)
  ])
  
  # Fit model with preprocessed data
  pipeline.fit(X_train, y_train)
      `,
    "githubLink": "https://github.com/arpitkumar2004/customer-satisfaction-mlops",
    "articleLink": "https://medium.com/@yourusername/customer-satisfaction-mlops",
    "liveDemoLink": "https://yourwebsite.com"
  },  

  {
    "id": 2,
    "title": "House Price Prediction using MLOps (ZenML)",
    "description": "Developed a dynamic, end-to-end pipeline for house price prediction, with automated deployment and real-time forecasting capabilities.",
    "longDescription": "This project aimed to predict house prices by constructing a comprehensive pipeline using ZenML, focusing on data preprocessing, feature engineering, and model optimization. Key elements included dynamic data splitting, imputation, outlier detection, and scaling to enhance model accuracy and robustness. Automated model deployment was implemented using ZenML, enabling real-time prediction services.",
    "image": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "tags": ["MLOps", "Regression", "ZenML", "Feature Engineering", "Real-time Prediction"],
    "objectives": [
      "Develop robust models for accurate house price predictions",
      "Automate end-to-end pipeline for efficient model deployment",
      "Provide real-time prediction capabilities"
    ],
    "technologies": ["Python", "ZenML", "Scikit-learn", "Pandas", "Hyperparameter Tuning"],
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
    "codeSnippet": `
  from zenml.pipelines import pipeline
  from sklearn.ensemble import RandomForestRegressor
  from sklearn.model_selection import train_test_split
  
  # Example pipeline step for data splitting and model training
  def data_split(X, y):
      X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
      return X_train, X_test, y_train, y_test
  
  model = RandomForestRegressor()
  model.fit(X_train, y_train)
      `,
    "githubLink": "https://github.com/arpitkumar2004/prices-predictor-system",
    "articleLink": "https://medium.com/@yourusername/house-price-prediction-mlops",
    "liveDemoLink": "https://yourwebsite.com"
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
    tags: ["Data Analysis", "Python", "Scikit-learn", "Logistic Regression"],
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
    codeSnippet: `
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score

# Load and preprocess the data
df = pd.read_csv('customer_data.csv')
X = df.drop(columns=['churn'])
y = df['churn']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train logistic regression model
model = LogisticRegression()
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Evaluate
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Precision:", precision_score(y_test, y_pred))
print("Recall:", recall_score(y_test, y_pred))
    `,
    githubLink: "https://github.com/yourusername/customer-churn",
    articleLink: "https://medium.com/@yourusername/customer-churn-case-study",
    liveDemoLink: "https://yourwebsite.com"
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
    tags: ["Anomaly Detection", "Apache Spark", "Machine Learning"],
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
    codeSnippet: `
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score

# Load and preprocess the data
df = pd.read_csv('customer_data.csv')
X = df.drop(columns=['churn'])
y = df['churn']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train logistic regression model
model = LogisticRegression()
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Evaluate
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Precision:", precision_score(y_test, y_pred))
print("Recall:", recall_score(y_test, y_pred))
    `,
    githubLink: "https://github.com/arpitkumar2004/Credit-Fraud-Detection-Project",
    articleLink: "https://medium.com/@yourusername/customer-churn-case-study",
    liveDemoLink: "https://website.com"
  },
  {
    "id": 5,
    "title": "Prediction of T-20 Cricket Match Winner",
    "description": "Developed a predictive model to forecast T-20 cricket match outcomes with 86.42% accuracy, utilizing player ratings and ensemble modeling.",
    "longDescription": "This project, guided by an American Express mentor, focused on predicting the outcomes of T-20 cricket matches. Key features were engineered from batsman, bowler, and match data, including custom player ratings and correlation-based feature selection. Missing values were imputed using the mean to maintain data integrity. Three high-performing classification models—LightGBM, XGBoost, and CatBoost—were trained on these features, and an ensemble layer combining all models further enhanced prediction accuracy. The final ensemble model achieved an 86.42% accuracy and 74.28% recall, demonstrating its effectiveness in match outcome prediction.",
    "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "tags": ["Machine Learning", "Cricket Analytics", "Ensemble Learning", "LightGBM", "XGBoost", "CatBoost"],
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
    "codeSnippet": `
  from lightgbm import LGBMClassifier
  from xgboost import XGBClassifier
  from catboost import CatBoostClassifier
  from sklearn.ensemble import VotingClassifier
  
  # Model setup
  lgbm = LGBMClassifier()
  xgb = XGBClassifier()
  cat = CatBoostClassifier(verbose=0)
  
  # Ensemble setup
  ensemble_model = VotingClassifier(estimators=[('lgbm', lgbm), ('xgb', xgb), ('cat', cat)], voting='soft')
  ensemble_model.fit(X_train, y_train)
      `,
    "githubLink": "https://github.com/arpitkumar2004/American_Express_Project",
    "articleLink": "https://medium.com/@yourusername/t20-cricket-match-prediction",
    "liveDemoLink": "https://website.com"
  },  
  {
    "id": 6,
    "title": "DTL Quant Challenge 2024 - Alpha Generation Model",
    "description": "Developed a dynamic alpha generation model that ranked in the top 20 nationally, achieving strong scores across in-sample, out-sample, and real-time performance.",
    "longDescription": "This project involved building a sophisticated alpha generation model for the DTL Quant Challenge 2024. The model integrated multiple financial signals, including RSI, mean reversion, volatility, and trend indicators. We dynamically adjusted weights based on the model's previous alpha performance, enhancing adaptability to changing market conditions. This approach achieved scores of 2.42 in-sample, 1.32 out-sample, and 0.48 in real-time, proving its robustness across different market scenarios. Placing 19th nationally highlighted the model's strong predictive ability and innovative approach to quantitative trading.",
    "image": "https://imgs.search.brave.com/zMH71WLFV1gkEVz40RlyYgHxXdWWQMbkYg0ZNR0jX9Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA3LzU5LzM2LzM2/LzM2MF9GXzc1OTM2/MzYzNV8zc2czbld5/a2pmMnk0NTQ3S1Y1/SWpSZXNNMkVUWGFH/eC5qcGc",
    "tags": ["Quantitative Finance", "Alpha Generation", "RSI", "Mean Reversion", "Volatility"],
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
    "codeSnippet": `
  import pandas as pd
  import numpy as np
  
  def calculate_alpha(data):
      # Example RSI calculation
      delta = data['close'].diff(1)
      gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
      loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
      rs = gain / loss
      rsi = 100 - (100 / (1 + rs))
      return rsi
  
  # Combining RSI with volatility and trend for alpha signal
  data['alpha'] = calculate_alpha(data)
  data['adjusted_alpha'] = data['alpha'] * data['volatility'] * data['trend']
      `,
    "githubLink": "https://github.com/yourusername/alpha-generation-model",
    "articleLink": "https://medium.com/@yourusername/quant-challenge-alpha-model",
    "liveDemoLink": "https://website.com"
  },  
  {
  "id": 7,
  "title": "General Championship Data Analytics - Social and Healthcare Risk Scorecard",
  "description": "Developed a comprehensive Social and Healthcare Risk Scorecard using decision trees and ensemble methods, achieving 82.89% accuracy and securing 1st rank.",
  "longDescription": "This project involved creating a Social and Healthcare Risk Scorecard in collaboration with Evva Health. Using decision tree algorithms and community data gathered via web scraping with BeautifulSoup and Selenium, we constructed a risk assessment tool aimed at informing resource allocation based on risk factors. Advanced statistical techniques, including Bifactor and MIRT analysis, were utilized to analyze and score responses from patient questionnaires. The deployment on Streamlit provided an accessible and interactive platform for risk analysis, with an ensemble model incorporating Voting, BERT, and Bayes Classification achieving an accuracy of 82.89%.",
  "image": "https://www.commonwealthfund.org/sites/default/files/styles/horizontal_hero_desktop/public/2023_Scorecard_cvr_1800w.png?itok=5Pw9DyJF",
  "tags": ["Healthcare", "Data Analytics", "Social Risk Scorecard", "Ensemble Methods", "Web Scraping"],
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
  "codeSnippet": `
from sklearn.ensemble import VotingClassifier
from sklearn.tree import DecisionTreeClassifier
from transformers import BertModel

# Example ensemble layer using Voting method
dt_model = DecisionTreeClassifier()
bert_model = BertModel.from_pretrained("bert-base-uncased")
voting_model = VotingClassifier(estimators=[('dt', dt_model), ('bert', bert_model)], voting='soft')

# Training the model
voting_model.fit(X_train, y_train)
    `,
  "githubLink": "https://github.com/yourusername/healthcare-risk-scorecard",
  "articleLink": "https://medium.com/@yourusername/social-health-risk-scorecard",
  "liveDemoLink": "https://website.com"
},
{
  "id": 8,
  "title": "Open IIT Data Analytics Competition - Footfall Prediction",
  "description": "Developed a time-series model to predict city footfall, achieving 86.63% accuracy and securing 2nd place in the institute.",
  "longDescription": "In this project, we built a predictive model to forecast city footfall based on historical time-series data, as part of the Open IIT Data Analytics Competition. By scraping data using BeautifulSoup and conducting exploratory data analysis, we uncovered key patterns in the time series. Applying K-Means clustering helped identify underlying trends. Forecasting models, including FBProphet, Random Forest, and Bidirectional LSTM, were then combined in an ensemble approach that improved prediction accuracy, resulting in an 86.63% accuracy score. This ensemble model offered a robust and dynamic forecasting solution for city footfall.",
  "image": "https://imgs.search.brave.com/S8-YiFIU0XBX9jE91wgiHBftts4ZGFN46EVla9J2LJE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dHJhZnN5cy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjQv/MDIvMi1XaGF0LUlz/LUZvb3RmYWxsLUFu/YWx5dGljcy5qcGc",
  "tags": ["Data Analytics", "Time Series", "Footfall Prediction", "Ensemble Modeling", "K-Means Clustering"],
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
  "codeSnippet": `
from fbprophet import Prophet
from sklearn.ensemble import RandomForestRegressor
from keras.layers import LSTM, Bidirectional
from keras.models import Sequential

# Example of Bidirectional LSTM model setup
model = Sequential([
    Bidirectional(LSTM(50, activation='relu'), input_shape=(timesteps, features)),
    Dense(1)
])
model.compile(optimizer='adam', loss='mse')

# Train model
model.fit(X_train, y_train, epochs=100, validation_split=0.2)
    `,
  "githubLink": "https://github.com/yourusername/footfall-prediction",
  "articleLink": "https://medium.com/@yourusername/footfall-prediction",
  "liveDemoLink": "https://website.com"
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
    tags: ["Recommendation Systems", "Collaborative Filtering", "Python"],
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
    codeSnippet: `
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score

# Load and preprocess the data
df = pd.read_csv('customer_data.csv')
X = df.drop(columns=['churn'])
y = df['churn']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train logistic regression model
model = LogisticRegression()
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Evaluate
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Precision:", precision_score(y_test, y_pred))
print("Recall:", recall_score(y_test, y_pred))
    `,
    githubLink: "https://github.com/yourusername/customer-churn",
    articleLink: "https://medium.com/@yourusername/customer-churn-case-study",
    liveDemoLink: "https://website.com"
  },
  {
    "id": 10,
    "title": "Interhall Data Analytics Competition - Demand Forecasting",
    "description": "Forecasted product demand using advanced time-series models, achieving a MAPE of 17.1% with LSTM, and uncovering key sales trends and patterns.",
    "longDescription": "This demand forecasting project for the Interhall Data Analytics Competition involved analyzing 3 years of sales data to understand trends, detect outliers, and improve forecasting accuracy. Using Dynamic Time Warping, products with similar sales trends were clustered to aid in demand predictions. Models like SARIMAX, LSTM, and CatBoost were employed to compare their effectiveness, achieving Mean Absolute Percentage Errors (MAPE) of 25.7% (SARIMAX), 17.1% (LSTM), and 18.3% (CatBoost). The approach led to accurate demand forecasting, demonstrating the efficacy of advanced time-series techniques.",
    "image": "https://imgs.search.brave.com/KZ6FnWsD7yAHDbTFoKkmSFBFHG90Xye15_ccwxK7yN8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDgy/ODU4NjgzL3Bob3Rv/L3N1cHBseS1hbmQt/ZGVtYW5kLWdyYXBo/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz0zWW14RFByNUx6/LXZZcGhwb0R4aFpy/NzNuaHJqWlZVOHhp/WEpmTEE3bTNBPQ",
    "tags": ["Time Series Analysis","LSTM",  "Demand Forecasting", "Data Clustering", "SARIMAX", "CatBoost"],
    "objectives": [
      "Analyze sales data to detect trends and outliers",
      "Cluster products with similar sales patterns using Dynamic Time Warping",
      "Improve forecasting accuracy using advanced time-series models"
    ],
    "technologies": ["Python","LSTM", "Pandas", "Dynamic Time Warping",  "SARIMAX", "CatBoost"],
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
    "codeSnippet": `
  from statsmodels.tsa.statespace.sarimax import SARIMAX
  from tensorflow.keras.models import Sequential
  from tensorflow.keras.layers import LSTM, Dense
  from catboost import CatBoostRegressor
  
  # SARIMAX model setup
  sarimax_model = SARIMAX(data, order=(1, 1, 1), seasonal_order=(1, 1, 1, 12))
  sarimax_fit = sarimax_model.fit(disp=False)
  
  # LSTM model setup
  lstm_model = Sequential()
  lstm_model.add(LSTM(50, activation='relu', input_shape=(n_steps, n_features)))
  lstm_model.add(Dense(1))
  lstm_model.compile(optimizer='adam', loss='mape')
  
  # CatBoost model setup
  catboost_model = CatBoostRegressor()
  catboost_model.fit(X_train, y_train)
      `,
    "githubLink": "https://github.com/yourusername/demand-forecasting-competition",
    "articleLink": "https://medium.com/@yourusername/demand-forecasting-case-study",
    "liveDemoLink": "https://website.com"
  },  
  {
    "id": 11,
    "title": "FUGACITY Fest Website Development",
    "description": "Developed a dynamic, responsive website for our department's annual fest, FUGACITY, using React, Tailwind CSS, and Node.js.for our annual fest FUGACITY of the department of Chemical engineering IIT Kharagpur",
    "longDescription": "This project involved creating a visually appealing, user-friendly website for the FUGACITY fest, designed to showcase event information, schedules, and updates. Built with React for interactive components, Tailwind CSS for styling, and Node.js for efficient backend management, the website delivered a seamless user experience with full responsiveness across devices.",
    "image": cheaimg,
    "tags": ["Web Development", "React", "Tailwind CSS", "Node.js", "Event Website"],
    "objectives": [
      "Create a responsive and engaging website for the FUGACITY fest",
      "Showcase event details, schedules, and updates in a user-friendly manner",
      "Optimize for fast loading and smooth navigation across devices"
    ],
    "technologies": ["React", "Tailwind CSS", "Node.js", "JavaScript"],
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
    "liveDemoLink": "https://chea-ikkswc60t-shau8122.vercel.app"
  },
  {
    "id": 12,
    "title": "Responsive Portfolio Website",
    "description": "Created a responsive portfolio website using React, Tailwind CSS, and Node.js to showcase projects, skills and Achievements.",
    "longDescription": "This project focused on developing a personal portfolio website to showcase projects, skills, and professional information. Using React for dynamic components, Tailwind CSS for sleek and responsive design, and Node.js for backend integration, the website provides an interactive and modern user experience, fully optimized for various screen sizes.",
    "image": portfolioimg,
    "tags": ["Web Development", "Portfolio", "React", "Tailwind CSS", "Node.js"],
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
    "liveDemoLink": "https://arpitkumar2004.github.io/data_science-portfolio-website-final/"
  }  
];
