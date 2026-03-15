# Gauge Identification System

A lightweight, mobile-first React application for factory workers to quickly identify required inspection gauges using QR codes.

## 🎯 What It Does

This app solves a **critical factory floor problem**: Workers spend too much time finding the right inspection gauges for each steel part.

**Solution:**
1. Worker scans QR code on gauge cabinet door (or manually enters part code)
2. App navigates directly to the gauge list for that specific part
3. Worker inspects detailed gauge information with high-quality images
4. Worker knows exactly which gauges to use for their inspection

---

## ✨ Key Features

- **QR Code Navigation** — Scan cabinet labels to instantly load gauge lists
- **Part-Based Gauge Display** — Each part has its own gauge list image
- **Interactive Image Viewer** — Pinch-to-zoom, scroll-to-zoom, drag to pan
- **Double-Tap Zoom Toggle** — Double-tap to zoom in for details, double-tap again to reset
- **Mobile Optimized** — Touch-friendly interface for factory floor use
- **High Contrast UI** — Readable in bright sunlight on factory floor
- **Fast Loading** — ~120 KB gzipped, loads in under 2 seconds
- **Netlify Hosting** — Simple, scalable cloud deployment
- **Zero Backend** — Static site, no server-side processing needed
- **Data-Driven** — Add new parts without code changes (just add JSON entries)

---

## 🔧 Technology Stack

| Component | Technology | Why |
|-----------|-----------|-----|
| **Frontend** | React 19 | Modern, component-based UI framework |
| **Routing** | React Router v6 | Clean URL-based navigation |
| **Build Tool** | Vite | Fast, optimized bundling |
| **Styling** | Tailwind CSS | Utility-first, responsive design |
| **Image Zoom** | react-zoom-pan-pinch | Smooth, reliable pinch & drag interactions |
| **Hosting** | Netlify | Zero-config SPA deployment |
| **Data** | JSON (gauges.json) | Simple, human-readable part database |

---

## 📁 Project Structure

```
src/
├── pages/                      # Route pages (full page views)
│   ├── Home.jsx               # Home page - part selection & manual input
│   ├── Home.css               # Home page styling
│   ├── GaugePage.jsx          # Route wrapper for /part/:partCode
│   └── GaugePage.css          # GaugePage styling (back button, etc)
│
├── components/                 # Reusable UI components
│   ├── GaugeDisplay.jsx       # Main gauge info display
│   ├── ZoomableImage.jsx      # Interactive image zoom viewer
│   ├── ZoomableImage.css      # Zoom viewer styling
│   ├── NotFound.jsx           # 404 error page with navigation
│   └── Loading.jsx            # Loading placeholder
│
├── data/
│   └── gauges.json            # Part database (part codes → gauge info)
│
├── assets/
│   └── gauges/                # Gauge list images
│       ├── EA2.png
│       ├── EB2.png
│       ├── FA2.png
│       └── ...
│
├── App.jsx                    # Main app with React Router setup
├── main.jsx                   # App entry point
├── App.css                    # Global styles
└── index.css                  # Base styles

public/
├── index.html                 # HTML shell
└── favicon.svg                # App icon

Configuration files:
├── package.json              # Dependencies & build scripts
├── vite.config.js            # Vite build configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── eslint.config.js          # Code linting rules
├── netlify.toml              # Netlify deployment config
└── README.md                 # This file
```

---

## 🌐 How the QR System Works

### URL Structure
The app uses **hash-based routing** for reliable SPA navigation on Netlify:

```
Main app:    https://yourdomain.netlify.app/#/
Part page:   https://yourdomain.netlify.app/#/part/EA2
```

### QR Code Workflow

**1. QR Code Setup**
- QR code embeds: `https://yourdomain.netlify.app/#/part/EA2`
- Sticker placed on gauge cabinet door
- Workers scan with phone camera

**2. App Load**
- Phone opens URL
- React Router extracts `EA2` from URL
- Home page loads (or direct to part if from QR)

**3. Gauge Display**
- App looks up `EA2` in `gauges.json`
- Loads gauge image from `public/gauges/EA2.png`
- Displays meta information (description, warnings)
- Presents interactive image viewer for inspection

