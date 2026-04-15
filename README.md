## React + Vite Portfolio Template (JavaScript)

A clean, accessible, and responsive portfolio starter built with React and Vite (JavaScript). It includes routing, a few core components, global styles with light/dark theme toggle, sample data, and developer tooling.

### Features
- React 18 + Vite
- React Router with pages: Home, Projects, About, Contact
- Components: Navbar, Footer, ProjectCard, SocialLinks, ThemeToggle
- Global CSS with CSS variables and responsive layout
- ESLint + Prettier preconfigured

### Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   npm run preview
   ```

### Customize
- Update your name, links, and email in:
  - `src/components/Footer.jsx`
  - `src/components/SocialLinks.jsx`
  - `src/pages/Contact.jsx`
- Update project cards in `src/data/projects.js`
- Tweak colors/spacing in `src/styles/global.css`
- Change site title/icon in `index.html`

### Project Structure
```
.
├─ index.html
├─ package.json
├─ vite.config.js
├─ .eslintrc.json
├─ .prettierrc
├─ .gitignore
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ styles/global.css
│  ├─ assets/placeholder.svg
│  ├─ data/projects.js
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  ├─ ThemeToggle.jsx
│  │  ├─ Footer.jsx
│  │  ├─ SocialLinks.jsx
│  │  └─ ProjectCard.jsx
│  └─ pages/
│     ├─ Home.jsx
│     ├─ Projects.jsx
│     ├─ About.jsx
│     └─ Contact.jsx
```

### License
MIT — feel free to use and adapt for your portfolio.


