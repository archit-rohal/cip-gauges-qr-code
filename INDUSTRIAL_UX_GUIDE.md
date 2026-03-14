# Industrial UX Best Practices for Factory Environment

Design guidelines for creating user interfaces that work reliably in manufacturing facilities.

---

## 1. 📺 Readability in Bright, Harsh Lighting

### Problem
Factory environments have extremely bright lighting (warehouse fluorescents, direct sunlight through windows). Standard computer screens designed for office use are hard to read.

### Solution: High Contrast Design

#### Color Contrast Requirements

**WCAG AAA Compliance** (recommended for factory):
- Text to background: **7:1 contrast ratio minimum**
- Large text (18px+): **4.5:1 ratio acceptable**

#### Recommended Color Palette

**Light Theme** (recommended for outdoor/bright spaces):

```css
Background: #ffffff (white)           /* Maximum brightness */
Text: #1f2937 (dark gray)            /* High contrast */
Accent: #1e40af (blue)               /* Accessible blue */
Warning: #dc2626 (red)               /* High contrast red */
Note: #fbbf24 (yellow)               /* Warning/info */
```

**Dark Theme** (alternative for indoor factories):

```css
Background: #1f2937 (dark gray)      /* Reduces eye strain */
Text: #ffffff (white)                /* High contrast */
Accent: #3b82f6 (light blue)         /* Accessible */
Warning: #ef4444 (bright red)        /* High contrast */
```

#### Why This Matters

- **White background** reflects light, easier to read in sunlight
- **Dark text** on light background = highest contrast
- **Avoid pastels** — too light, low contrast
- **Avoid gray on gray** — completely unreadable in bright light
- **Avoid green/red combinations** — colorblind workers can't distinguish

#### Testing in Bright Light

1. Test in actual factory lighting conditions
2. Stand 1-2 meters from screen
3. Look from the side (not direct angle)
4. Test in bright sunlight (if outdoor work)
5. Never test only under office desk lamps

---

## 2. 📏 Text & Button Sizing for Gloved Hands

### Problem
Workers wear gloves or may be viewing from distance. Standard web font sizes are too small.

### Solution: Large, Touch-Friendly Interface

#### Typography Guidelines

| Element | Size | Mobile | Desktop | Why |
|---------|------|--------|---------|-----|
| **Heading** (Part number) | 36-48px | Yes | Yes | Visible from 1-2m away |
| **Body Text** | 16-18px min | Yes | Yes | Readable for older workers |
| **Small Notes** | 14px min | Yes | No | Optional, secondary text |
| **Button Text** | 16-18px | Yes | Yes | Clear call-to-action |

#### Code Example

```jsx
// Part number heading — CRITICAL visibility
<h1 className="text-5xl md:text-6xl font-bold">
  PART: {partCode}
</h1>

// Body text — readable for all
<p className="text-lg md:text-xl">
  {description}
</p>

// Small notes — secondary information
<p className="text-sm md:text-base">
  Optional note
</p>
```

#### Tailwind CSS Setup

```javascript
// tailwind.config.js
theme: {
  extend: {
    fontSize: {
      'base': ['1rem', { lineHeight: '1.6rem' }],     // 16px
      'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
      'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
      '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
      '5xl': ['3rem', { lineHeight: '1.2' }],         // 48px
      '6xl': ['3.75rem', { lineHeight: '1.2' }],      // 60px
    }
  }
}
```

#### Touch Target Sizing

**Minimum button/link size**: **44 × 44 pixels**

This is the iOS accessibility standard and accommodates:
- Gloved fingers
- Older workers with motor control issues
- Accidental taps

```jsx
// Properly sized touch target
<a 
  href="..."
  className="inline-block px-6 py-3 min-h-11 min-w-11 text-lg font-bold"
>
  Scan Again
</a>
```

---

## 3. 🎯 Minimal Cognitive Load

### Problem
Factory workers are focused on production. Distracting interfaces slow them down. Information overload causes mistakes.

### Solution: One Task Per Screen

#### Design Principle: Keep It Simple

**Each page should answer ONE question**:
- "What gauges do I need for part EA2?" ✅ Clear goal
- "What is the factory network password?" ❌ Wrong app
- "How do I calibrate this gauge?" ❌ Too complex

#### Layout Structure

```
┌─────────────────────────────────────┐
│ PART: EA2                          │  Header: Only part number
│                                     │
│          [GAUGE IMAGE]              │  Content: Single, centered element
│          500x400px                  │
│                                     │
│ ⚠ Important: Return gauges...      │  Warning: Highlighted, brief
└─────────────────────────────────────┘
```

#### What to AVOID

- Sidebars or navigation menus
- Multiple columns of information
- Dropdown menus or complex forms
- Auto-playing videos or animations
- Ads, banners, or pop-ups
- Hover effects or tooltips
- Countdown timers
- Required account login
- Captcha or security questions

