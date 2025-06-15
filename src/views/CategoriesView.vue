<template>
  <div class="catalog-container">
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
      <li class="nav-item ">
  <a class="nav-link nav-link-enhanced" href="/" @click="closeMobileMenu">HOME</a>
</li>
<li class="nav-item active">
  <router-link class="nav-link nav-link-enhanced" to="/categories" @click="closeMobileMenu">CATEGORIES</router-link>
</li>
<!-- <li class="nav-item">
  <a class="nav-link nav-link-enhanced" href="/" @click="closeMobileMenu">SHOP</a>
</li> -->
      </ul>
      
      <!-- Mobile search (will be hidden on desktop, shown in mobile menu) -->
    <!-- Mobile search (will be hidden on desktop, shown in mobile menu) -->
      <div class="search-box-enhanced mobile-search">
        <input
          type="text"
          class="form-control"
          placeholder="Search fragrances..."
          v-model="navSearchQuery"
          @keyup.enter="handleNavSearch"
          @focus="navSearchFocused = true"
          @blur="() => setTimeout(() => navSearchFocused = false, 200)"
        >
        <button class="search-btn" @click="handleNavSearch">
          <i class="fas fa-search"></i>
        </button>
        <ul v-if="navSearchQuery && navSearchFocused && liveSearchResults.length" class="search-dropdown">
          <li v-for="product in liveSearchResults" :key="product.id">
            <router-link :to="`/product/${product.id}`" @click.native="navSearchFocused = false">
              <img :src="product.imageUrl" alt="" class="dropdown-thumb" />
              {{ product.title }}
            </router-link>
          </li>
          <li v-if="liveSearchResults.length === 0" class="no-results">No results found.</li>
        </ul>
      </div>
      
      <!-- Desktop search (hidden on mobile) -->
      <div class="search-box-enhanced desktop-search">
        <input
          type="text"
          class="form-control"
          placeholder="Search fragrances..."
          v-model="navSearchQuery"
          @keyup.enter="handleNavSearch"
          @focus="navSearchFocused = true"
          @blur="() => setTimeout(() => navSearchFocused = false, 200)"
        >
        <button class="search-btn" @click="handleNavSearch">
          <i class="fas fa-search"></i>
        </button>
        <ul v-if="navSearchQuery && navSearchFocused && liveSearchResults.length" class="search-dropdown">
          <li v-for="product in liveSearchResults" :key="product.id">
            <router-link :to="`/product/${product.id}`" @click.native="navSearchFocused = false">
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
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Zbuloni Koleksionin Tonë</h1>
        <p class="hero-subtitle">Produktet më të mira për kujdesin tuaj personal</p>
      </div>
      <div class="hero-decoration"></div>
    </div>

    <div class="main-content">
      <!-- Category Filter Section -->
      <div class="filter-section">
        <h2 class="section-title">Kategoritë</h2>
        
        <!-- Search and Filter Controls -->
        <div class="filter-controls">
          <!-- <div class="search-container">
            <i class="fas fa-search search-icon"></i>
            <input 
              v-model="searchTerm" 
              type="text" 
              placeholder="Kërkoni një markë..."
              class="search-input"
              @input="filterCategories"
            />
          </div> -->
          
          <div class="view-toggle">
            <button 
              class="toggle-btn"
              :class="{ active: showAllCategories }"
              @click="toggleCategoryView"
            >
              <i class="fas fa-th-large"></i>
              {{ showAllCategories ? 'Minimizo' : 'Shfaq të gjitha kategorite' }}
            </button>
          </div>
        </div>

        <!-- Category Display -->
        <div class="category-display">
          <!-- Quick Filters (Always visible) -->
          <div class="quick-filters">
            <button
              class="category-btn quick-btn"
              :class="{ active: selectedCategory === '' }"
              @click="selectCategory('')"
            >
              <i class="fas fa-th-large category-icon"></i>
              <span class="category-text">Të gjitha parfumet</span>
            </button>
          </div>

          <!-- Brand Categories -->
          <div v-if="showAllCategories" class="brand-categories">
            <h3 class="brand-section-title">
              <i class="fas fa-crown"></i>
              Markat
            </h3>
            
            <!-- Pagination Controls -->
            <div class="pagination-controls">
              <button 
                class="pagination-btn"
                :disabled="currentPage === 1"
                @click="changePage(currentPage - 1)"
              >
                <i class="fas fa-chevron-left"></i>
              </button>
              
              <span class="page-info">
                {{ currentPage }} / {{ totalPages }}
              </span>
              
              <button 
                class="pagination-btn"
                :disabled="currentPage === totalPages"
                @click="changePage(currentPage + 1)"
              >
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>

            <!-- Brand Grid -->
            <div class="brand-grid">
              <button
                v-for="brand in paginatedBrands"
                :key="brand.name"
                class="brand-btn"
                :class="{ active: selectedCategory === brand.name }"
                @click="selectCategory(brand.name)"
                :title="brand.name"
              >
              
                <span class="brand-text">{{ brand.name }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Filter Display -->
      <div v-if="selectedCategory" class="active-filter">
        <div class="filter-chip">
          <i :class="getSelectedCategoryIcon()" class="filter-icon"></i>
          <span>{{ selectedCategory }}</span>
          <button @click="selectCategory('')" class="clear-filter">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="products-section">
        <!-- Loading State -->
        <div v-if="loading" class="loading-container">
          <div class="loading-spinner"></div>
          <p class="loading-text">Duke ngarkuar produktet...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="products.length === 0" class="empty-state">
          <div class="empty-icon">📦</div>
          <h3 class="empty-title">Nuk u gjetën produkte</h3>
          <p class="empty-text">Provoni të zgjidhni një kategori tjetër ose kontrolloni më vonë.</p>
        </div>

        <!-- Products Grid -->
       <div v-else class="products-grid">
  <div 
    v-for="(product, index) in products" 
    :key="product.id" 
    class="product-card"
    :style="{ animationDelay: `${index * 0.1}s` }"
  >
    <div class="product-image-container">
      <router-link :to="`/product/${product.id}`" class="product-link">
        <!-- Loading spinner overlay -->
        <div v-if="isImageLoading(product.id)" class="image-loading-overlay">
          <div class="image-loading-spinner">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
        </div>
        <img 
          :src="product.imageUrl" 
          :alt="product.title" 
          class="product-image"
          @loadstart="handleImageLoadStart(product.id)"
          @load="handleImageLoad(product.id)"
          @error="handleImageError($event, product.id)"
        />
        <div class="product-overlay">
          <span class="view-details">Shiko Detajet</span>
        </div>
      </router-link>
      <div class="product-badge">{{ product.category }}</div>
    </div>
    
    <div class="product-content">
      <h3 class="product-title">{{ product.title }}</h3>
      <div class="product-price">
        <span class="price-amount">{{ product.price }}</span>
        <span class="price-currency">€</span>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import productService from '@/services/productService'


export default {
  data() {
    return {
      // Basic categories
      basicCategories: ['Parfume', 'Kremra', 'Deodorant'],
      
      // All brand categories with Font Awesome icons
      brandCategories: [
        { name: 'Alien Miglei' },
        { name: 'Amouage' },
        { name: 'Armani' },
        { name: 'Boss' },
        { name: 'Burberry' },
        { name: 'Burbery' },
        { name: 'Bvlgari' },
        { name: 'Calvin Klein' },
        { name: 'Casamorati' },
        { name: 'Chanel' },
        { name: 'Chloe' },
        { name: 'Dior' },
        { name: 'Dolce Gabana' },
        { name: 'Gisada' },
        { name: 'Givenchy' },
        { name: 'Gucci' },
        { name: 'Initio' },
        { name: 'JPG' },
        { name: 'Kayali' },
        { name: 'Lancome' },
        { name: 'Lataffa' },
        { name: 'Louis Vuitton' },
        { name: 'Maison Francis Kurkdjian' },
        { name: 'Mancera' },
        { name: 'Memo' },
        { name: 'Montale' },
        { name: 'Narciso Rodriguez' },
        { name: 'Nishane' },
        { name: 'Paco Rabane' },
        { name: 'Paco Rabanne' },
        { name: 'Parfums de Marly' },
        { name: 'Prada' },
        { name: 'Roberto Cavalli' },
        { name: 'Scandal' },
        { name: 'Sol de Janeiro' },
        { name: 'Tiziana Terenzi' },
        { name: 'Tom Ford' },
        { name: 'Valentino' },
        { name: 'Victoria Secret' },
        { name: 'XERIOEFF' },
        { name: 'YSL' }
      ],
      
      selectedCategory: '',
      products: [],
      allProductsCache: [], // Cache all products for navbar search
      loading: false,
      showAllCategories: false,
      searchTerm: '',
      filteredBrands: [],
      currentPage: 1,
      brandsPerPage: 12,
      
      // Add search functionality properties
      navSearchQuery: '', // For navbar search
      navSearchFocused: false,
         imageLoadingStates: {}
    }
  },
  
  computed: {
    paginatedBrands() {
      const start = (this.currentPage - 1) * this.brandsPerPage
      const end = start + this.brandsPerPage
      return this.filteredBrands.slice(start, end)
    },
    
    totalPages() {
      return Math.ceil(this.filteredBrands.length / this.brandsPerPage)
    },
    
    // Search results for navbar using cached products
      liveSearchResults() {
      if (!this.navSearchQuery) return [];
      return productService.searchProducts(this.navSearchQuery).slice(0, 8);
    },
  },
  
  async created() {
    this.filteredBrands = [...this.brandCategories]
    
    const categoryFromQuery = this.$route.query.category
    if (categoryFromQuery) {
      this.selectedCategory = categoryFromQuery
    }
    
    const searchFromQuery = this.$route.query.search
    if (searchFromQuery) {
      this.searchTerm = searchFromQuery
      this.filterCategories()
    }
    
    await this.fetchProducts()
  },
  
  methods: {
    closeMobileMenu() {
      const navbarCollapse = document.getElementById('navbarNav')
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    },
    
    // Add navbar search methods
    handleNavSearch() {
      if (this.navSearchQuery.trim()) {
        // Update the main search term and filter
        this.searchTerm = this.navSearchQuery.trim()
        this.selectedCategory = '' // Clear category filter when searching
        this.filterCategories()
        this.fetchProducts()
        this.navSearchFocused = false
        
        // Update URL with search query
        this.$router.replace({
          path: '/categories',
          query: { search: this.searchTerm }
        })
        
        // Scroll to products section
        this.$nextTick(() => {
          const productsSection = document.querySelector('.products-section')
          if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' })
          }
        })
      }
    },
    
       async fetchProducts() {
      this.loading = true
      try {
        if (this.searchTerm) {
          this.products = await productService.searchProducts(this.searchTerm)
        } else if (this.selectedCategory) {
          this.products = await productService.getProductsByCategory(this.selectedCategory)
        } else {
          this.products = await productService.getProducts()
        }
      } catch (err) {
        console.error('Error fetching products:', err)
      } finally {
        this.loading = false
      }
    },
    
    selectCategory(cat) {
      this.selectedCategory = cat
      this.searchTerm = '' // Clear search when selecting category
      this.navSearchQuery = '' // Clear navbar search
      this.fetchProducts()
      
      // Update URL
      if (cat) {
        this.$router.replace({
          path: '/categories',
          query: { category: cat }
        })
      } else {
        this.$router.replace('/categories')
      }
      
      // Scroll to products section
      this.$nextTick(() => {
        const productsSection = document.querySelector('.products-section')
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' })
        }
      })
    },
    
    toggleCategoryView() {
      this.showAllCategories = !this.showAllCategories
    },
    
    filterCategories() {
      if (!this.searchTerm) {
        this.filteredBrands = [...this.brandCategories]
      } else {
        this.filteredBrands = this.brandCategories.filter(brand =>
          brand.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      }
      this.currentPage = 1
    },
    
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    },
    
    getSelectedCategoryIcon() {
      if (this.selectedCategory === 'Parfume') return 'fas fa-spray-can'
      if (this.selectedCategory === 'Kremra') return 'fas fa-tint'
      if (this.selectedCategory === 'Deodorant') return 'fas fa-wind'
      
      const brand = this.brandCategories.find(b => b.name === this.selectedCategory)
      return brand ? brand.icon : 'fas fa-tag'
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
    
    handleImageError(event, productId = null) {
      event.target.src = 'https://media.istockphoto.com/id/1452662817/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=bGI_FngX0iexE3EBANPw9nbXkrJJA4-dcEJhCrP8qMw='
      if (productId) {
        this.$set(this.imageLoadingStates, productId, false)
      }
    },
  },
}
</script>

