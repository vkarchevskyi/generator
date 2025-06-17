import { useState, useEffect, useCallback } from 'react';
import { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5, v6 as uuidv6, v7 as uuidv7 } from 'uuid';
import './UUIDGenerator.css';

type UUIDVersion = 'v1' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7';

interface UUIDInfo {
  version: string;
  description: string;
  useCase: string;
  details: string;
}

const uuidInfo: Record<UUIDVersion, UUIDInfo> = {
  v1: {
    version: 'UUID v1',
    description: 'Time-based UUID',
    useCase: 'When you need time-ordered identifiers',
    details: 'Based on MAC address and timestamp. Provides temporal ordering but may expose MAC address.'
  },
  v3: {
    version: 'UUID v3',
    description: 'Name-based UUID (MD5)',
    useCase: 'When you need deterministic UUIDs from names (legacy)',
    details: 'Generated from namespace and name using MD5 hash. Similar to v5 but uses MD5 instead of SHA-1.'
  },
  v4: {
    version: 'UUID v4',
    description: 'Random UUID',
    useCase: 'Most common choice for general purposes',
    details: 'Purely random with 122 bits of entropy. Cryptographically secure and collision-resistant.'
  },
  v5: {
    version: 'UUID v5',
    description: 'Name-based UUID (SHA-1)',
    useCase: 'When you need deterministic UUIDs from names',
    details: 'Generated from namespace and name using SHA-1 hash. Same input always produces same UUID.'
  },
  v6: {
    version: 'UUID v6',
    description: 'Reordered time UUID',
    useCase: 'Time-ordered UUIDs for database performance',
    details: 'Like v1 but with reordered timestamp for better database locality and sorting.'
  },
  v7: {
    version: 'UUID v7',
    description: 'Unix timestamp UUID',
    useCase: 'Modern time-ordered identifiers',
    details: 'Uses Unix timestamp for natural ordering with random suffix. Great for modern applications.'
  }
};

