## Smart Student Productivity Dashboard

**A modern React dashboard for study planning, Pomodoro-based focus sessions, and lightweight productivity analytics — all in the browser, with zero backend.**

---

## Visuals

_Hero / screenshot placeholder (replace with a real image or GIF):_

![Smart Student Productivity Dashboard – Hero Placeholder](./docs/hero-placeholder.png)

---

## Features

- **Task planning and study management**: Create, update, complete, and delete tasks with subject, priority, due date, and status fields.
- **Pomodoro-based focus sessions**: Run configurable focus and break intervals with visual progress and session tracking.
- **Productivity overview**: View basic completion trends and task stats to understand how your study sessions are going over time.
- **Local-first and private**: All data is stored in the browser (localStorage); there is no backend or external API dependency.
- **Modern React architecture**: Functional components, custom hooks, and a modular folder structure for components, hooks, and utilities.
- **Responsive UI**: Layout, typography, and spacing that remain usable and pleasant across common desktop and laptop screen sizes.

---

## Getting Started

### Prerequisites

- **Node.js**: Version 16 or higher
- **npm** (comes with Node.js) or **yarn**

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/<your-username>/smart-student-productivity-dashboard.git
cd smart-student-productivity-dashboard

# Install dependencies
npm install
# or
yarn install
```

Start the development server:

```bash
npm run dev
# or
yarn dev
```

By default, Vite will start the app on `http://localhost:5173`. Open that URL in your browser to use the dashboard.

---

## Usage

The most common way to use this project is as a self-contained dashboard application: run it locally (or deploy the built output) and access the dashboard via the browser. If you want to integrate specific parts into another React project, you can import and render the feature components directly.

Example: using the `StudyPlanner` inside a page component:

```jsx
// src/pages/PlannerPage.jsx
import { StudyPlanner } from '../components/planner/StudyPlanner';

export function PlannerPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <StudyPlanner />
      </div>
    </main>
  );
}
```

For routing, the project already wires `PlannerPage` (as well as the dashboard, timer, and analytics pages) into React Router in `App.jsx`. After starting the dev server, you can:

- Open `/dashboard` for the overview.
- Open `/planner` to manage study tasks.
- Open `/timer` to run Pomodoro sessions.
- Open `/analytics` to review productivity stats.

---

## Configuration

This project works out of the box without any environment variables. If you later add configuration (for example, for custom API endpoints or feature flags), use Vite’s `VITE_` prefix convention and document it in the table below.

| Variable              | Default | Description                                         | Required |
| --------------------- | ------- | --------------------------------------------------- | -------- |
| N/A                   | -       | No environment variables are required by default.   | No       |

---

## Contributing

Contributions are welcome. To propose changes:

1. **Fork** the repository on GitHub.
2. **Create a branch** for your change:
   ```bash
   git checkout -b feature/my-improvement
   ```
3. **Implement** your changes, following the existing code style and folder structure.
4. **Add or update tests** if applicable, and ensure the app builds and runs locally:
   ```bash
   npm run build
   ```
5. **Commit** your changes with a clear, descriptive message.
6. **Open a Pull Request** against the `main` (or default) branch, describing:
   - What you changed.
   - Why you changed it.
   - Any notes on UI or behavioral changes.

Please keep PRs focused and as small as is reasonably practical for easier review.

---

## License

This project is open source and available under the **MIT License**. See the `LICENSE` file in this repository for full license text.