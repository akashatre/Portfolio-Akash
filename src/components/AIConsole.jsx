import { useState, useEffect, useRef } from 'react';
import { Terminal, Database, Cpu, Cloud, LineChart, Code, Play } from 'lucide-react';
import './AIConsole.css';

// --- MOCK DATABASE ---
const MOCK_DB = {
    transactions: [
        { id: 1, date: "2025-01-02", customer: "Aarav Sharma", total: 1250.00, status: "Completed" },
        { id: 2, date: "2025-01-05", customer: "Neha Patel", total: 450.00, status: "Completed" },
        { id: 3, date: "2025-01-10", customer: "Rahul Verma", total: 3100.50, status: "Pending" },
        { id: 4, date: "2025-01-12", customer: "Priya Nair", total: 890.00, status: "Completed" },
        { id: 5, date: "2025-01-15", customer: "Amit Gupta", total: 5200.00, status: "Completed" },
        { id: 6, date: "2025-01-18", customer: "Sanya Sen", total: 150.00, status: "Failed" },
        { id: 7, date: "2025-01-22", customer: "Vikram Singh", total: 2400.00, status: "Completed" }
    ],
    sensors: [
        { id: "Node_01", zone: "Zone A (Rice)", moisture: "74.2%", temp: "26.5°C", status: "Active" },
        { id: "Node_02", zone: "Zone A (Rice)", moisture: "71.0%", temp: "26.8°C", status: "Active" },
        { id: "Node_03", zone: "Zone B (Wheat)", moisture: "58.4%", temp: "28.2°C", status: "Active" },
        { id: "Node_04", zone: "Zone B (Wheat)", moisture: "28.5%", temp: "29.5°C", status: "Dry Warning" },
        { id: "Node_05", zone: "Zone C (Tomato)", moisture: "31.2%", temp: "29.8°C", status: "Dry Warning" },
        { id: "Node_06", zone: "Zone C (Tomato)", moisture: "62.1%", temp: "27.5°C", status: "Active" }
    ],
    rss_news: [
        { id: 101, headline: "Tech Corp announces record Q4 earnings, stock surges 8%", sentiment: "Positive", score: "0.98" },
        { id: 102, headline: "Global supply chain disruptions expected to delay chip shipments", sentiment: "Negative", score: "0.85" },
        { id: 103, headline: "Retail sales show steady 2% growth in line with forecasts", sentiment: "Neutral", score: "0.91" },
        { id: 104, headline: "Regulators launch antitrust probe into cloud provider practices", sentiment: "Negative", score: "0.76" },
        { id: 105, headline: "Green energy startup secures $40M in Series B venture funding", sentiment: "Positive", score: "0.94" }
    ]
};

