# 1% Habit Tracker

A modern habit tracking application that empowers users to improve their lives by just 1% each day. Inspired by *Atomic Habits*, this app focuses on adaptive tracking, smart scheduling, and seamless integration with Google Calendar for notifications.

## 🌟 Overview

1% Habit Tracker is a full-stack web application designed to help users build and maintain positive habits through incremental daily improvements. The application combines modern technology with proven habit-forming strategies to create a powerful tool for personal development.

### Key Benefits
- Track daily progress with visual feedback
- Smart scheduling system that adapts to your routine
- Data-driven insights for habit optimization
- Beautiful, intuitive dark-mode interface
- Secure authentication and data privacy
- Cross-platform accessibility

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript for type-safe code
- **Vite** for optimized development and builds
- **ShadcnUI** + **Tailwind CSS** for modern, responsive design
- **Framer Motion** for smooth animations
- **Auth0** for secure authentication
- **React Query** for efficient data fetching
- **Zustand** for state management

### Backend
- **Flask** REST API with Python 3.11
- **MongoDB** for scalable data persistence
- **Google Calendar API** for scheduling integration
- **JWT** for secure authentication
- **OpenAI API** for habit insights

## 📂 Project Structure

```
1-percent-habit-tracker/
├── client/                    # React + TypeScript frontend
│   ├── src/                  
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Main application pages
│   │   ├── lib/             # Utilities and helpers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── store/           # Zustand store configurations
│   │   └── styles/          # Global styles and Tailwind config
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
│
├── server/                    # Flask backend
│   ├── api/                  # REST endpoints
│   │   ├── auth/            # Authentication routes
│   │   ├── habits/          # Habit management routes
│   │   └── analytics/       # Analytics and insights
│   ├── models/              # Database models
│   ├── services/            # Business logic
│   └── requirements.txt     # Python dependencies
│
├── .github/                  # GitHub Actions workflows
├── docker/                   # Docker configurations
├── docs/                     # Documentation
└── README.md                # This file
```

## 🚀 Getting Started

1. **Prerequisites**
   - Node.js 18+
   - Python 3.11+
   - MongoDB
   - Git

2. **Clone the repository**
   ```bash
   git clone https://github.com/soulsociety/1-percent-habit-tracker.git
   cd 1-percent-habit-tracker
   ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   cp .env.example .env    # Configure your environment variables
   npm run dev
   ```

4. **Backend Setup**
   ```bash
   cd server
   python -m venv venv
   source venv/bin/activate  # or `venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   cp .env.example .env    # Configure your environment variables
   python run.py
   ```

## 🔑 Environment Configuration

### Frontend (.env)
```env
VITE_AUTH0_DOMAIN=your-domain
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### Backend (.env)
```env
FLASK_APP=run.py
FLASK_ENV=development
MONGODB_URI=your-mongodb-uri
JWT_SECRET_KEY=your-secret-key
OPENAI_API_KEY=your-openai-key
GOOGLE_CLIENT_SECRET=your-google-secret
```

## 📱 Core Features

### Habit Management
- Create, edit, and delete habits
- Set custom schedules and reminders
- Track completion rates and streaks
- Add notes and reflections

### Smart Scheduling
- Google Calendar integration
- AI-powered scheduling suggestions
- Flexible rescheduling options
- Time zone support

### Analytics & Insights
- Progress visualization
- Success rate analysis
- Habit correlation insights
- Personalized recommendations

### User Experience
- Responsive design for all devices
- Dark/Light mode support
- Offline capability
- Smooth animations
- Accessibility features

## 🧪 Testing

```bash
# Frontend tests
cd client
npm test

# Backend tests
cd server
python -m pytest
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add: AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Atomic Habits](https://jamesclear.com/atomic-habits) by James Clear for inspiration
- [ShadcnUI](https://ui.shadcn.com/) for beautiful components
- [Auth0](https://auth0.com/) for authentication
- [Framer Motion](https://www.framer.com/motion/) for animations
- [OpenAI](https://openai.com/) for AI capabilities


---

Built with ❤️ by Soul Society
