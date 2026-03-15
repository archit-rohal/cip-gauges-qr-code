# QR Code Generation & Printing Guide

Complete guide to generating, testing, and printing QR codes for the Gauge Identification System.

## 📱 QR Code Basics

### What is a QR Code?

A QR (Quick Response) code is a 2D barcode that can be scanned by smartphones. It encodes a URL that opens when scanned.

### QR Code Format for This System

```
URL: https://username.github.io/cip-gauges-qr-code/?part=EA2
     └─ Base URL         └─ Part number parameter
```

Each part number (EA2, EB2, FA2, etc.) gets its own unique QR code.

---

## 🔨 Tools to Generate QR Codes

### Option 1: QR.io (Recommended - Easiest)

**Method**: Online, simple, free

1. Go to [QR.io](https://qr.io)
2. Paste URL: `https://username.github.io/cip-gauges-qr-code/?part=EA2`
3. Download PNG image
4. Print using label printer

**Pros**: 
- Simple, no software needed
- Customizable design
- High resolution

**Cons**: 
- Requires internet
- Manual for each part

---

### Option 2: QRStuff (Advanced Customization)

**Method**: Online, feature-rich, free/paid

1. Go to [QRStuff](https://www.qrstuff.com)
2. Select "URL" type
3. Paste URL: `https://username.github.io/cip-gauges-qr-code/?part=EA2`
4. Customize:
   - **Size**: Medium (200x200px minimum)
   - **Error Correction**: High (40% recovery)
   - **Design**: Add logo, colors
5. Download PNG

**Pros**:
- Advanced customization
- Logo embedding
- Batch generation available

**Cons**:
- More complex interface

---

### Option 3: Command Line (For Bulk Generation)

**Method**: Programmable, batch generation

Install Node.js QR code library:

```bash
npm install -g qrcode
```

Generate single QR code:

```bash
qrcode "https://username.github.io/cip-gauges-qr-code/?part=EA2" > EA2.png
```

Generate all parts in batch:

```bash
# Create a file called: generate_qr_codes.sh

#!/bin/bash

PARTS=("EA2" "EB2" "FA2" "FB2" "CA1" "EA1" "FA1")
BASE_URL="https://username.github.io/cip-gauges-qr-code"

for PART in "${PARTS[@]}"; do
  qrcode "${BASE_URL}/?part=${PART}" > "qr_codes/${PART}_qr.png"
  echo "Generated QR code for $PART"
done
```

Run:

```bash
chmod +x generate_qr_codes.sh
mkdir qr_codes
./generate_qr_codes.sh
```

**Pros**:
- Batch generation
- Reproducible
- No manual work

**Cons**:
- Requires technical knowledge
- Need Node.js installed

---

### Option 4: Google Sheets + QR Generator

**Method**: Spreadsheet-based, good for organization

1. Create Google Sheet with part numbers:

| Part | URL | QR Code |
|------|-----|---------|
| EA2 | =CONCATENATE("https://username.github.io/cip-gauges-qr-code/?part=",A2) | [QR] |
| EB2 | ... | [QR] |

2. Use [Google Sheets QR Code Add-on](https://workspace.google.com/marketplace/app/qr_code_generator/):
   - Install add-on
   - Menu → Add-ons → QR Code Generator → Generate QR codes
   - Select URL column
   - Auto-generates QR codes

3. Export as images

**Pros**:
- Centralized database
- Easy to maintain
- Batch generation

**Cons**:
- Requires Google account
- Add-on installation

---

## 🎯 QR Code Specifications (Important)

### Size & Resolution

| Setting | Recommendation | Why |
|---------|----------------|-----|
| **Physical Size** | 3-5 cm (1-2 inches) | Easy to scan from 30-50cm |
| **PNG Resolution** | 200x200px minimum | Crisp when printed |
| **Suggested Print Size** | 50mm × 50mm | Standard label sticker |

### Error Correction Level

| Level | Data Recovery | Best For |
|-------|---------------|----------|
| **L** | 7% | Printed indoors |
| **M** | 15% | Default choice |
| **Q** | 25% | Partially covered |
| **H** | 30% | Heavily damaged/dirty |

**Recommendation**: Use **Level H** (high) for factory environment where labels may get dirty or damaged.

---

## 🖨️ Printing QR Codes

### Materials Needed

- **Printer**: Color or B&W inkjet/laser
- **Labels**: Durable sticker stock
  - Recommended: Waterproof/outdoor-rated labels
  - Example: Avery 5160 or similar (1" × 2.625")
- **Laminating Sheets**: Optional, for extra durability
  - Protects from moisture, dirt, damage

### Step-by-Step Printing

#### Method 1: Standard Label Stickers

1. **Download QR code** as PNG image
2. **Insert into document**:
   - Open Word/Google Docs
   - Insert → Image → select QR PNG
   - Size to ~50mm × 50mm
3. **Print to label sheets**:
   - File → Print
   - Select label sheet layout (e.g., Avery 5160)
   - Print
4. **Peel and stick** on cabinet doors

#### Method 2: Dedicated Label Printer

1. **Export QR as PNG** (300 DPI recommended)
2. **Use label software**:
   - Brother VC-500W
   - Epson ColorWorks
   - Zebra LP2844
3. **Send to printer** directly
4. **Cut and apply** to cabinet

#### Method 3: Laminated Stickers (Most Durable)

1. **Print QR code** on regular paper or label stock
2. **Laminate** using self-adhesive laminating pouches:
   - Trim around QR code
   - Slide into laminating pouch
   - Apply heat (iron on lowest setting) or cold laminator
   - Trim excess
3. **Apply to cabinet** with strong adhesive

**Recommendation for Factory**: Use laminated stickers — they survive:
- Oil/grease exposure
- Moisture
- Temperature changes
- Physical wear

---

## 🧪 Testing QR Codes

### Before Printing

1. **Generate QR code** for a sample part (EA2)
2. **Test scan on multiple phones**:
   - iPhone with Camera app
   - Android with Google Lens
   - QR code scanner apps
3. **Verify webpage loads** correctly
4. **Check gauge image** displays properly

### Testing Checklist

- [ ] QR code scans successfully
- [ ] URL opens in browser
- [ ] Part number displays in heading
- [ ] Gauge image loads
- [ ] Page works in bright lighting
- [ ] No 404 errors
- [ ] Works on slow 3G network
- [ ] Works on multiple phone models

### After Printing & Installation

1. **Test physical labels**:
   - Scan from 30-50cm distance
   - Scan in warehouse/factory lighting
   - Scan after exposure to dust/oil
2. **Verify all QR codes**:
   - EA2 → shows EA2 gauges
   - EB2 → shows EB2 gauges
   - (etc. for all parts)
3. **Document working phones**:
   - iPhone 12 with Safari ✅
   - Samsung Galaxy A10 with Chrome ✅
   - (etc.)

---

## 📋 QR Code Specifications (By Size)

### 50mm × 50mm (Recommended)

```
┌────────────────┐
│  ███████       │
│  █     █ ██    │
│  █ ███ █  █ ██ │  Size: ~50mm
│  █     █  ███  │
│  ███████  █    │
│       ██ ███   │
│  ████ █ █ ███  │
│  █  ██  █ █    │
│  █ ███ ██ █ ██ │
│  █  ██ ██ ███  │
│  █  ███ ███  █ │
└────────────────┘
```

**Scannable from**: 30-50 cm distance

### 100mm × 100mm (Large - Extra Readable)

For elderly workers or poor eyesight employees.

**Scannable from**: Up to 1 meter distance

### 20mm × 20mm (Compact - NOT Recommended)

Too small for factory environment. Hard to scan.

---

## 💾 Bulk QR Code Database

### Create Master Sheet

Store all QR codes in one place for version control:

**File**: `qr_codes_inventory.xlsx`

| Part | URL | QR Code | Printed | Location | Status |
|------|-----|---------|---------|----------|--------|
| EA2 | https://username.github.io/cip-gauges-qr-code/?part=EA2 | [PNG] | 2024-03-14 | Cabinet 1, Door A | Active |
| EB2 | https://username.github.io/cip-gauges-qr-code/?part=EB2 | [PNG] | 2024-03-14 | Cabinet 1, Door B | Active |
| FA2 | https://username.github.io/cip-gauges-qr-code/?part=FA2 | [PNG] | 2024-03-14 | Cabinet 2, Door A | Active |

Benefits:
- Audit trail
- Easy to reprint lost labels
- Document which cabinets have codes
- Track implementation progress

---

## 🔐 URL Security Best Practices

### Never change URLs

Once QR codes are printed, **do not change URLs**. URLs must be permanent:

```javascript
// ✅ GOOD: Stable URL structure
https://username.github.io/cip-gauges-qr-code/?part=EA2

// ❌ BAD: Changing base path breaks all codes
https://username.github.io/gauges/v2/?part=EA2  // All old codes broken!
```

### Migrate carefully if needed

If you must change domain/path:

1. Keep old domain active with redirect
2. Or: Regenerate all QR codes
3. Or: Print new labels alongside old ones during transition

---

## 🌍 QR Code Formats & Standards

The system uses **standard QR Code format** (ISO/IEC 18004):

- **Version**: Auto-detected by generator
- **Encoding**: UTF-8
- **Data Contents**: URL (max 2953 bytes)
- **Current Size**: ~50 bytes (well below limit)

No special custom encoding needed — standard QR codes work perfectly.

---

## 🚨 Common Issues & Solutions

### QR Code Won't Scan

**Problem**: Phone won't recognize QR code

**Possible Causes**:
- Image is corrupted (regenerate)
- QR code too small (enlarge to 50mm+)
- Poor contrast (use white background, dark code)
- Dirty/damaged label (clean or reprint)

**Solution**:
1. Regenerate QR code
2. Verify PNG file is valid
3. Increase print size to 50mm+
4. Use high error correction (Level H)
5. Test on multiple phones first

### QR Code Works on Phone A but Not B

**Problem**: iPhone scans but Android doesn't

**Possible Causes**:
- Android phone has outdated camera app
- Android doesn't support this QR format (unlikely)
- Image contrast issue on Android

**Solution**:
- Update Android phone camera/Chrome
- Use dedicated QR code scanner app on Android
- Verify QR code quality with multiple generators
- Test with Google Lens (usually works on all Android)

### Printed QR Code Too Faded

**Problem**: Black isn't dark enough

**Possible Causes**:
- Printer toner/ink low
- Wrong label material (translucent instead of white)
- Printer color settings wrong

**Solution**:
- Check printer toner/ink levels
- Use white glossy label stock
- Test print settings on regular paper first
- Increase contrast in QR code generator

---

## 📞 Recommended Tools Summary

| Tool | Best For | Ease | Cost |
|------|----------|------|------|
| **QR.io** | Quick single codes | ⭐⭐⭐⭐⭐ | Free |
| **QRStuff** | Customized branding | ⭐⭐⭐⭐ | Free/Paid |
| **Command Line** | Bulk generation | ⭐⭐⭐ | Free |
| **Google Sheets** | Database + generation | ⭐⭐⭐⭐ | Free |
| **Desktop Software** | Professional printing | ⭐⭐⭐ | Paid |

**Recommendation for your project**: Start with **QR.io** for first set, then move to **Command Line** or **Google Sheets** if you need to generate many QR codes regularly.

---

## 📚 Additional Resources

- [QR Code Wikipedia](https://en.wikipedia.org/wiki/QR_code)
- [ISO QR Code Standard](https://www.qr-code.co.uk/about/standards.php)
- [Error Correction Explained](https://www.qr-code.co.uk/about/error-correction.php)

---

**Happy QR code printing! Your factory workers are ready to scan.**
