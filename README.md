# Therapieland Mobile Wireframes

A Vue.js mobile application for Therapieland with Vuetify components.

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v20.x LTS (see `.nvmrc`)
- **npm**: v8.0.0+ (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tl-wireframes-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Local: http://localhost:3000/tl-wireframes-mobile/
   - Network: Use `--host` flag to expose

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Environment Setup

#### Using nvm (Recommended)
```bash
# Install Node.js version specified in .nvmrc
nvm install
nvm use

# Install dependencies
npm install
```

#### Using Node Version Manager (n)
```bash
# Install Node.js version specified in .node-version
n install 20.19.0

# Install dependencies
npm install
```

## 🏗️ Project Structure

```
src/
├── App.vue              # Main Vue component
├── main.js              # Application entry point
└── plugins/
    └── vuetify.js       # Vuetify configuration
```

## 🔧 Troubleshooting

### Common Issues

1. **esbuild version mismatch**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Port already in use**
   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9
   ```

3. **Node version issues**
   ```bash
   # Use correct Node version
   nvm use
   # or
   n 20.19.0
   ```

## 📱 Features

- Mobile-first responsive design
- Vue 3 with Composition API
- Vuetify 3 component library
- Vite for fast development
- Hot Module Replacement (HMR)

## 🌐 Deployment

The application is configured for GitHub Pages deployment with the base path `/tl-wireframes-mobile/`.

For local development, the base path is automatically adjusted to `/`.
