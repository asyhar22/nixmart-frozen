// Main JS for NixMart homepage
// Currently minimal — responsible for mobile nav toggle and placeholder logging
import productData from '../Products/productData.js';

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const shown = navLinks.style.display === 'flex';
      navLinks.style.display = shown ? 'none' : 'flex';
    });
  }

  // Helper: format numeric price (e.g. 25000 => "25,000")
  function formatPrice(price) {
    if (price === null || price === undefined) return '';
    try {
      return 'Rp ' + Number(price).toLocaleString();
    } catch (e) {
      return price;
    }
  }

  // Create a single product card element from a product object
  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const img = document.createElement('img');
    img.src = product.imagePath || '';
    img.alt = product.name || 'Product image';
    card.appendChild(img);

    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('h3');
    title.textContent = product.name || 'Untitled';
    body.appendChild(title);

    if (product.tagline) {
      const meta = document.createElement('p');
      meta.className = 'meta';
      meta.textContent = product.tagline;
      body.appendChild(meta);
    }

    if (product.price !== null && product.price !== undefined) {
      const priceEl = document.createElement('p');
      priceEl.className = 'price';
      priceEl.textContent = formatPrice(product.price);
      body.appendChild(priceEl);
    }

    const actions = document.createElement('div');
    actions.className = 'actions';

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'add-to-cart';
    addBtn.textContent = 'Add to Cart';
    addBtn.dataset.id = product.id;

    const qty = document.createElement('input');
    qty.className = 'qty';
    qty.type = 'number';
    qty.min = '1';
    qty.value = '1';

    addBtn.addEventListener('click', () => {
      const count = Number(qty.value) || 1;
      // Minimal feedback: could be replaced with a cart API
      const name = product.name || 'Product';
      // Simple visual feedback
      addBtn.textContent = 'Added ✓';
      setTimeout(() => (addBtn.textContent = 'Add to Cart'), 900);
      console.log(`Added to cart: ${name} (x${count})`);
    });

    actions.appendChild(addBtn);
    actions.appendChild(qty);
    body.appendChild(actions);

    card.appendChild(body);
    return card;
  }

  // Render all products into #product-grid
  function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = '';

    if (!Array.isArray(productData)) {
      console.warn('productData is not available in scope or not an array');
      grid.textContent = 'No products available.';
      return;
    }

    const data = productData;
    const frag = document.createDocumentFragment();
    data.forEach((p) => {
      const card = createProductCard(p);
      frag.appendChild(card);
    });

    grid.appendChild(frag);
  }

  // Run renderer on load
  try {
    renderProducts();
  } catch (e) {
    console.error('Error rendering products', e);
  }

  console.log('NixMart homepage script loaded');
});