<style scoped>
/* Import Font Awesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

* {
  box-sizing: border-box;
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

.catalog-container {
  min-height: 100vh;
  background: #ffffff;
  position: relative;
}

/* Hero Section */
.hero-section {
  position: relative;
  padding: 80px 20px 60px;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin: 0 auto;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2c3e50;
  animation: fadeInUp 1s ease-out;
}

.hero-subtitle {
  font-size: 1.3rem;
  opacity: 0.7;
  font-weight: 300;
  color: #5a6c7d;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.hero-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="a"><stop offset="0" stop-color="%23ffffff" stop-opacity="0.1"/><stop offset="1" stop-color="%23ffffff" stop-opacity="0"/></radialGradient></defs><circle cx="200" cy="200" r="100" fill="url(%23a)"/><circle cx="800" cy="300" r="150" fill="url(%23a)"/><circle cx="400" cy="600" r="120" fill="url(%23a)"/></svg>') no-repeat;
  background-size: cover;
  opacity: 0.3;
}

/* Main Content */
.main-content {
  background: #ffffff;
  min-height: 100vh;
  padding: 40px 20px;
  position: relative;
}

/* Filter Section */
.filter-section {
  max-width: 1200px;
  margin: 0 auto 50px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 600;
  color: #2d3436;
  margin-bottom: 30px;
  text-align: center;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: #2c3e50;
  border-radius: 2px;
}

