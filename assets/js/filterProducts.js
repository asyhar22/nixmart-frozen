// Search + Category Filter

document.addEventListener("DOMContentLoaded", () => {
  const search = document.getElementById("search");
  const filter = document.getElementById("category-filter");

  if (!search || !filter) return;

  function updateResults() {
    const q = search.value.toLowerCase();
    const cat = filter.value;

    const results = window.productData.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(q) || p.short.toLowerCase().includes(q);
      const matchesCategory = cat === "all" || p.category === cat;
      return matchesSearch && matchesCategory;
    });

    renderGrid(results);
  }

  // Override render function
  function renderGrid(list) {
    const grid = document.getElementById("product-grid");
    const pngFallback = (src) =>
      src ? src.replace(/\.[a-zA-Z0-9]+$/, ".png") : "";

    // clear existing
    grid.textContent = "";

    // helper for currency formatting
    const formatPrice = (value) => {
      try {
        return `Rp. ${new Intl.NumberFormat('id-ID').format(value)}`;
      } catch (e) {
        return `Rp. ${value}`;
      }
    };

    list.forEach((p) => {
      const imgs = p.images || {};
      const largeWebp = imgs.large || "";
      const mediumWebp = imgs.medium || "";
      const smallWebp = imgs.small || "";

      const largePng = largeWebp
        ? pngFallback(largeWebp)
        : pngFallback(mediumWebp) || pngFallback(smallWebp);
      const mediumPng = mediumWebp
        ? pngFallback(mediumWebp)
        : pngFallback(smallWebp) || "";

      const article = document.createElement("article");
      article.className = "card fade-in";

      // image link only
      const imgLink = document.createElement("a");
      imgLink.href = `product-detail.html?id=${p.id}`;
      imgLink.className = "card-image-link";

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
      if (mediumWebp) {
        const s = document.createElement("source");
        s.setAttribute("srcset", mediumWebp);
        s.setAttribute("type", "image/webp");
        picture.appendChild(s);
      }
      const img = document.createElement("img");
      img.src = mediumPng || mediumWebp || smallWebp || "";
      img.alt = p.name || "";
      img.loading = "lazy";
      picture.appendChild(img);

      imgLink.appendChild(picture);

      const body = document.createElement("div");
      body.className = "card-body";

      const h3 = document.createElement("h3");
      const nameLink = document.createElement("a");
      nameLink.href = `product-detail.html?id=${p.id}`;
      nameLink.className = "product-link";
      nameLink.textContent = p.name;
      h3.appendChild(nameLink);
      body.appendChild(h3);

      const ex = document.createElement("p");
      ex.className = "excerpt";
      ex.textContent = p.short;
      body.appendChild(ex);

      const price = document.createElement("p");
      price.className = "price";
      price.textContent = formatPrice(p.price);
      body.appendChild(price);

      article.appendChild(imgLink);
      article.appendChild(body);
      grid.appendChild(article);
    });
  }
  search.addEventListener("input", updateResults);
  filter.addEventListener("change", updateResults);

  // initial render
  updateResults();
});
