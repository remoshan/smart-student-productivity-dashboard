# Smart Student Productivity Dashboard

A modern, frontend-only Single Page Application designed to help students plan studies, manage tasks, focus using Pomodoro technique, and visualize progress. Built with React, Vite, and Tailwind CSS.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC?logo=tailwind-css)

## 🎯 Overview

Smart Student Productivity Dashboard is a comprehensive productivity tool that combines task management, time tracking, and analytics in a single, intuitive interface. The application is fully offline-capable, storing all data locally in the browser, making it perfect for students who need a reliable productivity companion without internet dependency.

### Key Highlights

- **Zero Backend**: Fully frontend-only application with local storage
- **Offline-First**: Works completely without internet connection
- **Modern UI/UX**: Clean, responsive design with dark mode support
- **Production-Ready**: Built with best practices and scalable architecture
- **Portfolio-Quality**: Demonstrates advanced React patterns and clean code

## ✨ Features

### 📝 Study Planner / Task Manager
- **CRUD Operations**: Add, edit, delete, and update tasks with ease
- **Rich Task Fields**: Subject, priority, due date, status, and description
- **Drag & Drop**: Intuitive task reordering with visual feedback
- **Smart Filtering**: Filter by status (all, active, today, completed)
- **Priority System**: Four-level priority system (Low, Medium, High, Urgent)
- **Overdue Detection**: Visual indicators for overdue and due-today tasks
- **Persistent Storage**: All tasks saved automatically to localStorage

### ⏱️ Pomodoro Timer
- **Configurable Sessions**: Customize focus, short break, and long break durations
- **Visual Progress**: Circular progress indicator with smooth animations
- **Session Management**: Switch between focus and break sessions
- **Session Tracking**: Track completed Pomodoro sessions
- **Auto Transitions**: Automatic session switching after completion
- **State Persistence**: Timer state persists across page refreshes
- **Smart Breaks**: Long breaks after every 4 focus sessions

### 📊 Progress Analytics
- **Daily Completion Rate**: Track daily task completion percentage
- **Weekly Overview**: View completion rates for the current week
- **Interactive Charts**: 
  - Line chart for last 7 days completion trends
  - Bar chart for current week task breakdown
- **Detailed Statistics**: Day-by-day breakdown of completed vs total tasks
- **Real-time Updates**: Analytics update automatically as tasks are completed

### 🌓 Dark / Light Mode
- **System Preference Detection**: Automatically detects and applies system theme
- **Manual Toggle**: Easy theme switching via header button
- **Persistent Preference**: Theme choice saved across sessions
- **Smooth Transitions**: Elegant theme switching animations

### 💾 Offline-First Architecture
- **LocalStorage Integration**: All data stored locally in browser
- **No External Dependencies**: Works completely offline
- **Data Persistence**: All changes saved automatically
- **Error Handling**: Graceful error handling for storage operations

## 🛠 Tech Stack

### Core Technologies
- **React 18.2.0**: Modern React with hooks and functional components
- **Vite 5.0.8**: Lightning-fast build tool and dev server
- **JavaScript (ES6+)**: Modern JavaScript features and syntax
- **HTML5**: Semantic HTML structure
- **Tailwind CSS 3.4.0**: Utility-first CSS framework

### Key Libraries
- **react-beautiful-dnd 13.1.1**: Drag and drop functionality for task reordering
- **recharts 2.10.3**: Beautiful and responsive charts for analytics
- **framer-motion 10.16.16**: Smooth animations and transitions

### Development Tools
- **PostCSS**: CSS processing
- **Autoprefixer**: Automatic vendor prefixing

## 📁 Project Structure

```
student-productivity-dashboard/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   └── Badge.jsx
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── planner/         # Task management components
│   │   │   ├── StudyPlanner.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskItem.jsx
│   │   ├── timer/           # Pomodoro timer components
│   │   │   └── PomodoroTimer.jsx
│   │   └── analytics/       # Analytics components
│   │       └── ProgressAnalytics.jsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useLocalStorage.js
│   │   ├── useTheme.js
│   │   ├── usePomodoro.js
│   │   └── useTasks.js
│   ├── utils/               # Utility functions
│   │   ├── storage.js
│   │   ├── dateUtils.js
│   │   └── analytics.js
│   ├── data/                # Constants and data
│   │   └── constants.js
│   ├── styles/              # Global styles
│   │   └── index.css
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Application entry point
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

### Structure Explanation

- **components/common/**: Reusable UI components following single-responsibility principle
- **components/layout/**: Application layout components (header, sidebar, dashboard)
- **components/planner/**: Task management feature components
- **components/timer/**: Pomodoro timer feature components
- **components/analytics/**: Analytics and visualization components
- **hooks/**: Custom React hooks for state management and side effects
- **utils/**: Pure utility functions for storage, dates, and analytics
- **data/**: Application constants and configuration
- **styles/**: Global CSS and Tailwind configuration

## 🚀 Local Setup

### Prerequisites

- **Node.js**: Version 16.x or higher
- **npm** or **yarn**: Package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-student-productivity-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   - The application will automatically open at `http://localhost:3000`
   - If it doesn't open automatically, navigate to the URL manually

### Build for Production

```bash
npm run build
# or
yarn build
```

The production build will be created in the `dist` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📸 Screenshots

### Dashboard Overview
![Dashboard](https://via.placeholder.com/800x400/0ea5e9/ffffff?text=Dashboard+Overview)

The dashboard provides a comprehensive overview of your productivity metrics, including total tasks, completion rates, and quick statistics.

### Study Planner
![Study Planner](https://via.placeholder.com/800x400/10b981/ffffff?text=Study+Planner)

Manage your tasks with an intuitive interface featuring drag-and-drop reordering, priority levels, and smart filtering.

### Pomodoro Timer
![Pomodoro Timer](https://via.placeholder.com/800x400/f59e0b/ffffff?text=Pomodoro+Timer)

Stay focused with a beautiful, configurable Pomodoro timer with visual progress indicators and session tracking.

### Progress Analytics
![Analytics](https://via.placeholder.com/800x400/8b5cf6/ffffff?text=Progress+Analytics)

Visualize your productivity trends with interactive charts showing daily and weekly completion rates.

## 🎨 Design Philosophy

- **Minimal & Clean**: Uncluttered interface focusing on essential features
- **Consistent Spacing**: Uniform spacing and typography throughout
- **Subtle Animations**: Smooth, purposeful animations that enhance UX
- **Responsive Design**: Optimized for desktop and tablet devices
- **Accessibility**: Semantic HTML and keyboard navigation support

## 💡 Code Quality

- **Component Architecture**: Small, reusable, single-responsibility components
- **Custom Hooks**: Reusable logic extracted into custom hooks
- **Clean Code**: Clear naming, minimal comments, self-documenting code
- **Error Handling**: Graceful error handling for storage operations
- **Performance**: Optimized re-renders and efficient state management

## 🔮 Future Enhancements

Potential features for future iterations:

- Task categories and tags
- Recurring tasks
- Task notes and attachments
- Export/import functionality
- Multiple timer presets
- Sound notifications
- Weekly/monthly analytics views
- Task templates
- Collaboration features (with backend integration)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built as a portfolio project demonstrating modern React development practices and production-quality frontend architecture.

## 🔗 Live Demo

[Live Demo](https://your-demo-url.com) - *Coming soon*

---

**Note**: This is a frontend-only application. All data is stored locally in your browser's localStorage. Clearing browser data will remove all saved tasks and settings.