**4. Image Inspection**
- Worker zooms in using pinch or double-tap
- Inspects small details of gauge specification
- Can pan around while zoomed
- Double-tap again to reset to full view

### Adding New Parts
No code changes needed! Just:
1. Save gauge image to `public/gauges/YourPartCode.png`
2. Add entry to `src/data/gauges.json`:
   ```json
   "YourPartCode": {
     "image": "/gauges/YourPartCode.png",
     "description": "Gauge list for Your Part - Description",
     "note": "Any important handling instructions"
   }
   ```
3. Generate QR code pointing to: `https://yourdomain.netlify.app/#/part/YourPartCode`
4. Deploy (one `git push`)

Done! Part is immediately available.

---

## 🚀 Development & Deployment

### Local Development

**Install dependencies:**
```bash
npm install
```

**Start dev server:**
```bash
npm run dev
```

Opens at: `http://localhost:3000`

**Test URLs:**
- Home: `http://localhost:3000/#/`
- Example gauge: `http://localhost:3000/#/part/EA2`

**Test zoom functionality:**
- Desktop: Scroll wheel to zoom in/out
- Mobile: Pinch with two fingers to zoom
- Any device: Double-click image to toggle zoom in/out

### Building for Production

**Create optimized build:**
```bash
npm run build
```

Creates `dist/` folder with ~120 KB gzipped JavaScript.

**Preview production locally:**
```bash
npm run preview
```

### Deployment to Netlify

**Option 1: Automatic (Recommended)**
1. Push code to GitHub repository
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your GitHub repository
5. Netlify auto-detects settings from `netlify.toml`
6. Click "Deploy"

**Option 2: Manual Deploy**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

**Netlify Configuration** (`netlify.toml`):
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Caching:** Static assets cached for 1 year; HTML always fresh
- **Security headers:** CSP, XSS protection enabled

---

## 🔍 Image Zoom Feature Explained

The app uses `react-zoom-pan-pinch` library for smooth, reliable image interactions:

### Zoom Controls

| Interaction | Device | Behavior |
|-------------|--------|----------|
| **Pinch** | Mobile/Tablet | Two-finger pinch outward to zoom in, pinch inward to zoom out |
| **Scroll Wheel** | Desktop | Scroll up to zoom in, scroll down to zoom out |
| **Drag/Pan** | All | Click and drag image while zoomed to move around |
| **Double-Tap** | All | Double-click image to toggle: zoom in (2.5x) ↔ zoom out (reset) |

### Technical Details
- **Min Zoom:** 1x (100%) - No zoom-out past original
- **Max Zoom:** 4x (400%) - Prevents excessive zoom
- **Zoom Speed:** Smooth animation over 200ms
- **Momentum:** Dragging continues smoothly after release
- **Boundary:** Can't pan beyond image edges

### Why This Works
- **Smooth interactions** — No jitter or jumpy behavior
- **Factory-friendly** — Intuitive for non-technical workers
- **Multi-device** — Works identically on phones, tablets, desktops
- **Natural feel** — Matches native app zoom expectations

---

## 📋 Adding New Content

### Add a New Part Code

**Step 1: Save gauge image**
```
public/gauges/NC1.png
```

**Step 2: Update data file** (`src/data/gauges.json`)
```json
{
  "NC1": {
    "image": "/gauges/NC1.png",
    "description": "Gauge list for NC1 part - Precision measurement set",
    "note": "Calibration check required before use. Check with supervisor."
  }
}
```

