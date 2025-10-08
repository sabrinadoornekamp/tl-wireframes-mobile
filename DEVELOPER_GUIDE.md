# Therapieland Wireframes - Developer Guide

## 🏗️ Application Architecture Overview

This is a **Vue.js 3 + Vuetify 3** application that creates a wireframe-style mental health platform for therapy programs and questionnaires. The application is designed as a prototype/wireframe with a monospace font aesthetic and black borders throughout.

## 📦 Technology Stack

### Core Technologies
- **Vue.js 3** - Progressive JavaScript framework with Composition API
- **Vuetify 3** - Material Design component framework for Vue
- **Vue Router 4** - Client-side routing
- **Vite** - Fast build tool and development server
- **Sass** - CSS preprocessor for styling

### Key Dependencies
```json
{
  "vue": "^3.5.21",
  "vue-router": "^4.5.1", 
  "vuetify": "^3.10.1",
  "@vitejs/plugin-vue": "^6.0.1",
  "vite-plugin-vuetify": "^2.1.2"
}
```

## 🗂️ Project Structure

```
tl-wireframes/
├── src/
│   ├── components/           # Vue components
│   │   ├── App.vue           # Root component
│   │   ├── AppHeader.vue     # Top navigation bar
│   │   ├── SidebarNav.vue    # Left sidebar navigation
│   │   ├── BreadcrumbNav.vue # Breadcrumb navigation
│   │   ├── DashboardContent.vue # Main dashboard
│   │   ├── ProgramDetail.vue # Program overview pages
│   │   ├── *Module.vue       # Individual module pages
│   │   └── ...
│   ├── router/
│   │   └── index.js          # Vue Router configuration
│   ├── plugins/
│   │   ├── index.js          # Plugin registration
│   │   └── vuetify.js        # Vuetify configuration
│   ├── assets/               # Static assets (fonts, images)
│   └── main.js              # Application entry point
├── vite.config.mjs          # Vite configuration
├── package.json             # Dependencies and scripts
└── index.html              # HTML template
```

## 🎨 Design System & Styling

### Wireframe Aesthetic
- **Font**: Monospace (Courier New, Monaco, Menlo)
- **Colors**: Black text, white backgrounds, gray accents
- **Borders**: 2px solid black borders throughout
- **Layout**: Grid-based layouts with consistent spacing
- **No colors**: Intentionally minimal color palette for wireframe feel

### Key CSS Classes
```css
.wireframe-*     /* All custom wireframe styling */
.v-navigation-drawer /* Vuetify sidebar component */
.v-app-bar       /* Vuetify top bar component */
.v-main          /* Vuetify main content area */
```

## 🧩 Component Architecture

### 1. Root Component (`App.vue`)
- **Purpose**: Main application wrapper
- **Features**: 
  - Responsive sidebar management
  - Mobile/desktop breakpoint handling
  - Global route watching for module pages
- **Key Logic**: Toggle between rail mode (desktop) and drawer mode (mobile)

### 2. Navigation System

#### Sidebar Navigation (`SidebarNav.vue`)
- **Hierarchical Menu Structure**:
  ```
  Dashboard
  My therapieland
  ├── Monitors
  ├── Programs & questionnaires
  │   ├── CBT Program
  │   ├── Mindfulness Program
  │   ├── Trauma Recovery
  │   ├── Depression Treatment
  │   ├── Social Skills
  │   └── Anger Management
  └── Library
  Settings
  ```

- **Dynamic State Management**:
  - `active` - Currently selected menu item
  - `expandedSubmenu` - My therapieland submenu state
  - `expandedProgramsSubmenu` - Programs submenu state
  - Route-based auto-expansion of submenus

#### Breadcrumb Navigation (`BreadcrumbNav.vue`)
- **Purpose**: Shows current page hierarchy
- **Features**: Responsive design, dynamic route mapping
- **Format**: `Home > Programs & Questionnaires > CBT Program`

### 3. Content Components

#### Dashboard (`DashboardContent.vue`)
- **Purpose**: Main landing page
- **Features**: Program cards, progress tracking, quick access

#### Program Detail Pages (`ProgramDetail.vue`)
- **Purpose**: Individual program overview
- **Features**: 
  - Program information and objectives
  - Module listing with progress
  - Action buttons (Start/Continue)
  - Resource links

#### Module Detail Pages (`*Module.vue`)
- **Purpose**: Individual therapy modules
- **Features**:
  - **Dynamic Content Switching**: Single page with multiple modules
  - **Sidebar Navigation**: Module-specific navigation
  - **Full-screen Mode**: Hides main app navigation
  - **Progress Tracking**: Module completion status