/* Filter Controls */
.filter-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
}

.search-container {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
  z-index: 2;
}

.search-input {
  width: 100%;
  padding: 15px 45px;
  border: 2px solid #e1e8ed;
  border-radius: 50px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-input:focus {
  outline: none;
  border-color: #2c3e50;
  box-shadow: 0 4px 15px rgba(44, 62, 80, 0.1);
}

.view-toggle {
  display: flex;
  gap: 10px;
}

.toggle-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: white;
  border: 2px solid #e1e8ed;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #5a6c7d;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.toggle-btn:hover,
.toggle-btn.active {
  background: #2c3e50;
  color: white;
  border-color: #2c3e50;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(44, 62, 80, 0.2);
}

/* Quick Filters */
.quick-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 25px;
  background: white;
  border: 2px solid #e1e8ed;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  color: #5a6c7d;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.category-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: #2c3e50;
  transition: left 0.3s ease;
  z-index: -1;
}

.category-btn:hover::before,
.category-btn.active::before {
  left: 0;
}

.category-btn:hover,
.category-btn.active {
  color: white;
  border-color: #2c3e50;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(44, 62, 80, 0.2);
}

.category-icon {
  font-size: 1.2rem;
}

/* Brand Categories */
.brand-categories {
  background: #f8f9fa;
  border-radius: 20px;
  padding: 30px;
  margin-top: 20px;
}