#### Information Architecture

```jsx
// ✅ GOOD: Clear hierarchy
<div>
  <h1>Part Number</h1>          {/* Critical info */}
  <img src={...} />              {/* Primary content */}
  <p>Info</p>                    {/* Supporting info */}
  <div>Optional note</div>       {/* Secondary info */}
</div>

// ❌ BAD: Confusing navigation
<nav><a>Home</a><a>Parts</a></nav>
<div>
  <h1>Gauge System v2.1</h1>
  <p>Released 2024-03-14</p>
  <button>Settings</button>
  <dropdown>
    <a>Filter by category</a>
    <a>View history</a>
  </dropdown>
</div>
```

---

## 4. 🚫 Error Handling — Blame-Free Design

### Problem
Errors should help users fix problems, not make them feel stupid.

### Solution: Clear, Constructive Error Messages

#### Error Message Formula

```
❌ BAD: "404 Not Found"
❌ BAD: "Invalid part parameter"
❌ BAD: "HTTP Error 500"

✅ GOOD: "Part not found"
✅ GOOD: "Check that the QR code is correct and try again"
✅ GOOD: "If this problem persists, contact your supervisor"
```

#### Error Page Design

```jsx
// Good error page for factory
<div className="bg-red-50 p-8 text-center">
  <div className="text-6xl font-bold text-red-900 mb-4">⚠</div>
  
  <h1 className="text-4xl font-bold text-red-900 mb-4">
    Part Not Found
  </h1>
  
  <p className="text-2xl text-red-700 mb-6">
    {partCode}  {/* Show what worker searched for */}
  </p>
  
  <p className="text-lg text-gray-700 mb-8">
    Please check that the QR code is correct and try scanning again.
  </p>
  
  <a href="/" className="px-8 py-4 bg-blue-600 text-white text-xl">
    Scan Again
  </a>
</div>
```

#### Key Principles

1. **Show what went wrong** — Echo back the part number
2. **Acknowledge mistake** — Don't blame worker
3. **Provide next step** — "Try scanning again" or "Contact supervisor"
4. **Use simple language** — No technical jargon
5. **Large, clear text** — Easy to read
6. **Visual indicator** — Icon or color showing it's an error

---

## 5. 📱 Mobile-First Responsive Design

### Problem
Factory workers use phones of all sizes. App must work on small screens AND tablets.

### Solution: Test on Real Devices

#### Target Device Matrix

| Device Type | Screen Size | Examples | Priority |
|-----------|-----------|----------|----------|
| **Small Phone** | 320-375px | iPhone SE, Redmi Note 8 | P0 (HIGH) |
| **Medium Phone** | 375-428px | iPhone 12, Samsung A10 | P0 (HIGH) |
| **Large Phone** | 428-768px | iPhone 14 Pro Max | P1 (MED) |
| **Tablet** | 768px+ | iPad Mini, Samsung Tab A | P1 (MED) |

#### Responsive Breakpoints (Tailwind CSS)

```javascript
// tailwind.config.js
theme: {
  screens: {
    'sm': '320px',    // Small phones
    'md': '428px',    // Medium phones (iOS breakpoint)
    'lg': '768px',    // Tablets
    'xl': '1024px',   // Desktops (rarely used in factory)
  }
}
```

#### CSS Implementation

```jsx
// ✅ GOOD: Mobile-first with responsive scaling
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
  PART: {code}
</h1>

<img 
  className="max-w-full max-h-96 md:max-h-full object-contain"
  src={...}
/>

<p className="text-base md:text-lg lg:text-xl p-4 md:p-6">
  {description}
</p>
```

#### Portrait-Only Orientation (Recommended)

For factory workers using phone in one hand:

```html
<!-- index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

<!-- CSS to prevent landscape -->
<style>
  @media (orientation: landscape) {
    body {
      transform: rotate(90deg);
      transform-origin: center;
    }
  }
</style>
```

Or force portrait in React:

```javascript
// useEffect hook to lock orientation
useEffect(() => {
  if (window.screen?.orientation) {
    window.screen.orientation.lock('portrait-primary');
  }
}, []);
```

---

## 6. ⚡ Performance & Perceived Speed

### Problem
Factory WiFi may be unreliable (2G/3G). Slow loading causes impatience.

### Solution: Super-Fast Loading + Loading States

#### Performance Targets

| Metric | Target | Why |
|--------|--------|-----|
| **First Paint** | <500ms | Feel of instant response |
| **First Contentful Paint (FCP)** | <1s | Part number visible |
| **Largest Contentful Paint (LCP)** | <2s | Image loaded |
| **Interaction Ready** | <3s | Page fully interactive |

#### Loading Skeleton

Show placeholder while loading:

