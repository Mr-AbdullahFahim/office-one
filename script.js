/**
 * Office One - Enterprise IT Hardware & Solutions
 * Interactive Live Demo Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const headerWrapper = document.getElementById('siteHeaderWrapper');
  const header = document.getElementById('mainHeader');
  const searchInput = document.getElementById('searchInput');
  const cartBadge = document.getElementById('cartBadge');
  const filterTabs = document.querySelectorAll('.filter-tab-btn');
  const productCards = document.querySelectorAll('.product-card');
  const reserveButtons = document.querySelectorAll('.btn-reserve-pickup');
  const quoteModal = document.getElementById('quoteModal');
  const btnOpenQuoteModal = document.getElementById('btnOpenQuoteModal');
  const btnCloseQuoteModal = document.getElementById('btnCloseQuoteModal');
  const corporateQuoteForm = document.getElementById('corporateQuoteForm');
  const newsletterForm = document.getElementById('newsletterForm');
  const btnThemeToggle = document.getElementById('btnThemeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  let cartCount = 0;
  let toastTimeout;

  // 1. Toast Notification Utility
  function showToast(message) {
    if (!toastNotice || !toastMessage) return;
    if (toastTimeout) clearTimeout(toastTimeout);
    toastMessage.textContent = message;
    toastNotice.classList.add('show');
    toastTimeout = setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3200);
  }

  // 2. Sticky Header Scroll Effect (keeps main nav + sub-nav pinned on scroll)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 15) {
      if (headerWrapper) headerWrapper.classList.add('scrolled');
      if (header) header.classList.add('scrolled');
    } else {
      if (headerWrapper) headerWrapper.classList.remove('scrolled');
      if (header) header.classList.remove('scrolled');
    }
  });

  // 3. Command+K / Ctrl+K Search Focus Shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      if (searchInput) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
        showToast('Search activated (⌘K)');
      }
    }
    if (e.key === 'Escape' && quoteModal && quoteModal.classList.contains('active')) {
      quoteModal.classList.remove('active');
    }
  });

  // 4a. Top-Selling Commercial Hardware Filter Tabs
  const hardwareTabs = document.querySelectorAll('#filterTabs .filter-tab-btn');
  const hardwareCards = document.querySelectorAll('#productGrid .product-card');

  hardwareTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      hardwareTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      hardwareCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4b. Featured Products & New Arrivals Filter Tabs
  const featuredTabs = document.querySelectorAll('#featuredFilterTabs .filter-tab-btn');
  const featuredCards = document.querySelectorAll('#featuredGrid .product-card');

  featuredTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      featuredTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-featured-filter');

      featuredCards.forEach((card) => {
        const category = card.getAttribute('data-featured-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Reserve & Pick Up Button Interactivity
  reserveButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productName = btn.getAttribute('data-name') || 'Product';
      cartCount++;
      if (cartBadge) cartBadge.textContent = cartCount;

      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 150);

      showToast(`Added to Showroom Reservation: ${productName}`);
    });
  });

  // 6. Catalog Page Product Add Buttons
  const catalogAddBtns = document.querySelectorAll('.btn-catalog-add');
  catalogAddBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productName = btn.getAttribute('data-name') || 'Hardware Item';
      cartCount++;
      if (cartBadge) cartBadge.textContent = cartCount;

      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 150);

      showToast(`Added to Order Batch: ${productName}`);
    });
  });

  // 7. Quick Procurement Entry Form
  const quickEntryForm = document.getElementById('quickEntryForm');
  const quickSkuInput = document.getElementById('quickSkuInput');
  const quickQtyInput = document.getElementById('quickQtyInput');
  if (quickEntryForm && quickSkuInput) {
    quickEntryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const sku = quickSkuInput.value.trim();
      const qty = quickQtyInput ? parseInt(quickQtyInput.value, 10) || 1 : 1;
      if (sku) {
        cartCount += qty;
        if (cartBadge) cartBadge.textContent = cartCount;
        showToast(`Added SKU: ${sku.toUpperCase()} (Qty: ${qty}) to Procurement Batch`);
        quickSkuInput.value = '';
        if (quickQtyInput) quickQtyInput.value = '1';
      }
    });
  }

  // 8. Flagship Showroom Toggle Filter
  const flagshipToggle = document.getElementById('flagshipToggle');
  if (flagshipToggle) {
    flagshipToggle.addEventListener('click', () => {
      flagshipToggle.classList.toggle('active');
      const isActive = flagshipToggle.classList.contains('active');
      showToast(isActive ? 'Filtered: Austin Flagship Showroom pickup only' : 'Showing all nationwide fleet stock');
    });
  }

  // 9. Price Range Slider (in LKR)
  const priceRangeInput = document.getElementById('priceRangeInput');
  const priceDisplay = document.getElementById('priceDisplay');
  if (priceRangeInput && priceDisplay) {
    priceRangeInput.addEventListener('input', () => {
      priceDisplay.textContent = `LKR 14,000 — LKR ${parseInt(priceRangeInput.value, 10).toLocaleString()}`;
    });
  }

  // 10. Filter Specs Reset All
  const btnResetFilters = document.getElementById('btnResetFilters');
  if (btnResetFilters) {
    btnResetFilters.addEventListener('click', () => {
      if (flagshipToggle) flagshipToggle.classList.remove('active');
      if (priceRangeInput && priceDisplay) {
        priceRangeInput.value = priceRangeInput.max;
        priceDisplay.textContent = `LKR 14,000 — LKR ${parseInt(priceRangeInput.max, 10).toLocaleString()}`;
      }
      document.querySelectorAll('.filter-checkbox-wrap input').forEach(cb => {
        cb.checked = true;
      });
      document.querySelectorAll('.filter-option-item').forEach(el => el.classList.remove('active'));
      const allItem = document.querySelector('.filter-option-item[data-class="all"]');
      if (allItem) allItem.classList.add('active');
      showToast('Filters reset to default view');
    });
  }

  // 11. Equipment Class Selection
  const filterOptionItems = document.querySelectorAll('.filter-option-item[data-class]');
  filterOptionItems.forEach((item) => {
    item.addEventListener('click', () => {
      filterOptionItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const filterClass = item.getAttribute('data-class');
      showToast(`Filter applied: ${item.querySelector('span')?.textContent || filterClass}`);
    });
  });

  // 12. Filter Tag Pills
  const filterTagPills = document.querySelectorAll('.filter-tag-pill');
  filterTagPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('active');
    });
  });

  // 13. Grid / List View Mode Buttons
  const viewBtns = document.querySelectorAll('.view-btn');
  const catalogGrid = document.querySelector('.catalog-products-grid');
  viewBtns.forEach((vbtn) => {
    vbtn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      vbtn.classList.add('active');
      if (catalogGrid) {
        if (vbtn.getAttribute('aria-label') === 'List View') {
          catalogGrid.style.gridTemplateColumns = '1fr';
          showToast('Switched to Compact List View');
        } else {
          catalogGrid.style.gridTemplateColumns = '';
          showToast('Switched to Grid View');
        }
      }
    });
  });

  // Mobile Search Bar Toggle (Show only icon initially on mobile)
  const btnMobileSearchToggle = document.getElementById('btnMobileSearchToggle');
  const searchForm = document.getElementById('searchForm');

  if (btnMobileSearchToggle && searchForm) {
    btnMobileSearchToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      searchForm.classList.toggle('mobile-active');
      if (searchForm.classList.contains('mobile-active') && searchInput) {
        searchInput.focus();
      }
    });

    // Close mobile search bar when tapping outside
    document.addEventListener('click', (e) => {
      if (!searchForm.contains(e.target) && !btnMobileSearchToggle.contains(e.target)) {
        searchForm.classList.remove('mobile-active');
      }
    });
  }

  // 13c. Mobile Filter Drawer / Toggle on catalog.html
  const btnMobileFilterToggle = document.getElementById('btnMobileFilterToggle');
  const catalogSidebar = document.getElementById('catalogSidebar');
  const btnCloseMobileFilter = document.getElementById('btnCloseMobileFilter');
  const btnApplyMobileFilter = document.getElementById('btnApplyMobileFilter');
  const mobileFilterHint = document.getElementById('mobileFilterHint');

  if (btnMobileFilterToggle && catalogSidebar) {
    btnMobileFilterToggle.addEventListener('click', () => {
      const isOpen = catalogSidebar.classList.toggle('mobile-open');
      btnMobileFilterToggle.classList.toggle('active', isOpen);
      btnMobileFilterToggle.setAttribute('aria-expanded', isOpen);
      if (mobileFilterHint) {
        mobileFilterHint.textContent = isOpen ? 'Hide Filters' : 'Show Filters';
      }
    });

    if (btnCloseMobileFilter) {
      btnCloseMobileFilter.addEventListener('click', () => {
        catalogSidebar.classList.remove('mobile-open');
        btnMobileFilterToggle.classList.remove('active');
        btnMobileFilterToggle.setAttribute('aria-expanded', 'false');
        if (mobileFilterHint) mobileFilterHint.textContent = 'Show Filters';
      });
    }

    if (btnApplyMobileFilter) {
      btnApplyMobileFilter.addEventListener('click', () => {
        catalogSidebar.classList.remove('mobile-open');
        btnMobileFilterToggle.classList.remove('active');
        btnMobileFilterToggle.setAttribute('aria-expanded', 'false');
        if (mobileFilterHint) mobileFilterHint.textContent = 'Show Filters';
        showToast('Filters applied');
        const catalogToolbar = document.querySelector('.catalog-toolbar-row') || document.querySelector('.catalog-products-grid');
        if (catalogToolbar) {
          catalogToolbar.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }

  // 14. Corporate Quote Modal Handling
  if (btnOpenQuoteModal && quoteModal && btnCloseQuoteModal) {
    btnOpenQuoteModal.addEventListener('click', () => {
      quoteModal.classList.add('active');
    });

    btnCloseQuoteModal.addEventListener('click', () => {
      quoteModal.classList.remove('active');
    });

    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) {
        quoteModal.classList.remove('active');
      }
    });

    if (corporateQuoteForm) {
      corporateQuoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        quoteModal.classList.remove('active');
        corporateQuoteForm.reset();
        showToast('Quote RFP submitted! Account manager assigned.');
      });
    }
  }

  // 15. Newsletter Subscription Handling
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterForm.reset();
      showToast('Subscribed to B2B Fleet surplus alerts & volume rates!');
    });
  }

  // 16. Dark / Light Mode Toggle with Real-Time Cross-Page Sync & LocalStorage
  const THEME_STORAGE_KEY = 'office_one_theme';

  function setTheme(theme, showFeedback = false) {
    const isDark = theme === 'dark';
    if (isDark) {
      document.body.classList.add('dark-mode');
      if (document.documentElement) document.documentElement.classList.add('dark-mode');
      if (themeIcon) {
        themeIcon.innerHTML = `
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        `;
      }
      if (showFeedback) showToast('Switched to Dark Mode');
    } else {
      document.body.classList.remove('dark-mode');
      if (document.documentElement) document.documentElement.classList.remove('dark-mode');
      if (themeIcon) {
        themeIcon.innerHTML = `
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        `;
      }
      if (showFeedback) showToast('Switched to Light Mode');
    }
  }

  // Restore saved theme on page load
  try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
    setTheme(savedTheme, false);
  } catch (e) {
    console.warn('LocalStorage unavailable for theme persistence', e);
  }

  // Toggle button click listener
  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      const isCurrentlyDark = document.body.classList.contains('dark-mode');
      const targetTheme = isCurrentlyDark ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, targetTheme);
      } catch (e) {}
      setTheme(targetTheme, true);
    });
  }

  // Real-time synchronization across browser tabs/pages
  window.addEventListener('storage', (e) => {
    if (e.key === THEME_STORAGE_KEY) {
      setTheme(e.newValue || 'light', false);
    }
  });

  // 17. Interactive Category Pills in Subnav
  const subNavLinks = document.querySelectorAll('.sub-nav-item');
  subNavLinks.forEach((item) => {
    item.addEventListener('click', (e) => {
      subNavLinks.forEach(l => l.classList.remove('active'));
      item.classList.add('active');
    });
  });
});
