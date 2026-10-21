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
      // Create only validated YouTube embeds after sanitizing the Markdown.
      for (const video of element.querySelectorAll('[data-youtube-id]')) {
        const id = video.getAttribute('data-youtube-id');
        if (!/^[A-Za-z0-9_-]{11}$/.test(id)) continue;
        const start = video.getAttribute('data-start') || '0';
        if (!/^\d{1,6}$/.test(start)) continue;
        const frame = document.createElement('iframe');
        frame.src = `https://www.youtube-nocookie.com/embed/${id}?start=${start}`;
        frame.title = video.getAttribute('data-title') || 'YouTube video player';
        frame.loading = 'lazy';
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        frame.allowFullscreen = true;
        video.classList.add('video-embed');
        video.replaceChildren(frame);
      }
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
