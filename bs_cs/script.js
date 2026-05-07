document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.toc a[href^="#"]').forEach((link) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) {
      link.remove();
    }
  });

  const searchInput = document.querySelector('[data-course-search]');
  if (searchInput) {
    const cards = Array.from(document.querySelectorAll('[data-course-card]'));
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      cards.forEach((card) => {
        const text = (card.dataset.searchText || card.textContent).toLowerCase();
        card.classList.toggle('hidden-by-search', query && !text.includes(query));
      });
    });
  }

  document.querySelectorAll('[data-module]').forEach((module) => {
    const button = module.querySelector('.module-toggle');
    if (!button) return;
    button.addEventListener('click', () => {
      module.classList.toggle('collapsed');
      button.textContent = module.classList.contains('collapsed') ? 'Expand' : 'Collapse';
    });
  });

  document.querySelectorAll('.copy-code').forEach((button) => {
    button.addEventListener('click', async () => {
      const block = button.closest('.code-example')?.querySelector('pre code');
      if (!block) return;
      const text = block.textContent;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          const area = document.createElement('textarea');
          area.value = text;
          document.body.appendChild(area);
          area.select();
          document.execCommand('copy');
          document.body.removeChild(area);
        }
        const previous = button.textContent;
        button.textContent = 'Copied';
        setTimeout(() => {
          button.textContent = previous;
        }, 1400);
      } catch (error) {
        button.textContent = 'Copy Failed';
        setTimeout(() => {
          button.textContent = 'Copy Code';
        }, 1400);
      }
    });
  });

  const scrollButton = document.querySelector('.scroll-top');
  if (scrollButton) {
    const onScroll = () => {
      scrollButton.classList.toggle('visible', window.scrollY > 500);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
      const bar = document.getElementById('progress-bar');
      if (bar) bar.style.width = progress + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    scrollButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
});
