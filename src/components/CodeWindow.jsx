import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

export const CodeWindow = () => {
  const codeString = `import pandas as pd
import numpy as np

def analyze_growth(data):
  # Clean and Process
  df = data.dropna()
  kpi = df['sales'].sum()
  
  return {
    'status': 'Success',
    'revenue': kpi,
    'growth': '18.5%'
  }

# Execute Analysis
print(analyze_growth(dataset))`;

  const [displayCode, setDisplayCode] = useState('');
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    let index = 0;
    // Faster typing, safe implementation
    const interval = setInterval(() => {
      if (index <= codeString.length) {
        setDisplayCode(codeString.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowOutput(true), 500);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const [logs, setLogs] = useState([]);
  useEffect(() => {
    if (!showOutput) return;

    const messages = [
      "> python script.py",
      "[INFO] Loading datasets...",
      "[INFO] Cleaning 10,402 rows...",
      "[SUCCESS] Data processed.",
      "{ 'status': 'Success', 'revenue': 450200, 'growth': '18.5%' }",
      "Process finished with exit code 0"
    ];

    let msgIndex = 0;
    const interval = setInterval(() => {
      if (msgIndex < messages.length) {
        const nextMsg = messages[msgIndex];
        if (nextMsg) {
          setLogs(prev => [...prev, nextMsg]);
        }
        msgIndex++;
      } else {
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [showOutput]);

  const highlightLine = (line) => {
    if (typeof line !== 'string') return '';
    if (line.startsWith('import') || line.startsWith('def') || line.startsWith('return')) {
      return <span style={{ color: '#c586c0' }}>{line}</span>;
    }
    if (line.startsWith('#')) {
      return <span style={{ color: '#6a9955' }}>{line}</span>;
    }
    if (line.includes("'")) {
      return <span style={{ color: '#ce9178' }}>{line}</span>;
    }
    return <span style={{ color: '#d4d4d4' }}>{line}</span>;
  };

  return (
    <div className="ide-container">
      {/* Window Header */}
      <div className="ide-header">
        <div className="window-controls">
          <div className="dot close"></div>
          <div className="dot minimize"></div>
          <div className="dot expand"></div>
        </div>
        <div className="file-tab active">
          data_analysis.py
        </div>
        <div className="run-button" style={{ opacity: showOutput ? 1 : 0.5 }}>
          <Play size={10} fill="currentColor" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ide-body">
        <div className="line-numbers">
          {codeString.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
        </div>

        <div className="code-area">
          {displayCode.split('\n').map((line, i) => (
            <div key={i} className="code-line" style={{ minHeight: '1.5em' }}>
              {highlightLine(line)}
            </div>
          ))}
          <span className="cursor">|</span>
        </div>
      </div>

      {/* Terminal Output */}
      <div className={`terminal-drawer ${showOutput ? 'open' : ''}`}>
        <div className="terminal-header">TERMINAL</div>
        <div className="terminal-logs">
          {logs.map((log, i) => (
            <div key={i} className={`log ${typeof log === 'string' && log.includes("SUCCESS") ? "success" : typeof log === 'string' && log.includes("INFO") ? "info" : ""}`}>
              {log}
            </div>
          ))}
          {showOutput && logs.length < 6 && <span className="cursor blink">_</span>}
        </div>
      </div>

      <style>{`
        .ide-container {
          background: #1e1e1e;
          border-radius: 8px;
          border: 1px solid #333;
          box-shadow: 0 10px 40px rgba(0,0,0,0.4);
          width: 100%;
          max-width: 500px;
          overflow: hidden;
          font-family: 'Fira Code', monospace;
          display: flex;
          flex-direction: column;
          margin: 0 auto;
        }

        .ide-header {
          background: #252526;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid #333;
        }

        .window-controls { display: flex; gap: 6px; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .close { background: #ff5f56; }
        .minimize { background: #ffbd2e; }
        .expand { background: #27c93f; }

        .file-tab {
          font-size: 0.8rem;
          color: #ccc;
          padding: 4px 10px;
          background: #1e1e1e;
          border-radius: 4px;
        }

        .run-button {
            margin-left: auto;
            color: #27c93f;
            display: flex;
            align-items: center;
        }

        .ide-body {
          display: flex;
          padding: 15px 0;
          min-height: 240px;
        }

        .line-numbers {
          padding: 0 10px;
          color: #6e7681;
          font-size: 0.8rem;
          text-align: right;
          border-right: 1px solid #333;
          user-select: none;
        }

        .code-area {
          padding-left: 15px;
          flex: 1;
          font-size: 0.85rem;
          line-height: 1.5;
          color: #d4d4d4;
          overflow-x: auto;
          white-space: pre; /* Important for indentation */
        }
        
        .code-line {
            display: block;
        }

        .cursor {
            display: inline-block;
            width: 2px;
            background: var(--accent-color);
            animation: blink 1s infinite;
        }
        
        .terminal-drawer {
            background: #0f0f0f;
            border-top: 1px solid #333;
            height: 0;
            transition: height 0.5s ease;
            overflow: hidden;
        }
        
        .terminal-drawer.open {
            height: 140px;
        }
        
        .terminal-header {
            padding: 4px 10px;
            font-size: 0.7rem;
            background: #2d2d2d;
            color: #ccc;
        }
        
        .terminal-logs {
            padding: 10px;
            font-size: 0.8rem;
            color: #ccc;
        }
        
        .log.success { color: #4ade80; }
        .log.info { color: #60a5fa; }
        
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
};
