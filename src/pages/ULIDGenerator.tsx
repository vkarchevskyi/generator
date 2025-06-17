import { useState, useEffect } from 'react';
import { ulid, decodeTime } from 'ulid';
import './ULIDGenerator.css';

export default function ULIDGenerator() {
  const [currentULID, setCurrentULID] = useState('');
  const [ulidHistory, setUlidHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const generateULID = () => {
    const newULID = ulid();
    setCurrentULID(newULID);
    setUlidHistory(prev => [newULID, ...prev].slice(0, 10));
  };

  // Generate initial ULID on component mount
  useEffect(() => {
    generateULID();
  }, []);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const parseULID = (ulidString: string) => {
    try {
      const timestamp = decodeTime(ulidString);
      const date = new Date(timestamp);
      return {
        timestamp,
        date: date.toISOString(),
        timestampPart: ulidString.slice(0, 10),
        randomPart: ulidString.slice(10),
        isValid: true
      };
    } catch {
      return { 
        timestamp: 0,
        date: '',
        timestampPart: '',
        randomPart: '',
        isValid: false 
      };
    }
  };

  const ulidInfo = currentULID ? parseULID(currentULID) : null;

  return (
    <div className="ulid-generator">
      <div className="container">
        <div className="generator-card">
          <div className="card-header">
            <h2>🆔 ULID Generator</h2>
            <p>Generate Universally Unique Lexicographically Sortable Identifiers</p>
          </div>

          <div className="ulid-output">
            <div className="ulid-display">
              <input
                type="text"
                value={currentULID}
                readOnly
                placeholder="Generated ULID will appear here"
                className="ulid-input"
              />
              <button
                onClick={() => copyToClipboard(currentULID)}
                className={`copy-btn ${copied === currentULID ? 'copied' : ''}`}
                disabled={!currentULID}
              >
                {copied === currentULID ? '✓' : '📋'}
              </button>
            </div>

            {ulidInfo && ulidInfo.isValid && (
              <div className="ulid-breakdown">
                <h4>ULID Breakdown:</h4>
                <div className="breakdown-grid">
                  <div className="breakdown-item">
                    <span className="label">Timestamp Part:</span>
                    <span className="value timestamp-part">{ulidInfo.timestampPart}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Random Part:</span>
                    <span className="value random-part">{ulidInfo.randomPart}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Generated At:</span>
                    <span className="value">{new Date(ulidInfo.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Timestamp (ms):</span>
                    <span className="value">{ulidInfo.timestamp}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button onClick={generateULID} className="generate-btn">
            🎲 Generate ULID
          </button>

          {ulidHistory.length > 0 && (
            <div className="ulid-history">
              <h4>Recent ULIDs:</h4>
              <div className="history-list">
                {ulidHistory.map((ulid, index) => (
                  <div key={index} className="history-item">
                    <span className="history-ulid">{ulid}</span>
                    <button
                      onClick={() => copyToClipboard(ulid)}
                      className={`copy-btn small ${copied === ulid ? 'copied' : ''}`}
                    >
                      {copied === ulid ? '✓' : '📋'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="info-card">
          <h3>📚 What is ULID?</h3>
          <p className="intro">
            ULID (Universally Unique Lexicographically Sortable Identifier) is a 128-bit identifier
            that combines the benefits of UUIDs with natural sorting capabilities.
          </p>

          <div className="features-grid">
            <div className="feature">
              <h4>🕒 Time-Ordered</h4>
              <p>ULIDs are naturally sorted by creation time, making them perfect for databases and logs.</p>
            </div>
            <div className="feature">
              <h4>🔤 Base32 Encoded</h4>
              <p>Uses Crockford's Base32 encoding, making them URL-safe and case-insensitive.</p>
            </div>
            <div className="feature">
              <h4>⚡ High Performance</h4>
              <p>Faster generation than UUID v4 and more compact than UUID v1.</p>
            </div>
            <div className="feature">
              <h4>🔒 Collision Resistant</h4>
              <p>80 bits of randomness provide excellent collision resistance.</p>
            </div>
          </div>

          <div className="technical-details">
            <h4>Technical Structure:</h4>
            <div className="structure">
              <div className="structure-part timestamp">
                <span className="part-label">Timestamp (48 bits)</span>
                <span className="part-desc">Unix timestamp in milliseconds</span>
              </div>
              <div className="structure-part random">
                <span className="part-label">Randomness (80 bits)</span>
                <span className="part-desc">Cryptographically secure random data</span>
              </div>
            </div>
          </div>

          <div className="use-cases">
            <h4>Common Use Cases:</h4>
            <ul>
              <li>Database primary keys that need natural ordering</li>
              <li>Event sourcing and audit logs</li>
              <li>Distributed systems requiring sortable IDs</li>
              <li>API request tracking and correlation</li>
              <li>File naming and version control</li>
            </ul>
          </div>

          <div className="comparison">
            <h4>ULID vs UUID:</h4>
            <div className="comparison-grid">
              <div className="comparison-item">
                <strong>Length:</strong> 26 characters vs 36 characters (UUID)
              </div>
              <div className="comparison-item">
                <strong>Encoding:</strong> Base32 vs Hexadecimal (UUID)
              </div>
              <div className="comparison-item">
                <strong>Sorting:</strong> Lexicographically sortable vs Random (UUID v4)
              </div>
              <div className="comparison-item">
                <strong>Performance:</strong> Faster generation vs Slower (UUID v4)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
