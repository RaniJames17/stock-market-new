# Netlify Deployment Guide

## Quick Deploy

Your stock market prediction app is now configured for Netlify deployment. Here are the deployment options:

### Option 1: Git Integration (Recommended)
1. **Commit all changes** to your repository:
   ```bash
   git add .
   git commit -m "Fix Netlify deployment configuration"
   git push origin main
   ```
2. Push your code to a GitHub repository
3. Go to [Netlify](https://app.netlify.com/)
4. Click "New site from Git"
5. Connect your GitHub repository
6. Netlify will automatically detect the settings from `netlify.toml`
7. Click "Deploy site"

**Note**: The build configuration now handles deprecation warnings automatically.

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
- **.nvmrc**: Specifies Node.js 18.20.4 LTS for consistent builds
- **public/_redirects**: Backup SPA redirect configuration
- **Build folder**: `build` (auto-created by `npm run build`)

## Build Command
```bash
npm ci --production=false --loglevel=error --no-audit --no-fund && npm run build
```

## Publish Directory
```
build
```

## Build Configuration
The build is configured to handle common deployment issues:
- **npm ci**: Uses lock file for consistent installs
- **npm install flags**: `--loglevel=error --no-audit --no-fund` to suppress warnings
- **Environment variables**: Set to treat warnings as non-fatal
- **Memory allocation**: Increased for large builds
- **Source maps**: Disabled for faster builds
- **Native dependencies**: Removed problematic gl package for Netlify compatibility

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

### Build Errors
- **Deprecated package warnings**: These are handled automatically by the build configuration
- **Node.js version**: Using Node.js 18.20.4 LTS (configured in netlify.toml and .nvmrc)
- **npm version**: Using npm 10 (matches Node.js 18.20.4 default)
- **Native dependencies**: Removed gl package that required system libraries not available in Netlify
- **Memory issues**: Build is configured with increased memory allocation

### Common Solutions
1. **If build fails with Node.js version issues**:
   - The build uses Node.js 18.20.4 LTS (specified in .nvmrc and netlify.toml)
   - npm version is set to 10 (matches Node.js 18.20.4 default)
   - This is a stable, tested version that works with React and the dependencies
   - Netlify will automatically use this version during build

2. **If build fails with native dependency issues**:
   - Removed gl package from devDependencies (caused gyp build failures)
   - Added environment variables to skip browser downloads
   - Uses npm ci for consistent dependency installation

3. **If build fails with dependency warnings**:
   - The build is configured to treat warnings as non-fatal
   - Environment variables are set to suppress unnecessary warnings
   - Build command uses `npm ci` for consistent dependency installation

4. **If you encounter module resolution errors**:
   - Check that all dependencies are listed in `package.json`
   - Verify that the lock file (`package-lock.json`) is committed to the repository

5. **Build timeout issues**:
   - The build is configured with increased memory allocation
   - Source maps are disabled to speed up the build

### Build Configuration Files
- **netlify.toml**: Main configuration with build settings and Node.js 18.20.4 LTS
- **.nvmrc**: Specifies Node.js version for consistent builds
- **.env**: Environment variables for React build
- **.npmrc**: npm configuration to suppress warnings
- **package.json**: Build scripts and dependencies
