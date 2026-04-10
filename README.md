# 🌱 Plant Care Assistant (AI-Powered)

## 🚀 Overview

Plant Care Assistant is a full-stack AI-powered web application that helps users take better care of their plants using intelligent recommendations, chat interaction, and image-based plant analysis.

The system provides:

* AI chatbot for plant care advice
* Plant identification using images
* Personalized care recommendations
* User authentication & chat history

AI systems like this typically analyze plant images and generate care insights using models like Gemini ([Google AI for Developers][1]).

---

## 🧠 Features

### 🔐 Authentication

* User registration & login
* Session handling (NextAuth)

### 💬 AI Chat System

* Real-time plant care assistant
* Context-aware responses
* Chat history storage

### 🌿 Plant Intelligence

* Image-based plant recognition
* AI-generated care instructions
* Disease detection (optional)

### 📊 User Data

* Save chat history
* Personalized recommendations

---

## 🏗️ Tech Stack

### Frontend & Backend

* Next.js (Full-stack framework)
* React (UI components)

### Database

* Prisma ORM
* SQLite (or PostgreSQL for production)

### Authentication

* NextAuth.js

### AI Integration

* Google Gemini API

---

## 📁 Project Structure

```
plant-care-app/
│
├── app/
│   ├── api/
│   ├── auth/
│   ├── chat/
│
├── components/
├── lib/
├── prisma/
├── public/
├── styles/
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone <repo-url>
cd plant-care-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create `.env` file:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your_secret"
GEMINI_API_KEY="your_api_key"
```

### 4. Setup Database

```bash
npx prisma migrate dev --name init
```

### 5. Run Development Server

```bash
npm run dev
```

---

## 🔄 System Architecture

```
User → UI → API Routes → AI Service → Database → UI
```

---

## 🧪 Future Enhancements

* Mobile responsiveness
* Notifications (watering reminders)
* Weather-based plant suggestions
* Multi-language support

---

## 🎯 Goal

To simplify plant care using AI and provide an intuitive assistant for beginners and plant enthusiasts.

---

## 👨‍💻 Author

* Your Name
* MCA Project (Minor Project)

---

## 📌 Notes

This project is designed for:

* Learning full-stack development
* Understanding AI integration
* Building deployable real-world apps

[1]: https://ai.google.dev/competition/projects/plantcare?utm_source=chatgpt.com "PlantCare | Gemini API Developer Competition"



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