.brand-section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3436;
  margin-bottom: 25px;
  text-align: center;
  justify-content: center;
}

/* Pagination */
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}

.pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: white;
  border: 2px solid #e1e8ed;
  border-radius: 50%;
  color: #5a6c7d;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.pagination-btn:hover:not(:disabled) {
  background: #2c3e50;
  color: white;
  border-color: #2c3e50;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(44, 62, 80, 0.2);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-weight: 600;
  color: #2d3436;
  min-width: 60px;
  text-align: center;
}

/* Brand Grid */
.brand-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px;
}

.brand-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 15px;
  background: white;
  border: 2px solid #e1e8ed;
  border-radius: 15px;
  color: #5a6c7d;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.brand-btn:hover,
.brand-btn.active {
  background: #2c3e50;
  color: white;
  border-color: #2c3e50;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(44, 62, 80, 0.2);
}

.brand-icon {
  font-size: 1.5rem;
  margin-bottom: 5px;
}

.brand-text {
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 1.2;
}

/* Active Filter */
.active-filter {
  max-width: 1200px;
  margin: 0 auto 30px;
  display: flex;
  justify-content: center;
}

.filter-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: #2c3e50;
  color: white;
  border-radius: 50px;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(44, 62, 80, 0.2);
}

.filter-icon {
  font-size: 1rem;
}

