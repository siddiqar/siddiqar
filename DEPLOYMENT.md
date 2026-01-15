# Deployment Guide

This guide helps you deploy your NuxtJS portfolio site to various hosting platforms.

## Environment Variables

Before deploying, make sure to configure these environment variables on your hosting platform:

```env
APP_TITLE="Your Name"
APP_DESCRIPTION="Your Description"

USER_AVATAR="https://github.com/yourusername.png"
USER_NAME="yourusername"
USER_FULL_NAME="Your Full Name"
USER_EMAIL="your.email@example.com"
```

## Deployment Options

### Option 1: Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run generate`
3. Set publish directory: `.output/public`
4. Add environment variables in Netlify dashboard
5. Deploy!

### Option 2: Vercel

1. Import your GitHub repository to Vercel
2. Framework preset: Nuxt.js
3. Build command: `npm run generate`
4. Output directory: `.output/public`
5. Add environment variables in Vercel dashboard
6. Deploy!

### Option 3: GitHub Pages

1. Add a GitHub Actions workflow (see `.github/workflows/deploy.yml` example below)
2. Enable GitHub Pages in repository settings
3. Set source to GitHub Actions
4. Push to main branch to trigger deployment

#### Example GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run generate
        env:
          APP_TITLE: "Your Name"
          APP_DESCRIPTION: "Your Description"
          USER_AVATAR: "https://github.com/yourusername.png"
          USER_NAME: "yourusername"
          USER_FULL_NAME: "Your Full Name"
          USER_EMAIL: "your.email@example.com"
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .output/public
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### Option 4: Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run generate`
3. Set build output directory: `.output/public`
4. Add environment variables in Cloudflare dashboard
5. Deploy!

## Custom Domain

After deployment, you can add a custom domain through your hosting platform's dashboard.

## Notes

- The site will automatically fetch your public GitHub repositories when deployed
- No GitHub API token is required for public repositories
- The site is fully static and can be hosted anywhere that serves HTML/CSS/JS