```jsx
// While loading
<div className="animate-pulse">
  <div className="h-12 bg-gray-300 rounded w-3/4 mb-4"></div>
  <div className="h-96 bg-gray-300 rounded mb-4"></div>
</div>

// After loading
<img src={...} alt="..." loading="lazy" />
```

#### Image Optimization

```bash
# Compress PNG images before adding to repo
pngquant --speed 1 --quality 80-100 src/assets/gauges/*.png

# Target: <200KB per image
# Result: Fast loading even on slow networks
```

#### Browser Caching Headers

GitHub Pages automatically sets good cache headers:

```
Cache-Control: public, max-age=3600  # 1 hour
```

---

## 7. ♿ Accessibility for All Workers

### Problem
Some workers may have:
- Vision impairments (older workers)
- Motor control issues (tremor, arthritis)
- Color blindness
- Hearing loss

### Solution: Inclusive Design

#### Color Accessibility

**Avoid these problematic combinations**:
- Green + Red (color blindness)
- Light gray + White (low contrast)
- Blue + Purple (hard to distinguish)

**Use**:
- Black + White (maximum contrast)
- Dark blue + Yellow (high contrast)
- Dark gray + Orange (accessible)

#### Keyboard Navigation

```jsx
// All interactive elements must be keyboard accessible
<a href="..." role="button" className="px-6 py-3">
  Scan Again
</a>

// Or better: use buttons
<button onClick={...}>
  Scan Again
</button>
```

#### Large Touch Targets

Already covered in Section 2, but repeating:
- **Minimum 44×44px** for all buttons/links
- Accommodates older workers, gloved hands, shaky hands

#### Alt Text for Images

```jsx
<img 
  src={gauge.image}
  alt={`Gauge list for part ${partCode}`}  // Descriptive
  loading="lazy"
/>
```

#### High Contrast Mode Support

```css
/* Support Windows High Contrast mode */
@media (prefers-contrast: more) {
  body {
    color: #000000;
    background-color: #ffffff;
  }
}
```

---

## 8. 🔧 Testing in Factory Environment

### Before Deployment

#### Step 1: Test with Real Workers (Critical!)

1. Show interface to 3-5 actual factory workers
2. Observe them using it **without guidance**
3. Measure time to:
   - Scan QR code
   - Locate gauge image
   - Understand instructions
4. Ask if text is readable
5. Document issues

#### Step 2: Lighting Conditions

Test in:
- ✅ Bright warehouse (fluorescent lights)
- ✅ Direct sunlight (window/outdoor)
- ✅ Dim area (under machinery cover)
- ✅ Early morning/late afternoon (low angle sun)

#### Step 3: Device Testing

Test on:
- At least 1 iPhone model
- At least 1 Android phone
- Older device (5+ years old) if possible
- Newest device to ensure forward compatibility

#### Step 4: Network Conditions

Simulate factory WiFi:

```javascript
// Chrome DevTools > Network > Throttle
// Test on:
// - Fast 3G
// - Slow 3G
// - Offline (for future PWA)
```

#### Step 5: Accessibility Features

- [ ] Can enlarge text to 200% and still see all content?
- [ ] Works with screen reader enabled?
- [ ] All buttons reachable with keyboard?
- [ ] Color blindness: Would colorblind person understand page?

### Post-Deployment Monitoring

Track these metrics:

```javascript
// Example: Add simple analytics
window.addEventListener('load', () => {
  navigator.sendBeacon('/api/page_load', {
    part: new URLSearchParams(window.location.search).get('part'),
    loadTime: performance.now(),
    device: navigator.userAgent,
  });
});
```

---

## 9. 🎨 Color Palette Reference

### Recommended (High Contrast)

```css
/* Light Theme (Factory Default) */
--bg-primary: #ffffff;      /* White background */
--text-primary: #1f2937;    /* Dark gray text */
--text-secondary: #6b7280;  /* Medium gray */
--accent: #1e40af;          /* Blue buttons */
--warning: #dc2626;         /* Red errors */
--success: #16a34a;         /* Green success */
--info: #fbbf24;            /* Yellow notes */

/* Dark Theme (Alternative) */
--bg-primary: #1f2937;      /* Dark background */
--text-primary: #ffffff;    /* White text */
--accent: #3b82f6;          /* Light blue */
--warning: #ef4444;         /* Bright red */
```

### Usage

```jsx
// Semantic color usage
<div className="bg-white text-gray-900">              {/* Primary content */}
<div className="text-gray-600">                      {/* Secondary text */}

<button className="bg-blue-600 text-white">         {/* Primary action */}
<div className="bg-yellow-50 border-l-4 border-yellow-500"> {/* Warning */}
<div className="bg-red-50">                          {/* Error */}
```

---

## 10. 📐 Spacing & Layout

### Whitespace Principles

