// Basic UI behavior: year injection, nav toggle, load featured projects & current project
document.addEventListener('DOMContentLoaded', () => {
  // years
  const years = document.querySelectorAll('#year, #year2, #year3, #year4, #year5, #year6');
  years.forEach(el => { if(el) el.textContent = new Date().getFullYear(); });

  // nav toggle for small screens
  const toggle = document.querySelectorAll('.nav-toggle');
  toggle.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const nav = document.querySelector('.nav');
      if(!nav) return;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.style.display = expanded ? 'none' : 'flex';
    });
  });

  // Load featured projects (if projects-data provided)
  if (window.PROJECTS && Array.isArray(window.PROJECTS)) {
    const container = document.getElementById('featured-projects');
    const grid = document.getElementById('projects-grid');
    const featured = window.PROJECTS.slice(0,6);
    if (container) {
      container.innerHTML = featured.map(p => `
        <article class="project-card fade-in card">
          <img src="${p.image || 'assets/images/placeholder-1.jpg'}" alt="${p.title}">
          <div class="project-card-body">
            <h3>${p.title}</h3>
            <p>${p.excerpt}</p>
            <a class="link" href="${p.url || 'projects.html'}">View project →</a>
          </div>
        </article>
      `).join('');
    }
    if (grid) {
      grid.innerHTML = window.PROJECTS.map(p => `
        <article class="project-card card fade-in">
          <img src="${p.image || 'assets/images/placeholder-1.jpg'}" alt="${p.title}">
          <div class="project-card-body">
            <h3>${p.title}</h3>
            <p>${p.excerpt}</p>
            <a class="link" href="${p.url || '#'}">Open →</a>
          </div>
        </article>
      `).join('');
    }
  }

  // Load blog posts if provided
  if (window.BLOG && Array.isArray(window.BLOG)) {
    const posts = document.getElementById('posts');
    if (posts) {
      posts.innerHTML = window.BLOG.map(b => `
        <article class="post-card fade-in">
          <h3>${b.title}</h3>
          <p>${b.excerpt}</p>
          <a class="link" href="${b.url || '#'}">Read →</a>
        </article>
      `).join('');
    }
  }

  // Load current project from data file (if defined in global obj)
  if (window.CURRENT_PROJECT) {
    const cp = window.CURRENT_PROJECT;
    const title = document.getElementById('cp-title');
    const desc = document.getElementById('cp-desc');
    const start = document.getElementById('cp-start');
    const end = document.getElementById('cp-end');
    const repo = document.getElementById('cp-repo');
    const pfill = document.getElementById('progress-fill');
    const plabel = document.getElementById('progress-label');

    if (title) title.textContent = cp.title || 'Project Title (placeholder)';
    if (desc) desc.textContent = cp.description || 'Short description placeholder.';
    if (start) start.textContent = cp.start_date || '—';
    if (end) end.textContent = cp.end_date || '—';
    if (repo) repo.href = cp.link || '#';
    if (pfill) {
      const pct = Math.min(100, Math.max(0, cp.progress || 0));
      pfill.style.width = pct + '%';
      if (plabel) plabel.textContent = pct + '%';
    }
  }
});
