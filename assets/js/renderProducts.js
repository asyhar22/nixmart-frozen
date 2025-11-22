// Dynamically render products into index.html and products.html

document.addEventListener("DOMContentLoaded", () => {
  const grid =
    document.getElementById("product-grid") ||
    document.getElementById("product-list");
  if (!grid || !window.productData) return;

  const pngFallback = (src) =>
    src ? src.replace(/\.[a-zA-Z0-9]+$/, ".png") : "";

  const createPicture = (imgs, alt) => {
    const picture = document.createElement("picture");
    const largeWebp = (imgs && imgs.large) || "";
    const mediumWebp = (imgs && imgs.medium) || "";
    const smallWebp = (imgs && imgs.small) || "";

    const largePng = largeWebp
      ? pngFallback(largeWebp)
      : pngFallback(mediumWebp) || pngFallback(smallWebp);
    const mediumPng = mediumWebp
      ? pngFallback(mediumWebp)
      : pngFallback(smallWebp) || "";

    if (largeWebp) {
      const s = document.createElement("source");
      s.setAttribute("srcset", largeWebp);
      s.setAttribute("type", "image/webp");
      s.setAttribute("media", "(min-width:900px)");
      picture.appendChild(s);
    }
    if (largePng) {
      const s = document.createElement("source");
      s.setAttribute("srcset", largePng);
      s.setAttribute("media", "(min-width:900px)");
      picture.appendChild(s);
    }
    if (mediumWebp) {
      const s = document.createElement("source");
      s.setAttribute("srcset", mediumWebp);
      s.setAttribute("type", "image/webp");
      picture.appendChild(s);
    }
    const img = document.createElement("img");
    img.src = mediumPng || mediumWebp || smallWebp || "";
    img.alt = alt || "";
    img.loading = "lazy";
    picture.appendChild(img);

    return picture;
  };

  // Clear and build DOM nodes for each product
  grid.textContent = "";
  window.productData.forEach((p) => {
    const article = document.createElement("article");
    article.className = "card";

    const link = document.createElement("a");
    link.href = `product-detail.html?id=${p.id}`;

    const picture = createPicture(p.images || {}, p.name);
    link.appendChild(picture);

    const body = document.createElement("div");
    body.className = "card-body";

    const h3 = document.createElement("h3");
    h3.textContent = p.name;
    body.appendChild(h3);

    const ex = document.createElement("p");
    ex.className = "excerpt";
    ex.textContent = p.short;
    body.appendChild(ex);

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = `Rp. ${p.price}`;
    body.appendChild(price);

    link.appendChild(body);
    article.appendChild(link);
    grid.appendChild(article);
  });
}); // Small helpers: set copyright year and simple interactions
document.addEventListener("DOMContentLoaded", () => {
  const y = new Date().getFullYear();
  const el = document.getElementById("year");
  const el2 = document.getElementById("year2");
  if (el) el.textContent = y;
  if (el2) el2.textContent = y;

  // Example: progressive image swap for higher pixel density
  // (Keep simple — replace with real logic if you have many variants)
});