Too little whitespace = cluttered, hard to scan
Too much whitespace = wasted screen real estate on small phones

#### Recommended Spacing

```css
/* Mobile (default) */
--space-4: 1rem;    /* Standard padding */
--space-6: 1.5rem;  /* Generous padding */

/* Responsive */
.container {
  padding: 1rem;      /* Mobile: 16px */
}

@media (min-width: 768px) {
  .container {
    padding: 1.5rem;  /* Tablet: 24px */
  }
}
```

#### Layout Grid

```jsx
// Full-screen, centered layout
<div className="flex flex-col h-screen w-full bg-white">
  {/* Header: 10% */}
  <header className="mb-6">
    <h1>PART: EA2</h1>
  </header>
  
  {/* Content: 70% */}
  <main className="flex-1 flex justify-center items-center">
    <img src={...} />
  </main>
  
  {/* Footer: 20% */}
  <footer className="text-sm text-gray-500 pt-4 border-t">
    Scan another QR code...
  </footer>
</div>
```

---

## 11. 📋 Before & After Comparison

### ❌ BEFORE (Bad Industrial UX)

```jsx
// Small text, cluttered, low contrast
<div style={{backgroundColor: '#f0f0f0'}}>
  <nav>
    <a href="/">Home</a>
    <a href="/parts">Parts</a>
    <a href="/settings">Settings</a>
    <dropdown>
      <a>Filter 1</a>
      <a>Filter 2</a>
    </dropdown>
  </nav>
  
  <div>
    <h1 style={{fontSize: '14px', color: '#999'}}>
      Gauge System v2.1
    </h1>
    <p style={{fontSize: '12px'}}>
      Part number: <input type="text" />
    </p>
    <button style={{padding: '4px'}}>Search</button>
  </div>
  
  <footer>
    <p style={{fontSize: '9px'}}>
      Released under MIT License. Contact admin@...
    </p>
  </footer>
</div>
```

**Problems**:
- Text too small (9px-14px)
- Low contrast (gray text on light gray)
- Too many navigation options
- Small buttons (4px padding)
- Requires typing (no QR code)
- Cluttered with version info

### ✅ AFTER (Good Industrial UX)

```jsx
// Large text, clear purpose, high contrast
<div className="flex flex-col h-screen w-full bg-white p-4">
  {/* No navigation — single purpose */}
  
  <header className="mb-6">
    <h1 className="text-6xl font-bold text-gray-900">
      PART: <span className="text-blue-600">{part}</span>
    </h1>
  </header>
  
  <main className="flex-1 flex justify-center items-center mb-6">
    <img src={gauge.image} alt="..." loading="lazy" />
  </main>
  
  <footer className="text-center text-xs text-gray-500">
    <p>Scan another QR code to view a different gauge list</p>
  </footer>
</div>
```

**Improvements**:
- Text sizes: 36px-48px (headings), 16-18px (body)
- High contrast: white background, dark text
- Single purpose: scan QR code, see gauge image
- Touch-friendly buttons (coming from QR code action)
- No typing required
- Minimal footer (helpful hint)

---

## 12. 🏭 Real-World Deployment Checklist

Before going live:

- [ ] **Lighting Test**: Readable in bright warehouse light? ✅
- [ ] **Worker Test**: 3-5 workers can use without help? ✅
- [ ] **Device Test**: Works on 3 different phones? ✅
- [ ] **Contrast Test**: WCAG AAA 7:1 contrast ratio? ✅
- [ ] **Font Size Test**: Heading ≥36px, body ≥16px? ✅
- [ ] **Touch Target Test**: All buttons ≥44×44px? ✅
- [ ] **Network Test**: Loads in <1s on 3G? ✅
- [ ] **Error Test**: Non-existent part shows helpful message? ✅
- [ ] **Mobile Test**: Works on small (320px) and large (768px) screens? ✅
- [ ] **Accessibility Test**: Can enlarge to 200%? Keyboard nav works? ✅
- [ ] **QR Code Test**: All QR codes scan successfully? ✅
- [ ] **Offline Test**: Page cached for airplane mode? ✅

---

## Summary: Golden Rules

1. **Make it VISIBLE** — High contrast, large text, bright environment
2. **Make it SIMPLE** — One task per screen, minimal navigation
3. **Make it FAST** — <1s load time, cached images
4. **Make it FORGIVING** — Helpful errors, no blame
5. **Make it ACCESSIBLE** — Works for all workers
6. **Make it TESTABLE** — Test with real workers in real lighting
7. **Make it MAINTAINABLE** — Simple code, clear structure

**Remember**: Factory workers are focused on production, not technology. The app should be so intuitive it disappears. Workers should think "I found the gauges" not "I learned to use new software."

---

**Test early. Test often. Test with real workers. Success is when they say "this just works."**
