<template>
  <div class="parfumania-app">
    <!-- Top Contact Bar -->


    <!-- Main Navigation -->
<!-- Main Navigation -->
<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
  <div class="container">
     <a class="navbar-brand brand-logo" href="/">
      <img src="@/assets/logopp.svg" alt="Parfumania Logo" style="height: 45px;" />
    </a>
    
    <!-- Mobile toggle button -->
    <button 
      class="navbar-toggler mobile-toggle" 
      type="button" 
      data-bs-toggle="collapse" 
      data-bs-target="#navbarNav"
      aria-controls="navbarNav" 
      aria-expanded="false" 
      aria-label="Toggle navigation"
    >
      <span class="mobile-toggle-icon">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mx-auto mobile-nav-menu">
      <li class="nav-item active">
  <a class="nav-link nav-link-enhanced" href="#" @click="closeMobileMenu">HOME</a>
</li>
<li class="nav-item">
  <router-link class="nav-link nav-link-enhanced" to="/categories" @click="closeMobileMenu">CATEGORIES</router-link>
</li>
<!-- <li class="nav-item">
  <a class="nav-link nav-link-enhanced" href="/" @click="closeMobileMenu">SHOP</a>
</li> -->
      </ul>
      
      <!-- Mobile search (will be hidden on desktop, shown in mobile menu) -->
      <div class="search-box-enhanced mobile-search">
  <input
    type="text"
    class="form-control"
    placeholder="Search fragrances..."
    v-model="searchQuery"
    @keyup.enter="handleSearch"
    @focus="searchFocused = true"
    @blur="() => setTimeout(() => searchFocused = false, 200)"
  >
  <button class="search-btn" @click="handleSearch">
    <i class="fas fa-search"></i>
  </button>
  <ul v-if="searchQuery && searchFocused && liveSearchResults.length" class="search-dropdown">
    <li v-for="product in liveSearchResults" :key="product.id">
      <router-link :to="`/product/${product.id}`" @click.native="searchFocused = false">
        <img :src="product.imageUrl" alt="" class="dropdown-thumb" />
        {{ product.title }}
      </router-link>
    </li>
    <li v-if="liveSearchResults.length === 0" class="no-results">No results found.</li>
  </ul>
</div>

<div class="search-box-enhanced desktop-search">
  <input
    type="text"
    class="form-control"
    placeholder="Search fragrances..."
    v-model="searchQuery"
    @keyup.enter="handleSearch"
    @focus="searchFocused = true"
    @blur="() => setTimeout(() => searchFocused = false, 200)"
  >
  <button class="search-btn" @click="handleSearch">
    <i class="fas fa-search"></i>
  </button>
  <ul v-if="searchQuery && searchFocused && liveSearchResults.length" class="search-dropdown">
    <li v-for="product in liveSearchResults" :key="product.id">
      <router-link :to="`/product/${product.id}`" @click.native="searchFocused = false">
        <img :src="product.imageUrl" alt="" class="dropdown-thumb" />
        {{ product.title }}
      </router-link>
    </li>
    <li v-if="liveSearchResults.length === 0" class="no-results">No results found.</li>
  </ul>
</div>
    </div>
  </div>
</nav>

    <!-- Hero Banner -->
<div class="hero-banner-enhanced" :style="{ backgroundImage: `url(${heroImg})` }">
      <div class="hero-overlay"></div>
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6">
            <div class="hero-content-enhanced">
              <span class="hero-badge">New Collection</span>
              <h1 class="hero-title">Bashkohuni me bukurinë</h1>
              <p class="hero-subtitle">Zbuloni koleksionet tona të parfumeve të luksit dhe gjeni aromën tuaj të përsosur</p>
              <div class="hero-buttons">
                <router-link to="/categories" class="btn btn-primary-enhanced me-3">SHOP NOW</router-link>
                <router-link to="/categories" class="btn btn-outline-light-enhanced">VIEW COLLECTION</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Categories -->
    <div class="categories-section-enhanced py-5">
      <div class="container">
        <div class="section-header text-center mb-5">
          <h2 class="section-title">Featured Categories</h2>
          <p class="section-subtitle">Discover our curated selection of premium fragrances</p>
        </div>
        <div class="row g-4">
          <div class="col-md-3 col-sm-6 mb-4" v-for="(cat, i) in 4" :key="i">
            <div class="category-card-enhanced">
              <div class="category-image-wrapper">
              <img :src="categoryImages[i]" alt="Perfume Category" class="category-image" />
                
              </div>
              <div class="category-info">
                <h6 class="category-title">
                  <span v-if="i === 0">Parfume për meshkuj</span>
                  <span v-else-if="i === 1">Parfume për femra</span>
                  <span v-else-if="i === 2">Parfuma Arab</span>
                  <span v-else>Sol De Janeiro</span>
                </h6>
                <p class="category-price">
                  Starting from 
                  <span class="price-highlight">
                    <span v-if="i === 0">€39.99 €</span>
                    <span v-else-if="i === 1">€39.99</span>
                    <span v-else-if="i === 2">€39.99</span>
                    <span v-else>€39.99</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Best Selling Products -->
    <div class="best-selling-section py-5 bg-light">
      <div class="container">
        <div class="section-header text-center mb-5">
          <h2 class="section-title">Best Selling Products</h2>
          <p class="section-subtitle">Our customers' favorite fragrances</p>
        </div>

        <ul class="nav justify-content-center product-categories-enhanced mb-5">
          <li class="nav-item">
            <a class="nav-link active" href="#">All Products</a>
          </li>
          <!-- <li class="nav-item"> -->
            <!-- <a class="nav-link" href="#">Men's</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Women's</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Unisex</a>
          </li> -->
        </ul>

        <div class="row g-4">
          <div v-if="loading" class="col-12 text-center py-5">
            <div class="loading-spinner">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3 text-muted">Loading products...</p>
            </div>
          </div>

          <div v-else-if="displayedBestSelling.length === 0" class="col-12 text-center py-5">
            <div class="empty-state">
              <i class="fas fa-search fa-3x text-muted mb-3"></i>
              <p class="text-muted">No products found.</p>
            </div>
          </div>

