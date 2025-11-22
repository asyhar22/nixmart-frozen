// Render dynamic product detail based on URL parameter

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-detail-root");
  if (!container || !window.productData) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const product = window.productData.find((p) => p.id === id);
  if (!product) {
    const notFound = document.createElement("p");
    notFound.textContent = "Product not found.";
    container.appendChild(notFound);
    return;
  }

  const imgs = product.images || {};
  const pngFallback = (src) =>
    src ? src.replace(/\.[a-zA-Z0-9]+$/, ".png") : "";

  const largeWebp = imgs.large || "";
  const largePng = largeWebp
    ? pngFallback(largeWebp)
    : pngFallback(imgs.medium) || pngFallback(imgs.small);
  const mediumWebp = imgs.medium || "";
  const mediumPng = mediumWebp
    ? pngFallback(mediumWebp)
    : pngFallback(imgs.small) || "";

  // Build DOM nodes for gallery and details instead of using innerHTML
  container.textContent = "";

  const gallery = document.createElement("div");
  gallery.className = "gallery";

  const picture = document.createElement("picture");
  if (largeWebp) {
    const s = document.createElement("source");
    s.setAttribute("srcset", largeWebp);
    s.setAttribute("type", "image/webp");
    picture.appendChild(s);
  }
  if (largePng) {
    const s = document.createElement("source");
    s.setAttribute("srcset", largePng);
    picture.appendChild(s);
  }
  const img = document.createElement("img");
  img.src = mediumPng || mediumWebp || imgs.small || "";
  img.alt = product.name || "";
  img.loading = "lazy";
  picture.appendChild(img);

  gallery.appendChild(picture);

  const aside = document.createElement("aside");
  aside.className = "details";

  const title = document.createElement("h1");
  title.textContent = product.name;
  aside.appendChild(title);

  const priceEl = document.createElement("p");
  priceEl.className = "price-large";
  priceEl.textContent = `Rp. ${product.price}`;
  aside.appendChild(priceEl);

  // Use the full product description (fallback to short if missing)
  const descEl = document.createElement("p");
  descEl.className = "description";
  descEl.textContent = product.description || product.short || "";
  aside.appendChild(descEl);

  container.appendChild(gallery);
  container.appendChild(aside);
});
