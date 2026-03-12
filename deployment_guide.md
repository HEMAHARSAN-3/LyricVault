# Deployment & GitHub Guide for LyricVault

Follow these steps to put your project on GitHub and host it for free.

## 1. Uploading to GitHub

### Step A: Initialize Git locally
If you haven't already, open your terminal in the project folder and run:
```bash
git init
git add .
git commit -m "Initial commit: Firebase PWA Upgrade"
```

### Step B: Push to GitHub
1. Go to [github.com](https://github.com/) and create a new repository named `LyricVault`.
2. Do **not** initialize it with a README or License.
3. Copy the commands from the "push an existing repository from the command line" section:
```bash
git remote add origin https://github.com/YOUR_USERNAME/LyricVault.git
git branch -M main
git push -u origin main
```

---

## 2. Hosting for Free (Top 2 Options)

### Option 1: Vercel (Easiest for React/Vite)
Vercel is the fastest way to host Vite projects.
1. Sign up for a free account at [vercel.com](https://vercel.com/) using your GitHub account.
2. Click **Add New** > **Project**.
3. Import your `LyricVault` repository.
4. **Environment Variables**: This is the most important step!
   - Copy all keys from your `.env.local` and paste them into the "Environment Variables" section in Vercel.
5. Click **Deploy**. Vercel will handle the build and give you a `vercel.app` URL.

### Option 2: Firebase Hosting (Recommended for Firebase projects)
Since you are already using Firebase database/auth, hosting there keeps everything in one place.
1. In your terminal, install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Log in and initialize:
   ```bash
   firebase login
   firebase init hosting
   ```
   - **Public directory**: Type `dist` (since Vite builds to `dist`).
   - **Single page app**: Type `y`.
   - **GitHub deploy**: Type `n` (unless you want automatic deploys).
3. Deploy your app:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

---

## 3. Important Reminders
- **Security**: Never commit your `.env.local` file to a public GitHub repo! It is already in your `.gitignore`, so it should stay safe.
- **Environment Variables**: Always remember to add your Firebase API keys to the "Environment Variables" section of your hosting provider (Vercel/Netlify).
- **Authorized Domains**: Once you have a production URL (like `lyricvault.vercel.app`), add it to the **Authorized Domains** list in your Firebase Console > Authentication > Settings.
