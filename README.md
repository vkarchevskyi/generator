# 🛠️ Generator Hub

A comprehensive React 19 application for generating secure passwords, ULIDs, and UUIDs with educational content about each identifier type.

## ✨ Features

### 🔒 Password Generator
- Customizable length (4-50 characters)
- Character type options (uppercase, lowercase, numbers, symbols)
- Real-time strength indicator
- Security best practices guide

### 🆔 ULID Generator
- Time-ordered identifiers
- Detailed breakdown analysis
- Educational content about ULID benefits
- Comparison with UUIDs

### 🔑 UUID Generator
- Multiple versions support (v1, v3, v4, v5, v6, v7)
- Version-specific information
- Name-based UUID generation (v3, v5)
- Technical structure analysis

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/vkarchevskyi/generator.git
cd generator

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the application.

## 📦 Building for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview
```

## 🌐 Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages with client-side routing support.

### Automatic Deployment (Recommended)

1. **Update the homepage URL** in `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/generator"
   ```

2. **Push to GitHub** and the workflow will automatically deploy to GitHub Pages:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: GitHub Actions

### Manual Deployment

```bash
# Build and deploy manually
npm run deploy
```

## 🛠️ Tech Stack

- **React 19** - Latest React with modern features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **CSS Modules** - Scoped styling
- **UUID Library** - Comprehensive UUID generation
- **ULID Library** - ULID generation and parsing

## 📚 Educational Content

The application includes comprehensive educational content about:
- Password security best practices
- ULID structure and benefits
- UUID versions and use cases
- When to use each identifier type
- Technical implementation details

## 🎨 Design Features

- Modern, responsive design
- Gradient backgrounds with unique themes per page
- Smooth animations and transitions
- Mobile-friendly interface
- Accessibility considerations

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
