// main global JS helpers
document.addEventListener("DOMContentLoaded", () => {
  const y = new Date().getFullYear();
  document
    .querySelectorAll("#year, #year2")
    .forEach((el) => (el.textContent = y));
});

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});
