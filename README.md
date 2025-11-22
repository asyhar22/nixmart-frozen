# NixMart Website Project Recap

## Project Overview
You're building **NixMart**, a frozen meals e-commerce website with a homepage that displays premium frozen products in a responsive grid.

---

## File Structure
```
NixMart/
├── Website/
│   ├── index.html          (Homepage with nav, hero, product grid)
│   ├── styles.css          (Responsive design, Clean & Modern)
│   └── main.js             (ES module, renders products dynamically)
├── Products/
│   ├── Product Description.txt  (Source data for 10 products)
│   └── productData.js           (Exported array of 10 product objects)
├── Logo - NixMart - Vector.png  (Logo asset)
└── (Product image folders follow pattern: /Products/{id} - {ProductName}/)
```

---

## Key Files & Their Roles

### index.html
- **Purpose**: Homepage structure
- **Contains**:
  - Fixed navigation bar with logo and links (Shop, About Us, Contact)
  - Hero section with headline "Premium Frozen Meals, Ready in Minutes"
  - Empty `#product-grid` div (populated by JS)
  - Links to `styles.css` and `main.js` (as ES module)
- **Logo path**: `/Logo - NixMart - Vector.png`

### styles.css
- **Purpose**: Responsive, food-focused styling
- **Color palette**: Cool Blue (#007BFF), White, Charcoal Grey (#333)
- **Key styles**:
  - Fixed top nav with subtle shadow and centered logo
  - `.product-card` class with hover lift effect
  - Responsive grid layout (mobile-first breakpoints ~800px)
  - Prominent "Add to Cart" button (blue, interactive)
- **Note**: Body has `padding-top: 92px` to clear fixed header

### main.js
- **Purpose**: Dynamic product rendering and interactivity
- **Key functions**:
  - `renderProducts()` — loops through `productData` and creates `.product-card` elements
  - `createProductCard(product)` — builds HTML card with image, name, tagline, price, quantity input, "Add to Cart" button
  - `formatPrice(price)` — formats prices as "Rp {number}" (e.g., "Rp 25,000")
- **Module import**: `import productData from '../Products/productData.js';`
- **Called on**: `DOMContentLoaded` event
- **Mobile nav toggle**: Also included for responsive menu

### productData.js
- **Purpose**: Single source of truth for product data
- **Exports**: `productData` array with 10 objects
- **Object structure** (each product):
  ```js
  {
    id: number,
    name: string,
    description: string,
    price: number (random from 10k, 15k, 20k, 25k),
    tagline: string,
    imagePath: string // /Products/{id} - {ProductName}/{ProductName}.png
  }
  ```
- **Example**: 
  ```js
  {
    id: 1,
    name: "Gourmet Wild Mushroom Risotto",
    price: 25000,
    tagline: "A sophisticated weeknight meal...",
    imagePath: "/Products/1 - Gourmet Wild Mushroom Risotto/Gourmet Wild Mushroom Risotto.png"
  }
  ```

---

## How It Works (Flow)

1. **User loads** index.html in a browser (over HTTP server)
2. **Page renders** with fixed nav, hero section, and empty product grid
3. **`main.js` loads** as ES module (type="module")
4. **DOMContentLoaded fires** → `renderProducts()` executes
5. **renderProducts() imports** `productData.js` and loops through 10 products
6. **For each product**, `createProductCard()` builds a `.product-card` div with:
   - Product image (from `imagePath`)
   - Product name
   - Tagline
   - Formatted price
   - Quantity input (default 1)
   - "Add to Cart" button
7. **Cards appended** to `#product-grid` and displayed in responsive grid

---

## Running the Website Locally

⚠️ **Important**: ES modules require HTTP serving (won't work with  protocol).

**Option 1: Python**
```bash
python -m http.server 8000
```
Then open: `http://localhost:8000/Website/index.html`

**Option 2: Node (with serve package)**
```bash
npx serve -s .
```
Then open: `http://localhost:3000/Website/index.html`

---

## Troubleshooting Guide

| Issue | Likely Cause | Fix |
|-------|--------------|-----|
| Products not appearing in grid | ES module import failing (opened via file://) | Serve over HTTP (see above) |
| Logo not loading | Wrong path in `index.html` | Verify logo is at `/Logo - NixMart - Vector.png` from project root |
| Product images broken | Missing image files or wrong `imagePath` | Check folder structure: `/Products/{id} - {ProductName}/{ProductName}.png` |
| Styles not applying | CSS file path wrong or not linked | Verify `<link rel="stylesheet" href="styles.css">` in `index.html` |
| "Add to Cart" button not responsive | JS not loading or DOMContentLoaded not firing | Open browser console (F12) for errors; check that `main.js` loads as module |
| Mobile nav not toggling | JS event listener missing or selector wrong | Inspect `#mobile-menu-toggle` and `.nav-links` exist in HTML |

---

## Future Development Ideas

- **Add to Cart functionality**: Wire button to shopping cart (session storage or backend API)
- **Product detail page**: Click card to view full description and reviews
- **Search & filter**: Add search bar and category filters above `#product-grid`
- **Checkout flow**: Create checkout and payment pages
- **Backend integration**: Replace static `productData.js` with API calls (REST or GraphQL)
- **Database**: Move product data from JS to a database (MongoDB, PostgreSQL, etc.)
- **Authentication**: Add user login/accounts
- **Analytics**: Track product views, clicks, and conversions

---

## Quick Reference: Common Tasks

**Update product data:**
- Edit `/Products/Product Description.txt` or modify productData.js directly

**Change colors:**
- Update `#007BFF` (Cool Blue), `#fff` (White), `#333` (Charcoal) in styles.css

**Add new nav links:**
- Add `<a>` tag in the `<nav>` element in index.html

**Modify product card layout:**
- Edit `.product-card` styles in styles.css or HTML structure in `createProductCard()` function in main.js

**Add animations:**
- Add CSS transitions/keyframes to styles.css

---

This recap should serve as a quick reference for updates, debugging, and future enhancements. Good luck! 🚀