// --- PRESET SCENARIOS ---
const PRESET_SCENARIOS = [
    {
        id: "sql",
        name: "SQL Performance Query",
        prompt: "Optimize slow querying on sales transaction tables.",
        command: "run db_agent --task=optimize_sales_queries",
        logs: [
            "[INFO] Connection pool allocated.",
            "[INFO] Query Analyser initiated: SELECT * FROM transactions WHERE date > '2025-01-01'...",
            "[WARN] Sequential Table Scan detected on 24,000,000 rows.",
            "[AGENT] Designing composite indexes and rewriting query with CTE structure...",
            "[SUCCESS] Optimized execution plan successfully cached."
        ],
        code: `/* REWRITTEN QUERY FOR SALES AGGREGATIONS */
CREATE INDEX CONCURRENTLY idx_transactions_date_sales 
ON transactions(date_placed, order_total);

WITH monthly_sales AS (
    SELECT 
        DATE_TRUNC('month', date_placed) as sales_month,
        SUM(order_total) as raw_sales,
        COUNT(id) as transaction_count
    FROM transactions
    WHERE date_placed >= '2025-01-01'
    GROUP BY 1
)
SELECT 
    sales_month,
    raw_sales,
    transaction_count,
    ROUND(raw_sales / transaction_count, 2) as average_ticket
FROM monthly_sales
ORDER BY sales_month DESC;`,
        outputType: "table",
        outputData: {
            headers: ["Metric", "Unoptimized", "Optimized", "Improvement"],
            rows: [
                ["Query Strategy", "Seq Table Scan", "Index Only Scan", "Optimal"],
                ["Execution Time", "3,420 ms", "42 ms", "98.8% faster"],
                ["Memory Cost", "245 MB", "12 MB", "95.1% saved"],
                ["Cache Status", "Miss", "Hit (Shared)", "No I/O load"]
            ]
        }
    },
    {
        id: "etl",
        name: "AWS Ingestion Pipeline",
        prompt: "Daily RSS news feed sentiment extraction pipeline.",
        command: "run pipeline_agent --source=rss_feeds --analyzer=comprehend",
        logs: [
            "[INFO] Ingestion trigger received from CloudWatch Events cron scheduler.",
            "[ETL] Initializing RSS parser: extracting headlines from 12 financial blogs...",
            "[SUCCESS] Extracted 142 stories. Pushing raw articles payload to Amazon S3.",
            "[NLP] Calling Amazon Comprehend detect_sentiment API...",
            "[DB] Ingesting parsed metadata and sentiment values into database..."
        ],
        code: `# AWS LAMBDA SENTIMENT PARSER FUNCTION
import boto3
import json

s3_client = boto3.client('s3')
comprehend = boto3.client('comprehend')

def lambda_handler(event, context):
    stories = event.get('stories', [])
    processed_records = []
    
    for story in stories:
        res = comprehend.detect_sentiment(
            Text=story['headline'][:200], 
            LanguageCode='en'
        )
        processed_records.append({
            'id': story['id'],
            'sentiment': res['Sentiment'],
            'score': res['SentimentScore'][res['Sentiment'].capitalize()]
        })
        
    return {
        'statusCode': 200,
        'body': processed_records
    }`,
        outputType: "stats",
        outputData: {
            metrics: [
                { label: "Stories Processed", value: "142" },
                { label: "Positive Sentiment", value: "64.8%" },
                { label: "Storage S3 Uri", value: "s3://news-sentiment-logs/" },
                { label: "Pipeline SLA", value: "99.98%" }
            ]
        }
    },
    {
        id: "kissan",
        name: "Kissan Tracker Metrics",
        prompt: "Analyze crop yield and soil moisture anomaly metrics.",
        command: "run kissan_analytics_agent --cluster=zone_b --metric=moisture",
        logs: [
            "[INFO] Contacting internal testing environment for Kissan Tracker App...",
            "[IOT] Restructuring raw telemetry arrays from 24 active soil sensor nodes.",
            "[INFO] Calculating rolling 7-day average soil moisture threshold...",
            "[WARN] Node_04 reported dry state warning: Moisture level 28.5%.",
            "[AGENT] Dispatching automated irrigation schedule request to broker..."
        ],
        code: `# pandas analytics for kissan tracker sensor nodes
import pandas as pd

def process_telemetry(df):
    df_clean = df[df['status'] == 'active'].copy()
    
    mean_moisture = df_clean['moisture'].mean()
    std_moisture = df_clean['moisture'].std()
    df_clean['moisture_anomaly'] = df_clean['moisture'] < (mean_moisture - 1.5 * std_moisture)
    
    summary = df_clean.groupby('zone_id').agg({
        'moisture': 'mean',
        'temperature': 'mean',
        'moisture_anomaly': 'sum'
    }).rename(columns={'moisture_anomaly': 'anomaly_count'})
    
    return summary`,
        outputType: "kissan_report",
        outputData: {
            sensors: [
                { zone: "Zone A (Rice Crops)", moisture: "74.2% (Optimal)", temp: "26.5°C", alerts: "0" },
                { zone: "Zone B (Wheat Crops)", moisture: "58.4% (Optimal)", temp: "28.2°C", alerts: "0" },
                { zone: "Zone C (Tomato Crops)", moisture: "31.2% (Dry Warn)", temp: "29.8°C", alerts: "1 (Triggered)" }
            ]
        }
    },
    {
        id: "rag",
        name: "RAG Prompt Engineering",
        prompt: "Configure prompt templates for querying database schemas safely.",
        command: "run prompt_engineer --role=sql_agent --model=claude-3-5",
        logs: [
            "[INFO] Formulating LLM context variables...",
            "[PROMPT] Compiling database schema context constraints into system role prompt...",
            "[PROMPT] Enforcing strict text-only SQL output format (Zero-Shot execution).",
            "[SECURITY] Injecting SQL injection regex filters on generated output validation...",
            "[SUCCESS] Agent prompt successfully instantiated."
        ],
        code: `# PROMPT TEMPLATE - SQL HELPER AGENT
SYSTEM_PROMPT = """
You are a secure Data Ingestion SQL Assistant. 
Your task is to generate database queries based on user questions.

[SCHEMA DETAILS]
Table: transactions (id: uuid, date_placed: timestamp, order_total: decimal, user_id: uuid)
Table: user_profiles (id: uuid, city: text, signup_date: date)

[CONSTRAINTS]
1. Respond ONLY with executable PostgreSQL code inside triple backticks.
2. Do not write any explanations, markdown notes, or conversational text.
3. Access only tables specified in the SCHEMA section.
4. Prevent any DDL actions (no drop, truncate, update, or write commands).

User Question: {user_question}
SQL Query:
"""`,
        outputType: "prompt_insights",
        outputData: {
            features: [
                { title: "Zero-Shot Context", desc: "Allows LLM to immediately write correct SQL without query examples." },
                { title: "Strict Schema Locks", desc: "Ensures queries never fetch data outside specific columns." },
                { title: "DDL Guardrails", desc: "Hard-coded rules block command structures containing ALTER, DROP, or DELETE." }
            ]
        }
    }
];