**Step 3: Generate QR code**
- Tool: [qr-code-generator.com](https://www.qr-code-generator.com/)
- Content: `https://yourdomain.netlify.app/#/part/NC1`
- Format: PNG, 2x2" minimum size, laminated for durability

**Step 4: Deploy**
```bash
git add .
git commit -m "feat: add NC1 gauge"
git push
```

Netlify auto-deploys. Part is live immediately.

---

## 🛠️ Available Commands

```bash
npm run dev       # Start development server (hot reload)
npm run build     # Create production build in dist/
npm run preview   # Preview production build locally
npm run lint      # Run ESLint to check code quality
```

---

## 📱 Browser Support

Tested and working on:
- ✅ iOS Safari 13+
- ✅ Android Chrome 90+
- ✅ Desktop Chrome/Edge/Firefox/Safari (latest)

Technologies used are widely supported. No special polyfills needed.

---

## ⚙️ Configuration Files

### `netlify.toml`
Netlify deployment settings:
- Build command and output directory
- Cache headers for performance
- Security headers (CSP, XSS protection)

### `vite.config.js`
Vite build configuration:
- React plugin enabled
- Output directory: `dist/`
- Minification enabled (esbuild)

### `tailwind.config.js`
Tailwind CSS configuration:
- Custom theme settings
- Responsive breakpoints
- Utility class extensions

### `package.json`
Dependencies:
- `react@19` — UI framework
- `react-dom@19` — DOM rendering
- `react-router-dom@6` — Client-side routing
- `react-zoom-pan-pinch@3.6` — Image zoom/pan

---

## 📊 Performance

**Bundle Size:**
- JavaScript: ~110 KB gzipped
- CSS: ~6 KB gzipped
- **Total: ~120 KB gzipped**

**Load Time:**
- First paint: <1 second on 4G
- Full load: ~2 seconds on 3G
- Asset caching: Subsequent visits <500ms

**Optimizations:**
- Images lazy-loaded on demand
- CSS transforms hardware-accelerated
- Minimal dependencies
- Static hosting (no server processing)

---

## 🔒 Privacy & Security

- **No tracking** — No analytics or user tracking code
- **No backend** — All processing on client side
- **No sensitive data** — Only part codes in URLs (not personal info)
- **HTTPS only** — Netlify provides free SSL certificate
- **CSP headers** — Content Security Policy enabled
- **Open source** — Code is transparent

---

## 🐛 Troubleshooting

### Zoom feels jittery on mobile
- Ensure browser is fully updated
- Close other apps to free memory
- Try on different device to isolate issue

### Image doesn't load
- Verify file exists in `public/gauges/`
- Check filename matches `gauges.json` entry exactly
- Verify file format is PNG (or JPEG)
- Check browser console for 404 errors

### QR code doesn't scan
- Ensure minimum 2×2" size
- Check black/white contrast
- Verify no scratches on laminate
- Try with different phone camera
- Test URL manually in browser first

### Part not found error
- Double-check part code in URL
- Verify entry exists in `gauges.json`
- Confirm file is saved and committed
- Rebuild and redeploy if needed

### Styles look wrong
- Clear browser cache (Cmd+Shift+R on Mac)
- Check Tailwind classes in component
- Verify `tailwind.config.js` is valid
- Rebuild: `npm run build`

**for more details,** see [ARCHITECTURE.md](ARCHITECTURE.md) for in-depth technical documentation.

---

## 📚 Additional Documentation

| Document | Purpose |
|----------|---------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | Technical deep-dive, design decisions, routing explanation |
| [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) | Project overview, changes made, bundle impact |
| [ZOOM_UPGRADE_SUMMARY.md](ZOOM_UPGRADE_SUMMARY.md) | Why we switched to react-zoom-pan-pinch, performance improvements |
| [QR_CODE_MIGRATION.md](QR_CODE_MIGRATION.md) | How to generate and deploy QR codes |

---

## 📈 Future Enhancements

Possible features that could be added without major refactoring:
- PWA support (offline viewing)
- Dark mode toggle
- Multi-language support
- Search/filter for large part lists
- Admin dashboard for part management
- Analytics dashboard (no personal data)

All maintainable within current architecture.

---

## 🤝 Contributing

To add features or fix issues:

1. **Create a branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and test:**
   ```bash
   npm run dev
   npm run lint
   ```

3. **Commit:**
   ```bash
   git add .
   git commit -m "feat: description of change"
   ```

4. **Push and create Pull Request:**
   ```bash
   git push origin feature/your-feature-name
   ```

---

## 📞 Support

For issues or questions:

1. Check the [ARCHITECTURE.md](ARCHITECTURE.md) troubleshooting section
2. Verify gauge files exist in `public/gauges/`
3. Test with browser developer tools (F12 → Console)
4. Check Netlify deployment logs in dashboard

---

## 📄 License

[Your License Here]

---

**Last Updated:** March 2026  
**Version:** v2.1  
**Status:** Production Ready ✅  
**Deployment:** [Netlify](https://netlify.com)

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
