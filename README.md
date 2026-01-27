# Learning Log Buddy - Backend API

> A RESTful API for tracking learning activities, managing goals, and analyzing progress built with Node.js, Express.js, and MongoDB.

![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![Express](https://img.shields.io/badge/Express-4.18+-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 Overview

Learning Log Buddy Backend is a comprehensive API that enables users to:
- Track daily learning activities across multiple categories
- Monitor progress with streak tracking and analytics
- Set and track weekly learning goals
- Analyze time spent on different learning activities
- Manage custom learning categories

Built with a focus on performance, security, and scalability using industry-standard practices and MVC architecture.

---

## ✨ Features

### Core Functionality
- 🔐 **User Authentication** - JWT-based secure authentication
- 📚 **Category Management** - Custom learning categories with icons and colors
- ⏱️ **Activity Logging** - Track learning sessions with detailed metadata
- 🔥 **Streak Tracking** - Monitor daily learning streaks
- 📊 **Analytics** - Weekly/monthly statistics and insights
- 🎯 **Goal Tracking** - Set and monitor learning targets
- 🌙 **Theme Support** - User preference management
- 🔒 **Data Security** - Password hashing, JWT tokens, input validation

### Technical Features
- RESTful API design
- Mongoose ODM with optimized indexes
- Comprehensive error handling
- Request validation middleware
- CORS configuration
- Security headers with Helmet
- Rate limiting (planned)
- API documentation (planned)

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| **Runtime** | Node.js 18+ |
| **Framework** | Express.js 4.18+ |
| **Database** | MongoDB 6.0+ |
| **ODM** | Mongoose 8.0+ |
| **Authentication** | JSON Web Tokens (JWT) |
| **Password Hashing** | bcryptjs |
| **Security** | Helmet, CORS |
| **Logging** | Morgan (development) |
| **Environment** | dotenv |

---

## 📁 Project Structure

```
server/
├── config/                     # Configuration files
│   ├── db.js                  # MongoDB connection setup
│   └── config.js              # Environment configuration
│
├── controllers/                # Request handlers (business logic)
│   ├── authController.js      # Authentication logic
│   ├── activityController.js  # Activity CRUD operations
│   ├── categoryController.js  # Category management
│   ├── statsController.js     # Statistics & analytics
│   └── targetController.js    # Goal target management
│
├── middleware/                 # Custom middleware
│   ├── auth.js                # JWT authentication middleware
│   ├── errorHandler.js        # Global error handler
│   └── validateRequest.js     # Request validation
│
├── models/                     # ✅ Mongoose models (COMPLETED)
│   ├── User.js                # User model
│   ├── Category.js            # Category model
│   ├── Activity.js            # Activity model
│   ├── GoalTargets.js         # Goal targets model
│   ├── index.js               # Model exports
│   └── README.md              # Models documentation
│
├── routes/                     # API route definitions
│   ├── auth.js                # /api/auth routes
│   ├── activities.js          # /api/activities routes
│   ├── categories.js          # /api/categories routes
│   ├── stats.js               # /api/stats routes
│   └── targets.js             # /api/targets routes
│
├── utils/                      # Helper functions
│   ├── dateUtils.js           # Date/time utilities
│   ├── statsCalculator.js     # Streak & stats calculations
│   └── seedDefaults.js        # Seed default data
│
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── package.json                # Project dependencies
├── server.js                   # Application entry point
└── README.md                   # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB 6.0+ installed and running (or MongoDB Atlas account)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd learning-log-buddy/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB** (if using local installation)
   ```bash
   mongod --dbpath /data/db
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

### Quick Test

```bash
# Check if server is running
curl http://localhost:5000/api/health

# Expected response:
# {"status":"ok","timestamp":"2024-01-27T10:30:00.000Z"}
```

---

## 🔧 Environment Variables

Create a `.env` file in the server root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/learning-log-buddy
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/learning-log-buddy

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRES_IN=7d

# CORS Configuration
CLIENT_URL=http://localhost:5173

# Optional: Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Environment Variable Details

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port number | 5000 | No |
| `NODE_ENV` | Environment (development/production) | development | No |
| `MONGODB_URI` | MongoDB connection string | - | **Yes** |
| `JWT_SECRET` | Secret key for JWT signing | - | **Yes** |
| `JWT_EXPIRES_IN` | JWT token expiration | 7d | No |
| `CLIENT_URL` | Frontend URL for CORS | - | **Yes** |

---

## 📚 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

### Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### API Endpoints Overview

#### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /me` - Get current user profile

#### Categories (`/api/categories`)
- `GET /` - Get all user categories
- `POST /` - Create new category
- `PUT /:id` - Update category
- `DELETE /:id` - Delete category
- `POST /reorder` - Reorder categories

#### Activities (`/api/activities`)
- `GET /` - Get all activities (with date filters)
- `GET /date/:date` - Get activities for specific date
- `POST /` - Log new activity
- `PUT /:id` - Update activity
- `DELETE /:id` - Delete activity

#### Statistics (`/api/stats`)
- `GET /dashboard` - Get dashboard statistics
- `GET /weekly` - Get weekly breakdown
- `GET /daily/:date` - Get daily summary

#### Goal Targets (`/api/targets`)
- `GET /` - Get user goal targets
- `PUT /` - Update goal targets

### Example Requests

#### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Log Activity
```bash
POST /api/activities
Authorization: Bearer <token>
Content-Type: application/json

{
  "categoryId": "65b1234567890abcdef12345",
  "description": "Completed React Hooks tutorial",
  "duration": 90,
  "date": "2024-01-27",
  "details": {
    "courseName": "React Complete Guide",
    "moduleName": "Advanced Hooks"
  }
}
```

For detailed API documentation with all endpoints, request/response formats, and examples, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) (coming soon).

---

## 🗄️ Database Schema

### Collections

#### Users
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  name: String (required),
  preferences: {
    timezone: String,
    weekStartsOn: Number,
    theme: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### Categories
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  label: String (required),
  icon: String (emoji),
  color: String (HSL format),
  description: String,
  isDefault: Boolean,
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Activities
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  categoryId: ObjectId (ref: Category),
  description: String (required),
  duration: Number (minutes),
  date: String (YYYY-MM-DD),
  details: {
    moduleName: String,
    problemCount: Number,
    platform: String,
    courseName: String,
    notes: String,
    tags: [String]
  },
  timestamp: Date
}
```

#### GoalTargets
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User, unique),
  weeklyHours: { min: Number, max: Number },
  activeDaysPerWeek: { min: Number, max: Number },
  dsaProblemsPerWeek: { min: Number, max: Number },
  germanHoursPerWeek: Number,
  updatedAt: Date
}
```

For detailed schema documentation, see [models/README.md](./models/README.md).

---

## 🔐 Authentication

### JWT Token Flow

1. **Registration/Login**
   - User submits credentials
   - Server validates and creates/verifies user
   - Server generates JWT token
   - Token sent to client

2. **Protected Routes**
   - Client includes token in Authorization header
   - Server verifies token using JWT_SECRET
   - Server extracts user ID from token
   - Request proceeds if valid

3. **Token Expiration**
   - Tokens expire after configured time (default: 7 days)
   - Client must refresh or re-login

### Password Security
- Passwords hashed using bcryptjs with 12 salt rounds
- Original password never stored
- Passwords excluded from query results by default

---

## 💻 Development

### Available Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run tests (coming soon)
npm test

# Lint code (coming soon)
npm run lint

# Format code (coming soon)
npm run format
```

### Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and test**
   ```bash
   npm run dev
   # Test your changes
   ```

3. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: description of your feature"
   git push origin feature/your-feature-name
   ```

4. **Create pull request**

### Code Style

- Use ES6+ JavaScript features
- Follow Airbnb JavaScript Style Guide
- Use async/await for asynchronous operations
- Write descriptive variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Error Handling

All errors are caught and processed by the global error handler:

```javascript
try {
  // Your code
} catch (error) {
  next(error); // Pass to error handler
}
```

---

## 🧪 Testing

### Test Structure (Planned)

```
tests/
├── unit/
│   ├── models/
│   ├── controllers/
│   └── utils/
├── integration/
│   └── routes/
└── setup.js
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- tests/unit/models/User.test.js

# Run with coverage
npm test -- --coverage
```

---

## 🚀 Deployment

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET` (32+ characters)
- [ ] Configure production MongoDB (MongoDB Atlas recommended)
- [ ] Set up proper CORS whitelist
- [ ] Enable rate limiting
- [ ] Set up logging (Winston, Papertrail, etc.)
- [ ] Configure monitoring (PM2, New Relic, etc.)
- [ ] Set up SSL/TLS certificates
- [ ] Enable compression
- [ ] Configure firewall rules

### Deployment Options

#### Option 1: Heroku
```bash
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret
heroku config:set MONGODB_URI=your-mongodb-uri
git push heroku main
```

#### Option 2: DigitalOcean/AWS/GCP
1. Set up Node.js server
2. Install dependencies: `npm ci --production`
3. Configure environment variables
4. Use PM2 for process management
5. Set up Nginx as reverse proxy
6. Configure SSL with Let's Encrypt

#### Option 3: Railway/Render
- Connect GitHub repository
- Configure environment variables in dashboard
- Deploy automatically on push

---

## 📊 Performance Considerations

### Database Optimization
- Compound indexes on frequently queried fields
- Lean queries for read-only operations
- Aggregation pipelines for complex statistics
- Connection pooling (built into Mongoose)

### Caching (Planned)
- Redis for session management
- Cache frequently accessed data
- Invalidate cache on data updates

### Rate Limiting (Planned)
- Limit requests per IP address
- Separate limits for auth endpoints
- Prevent brute force attacks

---

## 🔒 Security

### Implemented Security Measures
- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ CORS configuration
- ✅ Helmet security headers
- ✅ Input validation
- ✅ MongoDB injection prevention (Mongoose)
- ✅ NoSQL injection protection

### Planned Security Enhancements
- [ ] Rate limiting
- [ ] Request sanitization
- [ ] API key authentication for mobile
- [ ] 2FA support
- [ ] Account lockout after failed attempts
- [ ] Security audit logging

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Failed**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
- Ensure MongoDB is running: `mongod --dbpath /data/db`
- Check `MONGODB_URI` in `.env`
- Verify network access if using MongoDB Atlas

**JWT Secret Missing**
```
Error: JWT_SECRET is required
```
- Create `.env` file from `.env.example`
- Add strong JWT_SECRET value

**Port Already in Use**
```
Error: listen EADDRINUSE :::5000
```
- Change `PORT` in `.env`
- Kill process using port: `lsof -ti:5000 | xargs kill`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Test additions or changes
- `chore:` Build process or auxiliary tool changes

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Your Name** - *Initial work* - [GitHub Profile](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- Mongoose team for the elegant ODM
- MongoDB for the flexible database
- All contributors and users of this project

---

## 📞 Support

For support, email support@example.com or create an issue in the repository.

---

## 🗺️ Roadmap

### Phase 1: Core Features (Current)
- [x] User authentication
- [x] Data models
- [ ] CRUD operations
- [ ] Basic statistics

### Phase 2: Enhanced Features
- [ ] Advanced analytics
- [ ] Email notifications
- [ ] Data export (CSV/JSON)
- [ ] Mobile API optimizations

### Phase 3: Advanced Features
- [ ] Real-time updates (WebSockets)
- [ ] Social features
- [ ] Team/group tracking
- [ ] AI-powered insights

---

## 📈 Project Status

**Current Version:** 1.0.0-alpha  
**Status:** Active Development  
**Last Updated:** January 2024

### Progress Tracker

| Feature | Status |
|---------|--------|
| Database Models | ✅ Complete |
| Authentication | 🚧 In Progress |
| Activity Logging | 📋 Planned |
| Statistics | 📋 Planned |
| API Documentation | 📋 Planned |
| Testing | 📋 Planned |

---

**Built with ❤️ using Node.js, Express, and MongoDB**