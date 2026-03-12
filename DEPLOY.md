# Deploy to Vercel

## Option 1: Vercel CLI (no Git needed)

From the project folder in a terminal:

```bash
# One-time: log in (opens browser)
npx vercel login

# Deploy to production
npx vercel --prod
```

Or use the npm script:

```bash
npm run deploy
```

First run will ask you to link the project; follow the prompts. Your site will be live at a URL like `https://your-project.vercel.app`.

---

## Option 2: Git + Vercel (auto-deploy on push)

1. **Install Git** if needed: https://git-scm.com/download/win  
2. **Create a repo** on GitHub, then in this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. **Connect to Vercel**: https://vercel.com → Import your GitHub repo → Deploy.  
   Every `git push` to `main` will deploy automatically.

---

**Note:** Your `vercel.json` is already set for a static site. No build step required.
