

## Update Al Hamra Logo

The uploaded transparent PNG logo will replace the current `/assets/logo.jpg` used in the Navbar and Footer.

### Steps

1. **Copy the uploaded logo** to `public/assets/al-hamra-logo.png`
2. **Update Navbar** (`src/components/layout/Navbar.tsx` line 101): change `src="/assets/logo.jpg"` to `src="/assets/al-hamra-logo.png"`
3. **Update Footer** (`src/components/layout/Footer.tsx` line 62): same change
4. **Update favicon** in `index.html` to use the new logo as well (since it has a transparent background, it works well as a favicon)

### Transparency handling

Since the logo is a transparent PNG and the Navbar/Footer both have white or near-white backgrounds, the logo will naturally show the background beneath it -- no additional CSS changes needed. The existing `objectFit: "contain"` styling is correct for this logo shape.