export default function UUIDGenerator() {
  const [selectedVersion, setSelectedVersion] = useState<UUIDVersion>('v4');
  const [currentUUID, setCurrentUUID] = useState('');
  const [uuidHistory, setUuidHistory] = useState<Array<{uuid: string, version: UUIDVersion}>>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [nameInput, setNameInput] = useState('example.com');
  const [namespaceInput, setNamespaceInput] = useState('6ba7b810-9dad-11d1-80b4-00c04fd430c8');

  const generateUUID = () => {
    let newUUID = '';
    
    try {
      switch (selectedVersion) {
        case 'v1':
          newUUID = uuidv1();
          break;
        case 'v3':
          newUUID = uuidv3(nameInput, namespaceInput);
          break;
        case 'v4':
          newUUID = uuidv4();
          break;
        case 'v5':
          newUUID = uuidv5(nameInput, namespaceInput);
          break;
        case 'v6':
          newUUID = uuidv6();
          break;
        case 'v7':
          newUUID = uuidv7();
          break;
      }
      
      setCurrentUUID(newUUID);
      setUuidHistory(prev => [{uuid: newUUID, version: selectedVersion}, ...prev].slice(0, 10));
    } catch (error) {
      console.error('Error generating UUID:', error);
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const parseUUID = (uuid: string) => {
    if (!uuid) return null;
    
    const parts = uuid.split('-');
    if (parts.length !== 5) return null;
    
    const version = parseInt(uuid[14], 16);
    const variant = parseInt(uuid[19], 16);
    
    return {
      parts,
      version,
      variant: variant >= 8 ? 'RFC 4122' : 'Reserved',
      timeLow: parts[0],
      timeMid: parts[1],
      timeHiAndVersion: parts[2],
      clockSeqAndReserved: parts[3],
      node: parts[4]
    };
  };

  const uuidAnalysis = parseUUID(currentUUID);

  return (
    <div className="uuid-generator">
      <div className="container">
        <div className="generator-card">
          <div className="card-header">
            <h2>🔑 UUID Generator</h2>
            <p>Generate different versions of Universally Unique Identifiers</p>
          </div>

          <div className="version-selector">
            <h4>Select UUID Version:</h4>
            <div className="version-buttons">
              {(Object.keys(uuidInfo) as UUIDVersion[]).map((version) => (
                <button
                  key={version}
                  onClick={() => setSelectedVersion(version)}
                  className={`version-btn ${selectedVersion === version ? 'active' : ''}`}
                >
                  <span className="version-name">{uuidInfo[version].version}</span>
                  <span className="version-desc">{uuidInfo[version].description}</span>
                </button>
              ))}
            </div>
          </div>

          {(selectedVersion === 'v3' || selectedVersion === 'v5') && (
            <div className="name-inputs">
              <div className="input-group">
                <label>Namespace UUID:</label>
                <input
                  type="text"
                  value={namespaceInput}
                  onChange={(e) => setNamespaceInput(e.target.value)}
                  placeholder="Namespace UUID"
                  className="name-input"
                />
              </div>
              <div className="input-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Name to hash"
                  className="name-input"
                />
              </div>
            </div>
          )}

          <div className="uuid-output">
            <div className="uuid-display">
              <input
                type="text"
                value={currentUUID}
                readOnly
                placeholder="Generated UUID will appear here"
                className="uuid-input"
              />
              <button
                onClick={() => copyToClipboard(currentUUID)}
                className={`copy-btn ${copied === currentUUID ? 'copied' : ''}`}
                disabled={!currentUUID}
              >
                {copied === currentUUID ? '✓' : '📋'}
              </button>
            </div>

            {uuidAnalysis && (
              <div className="uuid-breakdown">
                <h4>UUID Analysis:</h4>
                <div className="breakdown-grid">
                  <div className="breakdown-item">
                    <span className="label">Version:</span>
                    <span className="value">{uuidAnalysis.version}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Variant:</span>
                    <span className="value">{uuidAnalysis.variant}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Time Low:</span>
                    <span className="value">{uuidAnalysis.timeLow}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Time Mid:</span>
                    <span className="value">{uuidAnalysis.timeMid}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Time Hi + Version:</span>
                    <span className="value">{uuidAnalysis.timeHiAndVersion}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Clock Seq:</span>
                    <span className="value">{uuidAnalysis.clockSeqAndReserved}</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="label">Node:</span>
                    <span className="value">{uuidAnalysis.node}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button onClick={generateUUID} className="generate-btn">
            🎲 Generate {uuidInfo[selectedVersion].version}
          </button>

          {uuidHistory.length > 0 && (
            <div className="uuid-history">
              <h4>Recent UUIDs:</h4>
              <div className="history-list">
                {uuidHistory.map((item, index) => (
                  <div key={index} className="history-item">
                    <span className="history-version">{item.version}</span>
                    <span className="history-uuid">{item.uuid}</span>
                    <button
                      onClick={() => copyToClipboard(item.uuid)}
                      className={`copy-btn small ${copied === item.uuid ? 'copied' : ''}`}
                    >
                      {copied === item.uuid ? '✓' : '📋'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="info-card">
          <div className="current-version-info">
            <h3>📖 {uuidInfo[selectedVersion].version} Information</h3>
            <div className="version-info-card">
              <h4>{uuidInfo[selectedVersion].description}</h4>
              <p><strong>Best for:</strong> {uuidInfo[selectedVersion].useCase}</p>
              <p>{uuidInfo[selectedVersion].details}</p>
            </div>
          </div>

          <div className="uuid-overview">
            <h3>🆔 UUID Overview</h3>
            <p className="intro">
              UUIDs (Universally Unique Identifiers) are 128-bit values used to uniquely identify 
              information in computer systems. They're standardized by RFC 4122 and designed to be 
              unique across space and time.
            </p>

            <div className="uuid-structure">
              <h4>UUID Structure:</h4>
              <div className="structure-example">
                <span className="structure-part">xxxxxxxx</span>
                <span className="separator">-</span>
                <span className="structure-part">xxxx</span>
                <span className="separator">-</span>
                <span className="structure-part">Mxxx</span>
                <span className="separator">-</span>
                <span className="structure-part">Nxxx</span>
                <span className="separator">-</span>
                <span className="structure-part">xxxxxxxxxxxx</span>
              </div>
              <p className="structure-note">
                M = Version digit (1, 4, 5, 6, or 7)<br/>
                N = Variant bits (8, 9, A, or B in hex)
              </p>
            </div>

            <div className="versions-comparison">
              <h4>Version Comparison:</h4>
              <div className="comparison-grid">
                {(Object.entries(uuidInfo) as [UUIDVersion, UUIDInfo][]).map(([version, info]) => (
                  <div key={version} className="version-comparison">
                    <h5>{info.version}</h5>
                    <p className="comparison-desc">{info.description}</p>
                    <p className="comparison-use"><strong>Use case:</strong> {info.useCase}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="best-practices">
              <h4>Best Practices:</h4>
              <ul>
                <li><strong>Use v4 for general purposes</strong> - Most widely supported and secure</li>
                <li><strong>Use v7 for new applications</strong> - Modern standard with time ordering</li>
                <li><strong>Use v1/v6 carefully</strong> - May expose MAC address information</li>
                <li><strong>Use v5 for deterministic needs</strong> - Preferred over v3 (uses SHA-1 vs MD5)</li>
                <li><strong>Avoid v3 when possible</strong> - Uses MD5 which is cryptographically weak</li>
                <li><strong>Store as binary in databases</strong> - More efficient than string storage</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