<router-link
  v-for="product in displayedBestSelling"
  :key="product.id"
  :to="`/product/${product.id}`"
  class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 product-link"
  style="text-decoration: none;"
>
  <div class="product-card-enhanced">
    <div class="product-badges">
      <span class="badge-discount" v-if="product.discount">-{{ product.discount }}%</span>
      <span class="badge-bestseller">Bestseller</span>
    </div>
    <div class="product-image-container-enhanced">
      <!-- Loading spinner overlay -->
      <div v-if="isImageLoading(product.id)" class="image-loading-overlay">
        <div class="image-loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
      </div>
      <img 
        :src="product.imageUrl" 
        loading="lazy" 
        :alt="product.title" 
        class="product-image-enhanced"
        @loadstart="handleImageLoadStart(product.id)"
        @load="handleImageLoad(product.id)"
        @error="handleImageLoad(product.id)"
      />
    </div>
    <div class="product-details-enhanced">
      <h6 class="product-name-enhanced mb-2">{{ product.title }}</h6>
      <div class="product-info-row d-flex justify-content-between align-items-center">
        <p class="product-category-enhanced mb-0">{{ product.category }}</p>
        <div class="product-price-right text-end">
          <span class="current-price d-block">{{ product.price }}€</span>
          <span class="original-price d-block" v-if="product.discount">{{ Math.round(product.price * 1.2) }}€</span>
        </div>
      </div>
    </div>
  </div>
</router-link>
          
        </div>
      <div class="pagination-wrapper" v-if="totalBestSellingPages > 1">
  <nav class="pagination-nav">
    <ul class="pagination-list">
      <!-- Previous Button -->
      <li class="pagination-item">
        <button 
          class="pagination-btn pagination-btn-nav" 
          @click="prevBestSellingPage"
          :disabled="currentBestSellingPage === 1"
          :class="{ 'disabled': currentBestSellingPage === 1 }"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
      </li>
      
      <!-- Page Numbers -->
      <li class="pagination-item" v-for="page in bestSellingPaginationNumbers" :key="page">
        <button 
          class="pagination-btn pagination-btn-number" 
          @click="goToBestSellingPage(page)"
          :class="{ 'active': currentBestSellingPage === page }"
        >
          {{ page }}
        </button>
      </li>
      
      <!-- Next Button -->
      <li class="pagination-item">
        <button 
          class="pagination-btn pagination-btn-nav" 
          @click="nextBestSellingPage"
          :disabled="currentBestSellingPage === totalBestSellingPages"
          :class="{ 'disabled': currentBestSellingPage === totalBestSellingPages }"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </li>
    </ul>
    
    <!-- Page Info -->
    <div class="pagination-info">
      <span class="pagination-text">
        Page {{ currentBestSellingPage }} of {{ totalBestSellingPages }} 
        ({{ allBestSellingProducts.length }} products)
      </span>
    </div>
  </nav>
</div>

        <!-- Enhanced Pagination -->
        <!-- <div class="pagination-enhanced mt-5">
          <div class="pagination-dots">
            <span class="pagination-dot active"></span>
            <span class="pagination-dot"></span>
            <span class="pagination-dot"></span>
          </div>
        </div> -->
      </div>
    </div>

    <!-- Collection Feature -->
    <div class="collection-feature-enhanced">
      <div class="container">
        <div class="row align-items-center g-0">
          <div class="col-md-6">
            <div class="collection-image-wrapper">
              <img src="/src/assets/DRILA.PNG" alt="Alexandria Collection" class="collection-image">
            </div>
          </div>
          <div class="col-md-6">
            <div class="collection-content">
              <span class="collection-badge">Exclusive Collection</span>
              <h2 class="collection-title">COLLECTION OF Alexandria</h2>
              <p class="collection-description">Discover our premium Alexandria collection featuring the finest ingredients and craftsmanship. Each fragrance tells a unique story of elegance and sophistication.</p>
              <div class="collection-features">
                <div class="feature-item">
                  <i class="fas fa-award"></i>
                  <span>Premium Quality</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-leaf"></i>
                  <span>Natural Ingredients</span>
                </div>
                <div class="feature-item">
                  <i class="fas fa-clock"></i>
                  <span>Long Lasting</span>
                </div>
              </div>
