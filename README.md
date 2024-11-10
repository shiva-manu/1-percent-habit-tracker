```markdown
# 1% Habit Tracker

A modern habit tracking application that empowers users to improve their lives by just 1% each day. Inspired by *Atomic Habits*, this app focuses on adaptive tracking, NLP-based smart rescheduling, and seamless integration with Google Calendar for notifications. Featuring a sleek dark theme, smooth animations, and secure Auth0 authentication, 1% Habit Tracker is designed for an intuitive and visually appealing experience.

## 🌟 Features

- 🌙 **Modern Dark Theme**: Teal accents for a sleek, minimal aesthetic
- 🔄 **Adaptive Habit Rescheduling**: NLP-driven rescheduling for optimized habit tracking
- 📅 **Google Calendar Integration**: Automatic notifications and reminders via Google Calendar API
- 🧠 **AI Analysis and Recommendations**: Insights on habits using LLaMA 3.1-powered NLP
- 📊 **Progress Tracking**: Visual feedback on habit progress with real-time adjustments for unexpected tasks
- 🔒 **Secure Authentication**: Auth0 integration ensures safe and easy login
- 📱 **Fully Responsive Design**: Optimized for mobile, tablet, and desktop

## 🛠 Tech Stack

- **Frontend**: React with ShadCN and Vite for fast, modern UI
- **Backend**: Flask for API endpoints and habit analysis
- **Database**: MongoDB Atlas for habit and user data management
- **AI/NLP**: LLaMA 3.1 for personalized habit analysis and recommendations
- **Calendar Integration**: Google Calendar API for notifications
- **Authentication**: Auth0 for secure login

## 📂 Project Structure

```
1-percent-habit-tracker/
├── public/
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Landing.jsx          # Main landing page
│   │   ├── Onboarding.jsx       # User onboarding flow
│   │   ├── UserProfile.jsx      # User profile management
│   │   ├── HabitSelection.jsx   # Habit selection interface
│   │   └── ui/                  # Reusable UI components
│   ├── pages/
│   │   ├── Dashboard.jsx        # User dashboard
│   │   └── CalendarIntegration.jsx # Google Calendar setup
│   ├── styles/
│   │   └── common.css           # Shared styles
│   ├── App.js                   # Root component
│   ├── index.js                 # Application entry point
│   ├── api/                     # API requests and setup
│   │   └── googleCalendar.js    # Google Calendar API integration
├── server/
│   ├── app.py                   # Flask server entry point
│   ├── models/                  # MongoDB models
│   └── nlp/                     # NLP-based rescheduling with LLaMA 3.1
├── .env                         # Environment variables
├── .gitignore                   # Git ignore rules
├── package.json                 # Project dependencies
└── README.md                    # Project documentation
```

## 📥 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/1-percent-habit-tracker.git
   ```

2. **Install dependencies**:
   ```bash
   cd 1-percent-habit-tracker
   npm install
   ```

3. **Configure Environment Variables**:
   - Create a `.env` file in both the root and server directories and add your credentials:
     ```env
     REACT_APP_AUTH0_DOMAIN=your-auth0-domain
     REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
     REACT_APP_GOOGLE_CALENDAR_API_KEY=your-google-api-key
     FLASK_ENV=development
     MONGO_URI=your-mongo-db-uri
     ```

4. **Run the app**:
   ```bash
   npm start
   ```

## ⚙️ Environment Variables

Create a `.env` file in both the root and server directories with the following variables:

```env
REACT_APP_AUTH0_DOMAIN=your-auth0-domain
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
REACT_APP_GOOGLE_CALENDAR_API_KEY=your-google-api-key
FLASK_ENV=development
MONGO_URI=your-mongo-db-uri
```

## 🧪 Testing

The project includes a comprehensive test suite using Jest and React Testing Library. To run the tests:

```bash
npm test
```

## 📊 Performance Monitoring

The application includes web vitals reporting for monitoring performance metrics. This helps track and improve the user experience over time.

## 🚀 Future Enhancements

- **Wearable Device Integration**: Connect with fitness bands or smartwatches
- **Social Sharing**: Share progress and achievements with friends
- **Gamification**: Add rewards, streaks, and badges
- **Advanced AI Insights**: AI-powered personalized habit recommendations
- **Community Feature**: Social groups for interaction and encouragement

## 🤝 Contributing

We welcome contributions! Here's how you can help:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

[MIT](LICENSE)

## 🙏 Acknowledgments

- **Design**: Inspired by modern UI/UX trends
- **Icons**: Provided by Lucide React
- **Animations**: Powered by Framer Motion
- **NLP**: LLaMA 3.1 for habit analysis and recommendations

---

Feel free to reach out with any questions or suggestions for improvements!
```
