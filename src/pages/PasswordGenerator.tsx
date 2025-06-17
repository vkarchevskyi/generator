import { useState, useCallback } from 'react';
import './PasswordGenerator.css';

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: false,
  });
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (options.includeUppercase) chars += uppercase;
    if (options.includeLowercase) chars += lowercase;
    if (options.includeNumbers) chars += numbers;
    if (options.includeSymbols) chars += symbols;

    if (chars === '') {
      setPassword('');
      return;
    }

    let result = '';
    for (let i = 0; i < options.length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  }, [options]);

  const copyToClipboard = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getPasswordStrength = () => {
    if (!password) return { strength: 'None', color: '#ccc' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (options.includeUppercase) score++;
    if (options.includeLowercase) score++;
    if (options.includeNumbers) score++;
    if (options.includeSymbols) score++;

    if (score <= 2) return { strength: 'Weak', color: '#ff4757' };
    if (score <= 4) return { strength: 'Medium', color: '#ffa502' };
    return { strength: 'Strong', color: '#2ed573' };
  };

  const strengthInfo = getPasswordStrength();

  return (
    <div className="password-generator">
      <div className="container">
        <div className="generator-card">
          <div className="card-header">
            <h2>🔒 Password Generator</h2>
            <p>Create secure passwords with customizable options</p>
          </div>

          <div className="password-output">
            <div className="password-display">
              <input
                type="text"
                value={password}
                readOnly
                placeholder="Generated password will appear here"
                className="password-input"
              />
              <button
                onClick={copyToClipboard}
                className={`copy-btn ${copied ? 'copied' : ''}`}
                disabled={!password}
              >
                {copied ? '✓' : '📋'}
              </button>
            </div>
            <div className="password-strength">
              <span>Strength: </span>
              <span 
                className="strength-indicator"
                style={{ color: strengthInfo.color }}
              >
                {strengthInfo.strength}
              </span>
            </div>
          </div>

          <div className="options-grid">
            <div className="option-group">
              <label htmlFor="length">Password Length: {options.length}</label>
              <input
                id="length"
                type="range"
                min="4"
                max="50"
                value={options.length}
                onChange={(e) => setOptions(prev => ({ ...prev, length: parseInt(e.target.value) }))}
                className="length-slider"
              />
              <div className="range-labels">
                <span>4</span>
                <span>50</span>
              </div>
            </div>

            <div className="checkboxes-grid">
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={options.includeUppercase}
                  onChange={(e) => setOptions(prev => ({ ...prev, includeUppercase: e.target.checked }))}
                />
                <span className="checkmark"></span>
                <span className="label-text">Uppercase Letters (A-Z)</span>
              </label>

              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={options.includeLowercase}
                  onChange={(e) => setOptions(prev => ({ ...prev, includeLowercase: e.target.checked }))}
                />
                <span className="checkmark"></span>
                <span className="label-text">Lowercase Letters (a-z)</span>
              </label>

              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={options.includeNumbers}
                  onChange={(e) => setOptions(prev => ({ ...prev, includeNumbers: e.target.checked }))}
                />
                <span className="checkmark"></span>
                <span className="label-text">Numbers (0-9)</span>
              </label>

              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={options.includeSymbols}
                  onChange={(e) => setOptions(prev => ({ ...prev, includeSymbols: e.target.checked }))}
                />
                <span className="checkmark"></span>
                <span className="label-text">Symbols (!@#$%^&*)</span>
              </label>
            </div>
          </div>

          <button onClick={generatePassword} className="generate-btn">
            🎲 Generate Password
          </button>
        </div>

        <div className="info-card">
          <h3>🛡️ Password Security Best Practices</h3>
          <ul>
            <li><strong>Length Matters:</strong> Use at least 12 characters for better security</li>
            <li><strong>Mix Character Types:</strong> Include uppercase, lowercase, numbers, and symbols</li>
            <li><strong>Avoid Personal Info:</strong> Don't use names, birthdays, or dictionary words</li>
            <li><strong>Unique Passwords:</strong> Use different passwords for each account</li>
            <li><strong>Use a Password Manager:</strong> Store passwords securely in a trusted manager</li>
            <li><strong>Enable 2FA:</strong> Add two-factor authentication when possible</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
