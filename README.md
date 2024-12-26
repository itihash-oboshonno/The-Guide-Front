# <img width="50px" src="/public/the-guide-icon.webp"/> TheGuide 🌟

TheGuide is a dynamic and feature-rich blog website that allows users to read, write, and interact with blogs. Built using modern technologies like **React**, **Vite**, and **TailwindCSS**, this platform ensures a seamless and engaging user experience.

## Live Website
[https://theguide-001.web.app](https://theguide-001.web.app)

## Requirement Document
[https://docs.google.com/document/d/1BmkQilfhFTLDeF_KOWKThBV8iATvSHfon93pMuk8hd4/edit?usp=sharing](https://docs.google.com/document/d/1BmkQilfhFTLDeF_KOWKThBV8iATvSHfon93pMuk8hd4/edit?usp=sharing)

---

## Features 🚀

### Core Features:
- **User Authentication**: Secure sign-up and login using Firebase.
- **Write Blogs**: Authenticated users can write and publish blogs.
- **Update Blogs**: Only the blog author can update their blogs.
- **Comment System**: 
  - Users can comment on others' blogs.
  - Authors cannot comment on their own blogs.
- **Wishlist**: 
  - Add blogs to a personal wishlist.
  - View only your own wishlist, secured with JSON Web Tokens (JWT).
- **Featured Blogs**: Displays the top 10 blogs with the highest word count.
- **Recent Blogs**: Showcases the 6 most recent blogs on the homepage.

### Additional Features:
- **Newsletter Subscription**: Users can subscribe with their email to receive updates.
- **Responsive Design**: Optimized for all devices.
- **Toast & Modal Notifications**: Real-time feedback using **Sonner** and **SweetAlert2**.

---

## Tech Stack 🛠️

### Frontend:
- **[React](https://reactjs.org/)**: Library for building user interfaces.
- **[Vite](https://vitejs.dev/)**: Lightning-fast development environment.
- **[TailwindCSS](https://tailwindcss.com/)**: Utility-first CSS framework.
- **[DaisyUI](https://daisyui.com/)**: TailwindCSS-based component library.
- **[React Router DOM](https://reactrouter.com/)**: For routing and private routes.
- **[Framer Motion](https://www.framer.com/motion/)**: Animations for interactive UI.
- **[React Icons](https://react-icons.github.io/react-icons/)**: Icon library.

### Notifications:
- **[Sonner](https://sonner.dev/)**: Toast notifications.
- **[SweetAlert2](https://sweetalert2.github.io/)**: Modal notifications.

### Backend:
- **[Axios](https://axios-http.com/)**: For HTTP requests.
- **[TanStack Query](https://tanstack.com/query/v4/)**: Data fetching and state management.
- **[Firebase](https://firebase.google.com/)**: Hosting and authentication.
- **[JSON Web Tokens (JWT)](https://jwt.io/)**: Secure user data and authentication.

---

## Pages 📄

1. **Homepage**:
   - Recent Blogs section: Displays the 6 latest blogs.
   - Additional sections for an engaging user experience.

2. **Blog Details**:
   - Full content of the blog.
   - Option to comment (if not the author).

3. **Write Blog**: Create and publish a new blog post.

4. **Update Blog**: Update a blog (only available for the author).

5. **Wishlist**: View your saved blogs.

6. **Featured Blogs**: Top 10 blogs with the highest word count.

7. **Newsletter Subscription**: Subscribe to stay updated.

---