// --- CUSTOM ENGINE INTERPRETER ---
const processCustomQuery = (inputText) => {
    const text = inputText.trim();
    const isSQL = /^\s*SELECT\s+/i.test(text);

    if (isSQL) {
        // Run SQL query
        const query = text.replace(/;$/, '').replace(/\s+/g, ' ');
        const selectMatch = query.match(/^SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+?))?(?:\s+ORDER\s+BY\s+(.+?))?(?:\s+LIMIT\s+(\d+))?$/i);
        
        if (!selectMatch) {
            return {
                logs: [
                    "[ERROR] Syntax Error: Only simple SELECT queries are supported in this sandbox.",
                    "[INFO] Syntax example: SELECT * FROM transactions WHERE total > 1000"
                ],
                code: `-- Invalid SQL syntax: "${text}"`,
                outputType: "table",
                outputData: {
                    headers: ["Syntax Error Details"],
                    rows: [["Supported format: SELECT * FROM <transactions|sensors|rss_news> WHERE <col> <op> <val>"]]
                }
            };
        }
        
        const fields = selectMatch[1].trim();
        const tableName = selectMatch[2].trim().toLowerCase();
        const whereClause = selectMatch[3] ? selectMatch[3].trim() : null;
        const limit = selectMatch[5] ? parseInt(selectMatch[5]) : null;
        
        let dataset = [];
        if (tableName === 'transactions') dataset = [...MOCK_DB.transactions];
        else if (tableName === 'sensors') dataset = [...MOCK_DB.sensors];
        else if (tableName === 'rss_news') dataset = [...MOCK_DB.rss_news];
        else {
            return {
                logs: [`[ERROR] Table '${tableName}' not found. Available tables: transactions, sensors, rss_news`],
                code: `-- Error: Invalid table name`,
                outputType: "table",
                outputData: {
                    headers: ["Error"],
                    rows: [[`Table '${tableName}' not found. Try transactions, sensors, or rss_news.`]]
                }
            };
        }
        
        // Filter rows by simple operator
        if (whereClause) {
            const compMatch = whereClause.match(/(\w+)\s*(=|>|<|>=|<=)\s*(.+)/);
            if (compMatch) {
                const col = compMatch[1].trim();
                const op = compMatch[2].trim();
                let val = compMatch[3].trim().replace(/^['"]|['"]$/g, ''); // remove quotes
                
                dataset = dataset.filter(row => {
                    let rowVal = row[col];
                    if (rowVal === undefined) return false;
                    
                    let cleanRowVal = typeof rowVal === 'string' ? rowVal.replace(/[^\d.-]/g, '') : rowVal;
                    let cleanVal = val.replace(/[^\d.-]/g, '');
                    
                    if (!isNaN(cleanRowVal) && !isNaN(cleanVal) && cleanRowVal !== '' && cleanVal !== '') {
                        cleanRowVal = parseFloat(cleanRowVal);
                        cleanVal = parseFloat(cleanVal);
                        
                        if (op === '=') return cleanRowVal == cleanVal;
                        if (op === '>') return cleanRowVal > cleanVal;
                        if (op === '<') return cleanRowVal < cleanVal;
                        if (op === '>=') return cleanRowVal >= cleanVal;
                        if (op === '<=') return cleanRowVal <= cleanVal;
                    } else {
                        // string comparison
                        if (op === '=') return String(rowVal).toLowerCase() === val.toLowerCase();
                    }
                    return false;
                });
            } else {
                return {
                    logs: ["[ERROR] Unsupported WHERE clause. Try simple operators e.g., 'total > 1000' or 'status = Completed'"],
                    code: `-- Error: Invalid WHERE clause`,
                    outputType: "table",
                    outputData: {
                        headers: ["Error"],
                        rows: [["Syntax Exception: Unsupported WHERE filtering syntax."]]
                    }
                };
            }
        }
        
        if (limit) {
            dataset = dataset.slice(0, limit);
        }
        
        let headers = [];
        let rows = [];
        if (dataset.length > 0) {
            if (fields === '*') {
                headers = Object.keys(dataset[0]);
                rows = dataset.map(row => headers.map(h => String(row[h])));
            } else {
                headers = fields.split(',').map(f => f.trim());
                rows = dataset.map(row => headers.map(h => row[h] !== undefined ? String(row[h]) : 'NULL'));
            }
        } else {
            headers = ["Result"];
            rows = [["Query completed successfully, but returned 0 rows."]];
        }
        
        return {
            logs: [
                "[INFO] Query Analyser initiated: Parsing raw SQL string...",
                `[INFO] Target table: "${tableName}" detected. Scanning indices...`,
                `[SUCCESS] Queried ${dataset.length} records in 12 ms.`
            ],
            code: `-- EXECUTED RAW SQL QUERY\n${text};`,
            outputType: "table",
            outputData: { headers, rows }
        };
    } else {
        // Natural Language Prompt Mode (AI Agent compiles prompt to code + runs it)
        const normalized = text.toLowerCase();
        
        if (normalized.includes("soil") || normalized.includes("crop") || normalized.includes("sensor") || normalized.includes("moisture") || normalized.includes("temp") || normalized.includes("kissan")) {
            let filtered = [...MOCK_DB.sensors];
            let filterCode = "df_clean = df.copy()";
            
            if (normalized.includes("warn") || normalized.includes("anomaly") || normalized.includes("dry")) {
                filtered = filtered.filter(s => s.status.includes("Warning"));
                filterCode = "df_clean = df[df['status'] == 'Dry Warning']";
            } else if (normalized.includes("rice") || normalized.includes("zone a")) {
                filtered = filtered.filter(s => s.zone.includes("Rice"));
                filterCode = "df_clean = df[df['zone_id'].str.contains('Rice')]";
            }
            
            const rows = filtered.map(s => [s.id, s.zone, s.moisture, s.temp, s.status]);
            
            return {
                logs: [
                    "[AGENT] Processing natural language request...",
                    "[AGENT] Identified database target: `soil_telemetry` sensor table.",
                    "[AGENT] Generating pandas data filtering module...",
                    "[INFO] Running dynamic python script execution..."
                ],
                code: `# AUTO-GENERATED PYTHON ETL BY AI AGENT
import pandas as pd
import mock_telemetry_db as db

# Load crop telemetry
df = pd.DataFrame(db.get_sensor_readings())

# Apply AI filter for: "${text}"
${filterCode}

# Calculate summaries
print(f"Executing payload complete: {len(df_clean)} records matched.")
print(df_clean.to_string())`,
                outputType: "table",
                outputData: {
                    headers: ["Node ID", "Crop Zone", "Moisture Level", "Temperature", "Sensor Status"],
                    rows: rows.length > 0 ? rows : [["No sensors matched the prompt filtering constraints.", "", "", "", ""]]
                }
            };
        }
        
        if (normalized.includes("sentiment") || normalized.includes("news") || normalized.includes("rss") || normalized.includes("comprehend")) {
            let filtered = [...MOCK_DB.rss_news];
            let sentimentFilter = "all";
            
            if (normalized.includes("positive")) {
                filtered = filtered.filter(n => n.sentiment === "Positive");
                sentimentFilter = "Positive";
            } else if (normalized.includes("negative")) {
                filtered = filtered.filter(n => n.sentiment === "Negative");
                sentimentFilter = "Negative";
            }
            
            const rows = filtered.map(n => [String(n.id), n.headline, n.sentiment, n.score]);
            
            return {
                logs: [
                    "[AGENT] Natural language news analyzer initiated...",
                    "[AGENT] Connecting with financial RSS feed storage logs...",
                    "[NLP] Executing Amazon Comprehend Sentiment batch query...",
                    "[SUCCESS] Sentiment analysis complete. Fetching matched articles..."
                ],
                code: `# AUTO-GENERATED NEWS SENTIMENT PIPELINE
import boto3
import json

comprehend = boto3.client('comprehend')

def get_articles_by_sentiment(target_sentiment="${sentimentFilter}"):
    articles = fetch_stored_rss_feeds()
    matches = []
    for art in articles:
        res = comprehend.detect_sentiment(Text=art['headline'], LanguageCode='en')
        sentiment = res['Sentiment']
        if target_sentiment == "all" or sentiment.lower() == target_sentiment.lower():
            matches.append({
                'id': art['id'],
                'headline': art['headline'],
                'sentiment': sentiment,
                'score': res['SentimentScore'][sentiment.capitalize()]
            })
    return matches`,
                outputType: "table",
                outputData: {
                    headers: ["Story ID", "Headline", "Inferred Sentiment", "Confidence Score"],
                    rows: rows.length > 0 ? rows : [["No articles matched this sentiment query.", "", "", ""]]
                }
            };
        }
        
        // Default target: transactions
        let filtered = [...MOCK_DB.transactions];
        let totalVal = null;
        let comparisonCode = "df_clean = df.copy()";
        
        const numMatch = normalized.match(/(\d+)/);
        if (numMatch) {
            totalVal = parseFloat(numMatch[1]);
        }
        
        if (totalVal !== null) {
            if (normalized.includes("greater") || normalized.includes("more") || normalized.includes(">") || normalized.includes("above")) {
                filtered = filtered.filter(t => t.total > totalVal);
                comparisonCode = `df_clean = df[df['order_total'] > ${totalVal}]`;
            } else if (normalized.includes("less") || normalized.includes("below") || normalized.includes("<") || normalized.includes("under")) {
                filtered = filtered.filter(t => t.total < totalVal);
                comparisonCode = `df_clean = df[df['order_total'] < ${totalVal}]`;
            }
        } else if (normalized.includes("pending")) {
            filtered = filtered.filter(t => t.status === "Pending");
            comparisonCode = "df_clean = df[df['status'] == 'Pending']";
        } else if (normalized.includes("completed") || normalized.includes("success")) {
            filtered = filtered.filter(t => t.status === "Completed");
            comparisonCode = "df_clean = df[df['status'] == 'Completed']";
        }
        
        const rows = filtered.map(t => [String(t.id), t.date, t.customer, `₹${t.total.toFixed(2)}`, t.status]);
        
        return {
            logs: [
                "[AGENT] NLP query parsed. Target DB entity: `sales_transactions`.",
                "[AGENT] Compiling database query constraints into structured format...",
                "[INFO] Constructing PostgreSQL CTE optimization plan...",
                "[SUCCESS] Data retrieved successfully from local memory cache."
            ],
            code: `# AUTO-GENERATED TRANSACTION LOADER
import pandas as pd
import mock_sales_db as db

# Query: "${text}"
df = pd.DataFrame(db.get_sales_records())
${comparisonCode}

print(df_clean.to_string())`,
            outputType: "table",
            outputData: {
                headers: ["Tx ID", "Date Placed", "Customer Name", "Total Amount", "Status"],
                rows: rows.length > 0 ? rows : [["No transactions matched your filtering prompt.", "", "", "", ""]]
            }
        };
    }
};

