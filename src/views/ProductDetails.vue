<template>
 <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
  <div class="container">
    <a class="navbar-brand brand-logo" href="#">
      <h4 class="mb-0 font-weight-bold text-gradient">PARFUMANIA</h4>
      <span class="brand-tagline">Luxury Fragrances</span>
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
      <li class="nav-item">
  <a class="nav-link nav-link-enhanced" href="/" @click="closeMobileMenu">HOME</a>
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
        <input type="text" class="form-control" placeholder="Search fragrances...">
        <button class="search-btn">
          <i class="fas fa-search"></i>
        </button>
      </div>
      
      <!-- Desktop search (hidden on mobile) -->
      <div class="search-box-enhanced desktop-search">
        <input type="text" class="form-control" placeholder="Search fragrances...">
        <button class="search-btn">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>
  </div>
</nav>
  <div class="container mt-5" v-if="product">
    <div class="row">
      <!-- Thumbnail Gallery -->
      <div class="col-md-1">
        <div class="thumbnail-gallery">
          <div 
            v-for="(image, index) in productImages" 
            :key="index"
            class="product-thumbnail mb-3"
            :class="{ active: selectedImageIndex === index }"
            @click="selectImage(index)"
          >
            <img :src="image" :alt="`${product.title} view ${index + 1}`" class="img-fluid" />
          </div>
        </div>
      </div>

      <!-- Main Image -->
      <div class="col-md-5">
        <div class="product-main-image">
          <div class="image-container" @mousemove="handleImageZoom" @mouseleave="resetZoom">
            <img 
              ref="mainImage"
              :src="productImages[selectedImageIndex]" 
              :alt="product.title" 
              class="img-fluid main-image"
              :style="zoomStyle"
            />
            <div v-if="product.discount" class="discount-badge">
              -{{ product.discount }}%
            </div>
            <div v-if="product.isNew" class="new-badge">
              NEW
            </div>
          </div>
        </div>
        <!-- Mobile Thumbnail Gallery (visible only on mobile) -->
<div class="mobile-thumbnail-gallery d-md-none">
  <div 
    v-for="(image, index) in productImages.slice(1)" 
    :key="index + 1"
    class="mobile-product-thumbnail"
    :class="{ active: selectedImageIndex === index + 1 }"
    @click="selectImage(index + 1)"
  >
    <img :src="image" :alt="`${product.title} view ${index + 2}`" />
  </div>
</div>
      </div>

      <!-- Product Details -->
      <div class="col-md-6">
        <div class="product-info">
          <h1 class="product-title mb-2">{{ product.title }}</h1>
          <p class="product-category text-muted mb-3">{{ product.category }}</p>
          <!-- Interactive Star Rating -->
          <!-- <div class="rating-section mb-3">
            <div class="rating mb-1">
              <i 
                v-for="star in 5" 
                :key="star"
                class="fas fa-star"
                :class="{ filled: star <= Math.floor(product.rating || 4.5) }"
              ></i>
              <span class="ms-2 rating-text">
                {{ product.rating || 4.5 }} ({{ product.reviewCount || 127 }} reviews)
              </span>
            </div>
          </div> -->
          
          <!-- Dynamic Pricing -->
          <div class="pricing-section mb-4">
            <div v-if="product.originalPrice && product.originalPrice > product.price" class="price-comparison">
              <span class="original-price text-muted text-decoration-line-through">${{ product.originalPrice }}</span>
              <span class="current-price text-success ms-2">${{ product.price }}</span>
              <span class="savings-badge ms-2">Save ${{ (product.originalPrice - product.price).toFixed(2) }}</span>
            </div>
            <h3 v-else class="current-price text-success">${{ product.price }}</h3>
          </div>
          
          <!-- Stock Status -->
          <div class="stock-status mb-3">
            <span 
              class="badge"
              :class="stockStatusClass"
            >
              {{ stockStatusText }}
            </span>
            <span v-if="product.stock && product.stock < 10" class="text-warning ms-2 small">
              Only {{ product.stock }} left in stock!
            </span>
          </div>
          
          <!-- Description with Read More -->
          <div class="description-section mb-4">
           <p
  class="description"
  :class="{ collapsed: !showFullDescription && product && product.description && product.description.length > 150 }"
>
  {{ product && product.description ? product.description : '' }}
</p>
<button
  v-if="product && product.description && product.description.length > 150"
  @click="showFullDescription = !showFullDescription"
  class="btn btn-link p-0 small"
>
  {{ showFullDescription ? 'Read Less' : 'Read More' }}
