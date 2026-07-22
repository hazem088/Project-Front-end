/**
 * ============================================================
 * LUX — Premium Jewelry & Accessories
 * js/script.js  |  All custom JavaScript (ES6+, Vanilla)
 * ============================================================
 * TABLE OF CONTENTS:
 *  01. Product Data (Mock Database)
 *  02. Application State
 *  03. DOM Selectors Cache
 *  04. Loading Screen
 *  05. Navbar (Sticky + Scroll + Active Links)
 *  06. Mobile Menu
 *  07. Cart System
 *  08. Favorites System
 *  09. Product Rendering
 *  10. Search, Filter & Sort
 *  11. Category Filter
 *  12. Scroll Reveal (IntersectionObserver)
 *  13. Hero Particles
 *  14. Ticker Bar
 *  15. Testimonials Slider
 *  16. FAQ Accordion
 *  17. Contact Form Validation
 *  18. Newsletter Form
 *  19. Quick-View Modal
 *  20. Toast Notifications
 *  21. Back To Top Button
 *  22. Lazy Loading Images
 *  23. Keyboard Accessibility
 *  24. Footer Year
 *  25. Initialisation
 * ============================================================
 */

'use strict';

/* ============================================================
   01. PRODUCT DATA (Mock Database)
   ============================================================ */

/**
 * Product class — represents a single jewelry item.
 */
class Product {
  /**
   * @param {number} id        - Unique identifier
   * @param {string} name      - Display name
   * @param {number} price     - Price in USD
   * @param {string} category  - Product category
   * @param {string} gender    - 'women' | 'men' | 'unisex'
   * @param {string} image     - Unsplash image URL
   * @param {string} desc      - Short description
   */
  constructor(id, name, price, category, gender, image, desc) {
    this.id          = id;
    this.name        = name;
    this.price       = price;
    this.category    = category;
    this.gender      = gender;
    this.image       = image;
    this.desc        = desc;
    this.isFavorite  = false;
    this.isInCart    = false;
    this.quantity    = 1;
  }
}

/** Product catalog — 9 handcrafted pieces */
const PRODUCTS = [
  new Product(
    1, 'Golden Radiance Watch', 400, 'Watches', 'women',
    'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80',
    'An 18K gold-plated timepiece with sapphire crystal glass, water-resistant to 50m. Swiss quartz movement.'
  ),
  new Product(
    2, 'Eclipse Silver Necklace', 150, 'Necklace', 'men',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
    'Sterling silver (925) pendant necklace with a hand-polished geometric design. 45cm adjustable chain.'
  ),
  new Product(
    3, 'Aurora Drop Earrings', 200, 'Earrings', 'women',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    'Cascading rose-gold drop earrings featuring ethically sourced pink sapphires. Hypoallergenic posts.'
  ),
  new Product(
    4, 'Onyx Chronograph Watch', 350, 'Watches', 'men',
    'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80',
    'Japanese automatic movement chronograph with a matte black titanium case and genuine leather strap.'
  ),
  new Product(
    5, 'Celestial Ring Set', 580, 'Rings', 'women',
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
    'A set of five stacking rings in 18K white gold, set with micro-pavé diamonds. Comes in sizes 5–10.'
  ),
  new Product(
    6, 'Sovereign Chain Necklace', 150, 'Necklace', 'men',
    'https://images.unsplash.com/photo-1573408301185-9519f94be24b?w=600&q=80',
    'Bold 925 sterling silver Cuban link chain, 6mm wide, 55cm length. Hand-polished mirror finish.'
  ),
  new Product(
    7, 'Noir Cuff Bracelet', 100, 'Bracelet', 'men',
    'https://images.unsplash.com/photo-1620016456778-37bbf00b1b9a?w=600&q=80',
    'Matte black PVD-coated stainless steel cuff bracelet with a subtle engraved geometric pattern.'
  ),
  new Product(
    8, 'Lumière Necklace Set', 500, 'Necklace', 'women',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
    'A layered 18K gold necklace set with a delicate 40cm collar chain and a longer 60cm pendant drop.'
  ),
  new Product(
    9, 'Golden Bangle Set', 300, 'Bracelet', 'women',
    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80',
    'Set of three 18K gold vermeil bangles — hammered, twisted, and smooth. One-size-fits-most (64mm diameter).'
  ),
];


/* ============================================================
   02. APPLICATION STATE
   ============================================================ */

/** Centralized reactive state object */
const state = {
  products:          [...PRODUCTS],       // full catalog
  filteredProducts:  [...PRODUCTS],       // after filters applied
  activeCategory:    'all',              // selected category
  activeGender:      'all',              // selected gender filter
  searchText:        '',                 // live search query
  searchField:       'name',            // 'name' | 'category'
  sortOrder:         'default',          // sort key
  currentSlide:      0,                  // testimonials current slide
  totalSlides:       0,                  // testimonials total (set on init)
  isCartOpen:        false,
  isMenuOpen:        false,
  isLoggedIn:        false,
  currentUser:       null,
};


/* ============================================================
   03. DOM SELECTORS CACHE
   ============================================================ */

