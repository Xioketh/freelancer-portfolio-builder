# Freelancer Portfolio Builder

A Next.js application that allows freelancers to create and manage their online portfolio. Users can register, log in, and add their projects with the ability to edit or delete them later. Built with Firebase for authentication and database functionality.

## Live Demo

The application is hosted on Vercel:  
👉 [https://freelancer-portfolio-builder.vercel.app](https://freelancer-portfolio-builder.vercel.app)

## Features

- 🔐 User authentication (Login/Register) with Firebase
- 🖼️ Project management (Create, Read, Update, Delete)
- 📱 Responsive design
- ⚡ Fast performance with Next.js
- 🔥 Real-time database with Firebase
- ✨ Easy-to-use interface

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for server-side rendering
- [Firebase](https://firebase.google.com/) - Authentication and database
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vercel](https://vercel.com) - Deployment platform

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Xioketh/freelancer-portfolio-builder.git
   ```

2. Install dependencies
   ```bash
   cd freelancer-portfolio-builder
   npm install
   ```

3. Set up Firebase configuration
    - Create a new Firebase project
    - Enable Email/Password authentication
    - Set up Firestore database
    - Create a `.env.local` file in the root directory with your Firebase config:
      ```
      NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
      NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
      NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
      ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
freelancer-portfolio-builder/
├── pages/               # Next.js pages
├── public/              # Static files
├── styles/              # Global styles
├── utils/               # Utility functions
├── .env.local           # Environment variables
├── next.config.js       # Next.js configuration
└── package.json         # Project dependencies
```


Thank you for checking out this project! 🚀