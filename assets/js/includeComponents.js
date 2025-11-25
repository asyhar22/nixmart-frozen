/**
 * Automatically includes HTML components marked with data-include attribute
 * Usage: <div data-include="includes/header.html"></div>
 */
async function includeHTML() {
  const elements = document.querySelectorAll('[data-include]');
  
  for (const el of elements) {
    const file = el.getAttribute('data-include');
    try {
      const response = await fetch(file);
      if (response.ok) {
        el.innerHTML = await response.text();
      } else {
        console.error(`Failed to load ${file}: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error loading ${file}:`, error);
    }
  }
}

// Load components as soon as DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', includeHTML);
} else {
  includeHTML();
}
