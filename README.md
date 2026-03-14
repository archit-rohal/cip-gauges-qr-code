# Gauge Identification System

A lightweight, mobile-first React application for factory workers to quickly identify required inspection gauges using QR codes.

## 🎯 Overview

This application solves a critical factory floor problem: **workers spend too much time finding the right inspection gauges for each steel part.**

### How It Works

1. **Worker scans QR code** on gauge cabinet door
2. **Webpage loads** with part number from URL parameter
3. **Gauge list image displays** with clear, large text
4. **Worker inspects part** using correct gauges
5. **Returns gauges to cabinet** (as instructed on page)

### Example URLs

```
https://username.github.io/gauge-system/?part=EA2
https://username.github.io/gauge-system/?part=EB2
https://username.github.io/gauge-system/?part=FA2
```

## ✨ Key Features

- **Mobile-first design** — Optimized for factory phones in bright lighting
- **High contrast UI** — Readable in direct sunlight
- **Fast loading** — <1 second on 3G networks
- **Zero backend** — Static site, hosted on GitHub Pages
- **Data-driven architecture** — Add new parts without code changes
- **Lightweight bundle** — ~95KB JavaScript (gzipped)
- **Progressive enhancement** — Works offline (future PWA upgrade path)

## 🔧 Technology Stack

| Component | Technology |
|-----------|-----------|
| **Frontend Framework** | React 19 |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **Hosting** | GitHub Pages (static) |
| **Configuration** | JSON (gauges.json) |

## 📁 Project Structure

```
src/
├── components/
│   ├── GaugeDisplay.jsx      # Main component (reads URL params)
│   ├── NotFound.jsx          # 404 fallback
│   └── Loading.jsx           # Loading skeleton
├── data/
│   └── gauges.json           # Master part database
├── assets/
│   └── gauges/               # Gauge list images
│       ├── EA2.png
│       ├── EB2.png
│       └── ...
├── App.jsx                   # App wrapper
├── main.jsx                  # Entry point
└── App.css                   # Global styles + Tailwind

public/
└── index.html                # HTML shell
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Opens at http://localhost:3000

Test URL: `http://localhost:3000/?part=EA2`

### 3. Build for Production

```bash
npm run build
```

Creates optimized build in `dist/` folder

### 4. Preview Production Build

```bash
npm run preview
```

## 📋 Adding a New Part (No Code Required)

### Step 1: Prepare Gauge Image

1. Export gauge list as **PNG image**
2. Compress using ImageOptim or PNGQuant (target: <200KB)
3. Name it: `PARTCODE.png` (e.g., `HD3.png`)

### Step 2: Add to Project

1. Place image in `src/assets/gauges/PARTCODE.png`

2. Edit `src/data/gauges.json`:

```json
{
  "EA2": { /* existing entry */ },
  
  "HD3": {
    "image": "/assets/gauges/HD3.png",
    "description": "Gauge list for HD3 part",
    "note": "Return gauges to cabinet after inspection"
  }
}
```

### Step 3: Generate QR Code

1. Go to [QR.io](https://qr.io)
2. Enter URL: `https://username.github.io/gauge-system/?part=HD3`
3. Download PNG, print on sticker label
4. Attach to cabinet door

### Step 4: Test

Scan QR code with mobile phone → page should display gauge image

**That's it!** No rebuild, no recompilation, no React code changes.

## 🌐 GitHub Pages Deployment

### Prerequisites

- GitHub account
- Git installed locally
- Repository created: `username/cip-gauges-qr-code`

### Deployment Steps

#### Option A: Manual Deployment

```bash
# 1. Build the project
npm run build

# 2. Commit and push
git add dist/
git commit -m "Deploy production build"
git push origin main

# 3. Enable GitHub Pages
# Go to repo Settings > Pages
# Source: Deploy from a branch
# Branch: main, root directory
# Save
```

Site will be available at: `https://username.github.io/cip-gauges-qr-code/`

#### Option B: Automated Deployment (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Now every `git push` automatically deploys!

### Update Base URL (If Using Custom Domain)

In `vite.config.js`, change:

```javascript
base: '/cip-gauges-qr-code/', // Change repo name as needed
// OR
base: '/', // If using custom domain (yourdomain.com)
```

## 🎨 Customizing Styling

### Change Color Scheme

Edit `src/App.css` or use Tailwind utilities:

```css
/* Light theme (default) */
background-color: #ffffff;  /* White background */
color: #1f2937;            /* Dark text */
```

### Adjust Font Sizes (Industrial UX)

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    fontSize: {
      'base': ['1rem', { lineHeight: '1.6rem' }],
      '5xl': ['3rem', { lineHeight: '1.2' }],
      '6xl': ['3.75rem', { lineHeight: '1.2' }],
    }
  }
}
```

## 📊 Performance Optimization

### Image Optimization

Before committing images:

```bash
# Using ImageOptim (macOS)
open -a ImageOptim src/assets/gauges/

# Using PNGQuant (all platforms)
pngquant --speed 1 --quality 80-100 src/assets/gauges/*.png
```

## 🧪 Testing

### Test on Mobile Devices

1. Build project: `npm run build`
2. Start preview: `npm run preview`
3. Get local IP: `ipconfig getifaddr en0` (macOS)
4. On mobile browser: `http://<your-ip>:4173/?part=EA2`

## 🐛 Troubleshooting

### Images not loading?

1. Check image file exists in `src/assets/gauges/`
2. Verify filename in `gauges.json` matches exactly
3. Check browser console (F12) for 404 errors

### Part not found?

1. Check URL parameter: `?part=EA2` (case-sensitive)
2. Verify part exists in `gauges.json`

## 📚 Additional Resources

- [QR Code Generation Guide](QR_CODE_GENERATION.md)
- [Industrial UX Best Practices](INDUSTRIAL_UX_GUIDE.md)
- [Vite Documentation](https://vite.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

---

**Built with ❤️ for factory workers.**

Focus on inspecting great parts, not finding gauges.
