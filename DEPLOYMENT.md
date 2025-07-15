# Netlify Deployment Guide

## Quick Deploy

Your stock market prediction app is now configured for Netlify deployment. Here are the deployment options:

### Option 1: Git Integration (Recommended)
1. Push your code to a GitHub repository
2. Go to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Netlify will automatically detect the settings from `netlify.toml`
6. Click "Deploy site"

### Option 2: Drag & Drop
1. Run `npm run build` in your project directory
2. Go to [Netlify](https://app.netlify.com/)
3. Drag and drop the `build` folder to the deployment area
4. Your site will be deployed instantly

### Option 3: Netlify CLI
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run `npm run build`
3. Run `netlify deploy --dir=build --prod`

## Configuration Files

- **netlify.toml**: Main configuration file with build settings, redirects, and security headers
- **public/_redirects**: Backup SPA redirect configuration
- **Build folder**: `build` (auto-created by `npm run build`)

## Build Command
```bash
npm run build
```

## Publish Directory
```
build
```

## Environment Variables
If you need to add environment variables:
1. In Netlify dashboard, go to Site settings → Environment variables
2. Add your variables (e.g., API keys, etc.)

## Features Included
- ✅ SPA routing support
- ✅ Security headers (XSS protection, frame options, etc.)
- ✅ Static asset caching
- ✅ Build optimization
- ✅ CI/CD automatic deployments (with Git integration)

## Domain Configuration
After deployment, you can:
- Use the provided Netlify subdomain (e.g., `amazing-name-123456.netlify.app`)
- Configure a custom domain in Site settings → Domain management

## Troubleshooting
- If you encounter build errors, check Node.js version compatibility
- Ensure all dependencies are properly installed
- Check the Netlify build logs for specific error messages