<router-link to="/categories?category=XERIOEFF" class="btn btn-primary-enhanced mt-4">VIEW COLLECTION</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- New Products Section -->
    <div class="new-products-section py-5">
      <div class="container">
        <div class="section-header text-center mb-5">
          <h2 class="section-title">New Arrivals</h2>
          <p class="section-subtitle">Fresh fragrances just landed</p>
        </div>

        <div class="row g-4">
          <div v-if="loading" class="col-12 text-center py-5">
            <div class="loading-spinner">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3 text-muted">Loading new products...</p>
            </div>
          </div>

          <div v-else-if="displayedNewProducts.length === 0" class="col-12 text-center py-5">
            <div class="empty-state">
              <i class="fas fa-box-open fa-3x text-muted mb-3"></i>
              <p class="text-muted">No new products found.</p>
            </div>
          </div>

<!-- filepath: c:\Users\PC\Desktop\parfumania\src\views\HomeView.vue -->
<router-link
  v-for="product in displayedNewProducts"
  :key="product.id"
  :to="`/product/${product.id}`"
  class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 product-link"
  style="text-decoration: none;"
>
  <div class="product-card-enhanced new-product">
    <div class="product-badges">
      <span class="badge-new" v-if="product.new">New</span>
      <span class="badge-discount" v-if="product.discount">-{{ product.discount }}%</span>
    </div>
    <div class="product-image-container-enhanced">
      <!-- Loading spinner overlay -->
      <div v-if="isImageLoading(product.id)" class="image-loading-overlay">
        <div class="image-loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
      </div>
      <img 
        :src="product.imageUrl" 
        :alt="product.title" 
        class="product-image-enhanced"
        @loadstart="handleImageLoadStart(product.id)"
        @load="handleImageLoad(product.id)"
        @error="handleImageLoad(product.id)"
      />
    </div>
    <div class="product-details-enhanced">
      <h6 class="product-name-enhanced mb-2">{{ product.title }}</h6>
      <div class="product-info-row d-flex justify-content-between align-items-center">
        <p class="product-category-enhanced mb-0">{{ product.category }}</p>
        <div class="product-price-right text-end">
          <span class="current-price d-block">{{ product.price }}€</span>
          <span class="original-price d-block" v-if="product.discount">{{ Math.round(product.price * 1.2) }}€</span>
        </div>
      </div>
    </div>
  </div>
</router-link>
        </div>
      </div>
    </div>
    <!-- See More Button for New Products -->
<div class="pagination-wrapper" v-if="totalNewProductsPages > 1">
  <nav class="pagination-nav">
    <ul class="pagination-list">
      <!-- Previous Button -->
      <li class="pagination-item">
        <button 
          class="pagination-btn pagination-btn-nav" 
          @click="prevNewProductsPage"
          :disabled="currentNewProductsPage === 1"
          :class="{ 'disabled': currentNewProductsPage === 1 }"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
      </li>
      
      <!-- Page Numbers -->
      <li class="pagination-item" v-for="page in newProductsPaginationNumbers" :key="page">
        <button 
          class="pagination-btn pagination-btn-number" 
          @click="goToNewProductsPage(page)"
          :class="{ 'active': currentNewProductsPage === page }"
        >
          {{ page }}
        </button>
      </li>
      
      <!-- Next Button -->
      <li class="pagination-item">
        <button 
          class="pagination-btn pagination-btn-nav" 
          @click="nextNewProductsPage"
          :disabled="currentNewProductsPage === totalNewProductsPages"
          :class="{ 'disabled': currentNewProductsPage === totalNewProductsPages }"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </li>
    </ul>
    
    <!-- Page Info -->
    <div class="pagination-info">
      <span class="pagination-text">
        Page {{ currentNewProductsPage }} of {{ totalNewProductsPages }} 
        ({{ allNewProducts.length }} products)
      </span>
    </div>
  </nav>
