
export const initialProjects = [
    {
        id: 0,
        title: "Multi-Agent Data Lakehouse & RAG Pipeline",
        desc: "An end-to-end data platform built on a Medallion Architecture (Bronze/Silver/Gold S3 tiers) processing 50M+ transactional events. Integrates Apache Spark (PySpark) for batch cleaning, dbt for SQL data modeling, AWS Lambda & Step Functions for serverless orchestration, and pgvector (PostgreSQL) as a vector database to enable secure, natural language Text-to-SQL analytical queries.",
        tech: ["PySpark", "dbt", "AWS Step Functions", "pgvector", "PostgreSQL"],
        link: "https://github.com/akashatre/multi-agent-data-lakehouse",
        github: "https://github.com/akashatre/multi-agent-data-lakehouse",
        gradient: "linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)",
        iconName: "Cpu"
    },
    {
        id: 5,
        title: "Real-Time Clickstream Ingestion & Processing Pipeline",
        desc: "A high-throughput serverless ingestion engine processing 10M+ clickstream telemetry events daily. Implements AWS Kinesis Data Streams for real-time capture, Apache Flink (via Kinesis Data Analytics) for sliding-window session aggregations, AWS Glue PySpark jobs for database partitioning, and Amazon Athena for serverless SQL data querying.",
        tech: ["AWS Kinesis", "Apache Flink", "AWS Glue", "PySpark", "Athena"],
        link: "https://github.com/akashatre/realtime-clickstream-pipeline",
        github: "https://github.com/akashatre/realtime-clickstream-pipeline",
        gradient: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
        iconName: "Database"
    },
    {
        id: 1,
        title: "DataSense Analytics",
        desc: "Full-stack web app that automates exploratory data analysis for CSV files. Built with React.js (Vite) frontend and Python FastAPI backend, generating statistical summaries, data quality checks, and visual insights. Deployed on Netlify and Render.",
        tech: ["React.js", "FastAPI", "Python", "Pandas", "REST API"],
        link: "https://github.com/akashatre",
        github: "https://github.com/akashatre",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        iconName: "BarChart2"
    },
    {
        id: 2,
        title: "News Sentiment Analysis",
        desc: "Serverless AWS pipeline that extracts RSS feeds, orchestrates workflow via Step Functions, analyzes sentiment with Amazon Comprehend, and stores results in SQL and S3.",
        tech: ["AWS Lambda", "Step Functions", "Comprehend", "S3", "SQL"],
        link: "https://github.com/akashatre/News-Sentiment-Analysis",
        github: "https://github.com/akashatre/News-Sentiment-Analysis",
        gradient: "linear-gradient(135deg, #0ba360 0%, #3cba92 100%)",
        iconName: "Database"
    },
    {
        id: 3,
        title: "Business Performance Dashboard",
        desc: "Power BI dashboard suite at Thakral One to monitor KPIs, trends, and performance summaries for internal stakeholders. Backed by SQL queries and Python data pipelines.",
        tech: ["Power BI", "SQL", "Python", "Pandas", "DAX"],
        link: "https://github.com/akashatre",
        github: "https://github.com/akashatre",
        gradient: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
        iconName: "BarChart2"
    },
    {
        id: 4,
        title: "Config-based Data Pipeline",
        desc: "Dynamic data ingestion pipeline with configuration-based transformations and validation rules, making it easy to onboard new data sources without code changes.",
        tech: ["Python", "ETL", "JSON", "Cloud"],
        link: "https://github.com/akashatre/Configrarion-based-data-pipline",
        github: "https://github.com/akashatre/Configrarion-based-data-pipline",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        iconName: "Database"
    }
];