/** Cache frequently accessed DOM elements to avoid repeated queries */
const DOM = {
  // Loading
  loadingScreen:      () => document.getElementById('loading-screen'),
  loadingBar:         () => document.getElementById('loading-bar'),

  // Navbar
  navbar:             () => document.getElementById('navbar'),
  navLinks:           () => document.querySelectorAll('.nav-link'),
  mobileNavLinks:     () => document.querySelectorAll('.mobile-nav-link'),

  // Mobile menu
  hamburger:          () => document.getElementById('hamburger'),
  mobileMenu:         () => document.getElementById('mobile-menu'),

  // Cart
  cartBtn:            () => document.getElementById('cart-btn'),
  cartClose:          () => document.getElementById('cart-close'),
  cartPanel:          () => document.getElementById('cart-panel'),
  cartCount:          () => document.getElementById('cart-count'),
  cartItemsList:      () => document.getElementById('cart-items-list'),
  cartTotal:          () => document.getElementById('cart-total'),
  btnCheckout:        () => document.getElementById('btn-checkout'),

  // Favorites
  favBtn:             () => document.getElementById('fav-btn'),
  favCount:           () => document.getElementById('fav-count'),

  // Auth
  authButtons:        () => document.getElementById('auth-buttons'),
  userPill:           () => document.getElementById('user-pill'),
  userNameDisplay:    () => document.getElementById('user-name-display'),
  btnLogout:          () => document.getElementById('btn-logout'),

  // Products
  productsGrid:       () => document.getElementById('products-grid'),
  searchBox:          () => document.getElementById('searchBox'),
  searchType:         () => document.getElementById('searchType'),
  sortSelect:         () => document.getElementById('sortSelect'),
  genderBtns:         () => document.querySelectorAll('.gender-btn'),
  categoryCards:      () => document.querySelectorAll('.category-card'),
  noResults:          () => document.getElementById('no-results'),

  // Testimonials
  testimonialsTrack:  () => document.getElementById('testimonials-track'),
  sliderDots:         () => document.getElementById('slider-dots'),
  prevBtn:            () => document.getElementById('testimonial-prev'),
  nextBtn:            () => document.getElementById('testimonial-next'),

  // FAQ
  faqItems:           () => document.querySelectorAll('.faq-item'),

  // Contact form
  contactForm:        () => document.getElementById('contact-form'),
  formSuccess:        () => document.getElementById('form-success'),

  // Newsletter
  newsletterForm:     () => document.getElementById('newsletter-form'),
  newsletterMsg:      () => document.getElementById('newsletter-msg'),

  // Modal
  quickViewModal:     () => document.getElementById('quick-view-modal'),
  quickViewContent:   () => document.getElementById('quick-view-content'),
  modalClose:         () => document.getElementById('modal-close'),

  // Toast container
  toastContainer:     () => document.getElementById('toast-container'),

  // Back to top
  backToTop:          () => document.getElementById('back-to-top'),

  // Hero particles
  heroParticles:      () => document.getElementById('hero-particles'),

  // Footer year
  footerYear:         () => document.getElementById('footer-year'),
};


/* ============================================================
   04. LOADING SCREEN
   ============================================================ */

/**
 * Simulates a loading progress bar, then hides the loading screen
 * once the DOM and all resources are ready.
 */
function initLoadingScreen() {
  const screen  = DOM.loadingScreen();
  const bar     = DOM.loadingBar();
  if (!screen || !bar) return;

  let progress  = 0;
  const target  = 100;
  const step    = 2;
  const interval = 30; // ms per tick

  // Animate the progress bar
  const timer = setInterval(() => {
    progress = Math.min(progress + step, target);
    bar.style.width = `${progress}%`;

    if (progress >= target) {
      clearInterval(timer);
      // Short delay so user sees 100% briefly
      setTimeout(hideLoadingScreen, 350);
    }
  }, interval);
}

/** Fades out and removes the loading screen */
function hideLoadingScreen() {
  const screen = DOM.loadingScreen();
  if (!screen) return;

  screen.classList.add('hidden');
  // Remove from DOM after animation completes
  screen.addEventListener('transitionend', () => screen.remove(), { once: true });
}


/* ============================================================
   05. NAVBAR — Sticky + Scroll Effect + Active Links
   ============================================================ */

/** Adds/removes the .scrolled class based on window scroll position */
function handleNavbarScroll() {
  const navbar = DOM.navbar();
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

/**
 * Updates the active nav link based on current scroll position.
 * Uses IntersectionObserver entries to detect the visible section.
 */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id], div[id="hero"]');
  if (!sections.length) return;

  const options = {
    root:       null,
    rootMargin: '-30% 0px -60% 0px',
    threshold:  0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute('id');
      setActiveNavLink(id);
    });
  }, options);

  sections.forEach((section) => observer.observe(section));
}

/**
 * Marks the nav link matching `sectionId` as active.
 * @param {string} sectionId
 */
function setActiveNavLink(sectionId) {
  DOM.navLinks().forEach((link) => {
    const targetSection = link.getAttribute('data-section');
    link.classList.toggle('active', targetSection === sectionId);
  });

  DOM.mobileNavLinks().forEach((link) => {
    const targetSection = link.getAttribute('data-section');
    link.classList.toggle('active', targetSection === sectionId);
  });
}


/* ============================================================
   06. MOBILE MENU
   ============================================================ */

