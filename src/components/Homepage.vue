<template>
  <div class="">
    <!-- Top Contact Bar -->
    <div class="contact-bar bg-white py-2">
      <div class="container d-flex justify-content-between align-items-center">
        <div class="user-actions">
          <a href="#" class="mx-2"><i class="far fa-heart"></i></a>
          <a href="#" class="mx-2"><i class="far fa-user"></i></a>
          <a href="#" class="mx-2"><i class="fas fa-shopping-cart"></i></a>
        </div>
      </div>
    </div>

    <!-- Main Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container">
        <a class="navbar-brand" href="#">
          <h4 class="mb-0 font-weight-bold">PARFUMANIA</h4>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">HOME</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">CATEGORIES</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">SHOP</a>
            </li>
          </ul>
          <div class="search-box">
            <input type="text" class="form-control" placeholder="Search...">
            <i class="fas fa-search"></i>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Banner -->
    <div class="hero-banner" style="background-image: url('/src/assets/sdsd.jpg');">
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-md-6">
            <div class="hero-content p-4">
              <h1 class="text-white">Bashkohuni me bukurinë</h1>
              <p class="text-white">Zbuloni koleksionet tona të parfumeve</p>
              <button class="btn btn-outline-light mt-3">SHOP NOW</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  <div class="categories-section py-4">
  <div class="container">
    <div class="row">
      <div class="col-md-3 col-6 mb-4" v-for="(cat, i) in 4" :key="i">
        <div class="product-card">
          <!-- Product Image -->
          <div class="product-image">
            <img
              src="https://baliperfumes.com/pub/media/catalog/product/cache/c70ae39189325524823e3a7bddbfebee/i/m/img_6269572d549b2_1651070765.png"
              alt="Perfume"
              class="img-fluid rounded"
            >
          </div>

          <!-- Product Info -->
          <div class="product-info mt-2">
            <h6 class="product-title mb-0 text-secondary">
              <span v-if="i === 0">Parfume për meshkuj</span>
              <span v-else-if="i === 1">Parfume për femra</span>
              <span v-else-if="i === 2">Parfuma Arab</span>
              <span v-else>Sol De Janeiro</span>
            </h6>
            <p class="product-price text-danger mb-0">
              <span v-if="i === 0">120 €</span>
              <span v-else-if="i === 1">149 €</span>
              <span v-else-if="i === 2">90 €</span>
              <span v-else>59 €</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

   <!-- Best Selling Products -->
    <div class="best-selling-products py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-4">BEST SELLING PRODUCTS</h2>
        <ul class="nav justify-content-center product-categories mb-4">
          <li class="nav-item">
            <a class="nav-link active" href="#">ALL PRODUCTS</a>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">Kategori 1</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Kategori 2</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Kategori 3</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Kategori 4</a>
          </li> -->
        </ul>
        <div class="row">
          <div v-if="loading" class="col-12 text-center">
            <span>Loading...</span>
          </div>
          <div v-else-if="bestSellingProducts.length === 0" class="col-12 text-center">
            <span>No products found.</span>
          </div>
          <div class="col-md-2" v-for="product in bestSellingProducts" :key="product.id">
            <div class="product-card-new mb-4">
              <div class="discount-badge" v-if="product.discount">
                -20%
              </div>
          <div class="product-image-container">
  <router-link :to="`/product/${product.id}`">
    <img :src="product.imageUrl" :alt="product.title" class="img-fluid product-image">
  </router-link>
