[<img alt="Deployed with FTP Deploy Action" src="https://img.shields.io/badge/Deployed With-FTP DEPLOY ACTION-%3CCOLOR%3E?style=for-the-badge&color=0077b6">](https://github.com/SamKirkland/FTP-Deploy-Action)

# 🚀 scrapnity

A modern frontend project built with **Tanstack Roter (Vite) + React + TypeScript**, enhanced with the **React Compiler**, and automated deployment using **GitHub Actions**.

---

## 📦 Tech Stack

- ⚡ Tanstack Roter (Vite)
- ⚛️ React
- 🟦 TypeScript
- 🧠 React Compiler
- 📦 pnpm (package manager)
- 🔁 GitHub Actions (CI/CD)
- 🌐 FTP Deployment (Hostinger)

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/indiglobe/scrapnity.git
cd scrapnity
```

### 2. Install Dependencies

This project uses **pnpm**, so make sure it's installed:

```bash
npm install -g pnpm
```

Then install dependencies:

```bash
pnpm install
```

### 3. Start Development Server

```bash
pnpm dev
```

---

## 🏗️ Build

To generate production files:

```bash
pnpm build
```

Preview the build:

```bash
pnpm preview
```

---

## 🤖 Deployment (Automated)

⚠️ **Important for new developers:**

You **DO NOT** need to manually upload build files to the server.

Deployment is fully automated using **GitHub Actions**.

### 🔄 How It Works

- On push to the configured branch (e.g. `main`)
- GitHub Actions runs the build
- Generated files (`dist/`) are automatically uploaded to the server

This is handled using:

```yaml
uses: SamKirkland/FTP-Deploy-Action@v4.3.6
```

### 🌐 Hosting

- Deployment target: **Hostinger (FTP server)**
- Files are uploaded directly via FTP during CI/CD

---

## 📁 Project Structure

```
├── .github/
│   └── workflows/  # GitHub Actions workflows
├── src/            # Application source code
├── public/         # Static assets
├── dist/           # Build output (auto-generated)
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 📁 In depth explanation of `src`

```
└── src/
    ├── components/  # Self explanatory
    └── routes/       # Routes invoved in the projects
```

| Route                       | File                                          |
| --------------------------- | --------------------------------------------- |
| `/`                         | `/routes/index.tsx`                           |
| `/services`                 | `/routes/services/index.tsx`                  |
| `/services/{dynamic-value}` | `/routes/services/$service-details/index.tsx` |

---

## ⚙️ GitHub Actions (CI/CD)

A typical workflow:

1. Install dependencies using pnpm
2. Build the project
3. Deploy `dist/client` to server via FTP

---

## 📌 Notes for Developers

- ❌ Do NOT manually upload files to the server
- ❌ Do NOT edit anything inside the `dist/client` folder
- ✅ Always push changes to the repository
- ✅ Deployment will happen automatically

---

## 🔐 Environment Variables

If your project uses environment variables:

- Create a `.env` file locally
- Add required variables
- Ensure secrets are configured in GitHub Actions for deployment

---

## 🧩 Useful Scripts

```json
{
  "dev": "vite dev --port 3000",
  "build": "vite build",
  "preview": "vite preview"
}
```

---

## 👨‍💻 Contributing

1. Create a new branch
2. Make your changes
3. Push to the repository
4. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software.

The software is provided "as is", without warranty of any kind.
