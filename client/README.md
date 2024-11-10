# 1% Habit Tracker - Frontend

The frontend application for 1% Habit Tracker, built with React, TypeScript, and Vite.

## 🛠 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: ShadCN
- **Authentication**: Auth0
- **Calendar**: Google Calendar API
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod

## 📂 Project Structure

```
src/
├── components/               # Reusable UI components
│   ├── auth/                # Authentication related components
│   ├── habits/              # Habit tracking components
│   ├── layout/             # Layout components
│   └── ui/                 # ShadcnUI components
├── pages/                   # Application pages
│   ├── dashboard/
│   ├── habits/
│   └── settings/
├── hooks/                   # Custom React hooks
├── lib/                     # Utilities and helpers
├── store/                   # Zustand store
├── styles/                  # Global styles
└── types/                   # TypeScript types
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Create a `.env` file in the root directory:
   ```env
   VITE_AUTH0_DOMAIN=your-auth0-domain
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   VITE_API_URL=http://localhost:5000
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code with ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run coverage` - Run tests with coverage report

## 🧪 Testing

We use Vitest and React Testing Library for testing:

```bash
# Run tests
npm test

# Run tests with coverage
npm run coverage

# Run tests in watch mode
npm run test:watch
```

## 📚 Code Style

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type checking

Configure your editor to:
- Format on save with Prettier
- Enable ESLint integration
- Enable TypeScript error reporting

## 🔧 VS Code Extensions

Recommended extensions for development:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- PostCSS Language Support
- vscode-styled-components

## 📱 Features

- **Authentication**
  - Auth0 integration
  - Protected routes
  - User profile management

- **Habit Tracking**
  - Create and manage habits
  - Track daily progress
  - View statistics and insights

- **Calendar Integration**
  - Google Calendar sync
  - Event scheduling
  - Reminders

- **UI/UX**
  - Responsive design
  - Dark/Light mode
  - Smooth animations
  - Accessible components

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add: AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## 📜 Code Style Guide

- Use TypeScript for all new files
- Follow the existing component structure
- Write unit tests for new features
- Update documentation as needed
- Follow semantic commit messages

## 🐛 Bug Reports

Please report bugs by creating a new issue with:
- Bug description
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)
- Environment details

## 📚 Documentation

Additional documentation can be found in:
- [Component Documentation](./docs/components.md)
- [API Integration Guide](./docs/api.md)
- [Testing Guide](./docs/testing.md)
- [State Management](./docs/state.md)

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [ShadcnUI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Auth0](https://auth0.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

Built with ❤️ by Soul Society