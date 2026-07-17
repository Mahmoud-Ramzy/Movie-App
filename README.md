# 🎬 Movie App

> A modern movie discovery application built with React that focuses on performance, clean architecture, and real-world API integration.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Fast-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38BDF8?logo=tailwindcss)
![Appwrite](https://img.shields.io/badge/Appwrite-Backend-FD366E)
![TMDB](https://img.shields.io/badge/TMDB-API-01D277)

---

## 🚀 Overview

This project is more than a simple movie search application.

It demonstrates how to build a production-style React application by combining:

- Modern React Hooks
- Custom Hooks
- External REST APIs
- Backend-as-a-Service (Appwrite)
- Performance optimization
- Component-based architecture
- Responsive UI

Users can discover popular movies, search instantly, and view community trending searches powered by Appwrite.

---

## ✨ Features

- 🔥 Discover trending movies
- 🔍 Instant movie search
- ⚡ Debounced search to reduce unnecessary API requests
- 📈 Trending searches stored in Appwrite
- 🎥 Live data from TMDB API
- ⏳ Loading indicators
- ❌ Error handling
- 📱 Fully responsive design
- ♻️ Reusable React components

---

## 🛠 Tech Stack

- React
- Vite
- Tailwind CSS
- Appwrite
- TMDB API
- JavaScript (ES6+)

---

## 🧠 What I Practiced

This project was built to practice real-world frontend concepts including:

- React Hooks (`useState`, `useEffect`)
- Creating reusable Custom Hooks
- Debouncing user input
- API integration
- Async / Await
- Error handling
- Conditional Rendering
- Component composition
- Environment Variables
- Backend integration with Appwrite

---

## ⚙️ Project Structure

```
src
│
├── components
│   ├── MovieCard
│   ├── Search
│   ├── Spinner
│   └── Trending
│
├── hooks
│   └── useDebounce
│
├── appwrite.js
├── App.jsx
└── main.jsx
```

---

## 📦 Installation

```bash
git clone https://github.com/Mahmoud-Ramzy/Movie-App.git

cd Movie-App

npm install

npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file:

```env
VITE_TMDB_API_KEY=YOUR_TMDB_ACCESS_TOKEN
VITE_APPWRITE_ENDPOINT=...
VITE_APPWRITE_PROJECT_ID=...
VITE_APPWRITE_DATABASE_ID=...
VITE_APPWRITE_COLLECTION_ID=...
```

---

## 💡 Performance Optimizations

Instead of sending an API request on every keystroke, the application uses a custom `useDebounce` hook to wait until the user stops typing before making the request.

This significantly reduces:

- API calls
- Network traffic
- Unnecessary re-renders
- Backend load

---

## 📈 Trending Search Logic

Every successful search is stored inside Appwrite.

When the application loads, it retrieves the most searched movies and displays them in a dedicated Trending section.

---

## 🎯 Future Improvements

- Movie Details Page
- Pagination
- Infinite Scroll
- Favorites
- Dark / Light Theme
- Genre Filtering
- Watchlist
- Authentication

---

## 👨‍💻 Author

**Mahmoud Ramzy**

Software Engineer passionate about building performant, scalable, and user-friendly web applications.

GitHub:
https://github.com/Mahmoud-Ramzy
