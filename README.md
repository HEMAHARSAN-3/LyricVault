# 🎵 LyricVault - Your Personal Lyrics PWA

LyricVault is a production-ready, minimalist Progressive Web App (PWA) designed for music lovers to store, manage, and search their favorite song lyrics. Built with **React**, **Vite**, and **Firebase**, it offers a seamless full-stack experience with real-time cloud sync and mobile-first design.

---

## ✨ Features

- **🔐 Secure Authentication**: Integrated with Firebase for Email/Password and Google OAuth login.
- **☁️ Real-time Database**: Powered by Firestore for instant data persistence and cross-device sync.
- **📱 PWA Ready**: Installable on iOS, Android, and Desktop with offline support.
- **🔍 Smart Search**: Quickly find songs in your library with a fast, client-side search engine.
- **🌿 Minimalist Design**: A clean, "White & Soft Green" UI that provides a premium, distraction-free experience.
- **🛠️ Easy Management**: Full CRUD support (Add, View, Edit, Delete) for your lyrics.

---

## 🚀 Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **Backend/Auth**: Firebase (Authentication & Firestore)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

---

## ⚠️ Important Service Notice

> [!WARNING]
> **Trial Period Limitation**: Please note that the current backend configuration (Firebase Data Connect / Cloud SQL Trial) is associated with a **90-day no-cost trial period**. 
> - This is not a permanent 100% free lifetime hosting site for the database components.
> - Ensure you back up your data or upgrade your Firebase plan if you intend to keep the service running beyond the 90-day trial window.
> - Current Firestore security rules are set to "Test Mode" or limited duration—please update these in the Firebase Console for permanent production use.

---

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/HEMAHARSAN-3/LyricVault.git
   cd LyricVault
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

---

## 📱 PWA Installation

To install LyricVault as an app:
1. Open the site in Chrome (Desktop or Android) or Safari (iOS).
2. Look for the "Install App" button in the address bar or select "Add to Home Screen" from the browser menu.

---

## 📝 License
This project is for personal use and demonstration purposes.
