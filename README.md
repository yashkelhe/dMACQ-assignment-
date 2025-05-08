npx create-next-app@latest blog-platform

√ Would you like to use TypeScript? ... No / Yes
√ Would you like to use ESLint? ... No / Yes
√ Would you like to use Tailwind CSS? ... No / Yes
√ Would you like your code inside a `src/` directory? ... No / Yes
√ Would you like to use App Router? (recommended) ... No / Yes
√ Would you like to use Turbopack for `next dev`? ... No / Yes
√ Would you like to customize the import alias (`@/*` by default)? ... No / Yes
√ What import alias would you like configured? ... @/\*

✅ Features to Implement

1. Authentication Flow
   Register: User signs up using email and password.

Login: User logs in and receives a JWT token.

Auth Check: Use a /api/auth-check endpoint (mock API) to verify if a user is logged in.

Store the JWT token in cookies or localStorage.

Add middleware to protect routes—unauthenticated users should be redirected to login/registration.

2. Protected Routes
   Middleware to redirect unauthenticated users to login.

Authenticated users get access to:

Blog listing

Post details

Blog CRUD operations

3. Blog Post Management
   Create, Read, Update, Delete (CRUD) operations for blog posts.

Two types of posts:

Public: Visible to everyone

Private: Only visible to the post owner

4. Paginated Blog List
   Show 10 posts per scroll/page.

On scroll to bottom, preload next 10 posts using infinite scroll.

5. Search Functionality
   Client-side search to filter posts by title.

6. Blog Details Page
   View full post details.

Add a "Like" button.

Show toast notification on interaction (like action).

7. UI/UX
   Use Tailwind CSS (optionally with MUI).

Make the app responsive and visually clean.

8. Testing (Optional but Appreciated)
   Use Cypress for:

Unit tests (e.g., blog list/detail components)

Integration tests (e.g., API interactions)

/my-blog-app
├── /app
│ ├── /api
│ │ ├── auth
│ │ │ ├── login.ts
│ │ │ ├── register.ts
│ │ │ └── auth-check.ts
│ │ ├── posts
│ │ │ ├── route.ts // GET (all posts) & POST (create post)
│ │ │ └── [id]
│ │ │ └── route.ts // GET (single post), PUT, DELETE
│ ├── /login
│ │ └── page.tsx
│ ├── /register
│ │ └── page.tsx
│ ├── /dashboard
│ │ └── page.tsx // Protected route
│ ├── /posts
│ │ └── page.tsx // Paginated public/private posts
│ ├── /post
│ │ └── [id]
│ │ └── page.tsx // Single post view
│ ├── layout.tsx
│ └── page.tsx // Landing page (optional)
├── /components
│ ├── AuthForm.tsx
│ ├── BlogCard.tsx
│ ├── BlogForm.tsx
│ ├── Navbar.tsx
│ ├── PostDetails.tsx
│ └── SearchBox.tsx
├── /hooks
│ └── useAuth.ts // Auth hook with React Query
├── /lib
│ ├── db.ts // MongoDB connection
│ └── auth.ts // JWT utils
├── /middleware
│ └── authMiddleware.ts // Middleware to check auth
├── /types
│ └── index.ts // TypeScript interfaces
├── /utils
│ └── constants.ts // API base URLs, constants, etc.
├── /public
├── /styles
│ └── globals.css
├── .env.local
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
