# Gauge Identification System

A lightweight, mobile-first React application for factory workers to quickly identify required inspection gauges using QR codes.

## 🎯 Overview

This application solves a critical factory floor problem: **workers spend too much time finding the right inspection gauges for each steel part.**

### How It Works

1. **Worker scans QR code** on gauge cabinet door (or manually enters part code)
2. **App navigates to gauge page** with part number from URL
3. **Gauge list image displays** with clear, large text
4. **Worker can zoom in** on the image for detailed inspection
5. **Returns gauges to cabinet** (as instructed on page)

### Example URLs (Hash-Based Routing)

```
https://gauges.mycompany.netlify.app/#/
https://gauges.mycompany.netlify.app/#/part/EA2
https://gauges.mycompany.netlify.app/#/part/EB2
```

## ✨ Key Features

- **Mobile-first design** — Optimized for factory phones in bright lighting
- **Image zoom support** — Pinch-to-zoom on mobile, scroll on desktop
- **High contrast UI** — Readable in direct sunlight
- **Fast loading** — ~116KB JavaScript (gzipped) on Netlify
- **Zero backend** — Static site, can be hosted anywhere
- **Data-driven architecture** — Add new parts without code changes
- **Hash-based routing** — Works without server configuration
- **Lightweight bundle** — Minimal external dependencies

## 🔧 Technology Stack

| Component | Technology | Notes |
|-----------|-----------|-------|
| **Frontend Framework** | React 19 | Latest stable version |
| **Routing** | React Router v6 | Hash-based for Netlify |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **Build Tool** | Vite | Fast, modern bundler |
| **Image Zoom** | Custom React Hook | Zero external dependencies |
| **Hosting** | Netlify | Optimized SPA deployment |
| **Configuration** | JSON (gauges.json) | No-code part management |

## 📁 Project Structure

```
src/
├── pages/                       # Route pages
│   ├── Home.jsx                # Part selection & manual input
│   └── GaugePage.jsx           # Gauge detail view
├── components/                  # Reusable components
│   ├── GaugeDisplay.jsx        # Gauge view logic
│   ├── ZoomableImage.jsx       # Zoom-enabled image component
│   ├── NotFound.jsx            # 404 fallback
│   └── Loading.jsx             # Loading skeleton
├── hooks/
│   └── useImageZoom.js         # Custom zoom logic hook
├── data/
│   └── gauges.json             # Master part database
├── assets/
│   └── gauges/                 # Gauge list images (EA2.png, etc.)
└── App.jsx                     # Router setup

public/ → Static files
netlify.toml → Build configuration for Netlify
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

Installs React Router v6 and all other dependencies.

### 2. Start Development Server

```bash
npm run dev
```

Opens at `http://localhost:3000`

**Test URLs:**
- Home: `http://localhost:3000/#/`
- Gauge: `http://localhost:3000/#/part/EA2`

**Test Zoom:** 
- Scroll wheel (desktop) or pinch (mobile) on the gauge image

### 3. Build for Production

```bash
npm run build
```

Creates optimized build in `dist/` folder (~116 KB gzipped).

### 4. Preview Production Build

```bash
npm run preview
```

Test the production bundle locally before deploying.

## 🌐 Deployment to Netlify

### Option 1: GitHub + Netlify (Recommended)
1. Push your code to a GitHub repository
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect GitHub repository
5. Netlify auto-detects settings from `netlify.toml`
6. Deploy!

### Option 2: Netlify CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

**No additional configuration needed** — hash-based routing works out of the box.

## 📋 Adding a New Part (No Code Required)

### 1. Add Image File
Place gauge image in: `public/gauges/`

Example: `public/gauges/HC2.png`

### 2. Update gauges.json

```json
{
  "HC2": {
    "image": "/gauges/HC2.png",
    "description": "Gauge list for HC2 part - Your description",
    "note": "Any important handling instructions"
  }
}
```

### 3. Generate QR Code
Create QR code pointing to: `https://yourdomain.netlify.app/#/part/HC2`

Tools: [qr-code-generator.com](https://www.qr-code-generator.com/) (free)

### 4. Deploy
```bash
git push  # Netlify auto-deploys on push
```

Done! Part is immediately available.

## 🖼️ Image Zoom Feature

### How It Works
- **Touch devices:** Pinch two fingers to zoom in/out
- **Mouse:** Scroll wheel to zoom
- **All devices:** Use +/− buttons
- **Reset:** Click ↺ button to return to original size
- **Hint:** First load shows "Pinch or scroll to zoom" tip

### Technical Details
See [ARCHITECTURE.md](ARCHITECTURE.md) for:
- Custom `useImageZoom` hook explanation
- Touch event handling
- Performance optimizations
- Browser compatibility

## 🎯 Routing Architecture

The app uses **hash-based routing** with React Router:

| Route | Purpose |
|-------|---------|
| `/#/` | Home page — part selection |
| `/#/part/:partCode` | Gauge detail page |
| Any other route | Redirects to home |

**Why hash-based?**
- Works on Netlify without server configuration
- Direct page loads work perfectly
- Mobile browsers handle hashes correctly
- Backward compatible with eventual migration

For details, see [ARCHITECTURE.md](ARCHITECTURE.md#2-routing-system-hash-based-with-react-router)

## ⚡ Performance

### Bundle Size
- **JavaScript:** ~110 KB
- **CSS:** ~6 KB
- **Gzipped:** ~116 KB
- **Load time:** <2 seconds on 3G

### Optimizations
- ✅ Image lazy loading
- ✅ CSS transforms (hardware-accelerated)
- ✅ Minimal dependencies (only React Router added)
- ✅ Netlify asset caching configured

### Mobile Friendly
- Large touch targets (48px minimum)
- Responsive grid layout
- Pinch-to-zoom gesture support
- Works offline-ready (PWA upgrade path)

## 🛠️ Development

### Available Scripts
```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### Project Standards
- **Component files:** `.jsx` with clear single responsibility
- **Styling:** Tailwind CSS + component-scoped CSS modules when needed
- **State:** React hooks (useState, useEffect, useCallback)
- **Custom hooks:** Reusable, testable logic extraction
- **Error handling:** Graceful fallbacks, 404 pages

## 📖 Documentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)** — In-depth technical documentation
  - Routing strategy explanation
  - Custom zoom hook design
  - Performance considerations
  - Migration guide

- **[INDUSTRIAL_UX_GUIDE.md](INDUSTRIAL_UX_GUIDE.md)** — UX principles (existing)

- **[QR_CODE_GENERATION.md](QR_CODE_GENERATION.md)** — How to create QR codes (existing)

## 🔄 Future Enhancements

Possible future improvements (without breaking changes):
- PWA support (offline capability)
- Search/filter for large part lists
- Touch gesture customization
- Dark mode support
- Multi-language support
- Admin dashboard for part management (separate)

All can be added without major refactoring.

## 📞 Support

For issues or questions:
1. Check [ARCHITECTURE.md](ARCHITECTURE.md#-troubleshooting) troubleshooting section
2. Review gauge image file paths in `public/gauges/`
3. Verify QR code URLs match your Netlify domain
4. Test on different browsers/devices

## 📄 License

[Your License Here]

---

**Last Updated:** March 2026  
**Latest Version:** v2.0 (Netlify + React Router + Image Zoom)

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