</div>
              <div class="product-rating">
                <i class="fas fa-star" v-for="star in 5" :key="star"></i>
              </div>
              <div class="product-details text-center">
                <h6 class="product-name mt-1">{{ product.title }}</h6>
                <div class="product-price-container">
                  <span class="current-price font-weight-bold">{{ product.price }}€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-12 text-center">
            <div class="pagination-dots">
              <span class="pagination-dot active"></span>
              <span class="pagination-dot"></span>
              <span class="pagination-dot"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Collection Feature -->
    <div class="collection-feature py-5" style="background-color: #000; color: white;">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <img src="https://images.unsplash.com/photo-1592914610354-fd354ea45e48?w=200&h=250&fit=crop" alt="Alexandria Collection" class="img-fluid">
          </div>
          <div class="col-md-6 pl-md-5">
            <h2 class="mb-4">COLLECTION OF Alexandria</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
            <button class="btn btn-outline-light mt-3">VIEW NOW</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-dark text-white pt-5 pb-4">
      <div class="container">
        <div class="row">
          <div class="col-md-3 mb-4">
            <h5 class="mb-3">ABOUT US</h5>
            <p class="small">Parfumania offers a wide range of luxury fragrances for men and women.</p>
          </div>
          <div class="col-md-3 mb-4">
            <h5 class="mb-3">INFORMATION</h5>
            <ul class="list-unstyled small">
              <li><a href="#" class="text-white">About Us</a></li>
              <li><a href="#" class="text-white">Contact Us</a></li>
              <li><a href="#" class="text-white">Terms & Conditions</a></li>
              <li><a href="#" class="text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div class="col-md-3 mb-4">
            <h5 class="mb-3">MY ACCOUNT</h5>
            <ul class="list-unstyled small">
              <li><a href="#" class="text-white">My Account</a></li>
              <li><a href="#" class="text-white">Order History</a></li>
              <li><a href="#" class="text-white">Wishlist</a></li>
              <li><a href="#" class="text-white">Newsletter</a></li>
            </ul>
          </div>
          <div class="col-md-3 mb-4">
            <h5 class="mb-3">CONTACT US</h5>
            <ul class="list-unstyled small">
              <li><i class="fas fa-map-marker-alt mr-2"></i> Tirana, Albania</li>
              <li><i class="fas fa-phone-alt mr-2"></i> +355 123 456</li>
              <li><i class="fas fa-envelope mr-2"></i> info@parfumumana.com</li>
            </ul>
            <div class="social-icons mt-3">
              <a href="#" class="text-white mr-3"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="text-white mr-3"><i class="fab fa-instagram"></i></a>
              <a href="#" class="text-white mr-3"><i class="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
        <hr class="bg-secondary">
        <div class="row">
          <div class="col-md-6">
            <p class="small mb-0">© 2025 Parfum Umana. All rights reserved.</p>
          </div>
          <div class="col-md-6 text-md-right">
            <img src="https://via.placeholder.com/240x30" alt="Payment methods" class="img-fluid payment-methods">
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import productService from '@/services/productService'

export default {
  name: 'ParfumUmana',
  data() {
    return {
      bestSellingProducts: [],
      loading: true,
    }
  },
  async created() {
    try {
      this.bestSellingProducts = await productService.getBestSellingProducts()
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      this.loading = false
    }
  }
}
</script>
<style scoped>
.contact-bar {
  font-size: 0.9rem;
}

.hero-banner {
  height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.hero-banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.hero-content {
  position: relative;
  z-index: 1;
}

.category-card {
  transition: all 0.3s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.product-categories .nav-link {
  color: #333;
  font-weight: 500;
  padding: 0.5rem 1rem;
}

.product-categories .nav-link.active {
  color: #000;
  font-weight: 700;
  border-bottom: 2px solid #000;
}

.product-card {
  transition: all 0.3s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.sale-badge {
  top: 10px;
  right: 10px;
  padding: 5px 10px;
}

.search-box {
  position: relative;
  width: 200px;
}

.search-box input {
  padding-right: 30px;
  border-radius: 20px;
}

.search-box i {
  position: absolute;
  right: 10px;
  top: 10px;
  color: #999;
}

.ratings {
  color: #ffc107;
}

.original-price {
  font-size: 0.85rem;
}

.collection-feature {
  background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1596205520151-000ee2372677?w=1200&h=400&fit=crop');
  background-size: cover;
  background-position: center;
}
.product-card {
  transition: transform 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  cursor: pointer;
}

.product-title {
  font-size: 0.9rem;
  font-weight: 400;
  color: #6c757d;
}

.product-price {
  font-size: 0.9rem;
  font-weight: 600;
  color: #dc3545;
}

/* For better responsiveness on mobile */
@media (max-width: 767px) {
  .col-6 {
    padding-left: 8px;
    padding-right: 8px;
  }
}
.product-card {
  transition: transform 0.3s;
  position: relative;
  background-color: #dfdfdf;
  border-radius: 8px;
  overflow: hidden;
  padding-bottom: 40px; /* Space for the text */
  height: 250px; /* Fixed height for consistency */
}

.product-card:hover {
  transform: translateY(-5px);
  cursor: pointer;
}

.product-image-container {
  height: 210px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.product-image {
  max-height: 180px;
  transform: rotate(330deg) translateX(20px); /* Rotate 90 degrees and move to the right */
  object-fit: contain;
  transition: transform 0.3s;
}

/* .product-card:hover .product-image {
  transform: rotate(90deg) translateX(20px) scale(1.05);
} */

.product-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 8px 12px;
  background-color: #f8f9fa;
}

.product-title {
  font-size: 0.9rem;
  font-weight: 400;
  color: #6c757d;
}

.product-price {
  font-size: 0.9rem;
  font-weight: 600;
  color: #dc3545;
}

/* For better responsiveness on mobile */
@media (max-width: 767px) {
  .col-6 {
    padding-left: 8px;
    padding-right: 8px;
  }

  .product-card {
    height: 200px;
  }

  .product-image-container {
    height: 160px;
  }

  .product-image {
    max-height: 140px;
  }
}
</style>