const AIConsole = () => {
    const [activeId, setActiveId] = useState("sql");
    const [activeMode, setActiveMode] = useState("preset"); // 'preset' or 'custom'
    const [customInput, setCustomInput] = useState("");
    const [customScenario, setCustomScenario] = useState(null);

    const [consoleOutput, setConsoleOutput] = useState("");
    const [codeOutput, setCodeOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [progress, setProgress] = useState(0);

    const logTimeout = useRef(null);
    const codeTimeout = useRef(null);

    const activeScenario = activeMode === 'preset'
        ? (PRESET_SCENARIOS.find(s => s.id === activeId) || PRESET_SCENARIOS[0])
        : customScenario;

    useEffect(() => {
        if (activeMode === 'preset') {
            runPresetScenario(activeId);
        }
        return () => {
            clearTimeouts();
        };
    }, [activeId, activeMode]);

    const clearTimeouts = () => {
        if (logTimeout.current) clearTimeout(logTimeout.current);
        if (codeTimeout.current) clearTimeout(codeTimeout.current);
    };

    const runPresetScenario = (id) => {
        clearTimeouts();
        setIsRunning(true);
        setShowResults(false);
        setConsoleOutput("");
        setCodeOutput("");
        setProgress(0);

        const sc = PRESET_SCENARIOS.find(s => s.id === id) || PRESET_SCENARIOS[0];
        
        let currentText = `visitor@akash-ai:~$ ${sc.command}\n`;
        setConsoleOutput(currentText);

        let logIndex = 0;
        const streamLogs = () => {
            if (logIndex < sc.logs.length) {
                currentText += `${sc.logs[logIndex]}\n`;
                setConsoleOutput(currentText);
                setProgress(Math.floor(((logIndex + 1) / sc.logs.length) * 40));
                logIndex++;
                logTimeout.current = setTimeout(streamLogs, 350);
            } else {
                streamCode(sc);
            }
        };

        logTimeout.current = setTimeout(streamLogs, 500);
    };

    const runCustomScenario = (queryText) => {
        if (!queryText.trim()) return;
        
        clearTimeouts();
        setIsRunning(true);
        setShowResults(false);
        setConsoleOutput("");
        setCodeOutput("");
        setProgress(0);
        setActiveMode("custom");

        const result = processCustomQuery(queryText);
        const commandText = /^\s*SELECT\s+/i.test(queryText) 
            ? `psql -c "${queryText.substring(0, 32)}${queryText.length > 32 ? '...' : ''}"`
            : `run_agent --prompt="${queryText.substring(0, 24)}${queryText.length > 24 ? '...' : ''}"`;

        const generatedScenario = {
            id: "custom",
            name: "Custom Workbench Execution",
            prompt: queryText,
            command: commandText,
            logs: result.logs,
            code: result.code,
            outputType: result.outputType,
            outputData: result.outputData
        };
        
        setCustomScenario(generatedScenario);

        let currentText = `visitor@akash-ai:~$ ${commandText}\n`;
        setConsoleOutput(currentText);

        let logIndex = 0;
        const streamLogs = () => {
            if (logIndex < result.logs.length) {
                currentText += `${result.logs[logIndex]}\n`;
                setConsoleOutput(currentText);
                setProgress(Math.floor(((logIndex + 1) / result.logs.length) * 40));
                logIndex++;
                logTimeout.current = setTimeout(streamLogs, 300);
            } else {
                streamCode(generatedScenario);
            }
        };

        logTimeout.current = setTimeout(streamLogs, 400);
    };

    const streamCode = (sc) => {
        let charIndex = 0;
        const targetCode = sc.code;
        
        const streamChars = () => {
            if (charIndex < targetCode.length) {
                const chunk = targetCode.substring(charIndex, charIndex + 12);
                setCodeOutput(prev => prev + chunk);
                charIndex += 12;
                setProgress(40 + Math.floor((charIndex / targetCode.length) * 60));
                codeTimeout.current = setTimeout(streamChars, 12);
            } else {
                setIsRunning(false);
                setShowResults(true);
            }
        };

        streamChars();
    };

    const handleSelectPreset = (id) => {
        if (isRunning) return;
        setActiveMode("preset");
        setActiveId(id);
    };

    const handleRunCustom = () => {
        if (isRunning || !customInput.trim()) return;
        runCustomScenario(customInput);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleRunCustom();
        }
    };

    return (
        <div className="sandbox-card">
            <div className="sandbox-grid">
                
                {/* Left Controller Panel */}
                <div className="sandbox-panel-controls">
                    <span className="sandbox-tag">INTERACTIVE WORKBENCH</span>
                    <h3 className="sandbox-panel-title">AI Sandbox</h3>
                    <p className="sandbox-panel-desc">
                        Select a preset scenario, or type your own custom SQL query / NLP prompt below to watch the data agent parse and execute computations against local datasets in real-time.
                    </p>
                    
                    {/* Preset buttons */}
                    <div className="sandbox-scenarios-list">
                        {PRESET_SCENARIOS.map((sc) => (
                            <button
                                key={sc.id}
                                className={`sandbox-scenario-btn ${activeMode === 'preset' && activeId === sc.id ? 'active' : ''}`}
                                onClick={() => handleSelectPreset(sc.id)}
                                disabled={isRunning}
                            >
                                <span className="sc-icon-bullet">
                                    {sc.id === 'sql' && <Database size={13} />}
                                    {sc.id === 'etl' && <Cloud size={13} />}
                                    {sc.id === 'kissan' && <LineChart size={13} />}
                                    {sc.id === 'rag' && <Code size={13} />}
                                </span>
                                <div style={{ textAlign: 'left' }}>
                                    <div className="sc-btn-title">{sc.name}</div>
                                    <div className="sc-btn-prompt">Prompt: "{sc.prompt}"</div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Custom Sandbox Query Box */}
                    <div className="sandbox-custom-input">
                        <div className="custom-input-label">Or Run Custom Prompt / SQL Query</div>
                        <div className="custom-input-wrapper">
                            <textarea
                                value={customInput}
                                onChange={(e) => setCustomInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="SELECT * FROM transactions WHERE total > 1000..."
                                className="sandbox-custom-textarea"
                                disabled={isRunning}
                            />
                            <button
                                onClick={handleRunCustom}
                                className="sandbox-run-btn"
                                disabled={isRunning || !customInput.trim()}
                                title="Run custom script"
                            >
                                <Play size={13} /> Run
                            </button>
                        </div>
                        <div className="custom-input-hints">
                            <span>💡 SQL: <code>SELECT * FROM transactions WHERE total &gt; 2000</code></span>
                            <span>💡 SQL: <code>SELECT * FROM sensors WHERE status = 'Dry Warning'</code></span>
                            <span>💡 NLP: <code>Show positive headlines from RSS feeds</code></span>
                        </div>
                    </div>
                </div>

                {/* Right Interactive Simulator Panel */}
                <div className="sandbox-panel-simulator">
                    {/* Header Tab Bar */}
                    <div className="sim-header">
                        <div className="sim-dots">
                            <span className="dot" />
                            <span className="dot" />
                            <span className="dot" />
                        </div>
                        <div className="sim-title">
                            <Terminal size={11} /> data_agent_orchestrator.py
                        </div>
                        {isRunning ? (
                            <span className="sim-status running">EXECUTING</span>
                        ) : (
                            <span className="sim-status idle">READY</span>
                        )}
                    </div>

                    {/* Output Screen */}
                    <div className="sim-body">
                        
                        {/* 1. Terminal Log stream */}
                        <div className="sim-terminal-log">
                            <pre className="sim-pre-text">{consoleOutput}</pre>
                            {isRunning && consoleOutput.length > 0 && <span className="terminal-cursor">_</span>}
                        </div>

                        {/* 2. Synthesized Code block */}
                        {codeOutput && (
                            <div className="sim-code-wrapper">
                                <div className="code-block-header">GENERATED DATA WORKFLOW</div>
                                <pre className="sim-pre-code"><code>{codeOutput}</code></pre>
                            </div>
                        )}

                        {/* 3. Visual Execution results */}
                        {showResults && activeScenario && (
                            <div className="sim-results-wrapper">
                                <div className="sim-results-header">AGENT EXECUTION OUTPUT</div>
                                
                                {/* Table output format */}
                                {activeScenario.outputType === 'table' && (
                                    <table className="sim-results-table">
                                        <thead>
                                            <tr>
                                                {activeScenario.outputData.headers.map((h, i) => <th key={i}>{h}</th>)}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {activeScenario.outputData.rows.map((row, i) => (
                                                <tr key={i}>
                                                    {row.map((cell, j) => <td key={j} className={j === 3 ? 'highlight' : ''}>{cell}</td>)}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}

                                {/* Stats metrics output */}
                                {activeScenario.outputType === 'stats' && (
                                    <div className="sim-results-stats">
                                        {activeScenario.outputData.metrics.map((m, i) => (
                                            <div key={i} className="sim-stat-box">
                                                <span className="sim-stat-val">{m.value}</span>
                                                <span className="sim-stat-lbl">{m.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Kissan IoT report layout */}
                                {activeScenario.outputType === 'kissan_report' && (
                                    <div className="sim-results-kissan">
                                        {activeScenario.outputData.sensors.map((s, i) => (
                                            <div key={i} className="sim-kissan-row">
                                                <div className="kissan-zone">{s.zone}</div>
                                                <div className="kissan-metrics">
                                                    <span>Moisture: <strong>{s.moisture}</strong></span>
                                                    <span>Temp: {s.temp}</span>
                                                    {s.alerts !== '0' ? (
                                                        <span className="kissan-alert danger">Alerts: {s.alerts}</span>
                                                    ) : (
                                                        <span className="kissan-alert clear">Alerts: 0</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Prompt Engineering insights */}
                                {activeScenario.outputType === 'prompt_insights' && (
                                    <div className="sim-results-insights">
                                        {activeScenario.outputData.features.map((f, i) => (
                                            <div key={i} className="sim-insight-item">
                                                <h4 className="insight-title">✓ {f.title}</h4>
                                                <p className="insight-desc">{f.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        )}

                    </div>

                    {/* Progress slider bar */}
                    {isRunning && (
                        <div className="sim-progress-bar">
                            <div className="sim-progress-fill" style={{ width: `${progress}%` }} />
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AIConsole;