</div>
    <!-- Enhanced Footer -->
    <footer class="footer-enhanced">
      <div class="footer-main">
        <div class="container">
          <div class="row g-4">
            <div class="col-md-3 col-sm-6 mb-4">
              <div class="footer-section">
                 <a class="navbar-brand brand-logo" href="/">
      <img src="@/assets/favicon.svg" alt="Parfumania Logo" style="height: 50px;" />
    </a>
                <div class="social-icons-enhanced">
                  <a href="https://www.instagram.com/parfumania_ks/" class="social-link"><i class="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
            <div class="col-md-2 col-sm-6 mb-4">
              <div class="footer-section">
                <h5 class="footer-title">INFORMATION</h5>
                <ul class="footer-links">
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Contact Us</a></li>
                </ul>
              </div>
            </div>
            <div class="col-md-2 col-sm-6 mb-4">
            </div>
            <div class="col-md-2 col-sm-6 mb-4">
              <div class="footer-section">
                <h5 class="footer-title">CATEGORIES</h5>
                <ul class="footer-links">
                  <li><a href="#">Men's Fragrances</a></li>
                  <li><a href="#">Women's Fragrances</a></li>
                  <li><a href="#">Unisex</a></li>
                </ul>
              </div>
            </div>
            <div class="col-md-3 col-sm-12 mb-4">
              <div class="footer-section">
                <!-- <h5 class="footer-title">CONTACT INFO</h5> -->
                <div class="contact-info-enhanced">
                  <!-- <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>E shtoj ma vone<br>E shtoj ma vone</span>
                  </div>
                  <div class="contact-item">
                    <i class="fas fa-phone-alt"></i>
                    <span>+355 E shtoj ma vone</span>
                  </div> -->
                  <!-- <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <span>info@parfumania.com</span>
                  </div> -->
                  <!-- <div class="contact-item">
                    <i class="fas fa-clock"></i>
                    <span>Mon-Fri: 9:00-18:00<br>Sat-Sun: 10:00-16:00</span>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6">
              <p class="copyright">© 2025 Parfumania. All rights reserved.</p>
            </div>
            <div class="col-md-6">
              <div class="payment-methods">
                <span class="payment-text">We accept:</span>
                <div class="payment-icons">
                  <i class="fab fa-cc-visa"></i>
                  <i class="fab fa-cc-mastercard"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { db } from '@/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import heroImg from '@/assets/background.jpeg'
import img0 from '@/assets/FullSizeRender.jpeg'
import img1 from '@/assets/soul1.jpeg'
import img2 from '@/assets/soul2.jpeg'
import img3 from '@/assets/soul3.jpeg'
import productService from '@/services/productService'