/** Initialises hamburger toggle and mobile menu behaviour */
function initMobileMenu() {
  const hamburger = DOM.hamburger();
  const menu      = DOM.mobileMenu();
  if (!hamburger || !menu) return;

  // Create backdrop element
  const backdrop = document.createElement('div');
  backdrop.className = 'mobile-menu-backdrop';
  backdrop.setAttribute('aria-hidden', 'true');
  document.body.appendChild(backdrop);

  hamburger.addEventListener('click', toggleMobileMenu);
  backdrop.addEventListener('click', closeMobileMenu);

  // Close menu when a mobile nav link is clicked
  DOM.mobileNavLinks().forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Store backdrop reference for later use
  initMobileMenu._backdrop = backdrop;
}

/** Toggles the mobile menu open/closed */
function toggleMobileMenu() {
  state.isMenuOpen ? closeMobileMenu() : openMobileMenu();
}

/** Opens the mobile menu */
function openMobileMenu() {
  const hamburger = DOM.hamburger();
  const menu      = DOM.mobileMenu();
  const backdrop  = initMobileMenu._backdrop;

  state.isMenuOpen = true;
  menu.removeAttribute('hidden');
  menu.classList.add('open');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  backdrop.classList.add('visible');
  document.body.style.overflow = 'hidden'; // prevent background scroll
}

/** Closes the mobile menu */
function closeMobileMenu() {
  const hamburger = DOM.hamburger();
  const menu      = DOM.mobileMenu();
  const backdrop  = initMobileMenu._backdrop;

  state.isMenuOpen = false;
  menu.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  backdrop.classList.remove('visible');
  document.body.style.overflow = '';

  // Re-hide after animation
  setTimeout(() => {
    if (!state.isMenuOpen) menu.setAttribute('hidden', '');
  }, 500);
}


/* ============================================================
   07. CART SYSTEM
   ============================================================ */

/** Initialises cart panel toggle and related controls */
function initCart() {
  DOM.cartBtn()?.addEventListener('click', toggleCart);
  DOM.cartClose()?.addEventListener('click', closeCart);
  DOM.btnCheckout()?.addEventListener('click', handleCheckout);
}

/** Toggles cart panel open/closed */
function toggleCart() {
  state.isCartOpen ? closeCart() : openCart();
}

/** Opens the cart panel */
function openCart() {
  const panel = DOM.cartPanel();
  if (!panel) return;
  state.isCartOpen = true;
  panel.classList.remove('hidden');
  DOM.cartBtn()?.setAttribute('aria-expanded', 'true');
  renderCartItems();
}

/** Closes the cart panel */
function closeCart() {
  const panel = DOM.cartPanel();
  if (!panel) return;
  state.isCartOpen = false;
  panel.classList.add('hidden');
  DOM.cartBtn()?.setAttribute('aria-expanded', 'false');
}

/**
 * Adds or removes a product from the cart.
 * @param {number} productId
 */
function toggleCartItem(productId) {
  const product = state.products.find((p) => p.id === productId);
  if (!product) return;

  if (product.isInCart) {
    removeFromCart(productId);
  } else {
    addToCart(productId);
  }
}

/**
 * Adds a product to the cart.
 * @param {number} productId
 */
function addToCart(productId) {
  const product = state.products.find((p) => p.id === productId);
  if (!product || product.isInCart) return;

  product.isInCart = true;
  product.quantity = 1;

  updateCartCount();
  renderProducts(state.filteredProducts);
  if (state.isCartOpen) renderCartItems();

  showToast(`${product.name} added to cart`, 'success', 'ph-shopping-bag');
}

/**
 * Removes a product from the cart.
 * @param {number} productId
 */
function removeFromCart(productId) {
  const product = state.products.find((p) => p.id === productId);
  if (!product) return;

  product.isInCart = false;
  product.quantity = 1;

  updateCartCount();
  renderProducts(state.filteredProducts);
  if (state.isCartOpen) renderCartItems();

  showToast(`${product.name} removed from cart`, 'info', 'ph-minus-circle');
}

/**
 * Updates quantity of a cart item.
 * @param {number} productId
 * @param {number} delta  - +1 or -1
 */
function updateQuantity(productId, delta) {
  const product = state.products.find((p) => p.id === productId);
  if (!product) return;

  const newQty = product.quantity + delta;

  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }

  product.quantity = newQty;
  renderCartItems();
}

/** Updates the cart badge count with a bump animation */
function updateCartCount() {
  const inCart  = state.products.filter((p) => p.isInCart);
  const count   = inCart.reduce((sum, p) => sum + p.quantity, 0);
  const badge   = DOM.cartCount();
  if (!badge) return;

  badge.textContent = count;
  // Trigger bump animation
  badge.classList.remove('bump');
  requestAnimationFrame(() => badge.classList.add('bump'));
}

/** Calculates and returns the total cart value */
function getCartTotal() {
  return state.products
    .filter((p) => p.isInCart)
    .reduce((sum, p) => sum + p.price * p.quantity, 0);
}

