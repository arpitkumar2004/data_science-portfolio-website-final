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
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Predictive Maintenance for Industrial Equipment",
    description:
      "Developed a machine learning model to predict equipment failures, reducing downtime by 30%.",
    longDescription:
      "This project focused on implementing a predictive maintenance solution for a large manufacturing company. By analyzing sensor data from industrial equipment, we developed a machine learning model that could accurately predict potential failures before they occurred.",
    image:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Machine Learning", "Python", "TensorFlow", "Time Series Analysis"],
    objectives: [
      "Reduce equipment downtime by predicting failures in advance",
      "Optimize maintenance schedules based on predictive insights",
      "Improve overall equipment efficiency and lifespan",
    ],
    technologies: ["Python", "TensorFlow", "Pandas", "Scikit-learn", "Docker"],
    methods: [
      "Data collection and preprocessing of sensor data",
      "Feature engineering to extract relevant indicators",
      "Time series analysis to identify patterns and anomalies",
      "Development of a deep learning model using LSTM networks",
      "Model deployment and integration with existing systems",
    ],
    results: [
      "30% reduction in unplanned downtime",
      "20% increase in overall equipment efficiency",
      "Estimated cost savings of $2 million annually",
    ],
    codeSnippet: `
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

def create_model(input_shape):
    model = Sequential([
        LSTM(64, input_shape=input_shape, return_sequences=True),
        LSTM(32, return_sequences=False),
        Dense(1, activation='sigmoid')
    ])
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    return model

# Create and train the model
model = create_model((sequence_length, num_features))
history = model.fit(X_train, y_train, epochs=100, validation_split=0.2)
    `,
    githubLink: "https://github.com/yourusername/predictive-maintenance",
    articleLink:
      "https://medium.com/@yourusername/predictive-maintenance-case-study",
  },
  {
    id: 2,
    title: "Predictive Maintenance for Industrial Equipment",
    description:
      "Developed a machine learning model to predict equipment failures, reducing downtime by 30%.",
    longDescription:
      "This project focused on implementing a predictive maintenance solution for a large manufacturing company. By analyzing sensor data from industrial equipment, we developed a machine learning model that could accurately predict potential failures before they occurred.",
    image:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Machine Learning", "Python", "TensorFlow", "Time Series Analysis"],
    objectives: [
      "Reduce equipment downtime by predicting failures in advance",
      "Optimize maintenance schedules based on predictive insights",
      "Improve overall equipment efficiency and lifespan",
    ],
    technologies: ["Python", "TensorFlow", "Pandas", "Scikit-learn", "Docker"],
    methods: [
      "Data collection and preprocessing of sensor data",
      "Feature engineering to extract relevant indicators",
      "Time series analysis to identify patterns and anomalies",
      "Development of a deep learning model using LSTM networks",
      "Model deployment and integration with existing systems",
    ],
    results: [
      "30% reduction in unplanned downtime",
      "20% increase in overall equipment efficiency",
      "Estimated cost savings of $2 million annually",
    ],
    codeSnippet: `
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

def create_model(input_shape):
    model = Sequential([
        LSTM(64, input_shape=input_shape, return_sequences=True),
        LSTM(32, return_sequences=False),
        Dense(1, activation='sigmoid')
    ])
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    return model

# Create and train the model
model = create_model((sequence_length, num_features))
history = model.fit(X_train, y_train, epochs=100, validation_split=0.2)
    `,
    githubLink: "https://github.com/yourusername/predictive-maintenance",
    articleLink:
      "https://medium.com/@yourusername/predictive-maintenance-case-study",
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
    githubLink: "https://github.com/yourusername/customer-churn",
    articleLink: "https://medium.com/@yourusername/customer-churn-case-study",
  },
  {
    id: 5,
    title: "Computer Vision for Quality Control",
    description:
      "Developed a computer vision system for automated quality control in manufacturing, improving defect detection accuracy by 35%.",
    longDescription:
      "This project aimed to predict customer churn for a major telecom provider. By analyzing customer data and building a machine learning model, we were able to accurately identify customers likely to churn.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    tags: ["Computer Vision", "Deep Learning", "OpenCV"],
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
  },
  {
    id: 6,
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
  },
];
