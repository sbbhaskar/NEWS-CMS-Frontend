# News CMS — Frontend (React + Vite + Tailwind)

A clean, fast frontend for your **News CMS**.
Public users read published stories by category; admins and editors log in to manage content via the admin UI.

## Features

* Public site: home feed, category filter, article pages, search
* Auth UI: login/signup, role-aware navbar (Admin vs Editor vs Visitor)
* Admin UI: dashboard, categories CRUD, articles list with **Publish / Approve / Reject / Unpublish**
* Editor workflow: submissions go **Pending**; only Admin can publish
* Built with **React 18**, **Vite**, **Tailwind CSS**

---

## Requirements

* Node.js **18+**
* Running backend API (default `http://localhost:5000`)

  * Seeded admin: **[admin@admin.com](mailto:admin@admin.com) / admin123**

---

## Quick Start

```bash
# from project root
cd frontend
npm install

# set API base
echo "VITE_API_URL=http://localhost:5000" > .env

# start dev server
npm run dev
# app: http://localhost:5173
```

> If you change `.env`, restart `npm run dev`. Vite only reads `.env` at boot.

---

## Scripts

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build (outputs /dist)
npm run preview   # Preview built files locally
```

If you set up a root `package.json` with `concurrently`, you can run both front+back with:

```bash
npm run dev --prefix ..
```

---

## Environment Variables

Create `frontend/.env`:

```
VITE_API_URL=http://localhost:5000
```

* Points to your backend base URL.
* On Vercel, set this to your deployed backend URL (Render/Fly/etc.).

---

## Project Structure

```
frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── api.js
    ├── styles.css
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── ArticleCard.jsx
    │   └── ProtectedRoute.jsx
    └── pages/
        ├── Home.jsx
        ├── SearchPage.jsx
        ├── ArticlePage.jsx
        ├── Signup.jsx
        ├── AdminLogin.jsx
        ├── AdminDashboard.jsx
        ├── AdminArticles.jsx
        ├── AdminArticleForm.jsx
        └── AdminCategories.jsx
```

---

## Routing (key paths)

* `/` – Home (published stories only)
* `/search?q=` – Search published stories
* `/article/:slug` – Article page
* `/signup` – Create editor account
* `/admin/login` – Admin/Editor login
* `/admin` – Admin dashboard (protected)
* `/admin/articles` – Moderation & article management (protected)
* `/admin/articles/new` – Create article (protected)
* `/admin/articles/:id` – Edit article (protected)
* `/admin/categories` – Category management (protected)

---

## Auth & Roles

* **Admin**

  * Can create/approve/publish/reject/unpublish articles
  * Can manage categories
  * Can reset other users’ passwords (if you enabled that route/page)
  * Navbar shows: **Admin** link + user menu + **Logout** (no Login/Signup)
* **Editor**

  * Can create/edit own articles; saved items become **Pending**
  * Navbar shows: user menu + **Logout** (no Admin link, no Login/Signup)
* **Visitor**

  * Sees Login/Signup
  * No admin link

> Login stores `token` + `user` in `localStorage`. The navbar hides **Login/Signup** when a user is present and shows **Logout** (and **Admin** link only if role is admin).

---

## Moderation (AdminArticles)

* **Pending** → **Approve** (publishes) or **Reject** (back to Draft)
* **Draft** → **Publish**
* **Published** → **Unpublish** (back to Draft)

If you don’t see the buttons:

* Make sure you are **logged in as Admin** (navbar should show `(admin)`).
* Confirm backend has the routes:

  * `PUT /api/articles/:id/approve`
  * `PUT /api/articles/:id/reject`
  * `PUT /api/articles/:id/publish`
  * `PUT /api/articles/:id/unpublish`
* Ensure `VITE_API_URL` points to the running backend and restart dev server.

---

## Styling

* Tailwind classes are used throughout (`src/styles.css` imports Tailwind layers).
* Adjust theme in `tailwind.config.js`.

---

## Build & Deploy (Vercel)

1. **Import** this `frontend` folder into Vercel.
2. Set **Environment Variables**:

   * `VITE_API_URL=https://your-backend.example.com`
3. **Build Command**: `npm run build`
   **Output Directory**: `dist`
4. Deploy.

---

## Standard UX (what to expect)

1. **Home** shows **published** stories (newest first).
2. Category buttons filter the **published** feed.
3. Editors create articles → status becomes **Pending**.
4. Admin reviews **Pending** in Admin → **Approve/Reject/Publish**.
5. When logged in, Navbar **hides** Login/Signup and shows **Logout** (and **Admin** link for admins only).

---

## Troubleshooting

* **Login/Signup still visible after login**
  Ensure `AdminLogin.jsx` stores both:

  ```js
  localStorage.setItem("token", r.data.token);
  localStorage.setItem("user", JSON.stringify(r.data.user));
  ```

  Hard refresh the browser. If using a custom event to refresh the navbar (optional), ensure it’s dispatched on login/logout.

* **No articles on home**
  Home only shows **published**. Publish at least one article from Admin.

* **Admin buttons not visible**
  You’re likely logged in as editor or the backend endpoints are missing. Verify role in navbar `(admin)` and routes above.

* **Network errors / CORS**

  * Backend must allow CORS from your frontend origin (`CLIENT_URL` in backend `.env`).
  * `VITE_API_URL` must be correct and the backend must be running.

---

## FAQ

**Can general users sign up?**
Yes—`/signup` creates **editor** accounts by default.

**Can Admin create another Admin?**
Yes—use the backend admin route (`/auth/admin/create-user`) or add a small UI page for it (optional).

**How do I preview Drafts publicly?**
By design, drafts aren’t public. Add an admin-only preview route if needed.

---
