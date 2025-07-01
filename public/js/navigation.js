// navigation.js - Navigation Bar Logic

class Navigation {
  constructor() {
    this.topNavbar = document.getElementById('topNavbar');
    this.mainNavbar = document.getElementById('mainNavbar');
    this.burgerBtn = this.mainNavbar ? this.mainNavbar.querySelector('.navbar-toggler') : null;
    this.verticalNav = null;
    this.lastScrollY = window.scrollY;
    this.isVerticalNavOpen = false;
    this.init();
  }

  init() {
    this.handleScroll();
    window.addEventListener('scroll', () => this.handleScroll());
    if (this.burgerBtn) {
      this.burgerBtn.addEventListener('click', (e) => this.toggleVerticalNav(e));
    }
    this.createVerticalNav();
  }

  handleScroll() {
    const currentScroll = window.scrollY;
    if (currentScroll < this.lastScrollY && currentScroll > 0) {
      // Scrolling UP - show top navbar and push main navbar down
      this.topNavbar && this.topNavbar.classList.add('show');
      document.body.classList.add('top-nav-visible');
      if (this.mainNavbar) this.mainNavbar.style.top = '40px';
    } else {
      // Scrolling DOWN or at top - hide top navbar, main navbar moves up
      this.topNavbar && this.topNavbar.classList.remove('show');
      document.body.classList.remove('top-nav-visible');
      if (this.mainNavbar) this.mainNavbar.style.top = '0';
    }
    this.lastScrollY = currentScroll;
  }

  createVerticalNav() {
    // Only create if not already present
    if (document.querySelector('.vertical-nav')) return;
    const verticalNav = document.createElement('div');
    verticalNav.className = 'vertical-nav';
    verticalNav.innerHTML = `
      <button class="btn btn-close mb-4" id="closeVerticalNav" aria-label="Close"></button>
      <nav>
        ${this.topNavbar ? this.topNavbar.querySelector('ul').outerHTML : ''}
        ${this.mainNavbar ? this.mainNavbar.querySelector('.navbar-nav').outerHTML : ''}
      </nav>
    `;
    document.body.appendChild(verticalNav);
    this.verticalNav = verticalNav;
    // Close button
    verticalNav.querySelector('#closeVerticalNav').addEventListener('click', () => this.closeVerticalNav());
    // Close on link click
    verticalNav.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
      link.addEventListener('click', () => this.closeVerticalNav());
    });
    // Close on outside click
    document.addEventListener('mousedown', (e) => {
      if (this.isVerticalNavOpen && !verticalNav.contains(e.target) && e.target !== this.burgerBtn) {
        this.closeVerticalNav();
      }
    });
  }

  toggleVerticalNav(e) {
    e.preventDefault();
    if (!this.verticalNav) this.createVerticalNav();
    this.isVerticalNavOpen = !this.isVerticalNavOpen;
    this.verticalNav.classList.toggle('active', this.isVerticalNavOpen);
    document.body.style.overflow = this.isVerticalNavOpen ? 'hidden' : '';
  }

  closeVerticalNav() {
    if (this.verticalNav) {
      this.verticalNav.classList.remove('active');
      this.isVerticalNavOpen = false;
      document.body.style.overflow = '';
    }
  }
}

// Initialize navigation when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  new Navigation();
}); 