## 🛣️ Routing System

### Route Structure
```javascript
/                           # Dashboard
/my-therapieland           # My therapieland overview
/programs-questionnaires   # Programs & questionnaires list
/program/{program-id       # Individual program
/program/{program-id}/module/{module-id} # Individual module
```

### Dynamic Module Routing
Each program has multiple modules with dedicated routes:
- CBT: `/program/cognitive-behavioral-therapy/module/introduction-to-cbt`
- Mindfulness: `/program/mindfulness--stress-reduction/module/introduction-to-mindfulness`
- Anger Management: `/program/anger-management-program/module/understanding-anger`

## 🔄 State Management

### Reactive Data Patterns
```javascript
// Module content switching
const activeModule = ref('module-slug')
const allModules = ref({ /* module data */ })
const currentModuleData = computed(() => allModules.value[activeModule.value])

// Navigation state
const active = ref('Dashboard')
const expandedSubmenu = ref(false)
const expandedProgramsSubmenu = ref(false)
```

### Route-Based State Updates
- Automatic submenu expansion based on current route
- Active menu item highlighting
- Breadcrumb generation from route path

## 📱 Responsive Design

### Breakpoints
- **Desktop**: ≥ 1200px (sidebar always visible, rail mode)
- **Tablet**: 768px - 1199px (sidebar toggle, drawer mode)
- **Mobile**: < 768px (overlay sidebar, drawer mode)

### Responsive Features
- Sidebar collapses to rail mode on desktop
- Overlay sidebar on mobile
- Dynamic content layout adjustments
- Touch-friendly navigation

## 🎯 Key Features

### 1. Dynamic Content Switching
Module pages use a single component with multiple content sections:
```javascript
// Instead of separate pages, content switches dynamically
const navigateToModule = (moduleSlug) => {
  activeModule.value = moduleSlug // Updates content area
}
```

### 2. Full-Screen Module Mode
When viewing modules, the main app navigation is hidden:
```javascript
onMounted(() => {
  // Hide main app elements
  const sidebar = document.querySelector('.v-navigation-drawer')
  const appBar = document.querySelector('.v-app-bar')
  if (sidebar) sidebar.style.display = 'none'
  if (appBar) appBar.style.display = 'none'
})
```

### 3. Program-Specific Modules
Each program has its own set of modules with unique content:
- **CBT**: Introduction, Negative Thoughts, Thought Challenging, Behavioral Experiments, Relapse Prevention
- **Mindfulness**: Introduction, Body Scan, Breathing, Mindful Movement
- **Anger Management**: Understanding Anger, Anger Triggers, Relaxation Techniques

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
# Runs on http://localhost:3003
```

### Build for Production
```bash
npm run build
```

### Key Configuration Files
- `vite.config.mjs` - Build configuration with base path `/tl-wireframes/`
- `package.json` - Dependencies and scripts
- `src/plugins/vuetify.js` - Vuetify theme and component configuration

## 🔧 Customization Guide

### Adding New Programs
1. Create program detail component (`ProgramDetail.vue`)
2. Add route in `router/index.js`
3. Add to sidebar menu in `SidebarNav.vue`
4. Create module components for the program

### Adding New Modules
1. Create module component (`*Module.vue`)
2. Add route in `router/index.js`
3. Update program's module data structure
4. Add to program's sidebar navigation

### Styling Guidelines
- Use `.wireframe-*` classes for custom styling
- Maintain monospace font consistency
- Use 2px solid black borders for wireframe aesthetic
- Follow grid-based layouts with consistent spacing

## 🐛 Common Issues & Solutions

### 1. Module Content Not Switching
- Ensure `activeModule` ref is properly updated
- Check that `allModules` data structure is correct
- Verify `navigateToModule` function is called

### 2. Sidebar Navigation Issues
- Check route-based state updates in `updateActiveState`
- Verify submenu expansion logic
- Ensure proper route matching patterns

### 3. Responsive Layout Problems
- Check breakpoint logic in `handleResize`
- Verify Vuetify component properties
- Test on different screen sizes

## 📚 Key Concepts for Developers

### Vue 3 Composition API
- Uses `<script setup>` syntax
- Reactive refs and computed properties
- Lifecycle hooks (`onMounted`, `onUnmounted`)

### Vuetify 3 Components
- `v-navigation-drawer` for sidebar
- `v-app-bar` for top navigation
- `v-main` for content area
- Responsive breakpoint system

### Vue Router 4
- Dynamic route parameters
- Route-based component loading
- Navigation guards and watchers

This application serves as a comprehensive wireframe prototype for a mental health platform, demonstrating modern Vue.js development patterns with a focus on user experience and responsive design.
