# K10 Football - AI-Powered Football Network

K10 Football is the world's first validated football network, designed to connect players, coaches, clubs, agents, and academies through verified achievements and AI-powered matching. Built with a modern, high-performance tech stack, it provides a seamless and data-driven experience for the global football ecosystem.

## 🚀 Features

- **Role-Based Dashboards**: Tailored experiences for Players, Coaches, Clubs, Agents, Academies, and Admins.
- **Verified Achievements**: A secure system to track and validate footballing milestones.
- **AI-Powered Matching**: Intelligent algorithms to connect talent with opportunities.
- **Real-time Analytics**: Interactive charts and data visualizations using Recharts.
- **Advanced Data Management**: High-performance tables with filtering and sorting via TanStack Table.
- **Responsive & Modern UI**: Built with Radix UI primitives and Tailwind CSS 4 for a premium look and feel.


## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/)
- **State & Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Tables**: [TanStack Table](https://tanstack.com/table/v8)
- **Drag & Drop**: [@dnd-kit](https://dndkit.com/)
- **Animations**: `react-fast-marquee`, `tw-animate-css`

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [pnpm](https://pnpm.io/) (Recommended package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mohammad-anar/eddiericci-frontend.git
   cd eddiericci-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Project Structure

- `src/app/`: Next.js App Router pages and layouts.
  - `(auth)/`: Authentication-related routes (Login, Reset Password, etc.).
  - `dashboard/`: Main application dashboards categorized by user roles.
- `src/components/`: Reusable UI components (Tables, Charts, Layouts).
- `src/hooks/`: Custom React hooks.
- `src/lib/`: Utility functions and library configurations.
- `src/providers/`: Context providers (AuthGuard, Theme, etc.).
- `src/assets/`: Local assets (Styles, Images).
- `public/`: Static assets (Icons, Favicons).

## 🚀 Deployment

The project is optimized for deployment on [Vercel](https://vercel.com/):

```bash
npm build
```

## 📄 License

This project is private and proprietary.