</button>
          </div>
          
          <!-- Enhanced Features -->
          <!-- <div class="features-section mb-4">
            <h6 class="fw-bold mb-2">Key Features:</h6>
            <div class="feature-list">
              <div v-for="feature in productFeatures" :key="feature" class="feature-item mb-2">
                <i class="fas fa-check-circle text-success me-2"></i>
                {{ feature }}
              </div>
            </div>
          </div> -->

          <!-- Variant Selection (if available) -->
          <div v-if="product.variants && product.variants.length > 0" class="variants-section mb-4">
            <h6 class="fw-bold mb-2">Options:</h6>
            <div class="variant-selector">
              <button
                v-for="variant in product.variants"
                :key="variant.id"
                @click="selectedVariant = variant"
                class="btn variant-btn me-2 mb-2"
                :class="{ active: selectedVariant?.id === variant.id }"
              >
                {{ variant.name }}
                <span v-if="variant.price !== product.price" class="ms-1">
                  (+${{ (variant.price - product.price).toFixed(2) }})
                </span>
              </button>
            </div>
          </div>
          
          <!-- Quantity and Actions -->
          <div class="purchase-section">
            <div class="d-flex align-items-center mb-4">
              <div class="quantity-selector me-3">
                <label class="form-label small fw-bold">Quantity:</label>
                <div class="input-group quantity-input">
                  <button 
                    class="btn btn-outline-secondary" 
                    type="button"
                    @click="decreaseQuantity"
                    :disabled="quantity <= 1"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                  <input 
                    type="number" 
                    class="form-control text-center" 
                    v-model.number="quantity"
                    @input="validateQuantity"
                    min="1"
                    :max="product.stock || 999"
                  >
                  <button 
                    class="btn btn-outline-secondary" 
                    type="button"
                    @click="increaseQuantity"
                    :disabled="quantity >= (product.stock || 999)"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="action-buttons mb-4">
              <button 
                class="btn btn-success btn-lg me-3 add-to-cart-btn"
                @click="addToCart"
                :disabled="!canAddToCart"
              >
                <i class="fas fa-shopping-cart me-2"></i>
               Porosit Tani - ${{ totalPrice.toFixed(2) }}
              </button>

              <div class="btn-group">
                <button class="btn btn-outline-secondary" @click="shareProduct">
                  <i class="fas fa-share-alt"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Enhanced Product Metadata -->
          <div class="product-meta">
            
            <div class="meta-item mb-2">
              <strong>Category:</strong> 
              <span class="badge bg-light text-dark ms-1">{{ product.category }}</span>
            </div>
            <div v-if="product.tags" class="meta-item mb-2">
              <strong>Tags:</strong>
              <span 
                v-for="tag in product.tags.split(',')" 
                :key="tag.trim()" 
                class="badge bg-secondary ms-1"
              >
                {{ tag.trim() }}
              </span>
            </div>
            <div v-if="product.brand" class="meta-item mb-2">
              <strong>Brand:</strong> {{ product.brand }}
            </div>
          </div>

          <!-- Trust Badges -->
          <div class="trust-badges mt-4">
            <div class="d-flex flex-wrap gap-3">
              <div class="trust-badge">
                <i class="fas fa-truck text-success"></i>
                <span class="small">Free Shipping</span>
              </div>
           
            
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Enhanced Tab Navigation -->
    <div class="row mt-5">
      <div class="col-12">
        <ul class="nav nav-tabs product-tabs">
          <li class="nav-item">
            <a 
              class="nav-link" 
              :class="{ active: activeTab === 'description' }"
              @click="activeTab = 'description'"
              href="#"
            >
              DESCRIPTION
            </a>
          </li>
        </ul>
        
        <!-- Tab Content -->
        <div class="tab-content mt-4">
          <div v-if="activeTab === 'description'" class="tab-pane active">
            <div class="tab-content-section">
              <h5>Product Description</h5>
              <p>{{ product.description }}</p>
              <div v-if="product.longDescription">
                <p>{{ product.longDescription }}</p>
              </div>
            </div>
          </div>
          
          <div v-if="activeTab === 'specifications'" class="tab-pane active">
            <div class="tab-content-section">
              <h5>Product Specifications</h5>
              <div class="specifications-table">
                <div v-for="spec in productSpecifications" :key="spec.label" class="spec-row">
                  <span class="spec-label">{{ spec.label }}:</span>
                  <span class="spec-value">{{ spec.value }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- <div v-if="activeTab === 'reviews'" class="tab-pane active">
            <div class="tab-content-section">
              <h5>Customer Reviews</h5>
              <div class="reviews-summary mb-4">
                <div class="d-flex align-items-center">
                  <span class="average-rating">{{ product.rating || 4.5 }}</span>
                  <div class="rating ms-2 me-3">
                    <i v-for="star in 5" :key="star" class="fas fa-star" :class="{ filled: star <= Math.floor(product.rating || 4.5) }"></i>
                  </div>
                  <span>Based on {{ product.reviewCount || 127 }} reviews</span>
                </div>
              </div>
              <p class="text-muted">Reviews section would display actual customer reviews here.</p>
            </div>
          </div> -->
          
       
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="loading-container">
    <div class="spinner-border text-success" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="mt-3">Loading product details...</p>
  </div>
</template>

<script>
import { db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'

export default {
  data() {
    return {
      product: null,
      selectedImageIndex: 0,
      quantity: 1,
      activeTab: 'description',
      selectedVariant: null,
      isInWishlist: false,
      showFullDescription: false,
      zoomStyle: {},
    }
  },
  computed: {
    productImages() {
      if (!this.product) return []
      const images = [this.product.imageUrl]
      if (this.product.additionalImages) {
        images.push(...this.product.additionalImages)
      }
      return images
    },
    productFeatures() {
      const features = []
      if (this.product.feature1) features.push(this.product.feature1)
      if (this.product.feature2) features.push(this.product.feature2)
      if (this.product.features) features.push(...this.product.features)
      
      // Default features if none provided
      if (features.length === 0) {
        features.push(
          "Self-indulging fragrance designed for men's appeal and passion",
          "Wild and rich aromatherapy for a unique leading scent",
          "Long-lasting formula with premium ingredients"
        )
      }
      return features
    },
    productSpecifications() {
      const specs = []
      if (this.product.weight) specs.push({ label: 'Weight', value: this.product.weight })
      if (this.product.dimensions) specs.push({ label: 'Dimensions', value: this.product.dimensions })
      if (this.product.material) specs.push({ label: 'Material', value: this.product.material })
      if (this.product.color) specs.push({ label: 'Color', value: this.product.color })
      if (this.product.brand) specs.push({ label: 'Brand', value: this.product.brand })
      
      // Default specs
      if (specs.length === 0) {
        specs.push(
          { label: 'Brand', value: this.product.brand || 'Premium Brand' },
          { label: 'Category', value: this.product.category },
          { label: 'Weight', value: '100ml' },
          { label: 'Origin', value: 'Made in France' }
        )
      }
      return specs
    },
    stockStatusClass() {
      if (!this.product.stock || this.product.stock < 1) return 'bg-danger'
      if (this.product.stock < 10) return 'bg-warning text-dark'
      return 'bg-success'
    },
    stockStatusText() {
      if (!this.product.stock || this.product.stock < 1) return 'Out of Stock'
      if (this.product.stock < 10) return 'Low Stock'
      return 'In Stock'
    },
    canAddToCart() {
      return this.product.stock > 0 && this.quantity <= this.product.stock
    },
    totalPrice() {
      const basePrice = this.selectedVariant?.price || this.product.price
      return basePrice * this.quantity
    }
  },
  async created() {
    const id = this.$route.params.id
    const docRef = doc(db, 'products', id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      this.product = { 
        id: docSnap.id, 
        ...docSnap.data(),
        price: parseFloat(docSnap.data().price) || 135.00,
        sku: docSnap.data().sku || '4554251-1',
        stock: docSnap.data().stock || 50,
        rating: docSnap.data().rating || 4.5,
        reviewCount: docSnap.data().reviewCount || 127
      }
    }
  },
  methods: {
          closeMobileMenu() {
      bsCollapse.hide();

  },
    selectImage(index) {
      this.selectedImageIndex = index
    },
    increaseQuantity() {
      if (this.quantity < (this.product.stock || 999)) {
        this.quantity++
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    validateQuantity() {
      if (this.quantity < 1) this.quantity = 1
      if (this.quantity > (this.product.stock || 999)) {
        this.quantity = this.product.stock || 999
      }
    },
 addToCart() {
    const productData = {
      id: this.product.id,
      title: this.product.title,
      price: this.product.price,
      imageUrl: this.product.imageUrl,
      quantity: this.quantity || 1
    }
    
    this.$router.push({
      name: 'OrderForm',
      query: { data: JSON.stringify(productData) }  // Changed from params to query
    })
  },
    toggleWishlist() {
      this.isInWishlist = !this.isInWishlist
      // Add wishlist logic here
      console.log('Wishlist status:', this.isInWishlist)
    },
    shareProduct() {
      if (navigator.share) {
        navigator.share({
          title: this.product.title,
          text: this.product.description,
          url: window.location.href
        })
      } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(window.location.href)
        alert('Product link copied to clipboard!')
      }
    },
    handleImageZoom(event) {
      const rect = event.target.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      
      this.zoomStyle = {
        transformOrigin: `${x}% ${y}%`,
        transform: 'scale(1.5)'
      }
    },
    resetZoom() {
      this.zoomStyle = {}
    }
  }
}
</script>

<style scoped>
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

/* Enhanced Styling */
.product-thumbnail {
  border: 2px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-thumbnail:hover,
.product-thumbnail.active {
  border-color: #8bc34a;
  box-shadow: 0 2px 8px rgba(139, 195, 74, 0.3);
}

.product-main-image {
  padding: 20px;                  /* Smaller padding */
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  position: relative;
  margin: 0 auto;                /* Center horizontally */
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-image {
  max-height: 220px;             /* Make the image itself smaller */
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  object-fit: contain;
}

.image-container {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.main-image {
  transition: transform 0.3s ease;
}

.discount-badge, .new-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 5px 12px;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 20px;
  z-index: 2;
}

.discount-badge {
  background-color: #e91e63;
}

.new-badge {
  background-color: #ff5722;
}

.product-title {
  font-weight: 700;
  font-size: 1.8rem;
  color: #333;
}

.rating .fas.fa-star {
  color: #ddd;
  transition: color 0.2s;
}

.rating .fas.fa-star.filled {
  color: #ffc107;
}

.rating-text {
  color: #666;
  font-size: 0.9rem;
}

.pricing-section {
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.original-price {
  font-size: 1.1rem;
}

.current-price {
  font-size: 1.8rem;
  font-weight: 700;
}

.savings-badge {
  background-color: #ff5722;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
}

.stock-status .badge {
  font-size: 0.8rem;
  padding: 6px 12px;
}

.description.collapsed {
  max-height: 4.5em;
  overflow: hidden;
  position: relative;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  font-size: 0.95rem;
}

.variant-btn {
  border: 2px solid #ddd;
  background: white;
  color: #333;
  transition: all 0.3s ease;
}

.variant-btn:hover,
.variant-btn.active {
  border-color: #8bc34a;
  background-color: #8bc34a;
  color: white;
}

.quantity-selector {
  min-width: 140px;
}

.quantity-input {
  width: 130px;
}

.quantity-input input {
  max-width: 60px;
}

.add-to-cart-btn {
  background-color: #8bc34a;
  border-color: #8bc34a;
  font-weight: 600;
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: #7cb342;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 195, 74, 0.3);
}

.btn-outline-danger.active {
  background-color: #dc3545;
  border-color: #dc3545;
  color: white;
}

.trust-badges {
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.trust-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0.5rem;
}

.trust-badge i {
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}

.product-tabs .nav-link {
  color: #666;
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  padding: 12px 20px;
  transition: all 0.3s ease;
}

.product-tabs .nav-link:hover {
  color: #8bc34a;
}

.product-tabs .nav-link.active {
  color: #8bc34a;
  border-bottom: 3px solid #8bc34a;
  background: none;
}

.tab-content-section {
  padding: 2rem 0;
}

.specifications-table .spec-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.spec-label {
  font-weight: 600;
  color: #333;
}

.spec-value {
  color: #666;
}

.reviews-summary .average-rating {
  font-size: 2rem;
  font-weight: bold;
  color: #8bc34a;
}

.shipping-info .info-item h6 {
  color: #333;
  font-weight: 600;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-title {
    font-size: 1.4rem;
  }
  
  .current-price {
    font-size: 1.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .add-to-cart-btn {
    width: 100%;
    margin-bottom: 1rem;
  }
  
  .trust-badges .d-flex {
    justify-content: center;
  }
}
@media (max-width: 768px) {
  /* Hide the vertical thumbnail gallery on mobile */
  .col-md-1 {
    display: none;
  }
  
  /* Make main image take full width on mobile */
  .col-md-5 {
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 1rem;
  }
  
  /* Product details take full width */
  .col-md-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  
  /* Create horizontal thumbnail gallery for mobile */
  .product-main-image::after {
    content: '';
    display: block;
    margin-top: 1rem;
  }
  
  /* Add mobile thumbnail gallery */
  .mobile-thumbnail-gallery {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding: 10px 0;
    margin-top: 15px;
    -webkit-overflow-scrolling: touch;
  }
  
  .mobile-thumbnail-gallery::-webkit-scrollbar {
    height: 4px;
  }
  
  .mobile-thumbnail-gallery::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }
  
  .mobile-thumbnail-gallery::-webkit-scrollbar-thumb {
    background: #8bc34a;
    border-radius: 2px;
  }
  
  .mobile-product-thumbnail {
    flex: 0 0 60px;
    height: 60px;
    border: 2px solid #eee;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .mobile-product-thumbnail:hover,
  .mobile-product-thumbnail.active {
    border-color: #8bc34a;
    box-shadow: 0 2px 8px rgba(139, 195, 74, 0.3);
  }
  
  .mobile-product-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* Adjust other mobile styles */
  .product-title {
    font-size: 1.4rem;
  }
  
  .current-price {
    font-size: 1.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .add-to-cart-btn {
    width: 100%;
    margin-bottom: 1rem;
  }
  
  .trust-badges .d-flex {
    justify-content: center;
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
</style>