export default {
  name: 'ParfumUmana',
  data() {
    return {
        categoryImages: [img0, img1, img2, img3],
      heroImg,
      bestSellingProducts: [],
      newProducts: [],
      allProducts: [],
      loading: true,
          searchQuery: '',
              searchFocused: false,

       allBestSellingProducts: [], // Store all best-selling products
    allNewProducts: [], // Store all new products
    showAllBestSelling: false, // Toggle for showing all best-selling
    showAllNew: false, // Toggle for showing all new
    displayLimit: 6, // How many to show initially
      // Pagination for Best Selling
    currentBestSellingPage: 1,
    bestSellingItemsPerPage: 6,
    
    // Pagination for New Products
    currentNewProductsPage: 1,
    newProductsItemsPerPage: 6,
    imageLoadingStates: {}
    }
  },
async created() {
  try {
    // Single fetch for all products using the service
    this.allProducts = await productService.getProducts()
    this.allBestSellingProducts = await productService.getBestSellingProducts()
    this.allNewProducts = await productService.getNewProducts()
  } catch (err) {
    console.error('Error fetching products:', err)
  } finally {
    this.loading = false
  }
},
computed: {
  liveSearchResults() {
    if (!this.searchQuery) return [];
    return productService.searchProducts(this.searchQuery).slice(0, 8);
  },
  
  // Best Selling Products
  filteredBestSellingProducts() {
    if (!this.searchQuery) return this.allBestSellingProducts;
    const q = this.searchQuery.toLowerCase();
    return this.allBestSellingProducts.filter(
      p => (p.title && p.title.toLowerCase().includes(q)) ||
           (p.category && p.category.toLowerCase().includes(q))
    );
  },
  
  totalBestSellingPages() {
    return Math.ceil(this.filteredBestSellingProducts.length / this.bestSellingItemsPerPage);
  },
  
  displayedBestSelling() {
    const start = (this.currentBestSellingPage - 1) * this.bestSellingItemsPerPage;
    const end = start + this.bestSellingItemsPerPage;
    return this.filteredBestSellingProducts.slice(start, end);
  },
  
  bestSellingPaginationNumbers() {
    const total = this.totalBestSellingPages;
    const current = this.currentBestSellingPage;
    const delta = 2;
    
    let pages = [];
    
    if (total > 0) pages.push(1);
    
    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    
    if (total > 1 && !pages.includes(total)) pages.push(total);
    
    return pages;
  },

  // New Products  
  filteredNewProducts() {
    if (!this.searchQuery) return this.allNewProducts;
    const q = this.searchQuery.toLowerCase();
    return this.allNewProducts.filter(
      p => (p.title && p.title.toLowerCase().includes(q)) ||
           (p.category && p.category.toLowerCase().includes(q))
    );
  },
  
  totalNewProductsPages() {
    return Math.ceil(this.filteredNewProducts.length / this.newProductsItemsPerPage);
  },
  
  displayedNewProducts() {
    const start = (this.currentNewProductsPage - 1) * this.newProductsItemsPerPage;
    const end = start + this.newProductsItemsPerPage;
    return this.filteredNewProducts.slice(start, end);
  },
  
  newProductsPaginationNumbers() {
    const total = this.totalNewProductsPages;
    const current = this.currentNewProductsPage;
    const delta = 2;
    
    let pages = [];
    
    if (total > 0) pages.push(1);
    
    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    
    if (total > 1 && !pages.includes(total)) pages.push(total);
    
    return pages;
  }
},
methods: {
    handleSearch() {
         if (this.searchQuery.trim()) {
      // Navigate to categories page with search query
      this.$router.push({
        path: '/categories',
        query: { search: this.searchQuery.trim() }
      });
      this.searchFocused = false;
    }
  },
     handleImageLoadStart(productId) {
      this.$set(this.imageLoadingStates, productId, true)
    },
    
    handleImageLoad(productId) {
      this.$set(this.imageLoadingStates, productId, false)
    },
    
    isImageLoading(productId) {
      return this.imageLoadingStates[productId] === true
    },
  // Best Selling Pagination Methods
       closeMobileMenu() {
      bsCollapse.hide();

  },
  goToBestSellingPage(page) {
    if (page >= 1 && page <= this.totalBestSellingPages) {
      this.currentBestSellingPage = page;
      // Smooth scroll to section
      this.$nextTick(() => {
        const element = document.querySelector('.best-selling-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  },
  nextBestSellingPage() {
    if (this.currentBestSellingPage < this.totalBestSellingPages) {
      this.goToBestSellingPage(this.currentBestSellingPage + 1);
    }
  },
  prevBestSellingPage() {
    if (this.currentBestSellingPage > 1) {
      this.goToBestSellingPage(this.currentBestSellingPage - 1);
    }
  },
  
  // New Products Pagination Methods
  goToNewProductsPage(page) {
    if (page >= 1 && page <= this.totalNewProductsPages) {
      this.currentNewProductsPage = page;
      this.$nextTick(() => {
        const element = document.querySelector('.new-products-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  },
  nextNewProductsPage() {
    if (this.currentNewProductsPage < this.totalNewProductsPages) {
      this.goToNewProductsPage(this.currentNewProductsPage + 1);
    }
  },
  prevNewProductsPage() {
    if (this.currentNewProductsPage > 1) {
      this.goToNewProductsPage(this.currentNewProductsPage - 1);
    }
  },
},
}
</script>

<style scoped>
/* ...existing code... */
.search-dropdown {
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  z-index: 100;
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 260px;
  overflow-y: auto;
}

.search-dropdown li {
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-dropdown li:not(:last-child) {
  border-bottom: 1px solid #f1f3f4;
}

.search-dropdown li .dropdown-thumb {
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 8px;
}

.search-dropdown li a {
  color: #333;
  text-decoration: none;
  flex: 1;
}

.search-dropdown li a:hover {
  color: #A62C2C;
}

.no-results {
  color: #999;
  text-align: center;
  padding: 12px 0;
}
/* ...existing code... */
/* Enhanced Global Styles */
.parfumania-app {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Contact Bar Enhancements */
.contact-bar {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-bottom: 1px solid #e9ecef;
}

.contact-info {
  font-weight: 500;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f8f9fa;
  color: #666;
  transition: all 0.3s ease;
  text-decoration: none;
}

.action-btn:hover {
  background: #A62C2C;
  color: white;
  transform: translateY(-2px);
}

.action-btn .badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #dc3545;
  color: white;
  font-size: 10px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Enhanced Navigation */
.navbar {
  padding: 1rem 0;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.95) !important;
}

.brand-logo {
  text-decoration: none;
}

.text-gradient {
  background: linear-gradient(135deg, #A62C2C 0%, #f74c4c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-tagline {
  display: block;
  font-size: 11px;
  color: #666;
  margin-top: -5px;
  letter-spacing: 1px;
}

.nav-link-enhanced {
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.5px;
  padding: 0.75rem 1.25rem !important;
  position: relative;
  transition: all 0.3s ease;
}

.nav-link-enhanced::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 50%;
  background: linear-gradient(135deg, #A62C2C 0%, #f74c4c 100%);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link-enhanced:hover::after,
.nav-item.active .nav-link-enhanced::after {
  width: 80%;
}

.search-box-enhanced {
  position: relative;
  width: 280px;
}

.search-box-enhanced input {
  padding: 12px 50px 12px 20px;
  border: 2px solid #e9ecef;
  border-radius: 50px;
  font-size: 14px;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.search-box-enhanced input:focus {
  border-color: #A62C2C;
  box-shadow: 0 0 0 0.2rem rgba(255, 30, 0, 0.25);
  background: white;
  outline: none;
}

.search-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: #A62C2C;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.search-btn:hover {
  background: #F7374F;
  transform: translateY(-50%) scale(1.05);
}

/* Enhanced Hero Section */
.hero-banner-enhanced {
  height: 600px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 100%);
}

.hero-content-enhanced {
  position: relative;
  z-index: 2;
  max-width: 600px;
}

.hero-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn-primary-enhanced {
  background: linear-gradient(135deg, #A62C2C 0%, #F7374F 100%);
  border: none;
  color: white;
  padding: 15px 30px;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-primary-enhanced:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 30, 0, 0.25);
}

.btn-outline-light-enhanced {
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.8);
  color: white;
  padding: 13px 30px;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-outline-light-enhanced:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  backdrop-filter: blur(10px);
}

/* Section Headers */
.section-header {
  margin-bottom: 60px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
  position: relative;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #666;
  max-width: 500px;
  margin: 0 auto;
}

/* Enhanced Categories */
.categories-section-enhanced {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.category-card-enhanced {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  position: relative;
}

.category-card-enhanced:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.category-image-wrapper {
  position: relative;
  overflow: hidden;
  height: 250px;
}

.category-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.4s ease;
}

.category-card-enhanced:hover .category-image {
  transform: scale(1.1);
}

.category-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
}

.category-card-enhanced:hover .category-overlay {
  opacity: 1;
}

.category-info {
  padding: 25px;
  text-align: center;
}

.category-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.category-price {
  color: #666;
  font-size: 14px;
}

.price-highlight {
  color: #A62C2C;
  font-weight: 600;
  font-size: 16px;
}

/* Enhanced Product Categories Filter */
.product-categories-enhanced {
  background: white;
  border-radius: 50px;
  padding: 8px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
  display: inline-flex;
  margin: 0 auto;
}

.product-categories-enhanced .nav-link {
  color: #666;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 24px;
  border-radius: 50px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.product-categories-enhanced .nav-link.active,
.product-categories-enhanced .nav-link:hover {
  background: linear-gradient(135deg, #A62C2C 0%, #F7374F 100%);
  color: white;
  transform: translateY(-2px);
}

/* Enhanced Product Cards */
.product-card-enhanced {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* .product-card-enhanced:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
} */

.product-card-enhanced::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: all 0.6s;
}

.product-card-enhanced:hover::before {
  left: 100%;
}

.product-badges {
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.badge-discount {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.badge-bestseller {
  background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.badge-new {
  background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.product-image-container-enhanced {
  position: relative;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  border-radius: 15px;
  overflow: hidden;
  background: #ffffff;
}

.product-image-enhanced {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  transition: all 0.3s ease;
}

.product-card-enhanced:hover .product-image-enhanced {
  transform: scale(1.05);
}

.product-actions {
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.3s ease;
}

.product-card-enhanced:hover .product-actions {
  opacity: 1;
  transform: translateX(0);
}

.action-btn-small {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.action-btn-small:hover {
  background: #A62C2C;
  color: white;
  transform: scale(1.1);
}

.product-rating-enhanced {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 10px;
}

.stars {
  display: flex;
  gap: 2px;
}

.stars i {
  color: #ffc107;
  font-size: 12px;
}

.rating-count {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.product-details-enhanced {
  display: flex;
  flex-direction: column;
}

.product-name-enhanced {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.3;
  min-height: 35px;
  display: flex;
  align-items: center;
}

.product-category-enhanced {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.product-price-enhanced {
  margin-bottom: 15px;
}

.current-price {
  font-size: 16px;
  font-weight: 700;
  color: #A62C2C;
}

.original-price {
  font-size: 14px;
  color: #999;
  text-decoration: line-through;
  margin-left: 8px;
}

.btn-add-to-cart {
  background: linear-gradient(135deg, #A62C2C 0%, #F7374F 100%);
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(10px);
}

.product-card-enhanced:hover .btn-add-to-cart {
  opacity: 1;
  transform: translateY(0);
}

.btn-add-to-cart:hover {
  background: linear-gradient(135deg, #F7374F 0%, #A62C2C 100%);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 30, 0, 0.25);
}

/* Loading and Empty States */
.loading-spinner,
.empty-state {
  padding: 60px 20px;
}

.loading-spinner .spinner-border {
  width: 3rem;
  height: 3rem;
}

/* Enhanced Pagination */
.pagination-enhanced {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-dots {
  display: flex;
  gap: 12px;
  align-items: center;
}

.pagination-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #dee2e6;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-dot.active {
  background: linear-gradient(135deg, #A62C2C 0%, #F7374F 100%);
  transform: scale(1.2);
}

.pagination-dot:hover {
  background: #A62C2C;
  transform: scale(1.1);
}

/* Enhanced Collection Feature */
.collection-feature-enhanced {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.collection-feature-enhanced::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 66, 41, 0.02) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.collection-image-wrapper {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.collection-image {
  width: 100%;
  height: auto;
  display: block;
  transition: all 0.4s ease;
}

.collection-content {
  padding: 60px;
  position: relative;
  z-index: 2;
}

.collection-badge {
  display: inline-block;
  background: linear-gradient(135deg, #A62C2C 0%, #f74c4c 100%);
  color: white;
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.collection-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.2;
}

.collection-description {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 30px;
}

.collection-features {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  color: #333;
}

.feature-item i {
  color: #A62C2C;
  font-size: 16px;
  width: 20px;
}

/* Enhanced Footer */
.footer-enhanced {
  background: #1a1a1a;
  color: #ffffff;
}

.footer-main {
  padding: 60px 0 40px;
}

.footer-section {
  height: 100%;
}

.footer-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 25px;
  position: relative;
}

.footer-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(135deg, #A62C2C 0%, #6610f2 100%);
}

.footer-description {
  color: #cccccc;
  line-height: 1.6;
  margin-bottom: 25px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: #cccccc;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
}

.footer-links a:hover {
  color: #A62C2C;
  padding-left: 8px;
}

.social-icons-enhanced {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  color: #cccccc;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #A62C2C;
  color: white;
  transform: translateY(-3px);
}

.contact-info-enhanced {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: #cccccc;
  font-size: 14px;
  line-height: 1.5;
}

.contact-item i {
  color: #A62C2C;
  margin-top: 2px;
  width: 16px;
}

.footer-bottom {
  border-top: 1px solid #333;
  padding: 25px 0;
  background: #0d0d0d;
}

.copyright {
  color: #999;
  font-size: 14px;
  margin: 0;
}

.payment-methods {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
}

.payment-text {
  color: #999;
  font-size: 14px;
}

.payment-icons {
  display: flex;
  gap: 10px;
}

.payment-icons i {
  font-size: 28px;
  color: #666;
  transition: all 0.3s ease;
}

.payment-icons i:hover {
  color: #A62C2C;
  transform: scale(1.1);
}

/* Responsive Design */
@media (max-width: 992px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .collection-content {
    padding: 40px 20px;
  }
  
  .collection-title {
    font-size: 2rem;
  }
  
  .search-box-enhanced {
    width: 100%;
    margin-top: 15px;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .product-categories-enhanced {
    flex-direction: column;
    border-radius: 15px;
    width: 100%;
  }
  
  .product-categories-enhanced .nav-link {
    text-align: center;
    border-radius: 10px;
  }
  
  .collection-features {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .feature-item {
    flex-basis: 48%;
  }
  
  .payment-methods {
    justify-content: center;
    margin-top: 20px;
  }
}

@media (max-width: 576px) {
  .hero-banner-enhanced {
    height: 400px;
  }
  
  .hero-content-enhanced {
    text-align: center;
    padding: 0 20px;
  }
  
  .hero-title {
    font-size: 1.8rem;
  }
  
  .btn-primary-enhanced,
  .btn-outline-light-enhanced {
    padding: 12px 24px;
    font-size: 14px;
  }
  
  .product-card-enhanced {
    padding: 15px;
  }
  
  .product-image-container-enhanced {
    height: 150px;
  }
}
.btn-outline-primary-enhanced {
  background: transparent;
  border: 2px solid #A62C2C;
  color: #A62C2C;
  padding: 12px 30px;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-outline-primary-enhanced:hover {
  background: #A62C2C;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 30, 0, 0.25);
}
/* Enhanced Pagination Styles */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 20px;
}

.pagination-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.pagination-list {
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
  background: white;
  border-radius: 50px;
  padding: 8px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.pagination-item {
  margin: 0;
}

.pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #666;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.pagination-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #A62C2C 0%, #F7374F 100%);
  opacity: 0;
  transition: all 0.3s ease;
  border-radius: 50%;
  transform: scale(0.8);
}

.pagination-btn:hover::before {
  opacity: 1;
  transform: scale(1);
}

.pagination-btn:hover {
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 30, 0, 0.25);
}

.pagination-btn.active {
  background: linear-gradient(135deg, #A62C2C 0%, #F7374F 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 30, 0, 0.25);
}

.pagination-btn.active::before {
  opacity: 0;
}

.pagination-btn.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.pagination-btn-nav {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
}

.pagination-btn-nav:hover:not(.disabled) {
  background: #A62C2C;
  border-color: #A62C2C;
  color: white;
}

.pagination-btn-number {
  font-weight: 700;
}

.pagination-info {
  text-align: center;
}

.pagination-text {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

/* Responsive Pagination */
@media (max-width: 768px) {
  .pagination-list {
    gap: 4px;
    padding: 6px;
  }
  
  .pagination-btn {
    min-width: 36px;
    height: 36px;
    font-size: 13px;
  }
  
  .pagination-text {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .pagination-wrapper {
    margin-top: 30px;
  }
  
  .pagination-list {
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 20px;
    background: #f8f9fa;
    box-shadow: none;
    border: 1px solid #e9ecef;
  }
  
  .pagination-btn {
    min-width: 32px;
    height: 32px;
    font-size: 12px;
  }
  
  .pagination-nav {
    gap: 10px;
  }
}

/* Animation for page transitions */
.product-card-enhanced {
  animation: fadeInUp 0.6s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Loading state for pagination */
.pagination-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.pagination-loading .spinner-border {
  width: 2rem;
  height: 2rem;
  border-width: 3px;
}
.product-info-left {
  flex: 1;
}

.product-price-right {
  text-align: right;
  min-width: 70px;
  align-self: flex-end; /* Align the price to the bottom */
}

.btn-add-to-cart-wrapper {
  width: 100%;
  text-align: center;

}

.btn-add-to-cart {
  background: linear-gradient(135deg, #A62C2C 0%, #F7374F 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.btn-add-to-cart:hover {
  background: linear-gradient(135deg, #F7374F 0%, #A62C2C 100%);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 30, 0, 0.25);
}
.product-name-enhanced {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  line-height: 1.3;
  min-height: 35px;
}

.product-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-category-enhanced {
  font-size: 12px;
  color: #666;
}

.product-price-right {
  text-align: right;
  min-width: 70px;
}
/* Mobile Navigation Styles */
.mobile-toggle {
  border: none;
  background: transparent;
  padding: 8px;
  position: relative;
  z-index: 1001;
}

.mobile-toggle:focus {
  box-shadow: none;
  outline: none;
}

.mobile-toggle-icon {
  display: flex;
  flex-direction: column;
  width: 24px;
  height: 18px;
  position: relative;
  cursor: pointer;
}

.mobile-toggle-icon span {
  display: block;
  height: 3px;
  width: 100%;
  background: #A62C2C;
  border-radius: 2px;
  transition: all 0.3s ease;
  position: absolute;
}

.mobile-toggle-icon span:nth-child(1) {
  top: 0;
}

.mobile-toggle-icon span:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.mobile-toggle-icon span:nth-child(3) {
  bottom: 0;
}

/* Hamburger animation when menu is open */
.mobile-toggle[aria-expanded="true"] .mobile-toggle-icon span:nth-child(1) {
  transform: rotate(45deg);
  top: 50%;
  margin-top: -1.5px;
}

.mobile-toggle[aria-expanded="true"] .mobile-toggle-icon span:nth-child(2) {
  opacity: 0;
}

.mobile-toggle[aria-expanded="true"] .mobile-toggle-icon span:nth-child(3) {
  transform: rotate(-45deg);
  bottom: 50%;
  margin-bottom: -1.5px;
}

/* Mobile menu styles */
@media (max-width: 991.98px) {
  .navbar-collapse {
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    margin-top: 15px;
    padding: 20px;
    border: 1px solid #e9ecef;
  }
  
  .mobile-nav-menu {
    flex-direction: column;
    width: 100%;
    margin: 0 0 20px 0 !important;
  }
  
  .mobile-nav-menu .nav-item {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #f1f3f4;
  }
  
  .mobile-nav-menu .nav-item:last-child {
    border-bottom: none;
  }
  
  .nav-link-enhanced {
    padding: 15px 20px !important;
    font-size: 16px;
    width: 100%;
    display: block;
  }
  
  .nav-link-enhanced:hover {
    background: #f8f9fa;
    border-radius: 10px;
  }
  
  /* Mobile search */
  .mobile-search {
    display: block;
    width: 100%;
    margin-top: 15px;
  }
  
  .desktop-search {
    display: none;
  }
  
  .search-box-enhanced {
    width: 100%;
  }
  
  .search-box-enhanced input {
    width: 100%;
    padding: 15px 50px 15px 20px;
    font-size: 16px;
  }
}

/* Desktop styles */
@media (min-width: 992px) {
  .mobile-search {
    display: none;
  }
  
  .desktop-search {
    display: block;
  }
  
  .mobile-toggle {
    display: none;
  }
}

/* Enhanced mobile menu animation */
.navbar-collapse {
  transition: all 0.3s ease;
}

.collapsing {
  transition: height 0.3s ease;
}

/* Mobile brand adjustments */
@media (max-width: 576px) {
  .brand-logo h4 {
    font-size: 1.3rem;
  }
  
  .brand-tagline {
    font-size: 10px;
  }
  
  .navbar {
    padding: 0.75rem 0;
  }
}
.image-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(248, 249, 250, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  border-radius: 15px;
}

.image-loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #A62C2C;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.product-image-container-enhanced {
  position: relative;
  /* ...existing styles... */
}
</style>
