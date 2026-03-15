# QR Code Migration Guide

**Purpose:** Update QR codes from old query parameter format to new hash-based routing format.

**Timeline:** Can be done gradually — old URLs still work.

---

## 🔄 URL Format Change

### Old Format (Query Parameter)
```
https://yourdomain.netlify.app/?part=EA2
```
- Works with original GitHub Pages single-page app
- User sees blank home page, must manually enter part code
- Less optimal user experience

### New Format (Hash-Based Routing - Recommended)
```
https://yourdomain.netlify.app/#/part/EA2
```
- Direct navigation to gauge page
- Better user experience
- Works perfectly with new React Router setup
- **Recommended for all new codes**

---

## 📋 Step-by-Step Migration

### For Each Part Code (EA2, EB2, FA2, etc.)

#### 1. **Determine Your Netlify Domain**
Example: `https://gauges.mycompany.netlify.app`

```
https://[your-netlify-domain].netlify.app/#/part/[PART_CODE]
```

#### 2. **Generate New QR Code**

**Online Tool:**
- Go to [https://www.qr-code-generator.com/](https://www.qr-code-generator.com/)
- Select "URL"
- Paste: `https://yourdomain.netlify.app/#/part/EA2`
- Click "Generate QR Code"
- Download PNG
- Print and laminate for durability

**Command Line (if you have qr-code tools):**
```bash
# Using qrencode (macOS: brew install qrencode)
qrencode -o EA2.png "https://gauges.mycompany.netlify.app/#/part/EA2"
```

#### 3. **Replace Old QR Code Stickers**
- Remove old QR code from gauge cabinet
- Print new QR code (credit card size or larger)
- Laminate for durability
- Affix with strong adhesive

---

## 📚 QR Code Templates

### All Available Parts
Here are the URLs you need for each part in your system:

```
EA2:  https://yourdomain.netlify.app/#/part/EA2
EB2:  https://yourdomain.netlify.app/#/part/EB2
FA2:  https://yourdomain.netlify.app/#/part/FA2
FB2:  https://yourdomain.netlify.app/#/part/FB2
CA1:  https://yourdomain.netlify.app/#/part/CA1
EA1:  https://yourdomain.netlify.app/#/part/EA1
FA1:  https://yourdomain.netlify.app/#/part/FA1
```

(Add more as you add parts to `gauges.json`)

---

## ✅ Testing New QR Codes

After printing a new QR code:

1. **Test on phone:**
   - Open camera app
   - Point at QR code
   - Tap notification that appears
   - Should navigate directly to gauge page for that part

2. **Manual test:**
   - Copy URL into browser
   - Should see correct part's gauge image
   - Zoom controls should appear

3. **Verify image loads:**
   - Gauge image should display
   - No 404 errors
   - Zoom works (pinch or scroll)

---

## 🎨 QR Code Design Tips

### Physical Design
- **Size:** At least 2×2 inches (5×5 cm) recommended
- **Placement:** At eye level on gauge cabinet door
- **Background:** White background with black QR code (standard)
- **Protection:** Laminate with clear film for durability
- **Testing:** Scan multiple times from different angles before installation

### Documentation
Keep printed list of all codes and their locations:
```
EA2 QR Code - Cabinet A, Shelf 1
EB2 QR Code - Cabinet A, Shelf 2
FA2 QR Code - Cabinet B, Shelf 1
... (etc)
```

---

## 🔄 Migration Strategy

### Immediate (Week 1-2)
✅ Deploy app to Netlify with new routing  
✅ Test new URLs on local network  
✅ Generate first batch of QR codes for highest-use parts (EA2, EB2, FA2)

### Short Term (Week 2-4)
✅ Replace QR codes in most-used gauge cabinets  
✅ Train workers on new process (if different)  
✅ Monitor for any issues or feedback

### Complete (Month 1-2)
✅ Replace remaining QR codes  
✅ Archive old codes  
✅ Remove old URL format from documentation

### Optional: Parallel Running
You can keep **both formats** during transition:
- Old format (`?part=EA2`) → User must enter code manually
- New format (`#/part/EA2`) → Direct navigation

Workers can scan new codes. Old codes still work but require extra step.

---

## 🔐 URL Security

**Important:** These URLs are safe to display publicly:
- ✅ Part codes (EA2, EB2) are not sensitive
- ✅ No authentication needed
- ✅ No personal data exposed
- ✅ URL only tells you what gauge to find

No security concerns with printing QR codes on public-facing cabinet doors.

---

## 🆘 Troubleshooting

### Problem: QR Code Doesn't Scan
**Solution:**
1. Ensure minimum 2×2" size
2. Check contrast (black on white)
3. Verify no scratches on laminate
4. Test with multiple phone cameras
5. Regenerate if file corrupted

### Problem: URL Scans But Page Blank
**Solution:**
1. Check Netlify site is deployed (not in build)
2. Verify URL spelling (case-sensitive for part codes)
3. Check network connection works
4. Wait for app to load (may take 2-3 seconds on slow network)

### Problem: Old Code Still Preferred
**Solution:**
1. Old URLs continue to work (backward compatible)
2. Mark old codes as archived
3. Train workers on new system benefits (instant access)
4. Replace over time at natural maintenance intervals

---

## 📝 QR Code Documentation Template

Print and laminate this instruction card:

```
┌─────────────────────────────────────────┐
│                                         │
│    📱 SCAN QR CODE WITH PHONE           │
│                                         │
│    [QR CODE HERE]                       │
│                                         │
│    Part Code: EA2                       │
│    For: Gauge Measurement Set           │
│                                         │
│    Gauge List will appear instantly     │
│    Pinch to zoom for details           │
│                                         │
│    Return all gauges to cabinet         │
│    after inspection                     │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🗒️ Spreadsheet Template

Track QR code generation and deployment:

| Part | Cabinet | Location | Old URL | New URL | Status | Date Updated |
|------|---------|----------|---------|---------|--------|--------------|
| EA2 | A | Shelf 1 | ?part=EA2 | #/part/EA2 | ✅ Deployed | 3/15/26 |
| EB2 | A | Shelf 2 | ?part=EB2 | #/part/EB2 | Pending | — |
| FA2 | B | Shelf 1 | ?part=FA2 | #/part/FA2 | Pending | — |
| ... | ... | ... | ... | ... | ... | ... |

---

## 🚀 Quick Reference

**For each part, generate this URL format:**

```
https://[YOUR-NETLIFY-DOMAIN].netlify.app/#/part/[PART_CODE]
```

**Examples:**
```
https://gauges-mfg.netlify.app/#/part/EA2
https://gauges-mfg.netlify.app/#/part/EB2
https://industrial-gauges.netlify.app/#/part/CA1
```

---

## ❓ FAQ

**Q: Do old QR codes need to be replaced immediately?**  
A: No. They continue to work. Replace gradually as needed.

**Q: Can we use shortened URLs?**  
A: Yes, use bit.ly or similar shortener if preferred. Both work equally.

**Q: What if we add a new part code?**  
A: Just generate a new QR code for it immediately — no app changes needed.

**Q: Can workers scan codes that don't exist yet?**  
A: They'll see "Part Not Found" message with a back button. Safe fallback.

---

## 📞 Support

If workers report issues:
1. Have them manually type the part code in the home page
2. If gauge doesn't load, check `public/gauges/` for correct image
3. If QR doesn't scan, regenerate with QR Code Generator tool
4. For persistent issues, check Netlify deployment status

---

**Migration Complete When:** All cabinet doors have new QR codes and workers are comfortable with new system.

**Estimated Time:** 2-4 weeks for full migration depending on number of gauge cabinets.