.clear-filter {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: background 0.3s ease;
}

.clear-filter:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Products Section */
.products-section {
  max-width: 1200px;
  margin: 0 auto;
}

/* Loading State */
.loading-container {
  text-align: center;
  padding: 80px 20px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f1f3f4;
  border-top: 4px solid #2c3e50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

.loading-text {
  font-size: 1.1rem;
  color: #636e72;
  font-weight: 500;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.empty-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #2d3436;
  margin-bottom: 10px;
}

.empty-text {
  font-size: 1.1rem;
  color: #636e72;
  max-width: 400px;
  margin: 0 auto;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  padding: 20px 0;
}

.product-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease-out both;
  position: relative;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.product-image-container {
  position: relative;
  overflow: hidden;
  height: 250px;
}

.product-link {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Show the whole image */
  transition: transform 0.4s ease;
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.product-overlay {
  position: absolute;
  inset: 0;
  background: rgba(44, 62, 80, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.view-details {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  padding: 12px 24px;
  border: 2px solid white;
  border-radius: 30px;
  transition: all 0.3s ease;
}

.view-details:hover {
  background: white;
  color: #2c3e50;
}

.product-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #2d3436;
}

.product-content {
  padding: 15px;
}

.product-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2d3436;
  margin-bottom: 15px;
  line-height: 1.4;
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin-bottom: 20px;
}

.price-amount {
  font-size: 1.4rem;
  font-weight: 700;
  color: crimson;
}

.price-currency {
  font-size: 1.4rem;
  font-weight: 600;
  color: crimson;
}

/* Animations */
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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .filter-controls {
    flex-direction: column;
    gap: 15px;
  }
  
  .search-container {
    max-width: 100%;
  }
  
  .quick-filters {
    gap: 10px;
  }
  
  .category-btn {
    padding: 12px 20px;
    font-size: 0.9rem;
  }
  
  .brand-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  }
  
  .brand-btn {
    padding: 15px 10px;
  }
  
  .brand-text {
    font-size: 0.8rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .product-content {
    padding: 10px;
  }
  
  .main-content {
    padding: 30px 15px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 60px 15px 40px;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .filter-controls {
    flex-direction: column;
    gap: 15px;
  }
  
  .quick-filters {
    flex-direction: column;
    align-items: center;
  }
  
  .category-btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
  
  .brand-categories {
    padding: 20px;
  }
  
  .brand-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 10px;
  }
  
  .brand-btn {
    padding: 12px 8px;
  }
  
  .brand-icon {
    font-size: 1.3rem;
  }
  
  .brand-text {
    font-size: 0.75rem;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .pagination-controls {
    gap: 15px;
  }
  
  .pagination-btn {
    width: 35px;
    height: 35px;
  }
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
/* Add search dropdown styles */
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
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-dropdown li a:hover {
  color: #A62C2C;
}

.no-results {
  color: #999;
  text-align: center;
  padding: 12px 0;
}

/* Image Loading Overlay */
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
  z-index: 3;
  border-radius: 15px;
}

.image-loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #2c3e50;
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



</style>