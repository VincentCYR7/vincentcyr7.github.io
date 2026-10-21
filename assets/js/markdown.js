/* Markdown URLs and links are relative to the HTML page, just like normal HTML. */
(() => {
  async function renderSection(element) {
    const source = element.getAttribute('data-markdown');
    try {
      if (!window.marked || !window.DOMPurify) {
        throw new Error('The Markdown libraries could not be loaded.');
      }
      const response = await fetch(source);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const markdown = await response.text();
      element.innerHTML = DOMPurify.sanitize(marked.parse(markdown), {
        USE_PROFILES: { html: true }
      });
      element.removeAttribute('aria-busy');
      element.dispatchEvent(new CustomEvent('markdown:loaded', { bubbles: true }));
    } catch (error) {
      element.replaceChildren();
      const message = document.createElement('p');
      message.setAttribute('role', 'alert');
      message.textContent = `Content could not be loaded (${source}). Please reload to try again.`;
      element.append(message);
      element.removeAttribute('aria-busy');
      console.error(`Unable to render Markdown: ${source}`, error);
    }
  }

  // Wait for all sections before following deep links into asynchronous content.
  Promise.all(Array.from(document.querySelectorAll('[data-markdown]'), renderSection))
    .then(() => {
      if (!location.hash) return;
      try {
        document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
      } catch (error) {
        console.warn('Unable to follow the page fragment.', error);
      }
    });
})();