/** Renders cart items into the cart panel */
function renderCartItems() {
  const list = DOM.cartItemsList();
  if (!list) return;

  const cartProducts = state.products.filter((p) => p.isInCart);

  if (cartProducts.length === 0) {
    list.innerHTML = `
      <div class="cart-empty" role="status">
        <i class="ph ph-shopping-bag-open" aria-hidden="true"></i>
        <p>Your cart is empty</p>
        <p style="font-size:0.75rem;margin-top:0.25rem">Discover our collection and add your favourites.</p>
      </div>`;
    DOM.cartTotal().textContent = '$0.00';
    return;
  }

  // Build cart item HTML
  list.innerHTML = cartProducts.map((p) => `
    <div class="cart-item" data-id="${p.id}" role="listitem">
      <img
        src="${p.image}"
        alt="${p.name}"
        class="cart-item-img"
        loading="lazy"
      />
      <div class="cart-item-details">
        <p class="cart-item-name">${p.name}</p>
        <p class="cart-item-price">$${p.price.toLocaleString()}</p>
        <div class="cart-item-qty">
          <button
            class="cart-qty-btn"
            onclick="updateQuantity(${p.id}, -1)"
            aria-label="Decrease quantity of ${p.name}"
          >
            <i class="ph ph-minus" aria-hidden="true"></i>
          </button>
          <span class="cart-qty-value" aria-label="Quantity: ${p.quantity}">${p.quantity}</span>
          <button
            class="cart-qty-btn"
            onclick="updateQuantity(${p.id}, 1)"
            aria-label="Increase quantity of ${p.name}"
          >
            <i class="ph ph-plus" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <button
        class="cart-item-remove"
        onclick="removeFromCart(${p.id})"
        aria-label="Remove ${p.name} from cart"
      >
        <i class="ph ph-trash" aria-hidden="true"></i>
      </button>
    </div>
  `).join('');

  // Update total
  const total = getCartTotal();
  DOM.cartTotal().textContent = `$${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}

/** Handles checkout button click */
function handleCheckout() {
  const cartProducts = state.products.filter((p) => p.isInCart);
  if (cartProducts.length === 0) {
    showToast('Your cart is empty!', 'error', 'ph-warning');
    return;
  }

  if (!state.isLoggedIn) {
    showToast('Please sign in to checkout', 'info', 'ph-user');
    closeCart();
    setTimeout(() => { window.location.href = 'login.html'; }, 800);
    return;
  }

  showToast('Proceeding to checkout…', 'success', 'ph-check-circle');
  closeCart();
}


/* ============================================================
   08. FAVORITES SYSTEM
   ============================================================ */

/**
 * Toggles a product's favourite state.
 * @param {number} productId
 */
function toggleFavorite(productId) {
  const product = state.products.find((p) => p.id === productId);
  if (!product) return;

  product.isFavorite = !product.isFavorite;

  updateFavCount();
  renderProducts(state.filteredProducts);

  const message = product.isFavorite
    ? `${product.name} added to favourites`
    : `${product.name} removed from favourites`;
  const icon = product.isFavorite ? 'ph-heart' : 'ph-heart-break';
  showToast(message, product.isFavorite ? 'success' : 'info', icon);
}

/** Updates the favourites badge count */
function updateFavCount() {
  const count = state.products.filter((p) => p.isFavorite).length;
  const badge = DOM.favCount();
  if (!badge) return;

  badge.textContent = count;
  badge.classList.remove('bump');
  requestAnimationFrame(() => badge.classList.add('bump'));
}


/* ============================================================
   09. PRODUCT RENDERING
   ============================================================ */

/**
 * Renders the given product list into the products grid.
 * @param {Product[]} productList
 */
function renderProducts(productList) {
  const grid      = DOM.productsGrid();
  const noResults = DOM.noResults();
  if (!grid) return;

  // Show/hide no-results message
  if (productList.length === 0) {
    grid.innerHTML = '';
    noResults?.classList.remove('hidden');
    return;
  }

  noResults?.classList.add('hidden');

  // Build product card HTML
  grid.innerHTML = productList.map((product) => buildProductCard(product)).join('');

  // Attach lazy loading to newly rendered images
  lazyLoadImages();

  // Re-observe new reveal elements
  observeRevealElements();
}

/**
 * Builds HTML string for a single product card.
 * @param {Product} product
 * @returns {string}
 */
function buildProductCard(product) {
  const favClass  = product.isFavorite ? 'fav-active' : '';
  const cartClass = product.isInCart   ? 'in-cart'    : '';
  const cartLabel = product.isInCart   ? 'In Cart'    : 'Add to Cart';
  const cartIcon  = product.isInCart   ? 'ph-check'   : 'ph-shopping-bag';

  return `
    <article
      class="product-card reveal-up"
      role="listitem"
      aria-label="${product.name} — $${product.price}"
      data-product-id="${product.id}"
    >
      <!-- Product image -->
      <div class="product-img-wrap">
        <img
          data-src="${product.image}"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          alt="${product.name}"
          class="product-img"
          loading="lazy"
        />

        <!-- Category badge -->
        <span class="product-category-badge">${product.category}</span>

        <!-- Hover overlay with quick actions -->
        <div class="product-overlay" aria-hidden="true">
          <button
            class="product-overlay-btn ${favClass}"
            onclick="toggleFavorite(${product.id})"
            aria-label="${product.isFavorite ? 'Remove from' : 'Add to'} favourites"
            title="${product.isFavorite ? 'Remove from favourites' : 'Add to favourites'}"
          >
            <i class="ph${product.isFavorite ? '-fill' : ''} ph-heart" aria-hidden="true"></i>
          </button>
          <button
            class="product-overlay-btn"
            onclick="openQuickView(${product.id})"
            aria-label="Quick view ${product.name}"
            title="Quick view"
          >
            <i class="ph ph-eye" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <!-- Product info body -->
      <div class="product-body">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-gender">${product.gender}</p>

        <div class="product-price-row">
          <span class="product-price">$${product.price.toLocaleString()}</span>
          <button
            class="btn-add-cart ${cartClass}"
            onclick="toggleCartItem(${product.id})"
            aria-label="${cartLabel}: ${product.name}"
            id="cart-btn-${product.id}"
          >
            <i class="ph ${cartIcon}" aria-hidden="true"></i>
            ${cartLabel}
          </button>
        </div>
      </div>
    </article>
  `;
}


/* ============================================================
   10. SEARCH, FILTER & SORT
   ============================================================ */

/** Debounce utility — delays execution until user stops typing */
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/** Initialises all filter and sort controls */
function initFilters() {
  // Live search with debounce
  DOM.searchBox()?.addEventListener('input', debounce((e) => {
    state.searchText = e.target.value.trim().toLowerCase();
    applyFilters();
  }, 250));

  // Search field toggle (name vs category)
  DOM.searchType()?.addEventListener('change', (e) => {
    state.searchField = e.target.value;
    applyFilters();
  });

  // Sort order
  DOM.sortSelect()?.addEventListener('change', (e) => {
    state.sortOrder = e.target.value;
    applyFilters();
  });

  // Gender filter buttons
  DOM.genderBtns().forEach((btn) => {
    btn.addEventListener('click', () => {
      DOM.genderBtns().forEach((b) => {
        b.classList.remove('gender-btn-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('gender-btn-active');
      btn.setAttribute('aria-pressed', 'true');
      state.activeGender = btn.dataset.gender;
      applyFilters();
    });
  });
}

/** Applies all active filters and sorts the product list, then re-renders */
function applyFilters() {
  let results = [...state.products];

  // 1. Category filter
  if (state.activeCategory !== 'all') {
    results = results.filter((p) => p.category === state.activeCategory);
  }

  // 2. Gender filter
  if (state.activeGender !== 'all') {
    results = results.filter((p) => p.gender === state.activeGender);
  }

  // 3. Text search
  if (state.searchText) {
    results = results.filter((p) => {
      const field = state.searchField === 'name' ? p.name : p.category;
      return field.toLowerCase().includes(state.searchText);
    });
  }

  // 4. Sort
  results = sortProducts(results, state.sortOrder);

  state.filteredProducts = results;
  renderProducts(results);
}

/**
 * Sorts a product array by the given key.
 * @param {Product[]} products
 * @param {string} order - 'default' | 'price-asc' | 'price-desc' | 'name-asc'
 * @returns {Product[]}
 */
function sortProducts(products, order) {
  const sorted = [...products];

  switch (order) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break; // preserve original order
  }

  return sorted;
}


/* ============================================================
   11. CATEGORY FILTER
   ============================================================ */

/** Initialises category card click handlers */
function initCategoryFilter() {
  DOM.categoryCards().forEach((card) => {
    card.addEventListener('click', () => {
      // Update active state
      DOM.categoryCards().forEach((c) => {
        c.classList.remove('category-card-active');
        c.setAttribute('aria-pressed', 'false');
      });
      card.classList.add('category-card-active');
      card.setAttribute('aria-pressed', 'true');

      // Update state and filter
      state.activeCategory = card.dataset.filter;
      applyFilters();

      // Smooth scroll to products section
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}


/* ============================================================
   12. SCROLL REVEAL (IntersectionObserver)
   ============================================================ */

/** Observes elements with reveal classes and adds .visible when in viewport */
function initScrollReveal() {
  observeRevealElements();
}

function observeRevealElements() {
  const revealEls = document.querySelectorAll(
    '.reveal-up:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible), .reveal-scale:not(.visible)'
  );

  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, {
    root:       null,
    rootMargin: '0px 0px -80px 0px',
    threshold:  0.1,
  });

  revealEls.forEach((el) => observer.observe(el));
}


/* ============================================================
   13. HERO PARTICLES
   ============================================================ */

/** Creates floating gold particle dots in the hero section */
function initHeroParticles() {
  const container = DOM.heroParticles();
  if (!container) return;

  const PARTICLE_COUNT = 18;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const particle = document.createElement('span');
    particle.className = 'particle';

    // Random position
    particle.style.left    = `${Math.random() * 100}%`;
    particle.style.bottom  = `${Math.random() * 40}%`;

    // Random animation duration & delay for organic feel
    const duration = 6 + Math.random() * 8; // 6–14s
    const delay    = Math.random() * 6;      // 0–6s
    particle.style.setProperty('--duration', `${duration}s`);
    particle.style.setProperty('--delay',    `${delay}s`);

    // Random size
    const size = 2 + Math.random() * 3; // 2–5px
    particle.style.width  = `${size}px`;
    particle.style.height = `${size}px`;

    container.appendChild(particle);
  }
}


/* ============================================================
   14. TICKER BAR
   ============================================================ */

/**
 * The ticker bar is purely CSS-animated.
 * This function handles pause-on-hover via pointer events (accessibility).
 */
function initTicker() {
  const track = document.querySelector('.ticker-track');
  if (!track) return;
  // CSS handles the animation; JS only adds pointer event management
  track.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  track.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
}


/* ============================================================
   15. TESTIMONIALS SLIDER
   ============================================================ */

/** Initialises the testimonials carousel with prev/next and dot navigation */
function initTestimonialsSlider() {
  const track   = DOM.testimonialsTrack();
  const dotsEl  = DOM.sliderDots();
  const prevBtn = DOM.prevBtn();
  const nextBtn = DOM.nextBtn();

  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  state.totalSlides = cards.length;

  // Build dots
  if (dotsEl) {
    dotsEl.innerHTML = Array.from({ length: state.totalSlides }, (_, i) => `
      <button
        class="slider-dot ${i === 0 ? 'active' : ''}"
        role="tab"
        aria-selected="${i === 0 ? 'true' : 'false'}"
        aria-label="Go to testimonial ${i + 1}"
        data-index="${i}"
      ></button>
    `).join('');

    dotsEl.querySelectorAll('.slider-dot').forEach((dot) => {
      dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index)));
    });
  }

  prevBtn?.addEventListener('click', prevSlide);
  nextBtn?.addEventListener('click', nextSlide);

  // Auto-advance every 5 seconds
  let autoPlay = setInterval(nextSlide, 5000);

  // Pause autoplay on hover
  track.addEventListener('mouseenter', () => clearInterval(autoPlay));
  track.addEventListener('mouseleave', () => {
    autoPlay = setInterval(nextSlide, 5000);
  });

  // Touch/swipe support
  addSwipeSupport(track, nextSlide, prevSlide);
}

/** Advances to the next slide */
function nextSlide() {
  const next = (state.currentSlide + 1) % state.totalSlides;
  goToSlide(next);
}

/** Goes to the previous slide */
function prevSlide() {
  const prev = (state.currentSlide - 1 + state.totalSlides) % state.totalSlides;
  goToSlide(prev);
}

/**
 * Navigates to a specific testimonial slide.
 * On mobile: scrolls the card into view.
 * On desktop (3-col grid): cycles a highlight class.
 * @param {number} index
 */
function goToSlide(index) {
  state.currentSlide = index;

  const track = DOM.testimonialsTrack();
  const cards = track?.querySelectorAll('.testimonial-card');
  if (!cards) return;

  // Update dots
  DOM.sliderDots()?.querySelectorAll('.slider-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
    dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
  });

  // On small screens — scroll into view
  if (window.innerWidth < 1024) {
    cards[index]?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
  }

  // Highlight the active card with a subtle ring
  cards.forEach((card, i) => {
    if (i === index) {
      card.style.boxShadow = '0 0 0 2px var(--color-gold), var(--shadow-card)';
    } else {
      card.style.boxShadow = '';
    }
  });
}

/**
 * Adds basic touch swipe support to an element.
 * @param {HTMLElement} el
 * @param {Function} onSwipeLeft
 * @param {Function} onSwipeRight
 */
function addSwipeSupport(el, onSwipeLeft, onSwipeRight) {
  let startX = 0;

  el.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  el.addEventListener('touchend', (e) => {
    const diffX = startX - e.changedTouches[0].clientX;
    if (Math.abs(diffX) > 50) {
      diffX > 0 ? onSwipeLeft() : onSwipeRight();
    }
  }, { passive: true });
}


/* ============================================================
   16. FAQ ACCORDION
   ============================================================ */

/** Initialises the FAQ accordion — one item open at a time */
function initFAQ() {
  DOM.faqItems().forEach((item) => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all other items
      DOM.faqItems().forEach((other) => {
        if (other !== item) {
          other.classList.remove('open');
          const otherBtn    = other.querySelector('.faq-question');
          const otherAnswer = other.querySelector('.faq-answer');
          otherBtn?.setAttribute('aria-expanded', 'false');
          if (otherAnswer) otherAnswer.hidden = true;
        }
      });

      // Toggle current
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.hidden = isOpen;
    });
  });
}


/* ============================================================
   17. CONTACT FORM VALIDATION
   ============================================================ */

/** Initialises contact form with real-time validation */
function initContactForm() {
  const form = DOM.contactForm();
  if (!form) return;

  form.addEventListener('submit', handleContactSubmit);

  // Real-time validation on blur
  const fields = form.querySelectorAll('.form-input[required]');
  fields.forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validateField(field);
    });
  });
}

/**
 * Validates a single form field.
 * @param {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} field
 * @returns {boolean} - true if valid
 */
function validateField(field) {
  const value    = field.value.trim();
  const fieldId  = field.id;
  const errorEl  = document.getElementById(`err-${fieldId.replace('contact-', '')}`);
  let   message  = '';

  if (!value) {
    message = 'This field is required.';
  } else if (field.type === 'email' && !isValidEmail(value)) {
    message = 'Please enter a valid email address.';
  } else if (field.tagName === 'TEXTAREA' && value.length < 10) {
    message = 'Message must be at least 10 characters.';
  }

  field.classList.toggle('error', !!message);
  if (errorEl) errorEl.textContent = message;

  return !message;
}

/**
 * Validates email format.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Handles contact form submission */
function handleContactSubmit(e) {
  e.preventDefault();
  const form   = e.target;
  const fields = form.querySelectorAll('.form-input[required]');
  let   isValid = true;

  // Validate all required fields
  fields.forEach((field) => {
    if (!validateField(field)) isValid = false;
  });

  if (!isValid) {
    showToast('Please fill in all required fields correctly.', 'error', 'ph-warning');
    return;
  }

  // Simulate async form submission
  const submitBtn = form.querySelector('#contact-submit');
  if (submitBtn) {
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;
  }

  setTimeout(() => {
    // Show success message
    DOM.formSuccess()?.classList.remove('hidden');
    form.reset();
    form.querySelectorAll('.form-input').forEach((f) => f.classList.remove('error'));
    form.querySelectorAll('.form-error').forEach((e) => (e.textContent = ''));
    showToast('Message sent! We\'ll reply within 24 hours.', 'success', 'ph-check-circle');

    if (submitBtn) {
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message <i class="ph ph-paper-plane-tilt" aria-hidden="true"></i>';
    }

    // Auto-hide success banner
    setTimeout(() => DOM.formSuccess()?.classList.add('hidden'), 5000);
  }, 1400);
}


/* ============================================================
   18. NEWSLETTER FORM
   ============================================================ */

/** Initialises the footer newsletter subscription form */
function initNewsletter() {
  const form = DOM.newsletterForm();
  const msg  = DOM.newsletterMsg();
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('#newsletter-email');
    const email      = emailInput?.value.trim();

    if (!email || !isValidEmail(email)) {
      if (msg) {
        msg.textContent = 'Please enter a valid email address.';
        msg.style.color = 'var(--color-error)';
      }
      return;
    }

    // Simulate subscription
    setTimeout(() => {
      if (msg) {
        msg.textContent = '🎉 You\'re subscribed! Welcome to LUX.';
        msg.style.color = 'var(--color-success)';
      }
      form.reset();
      showToast('Welcome to the LUX family!', 'success', 'ph-envelope-open');
    }, 600);
  });
}


/* ============================================================
   19. QUICK-VIEW MODAL
   ============================================================ */

/** Initialises the product quick-view modal */
function initModal() {
  // Close modal on backdrop click
  DOM.quickViewModal()?.addEventListener('click', (e) => {
    if (e.target === DOM.quickViewModal()) closeModal();
  });

  // Close button
  DOM.modalClose()?.addEventListener('click', closeModal);
}

/**
 * Opens the quick-view modal for a specific product.
 * @param {number} productId
 */
function openQuickView(productId) {
  const product = state.products.find((p) => p.id === productId);
  if (!product) return;

  const modal   = DOM.quickViewModal();
  const content = DOM.quickViewContent();
  if (!modal || !content) return;

  const cartLabel = product.isInCart ? 'Remove from Cart' : 'Add to Cart';
  const favLabel  = product.isFavorite ? 'Favourited' : 'Add to Favourites';

  content.innerHTML = `
    <button id="modal-close" class="modal-close-btn" aria-label="Close modal">
      <i class="ph ph-x" aria-hidden="true"></i>
    </button>
    <div class="modal-product-layout">
      <img
        src="${product.image}"
        alt="${product.name}"
        class="modal-product-img"
        loading="lazy"
      />
      <div class="modal-product-info">
        <p class="modal-product-category">${product.category} · ${product.gender}</p>
        <h2 class="modal-product-name">${product.name}</h2>
        <p class="modal-product-price">$${product.price.toLocaleString()}</p>
        <p class="modal-product-desc">${product.desc}</p>
        <div class="modal-product-actions">
          <button
            class="btn-primary-cta"
            onclick="toggleCartItem(${product.id}); closeModal();"
            id="modal-cart-btn"
          >
            <i class="ph ${product.isInCart ? 'ph-minus-circle' : 'ph-shopping-bag'}" aria-hidden="true"></i>
            ${cartLabel}
          </button>
          <button
            class="btn-ghost-cta"
            onclick="toggleFavorite(${product.id})"
            id="modal-fav-btn"
          >
            <i class="ph${product.isFavorite ? '-fill' : ''} ph-heart" aria-hidden="true"></i>
            ${favLabel}
          </button>
        </div>
      </div>
    </div>
  `;

  // Re-attach close button event
  content.querySelector('#modal-close')?.addEventListener('click', closeModal);

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modal.focus();
}

/** Closes the quick-view modal */
function closeModal() {
  const modal = DOM.quickViewModal();
  if (!modal) return;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}


/* ============================================================
   20. TOAST NOTIFICATIONS
   ============================================================ */

/**
 * Shows a toast notification.
 * @param {string} message  - Text to display
 * @param {string} type     - 'success' | 'error' | 'info'
 * @param {string} iconName - Phosphor icon class (e.g. 'ph-check-circle')
 * @param {number} duration - Auto-dismiss after ms (default: 3500)
 */
function showToast(message, type = 'info', iconName = 'ph-info', duration = 3500) {
  const container = DOM.toastContainer();
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <i class="ph ${iconName} toast-icon" aria-hidden="true"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Auto-dismiss
  const timer = setTimeout(() => dismissToast(toast), duration);

  // Click to dismiss early
  toast.addEventListener('click', () => {
    clearTimeout(timer);
    dismissToast(toast);
  });
}

/**
 * Animates and removes a toast element.
 * @param {HTMLElement} toast
 */
function dismissToast(toast) {
  toast.classList.add('toast-out');
  toast.addEventListener('animationend', () => toast.remove(), { once: true });
}


/* ============================================================
   21. BACK TO TOP BUTTON
   ============================================================ */

/** Initialises the back-to-top button visibility and click behaviour */
function initBackToTop() {
  const btn = DOM.backToTop();
  if (!btn) return;

  // Show/hide based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
      btn.removeAttribute('hidden');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  // Smooth scroll to top on click
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ============================================================
   22. LAZY LOADING IMAGES
   ============================================================ */

/**
 * Observes all images with [data-src] and loads them
 * when they enter the viewport. Adds a .loaded class
 * for the blur-up transition defined in CSS.
 */
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]:not(.loaded)');
  if (!images.length) return;

  if (!('IntersectionObserver' in window)) {
    // Fallback: load all immediately
    images.forEach(loadImage);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImage(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    root:       null,
    rootMargin: '200px 0px',
    threshold:  0,
  });

  images.forEach((img) => observer.observe(img));
}

/**
 * Swaps a lazy image's placeholder src with the real one.
 * @param {HTMLImageElement} img
 */
function loadImage(img) {
  const src = img.getAttribute('data-src');
  if (!src) return;

  img.src = src;
  img.removeAttribute('data-src');
  img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
  // Handle error gracefully
  img.addEventListener('error', () => {
    img.classList.add('loaded');
    img.alt = 'Image unavailable';
  }, { once: true });
}


/* ============================================================
   23. KEYBOARD ACCESSIBILITY
   ============================================================ */

/** Handles keyboard navigation globally */
function initKeyboardAccessibility() {
  document.addEventListener('keydown', (e) => {
    // ESC closes modal, menu, or cart
    if (e.key === 'Escape') {
      if (!DOM.quickViewModal()?.classList.contains('hidden')) closeModal();
      else if (state.isCartOpen) closeCart();
      else if (state.isMenuOpen) closeMobileMenu();
    }

    // Arrow keys for testimonials slider when focused
    if (e.key === 'ArrowRight') {
      const focused = document.activeElement;
      if (focused?.closest('#testimonials')) nextSlide();
    }
    if (e.key === 'ArrowLeft') {
      const focused = document.activeElement;
      if (focused?.closest('#testimonials')) prevSlide();
    }
  });
}


/* ============================================================
   24. FOOTER YEAR
   ============================================================ */

/** Injects the current year into the footer copyright */
function setFooterYear() {
  const el = DOM.footerYear();
  if (el) el.textContent = new Date().getFullYear();
}


/* ============================================================
   HELPER — AUTH STATE (simulate session storage check)
   ============================================================ */

/**
 * Checks sessionStorage for a logged-in user and updates UI accordingly.
 * This mirrors the login/register flow from login.html and register.html.
 */
function checkAuthState() {
  try {
    const stored = sessionStorage.getItem('luxUser');
    if (!stored) return;

    const user = JSON.parse(stored);
    if (!user?.email) return;

    state.isLoggedIn = true;
    state.currentUser = user;

    // Swap auth buttons for user pill
    DOM.authButtons()?.classList.add('hidden');
    const pill = DOM.userPill();
    if (pill) {
      pill.classList.remove('hidden');
      const displayName = user.firstName || user.email.split('@')[0];
      const nameEl = DOM.userNameDisplay();
      if (nameEl) nameEl.textContent = displayName;
    }
  } catch (_) {
    // Silently handle corrupt storage
  }
}

/** Logs out the current user */
function handleLogout() {
  sessionStorage.removeItem('luxUser');
  state.isLoggedIn  = false;
  state.currentUser = null;

  DOM.userPill()?.classList.add('hidden');
  DOM.authButtons()?.classList.remove('hidden');

  showToast('You have been signed out.', 'info', 'ph-sign-out');
}


/* ============================================================
   25. INITIALISATION
   Wires everything together after the DOM is fully parsed.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Core UI --- */
  initLoadingScreen();
  setFooterYear();
  checkAuthState();

  /* --- Navigation --- */
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run once on load
  initActiveNavLinks();
  initMobileMenu();

  /* --- Cart & Favourites --- */
  initCart();

  /* --- Logout --- */
  DOM.btnLogout()?.addEventListener('click', handleLogout);

  /* --- Products --- */
  renderProducts(state.filteredProducts);
  initFilters();
  initCategoryFilter();

  /* --- Visuals & Animations --- */
  initScrollReveal();
  initHeroParticles();
  initTicker();
  initTestimonialsSlider();

  /* --- Interactions --- */
  initFAQ();
  initContactForm();
  initNewsletter();
  initModal();
  initBackToTop();

  /* --- Accessibility --- */
  initKeyboardAccessibility();

  /* --- Lazy load static images (non-product) --- */
  lazyLoadImages();

  /* --- Expose functions globally so inline onclick attributes work --- */
  window.toggleCartItem    = toggleCartItem;
  window.toggleFavorite    = toggleFavorite;
  window.updateQuantity    = updateQuantity;
  window.removeFromCart    = removeFromCart;
  window.openQuickView     = openQuickView;
  window.closeModal        = closeModal;
});
