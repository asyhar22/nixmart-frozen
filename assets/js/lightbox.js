// Simple lightbox effect for product detail images

document.addEventListener("click", (e) => {
  if (e.target.matches(".gallery img")) {
    const src = e.target.src;

    const overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";

    const img = document.createElement("img");
    img.src = src;
    lightbox.appendChild(img);

    overlay.appendChild(lightbox);

    overlay.addEventListener("click", () => overlay.remove());
    document.body.appendChild(overlay);
  }
});
