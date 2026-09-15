document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const sidebar = document.querySelector('.sidebar');
  
  if (mobileMenuBtn && sidebar) {
    let sidebarOverlay = document.querySelector('.sidebar-overlay');
    if (!sidebarOverlay) {
      sidebarOverlay = document.createElement('div');
      sidebarOverlay.className = 'sidebar-overlay';
      document.body.appendChild(sidebarOverlay);
    }

    let scrollPosition = 0;

    mobileMenuBtn.addEventListener('click', () => {
      const isOpening = !sidebar.classList.contains('open');
      if (isOpening) {
        scrollPosition = window.scrollY;
        document.body.classList.add('menu-open');
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('open');
        window.scrollTo(0, 0);
      } else {
        document.body.classList.remove('menu-open');
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('open');
        window.scrollTo(0, scrollPosition);
      }
    });

    const closeMenu = () => {
      if (sidebar.classList.contains('open')) {
        document.body.classList.remove('menu-open');
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('open');
        window.scrollTo(0, scrollPosition);
      }
    };

    sidebarOverlay.addEventListener('click', closeMenu);
    
    const tocLinks = sidebar.querySelectorAll('.toc a');
    tocLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }
});
