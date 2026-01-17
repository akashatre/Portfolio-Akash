
import { BarChart2, Globe, Database } from 'lucide-react';
import React from 'react';

// We need to store icon names as strings for JSON serialization, 
// then map them back to components in the UI.
export const initialProjects = [
    {
        id: 1,
        title: "HR Analytics Dashboard",
        desc: "Interactive Power BI dashboard to track employee performance, attrition risk, and productivity scores. Built with Python for data cleaning and SQL for data modeling.",
        tech: ["Power BI", "Python", "SQL", "Pandas"],
        link: "https://github.com/akashatre",
        github: "https://github.com/akashatre",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        iconName: "BarChart2"
    },
    {
        id: 2,
        title: "E-commerce Sales Analytics",
        desc: "Comprehensive analytics solution for measuring KPIs like revenue, AOV, and customer retention. Utilized SQL for segmentation and Python for automation.",
        tech: ["Power BI", "SQL", "Python", "DAX"],
        link: "https://github.com/akashatre",
        github: "https://github.com/akashatre",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
        iconName: "Globe"
    },
    {
        id: 3,
        title: "News Sentiment Analysis",
        desc: "Automated AWS workflow to analyze news sentiment using Lambda, Step Functions, and Comprehend. Stored results in S3 and SQL database.",
        tech: ["AWS", "Lambda", "Comprehend", "SQL"],
        link: "https://github.com/akashatre/News-Sentiment-Analysis",
        github: "https://github.com/akashatre/News-Sentiment-Analysis",
        gradient: "linear-gradient(135deg, #0ba360 0%, #3cba92 100%)",
        iconName: "Database"
    },
    {
        id: 4,
        title: "Config-based Data Pipeline",
        desc: "Dynamic data ingestion pipeline allowing configuration-based transformations and validation for scalable data processing.",
        tech: ["Python", "ETL", "JSON", "Cloud"],
        link: "https://github.com/akashatre/Configrarion-based-data-pipline",
        github: "https://github.com/akashatre/Configrarion-based-data-pipline",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        iconName: "Database"
    }
];
