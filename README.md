# 🤖 AI Resume Builder

> An intelligent, full-stack resume builder that leverages AI to help users craft professional, job-winning resumes in minutes.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## 🧠 Overview

**AI-PRO** is a full-stack AI-powered resume builder designed to streamline the resume creation process. Users can input their personal details, experience, education, skills, and projects — and the application intelligently generates a polished, professional resume with AI-assisted content suggestions.

Whether you're a fresh graduate or a seasoned professional, AI-PRO helps you put your best foot forward.

---

## ✨ Features

- 📝 **AI-Powered Content Generation** — Get smart suggestions for resume sections based on your input
- 🎨 **Live Resume Preview** — See real-time updates as you fill in your details
- 📄 **PDF Export** — Download your resume as a professionally formatted PDF
- 🗂️ **Multi-Section Support** — Personal info, work experience, education, skills, and projects
- 🌙 **Modern UI** — Clean, responsive interface for a smooth user experience
- 🔐 **Secure Backend** — RESTful API with proper data handling

---

## 🛠️ Tech Stack

### Frontend
- **JavaScript** (React / Vanilla JS)
- **HTML5 & CSS3**

### Backend
- **Node.js**
- **Express.js**

### AI Integration
- AI API (e.g., OpenAI / Google Gemini) for content generation

---

## 📁 Project Structure

```
AI-Resume-Builder/
├── frontend/          # Client-side application
│   ├── public/        # Static assets
│   └── src/           # Source files
│       ├── components/  # Reusable UI components
│       ├── pages/       # Application pages/views
│       └── assets/      # Images, icons, styles
│
├── backend/           # Server-side application
│   ├── routes/        # API route handlers
│   ├── controllers/   # Business logic
│   ├── models/        # Data models
│   └── server.js      # Entry point
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Adrich-Fernandes/AI-Resume-Builder.git
   cd AI-Resume-Builder
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

### Running the App

1. **Start the backend server**

   ```bash
   cd backend
   npm start
   ```

   The server will run at `http://localhost:5000` (or your configured port).

2. **Start the frontend**

   ```bash
   cd frontend
   npm start
   ```

   The app will open at `http://localhost:3000`.

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=5000
NODE_ENV=development

# AI API Configuration
AI_API_KEY=your_ai_api_key_here

# (Optional) Database
DATABASE_URL=your_database_url_here

# JWT Secret (if using authentication)
JWT_SECRET=your_jwt_secret_here
```

> ⚠️ Never commit your `.env` file. It is already included in `.gitignore`.

---

## 💡 Usage

1. Open the app in your browser
2. Fill in your personal details, work experience, education, and skills
3. Let the AI suggest and refine your resume content
4. Preview your resume in real time
5. Export and download your resume as a PDF

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please make sure your code follows the existing style and includes relevant comments where necessary.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/Adrich-Fernandes">Adrich Fernandes</a>
</div>
