<template>
  <div class="admin-panel">
    <!-- Login Screen -->
    <div v-if="!loggedIn" class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="login-icon">
            <i class="fas fa-user-shield"></i>
          </div>
          <h2>Admin Panel</h2>
          <p class="text-muted">Please sign in to continue</p>
        </div>
        <form @submit.prevent="login" class="login-form">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
              </div>
              <input 
                v-model="username" 
                type="text" 
                class="form-control" 
                placeholder="Username"
                :class="{ 'is-invalid': error }"
              />
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-lock"></i></span>
              </div>
              <input 
                v-model="password" 
                type="password" 
                class="form-control" 
                placeholder="Password"
                :class="{ 'is-invalid': error }"
              />
            </div>
          </div>
          <button type="submit" class="btn btn-primary btn-block login-btn">
            <i class="fas fa-sign-in-alt mr-2"></i>Sign In
          </button>
          <div v-if="error" class="alert alert-danger mt-3" role="alert">
            <i class="fas fa-exclamation-triangle mr-2"></i>
            Invalid credentials. Please try again.
          </div>
        </form>
      </div>
    </div>

    <!-- Main Dashboard -->
    <div v-else class="dashboard">
      <!-- Top Navigation -->
      <nav class="top-nav">
        <div class="nav-container">
          <div class="nav-brand">
           <a class="navbar-brand brand-logo" href="/">
      <img src="@/assets/logopp.svg" alt="Parfumania Logo" style="height: 45px;" />
    </a>
          </div>
          
          <!-- Mobile Menu Toggle -->
        

          <!-- Navigation Links -->
          <div class="nav-links">
            <a href="#dashboard" class="nav-link active" @click="closeMobileMenu">
              <i class="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          
          
           
          </div>

          <!-- User Actions -->
          <div class="nav-actions">
            <div class="time-display">
              <i class="fas fa-clock"></i>
              <span id="currentTime"></span>
            </div>
            <div class="user-menu">
              <div class="user-info">
                <i class="fas fa-user-circle"></i>
                <div class="user-details">
                  <span class="user-name">Admin</span>
                  <span class="user-role">Administrator</span>
                </div>
              </div>
              <button @click="logout" class="logout-btn">
                <i class="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Page Header -->
        <div class="page-header">
          <div class="header-content">
            <h1 class="page-title">
              <i class="fas fa-tachometer-alt"></i>
              Dashboard Overview
            </h1>
            <p class="page-subtitle">Manage your perfume store efficiently</p>
          </div>
        </div>

        <div class="content-wrapper">
          <!-- Enhanced Stats Cards -->
          <div class="stats-grid">
            <div class="stat-card primary">
              <div class="stat-icon">
                <i class="fas fa-boxes"></i>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ products.length }}</div>
                <div class="stat-label">Total Products</div>
               
              </div>
            </div>
            
            <div class="stat-card success">
              <div class="stat-icon">
                <i class="fas fa-star"></i>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ newProductsCount }}</div>
                <div class="stat-label">New Products</div>
               
              </div>
            </div>

            <div class="stat-card warning">
              <div class="stat-icon">
                <i class="fas fa-fire"></i>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ bestSellingCount }}</div>
                <div class="stat-label">Best Selling</div>
               
              </div>
            </div>

          
          </div>

          <!-- Quick Actions -->
          <div class="quick-actions-section">
            <h3 class="section-title">
              <i class="fas fa-bolt"></i>Quick Actions
            </h3>
            <div class="quick-actions-grid">
              <button class="quick-action-btn primary">
                <i class="fas fa-plus"></i>
                <span>Add Product</span>
              </button>
            
            </div>
          </div>

          <!-- Enhanced Add Product Form -->
          <div class="form-card">
            <div class="card-header">
              <div class="header-content">
                <h3 class="card-title">
                  <i class="fas fa-plus-circle"></i>
                  {{ editingProduct ? 'Edit Product' : 'Add New Product' }}
                </h3>
                <p class="card-subtitle">{{ editingProduct ? 'Update product information' : 'Fill in the details to add a new product to your store' }}</p>
              </div>
            </div>
            <div class="card-body">
              <form @submit.prevent="addProduct" class="product-form">
                <div class="form-row">
                  <div class="form-section">
                    <h4 class="section-header">
                      <i class="fas fa-info-circle"></i>Basic Information
                    </h4>
                    
                    <div class="form-group enhanced">
                      <label for="title" class="form-label">
                        <i class="fas fa-tag"></i>Product Title *
                      </label>
                      <input 
                        v-model="product.title" 
                        id="title"
                        type="text"
                        class="form-control enhanced" 
                        placeholder="Enter a descriptive product title"
                        required 
                      />
                      <div class="form-help">Choose a clear, descriptive name for your product</div>
                    </div>

                    <div class="form-group enhanced">
                      <label for="description" class="form-label">
                        <i class="fas fa-align-left"></i>Description *
                      </label>
                      <textarea 
                        v-model="product.description" 
                        id="description"
                        class="form-control enhanced" 
                        rows="4"
                        placeholder="Describe the product features, scent notes, and benefits"
                      ></textarea>
                      <div class="form-help">Provide detailed information about the product</div>
                    </div>

                    <div class="form-row-split">
                      <div class="form-group enhanced">
                        <label for="price" class="form-label">
                          <i class="fas fa-euro-sign"></i>Price (€) *
                        </label>
                        <div class="input-with-icon">
                          <span class="input-icon">€</span>
                          <input 
                            v-model.number="product.price" 
                            id="price"
                            type="number" 
                            step="0.01"
                            class="form-control enhanced with-icon" 
                            placeholder="0.00"
                            required 
                          />
                        </div>
                      </div>
                      <div class="form-group enhanced">
                        <label for="discount" class="form-label">
                          <i class="fas fa-percentage"></i>Discount (%)
                        </label>
                        <div class="input-with-icon">
                          <span class="input-icon">%</span>
                          <input 
                            v-model.number="product.discount" 
                            id="discount"
                            type="number" 
                            class="form-control enhanced with-icon" 
                            placeholder="0"
                            min="0"
                            max="100"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="form-group enhanced">
                      <label for="category" class="form-label">
                        <i class="fas fa-list"></i>Category *
                      </label>
                      <select 
                        v-model="product.category" 
                        id="category"
                        class="form-control enhanced" 
                        required
                      >
                        <option disabled value="">Select Category</option>
                        <optgroup label="Basic Categories">
                          <option>Parfume</option>
                          <option>Kremra</option>
                          <option>Deodorant</option>
                          <option>Makeup</option>
                          <option>Skincare</option>
                        </optgroup>
                        <optgroup label="Brands">
                          <option>Alien Miglei</option>
                          <option>Amouage</option>
                          <option>Armani</option>
                          <option>Boss</option>
                          <option>Burberry</option>
                          <option>Burbery</option>
                          <option>Bvlgari</option>
                          <option>Calvin Klein</option>
                          <option>Casamorati</option>
                          <option>Chanel</option>
                          <option>Chloe</option>
                          <option>Dior</option>
                          <option>Dolce Gabana</option>
                          <option>Gisada</option>
                          <option>Givenchy</option>
                          <option>Gucci</option>
                          <option>Initio</option>
                          <option>JPG</option>
                          <option>Kayali</option>
                          <option>Lancome</option>
                          <option>Lataffa</option>
                          <option>Louis Vuitton</option>
                          <option>Maison Francis Kurkdjian</option>
                          <option>Mancera</option>
                          <option>Memo</option>
                          <option>Montale</option>
                          <option>Narciso Rodriguez</option>
                          <option>Nishane</option>
                          <option>Paco Rabane</option>
                          <option>Paco Rabanne</option>
                          <option>Parfums de Marly</option>
                          <option>Prada</option>
                          <option>Roberto Cavalli</option>
                          <option>Scandal</option>
                          <option>Sol de Janeiro</option>
                          <option>Tiziana Terenzi</option>
                          <option>Tom Ford</option>
                          <option>Valentino</option>
                          <option>Victoria Secret</option>
                          <option>XERIOEFF</option>
                          <option>YSL</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  <div class="form-section">
                    <h4 class="section-header">
                      <i class="fas fa-image"></i>Media & Settings
                    </h4>
                    
                    <div class="form-group enhanced">
                      <label for="imageUpload" class="form-label">
                        <i class="fas fa-camera"></i>Product Image *
                      </label>
                      <div class="image-upload-area">
                        <input 
                          type="file" 
                          id="imageUpload" 
                          @change="handleImageUpload" 
                          class="file-input" 
                          accept="image/*" 
                          :required="!editingProduct"
                        />
                        <label for="imageUpload" class="file-label">
                          <i class="fas fa-cloud-upload-alt"></i>
                          <span>Click to upload or drag and drop</span>
                          <small>PNG, JPG or JPEG (Max. 5MB)</small>
                        </label>
                      </div>
                    </div>

                    <div v-if="uploadProgress > 0 && uploadProgress < 100" class="form-group enhanced">
                      <label class="form-label">Upload Progress</label>
                      <div class="progress-container">
                        <div class="progress-bar">
                          <div 
                            class="progress-fill" 
                            :style="{width: uploadProgress + '%'}"
                          ></div>
                        </div>
                        <span class="progress-text">{{uploadProgress}}%</span>
                      </div>
                    </div>

                    <div v-if="imagePreviewUrl" class="form-group enhanced">
                      <label class="form-label">Image Preview</label>
                      <div class="image-preview">
                        <img :src="imagePreviewUrl" alt="Preview" />
                        <div class="image-overlay">
                          <i class="fas fa-eye"></i>
                        </div>
                      </div>
                    </div>

                    <div class="form-group enhanced">
                      <label class="form-label">Product Tags</label>
                      <div class="checkbox-grid">
                        <div class="checkbox-item">
                          <input 
                            v-model="product.new" 
                            type="checkbox" 
                            class="custom-checkbox" 
                            id="newProduct"
                          />
                          <label for="newProduct" class="checkbox-label">
                            <span class="checkbox-icon"></span>
                            <span class="checkbox-text">
                              <i class="fas fa-star"></i>New Product
                            </span>
                          </label>
                        </div>

                        <div class="checkbox-item">
                          <input 
                            v-model="product.bestSelling" 
                            type="checkbox" 
                            class="custom-checkbox" 
                            id="bestSelling"
                          />
                          <label for="bestSelling" class="checkbox-label">
                            <span class="checkbox-icon"></span>
                            <span class="checkbox-text">
                              <i class="fas fa-fire"></i>Best Selling
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div class="form-actions">
                      <button 
                        type="submit" 
                        class="btn btn-primary enhanced"
                        :disabled="uploading"
                        :class="{ 'loading': uploading }"
                      >
                        <span v-if="uploading" class="loading-content">
                          <i class="fas fa-spinner fa-spin"></i>
                          <span>Uploading...</span>
                        </span>
                        <span v-else-if="editingProduct" class="button-content">
                          <i class="fas fa-save"></i>
                          <span>Update Product</span>
                        </span>
                        <span v-else class="button-content">
                          <i class="fas fa-plus"></i>
                          <span>Add Product</span>
                        </span>
                      </button>
                      
                      <button 
                        v-if="editingProduct"
                        @click="cancelEdit"
                        type="button" 
                        class="btn btn-secondary enhanced"
                      >
                        <i class="fas fa-times"></i>
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Enhanced Products Management -->
         <div class="table-card">
  <div class="card-header">
    <div class="header-content">
      <h3 class="card-title">
        <i class="fas fa-list"></i>Products Management
      </h3>
      <div class="header-stats">
        <span class="stat-badge">{{ products.length }} total items</span>
        <span class="stat-badge success">{{ filteredProducts.length }} showing</span>
      </div>
    </div>
    <div class="header-actions">
      <div class="search-filter-group">
        <div class="search-box">
          <i class="fas fa-search search-icon"></i>
          <input 
            v-model="searchQuery"
            type="text" 
            class="search-input" 
            placeholder="Search products..."
          />
        </div>
        <select v-model="filterCategory" class="filter-select">
          <option value="">All Categories</option>
          <optgroup label="Basic Categories">
            <option>Parfume</option>
            <option>Kremra</option>
            <option>Deodorant</option>
            <option>Makeup</option>
            <option>Skincare</option>
          </optgroup>
          <optgroup label="Brands">
            <option>Alien Miglei</option>
            <option>Amouage</option>
            <option>Armani</option>
            <option>Boss</option>
            <option>Burberry</option>
            <option>Burbery</option>
            <option>Bvlgari</option>
            <option>Calvin Klein</option>
            <option>Casamorati</option>
            <option>Chanel</option>
            <option>Chloe</option>
            <option>Dior</option>
            <option>Dolce Gabana</option>
            <option>Gisada</option>
            <option>Givenchy</option>
            <option>Gucci</option>
            <option>Initio</option>
            <option>JPG</option>
            <option>Kayali</option>
            <option>Lancome</option>
            <option>Lataffa</option>
            <option>Louis Vuitton</option>
            <option>Maison Francis Kurkdjian</option>
            <option>Mancera</option>
            <option>Memo</option>
            <option>Montale</option>
            <option>Narciso Rodriguez</option>
            <option>Nishane</option>
            <option>Paco Rabane</option>
            <option>Paco Rabanne</option>
            <option>Parfums de Marly</option>
            <option>Prada</option>
            <option>Roberto Cavalli</option>
            <option>Scandal</option>
            <option>Sol de Janeiro</option>
            <option>Tiziana Terenzi</option>
            <option>Tom Ford</option>
            <option>Valentino</option>
            <option>Victoria Secret</option>
            <option>XERIOEFF</option>
            <option>YSL</option>
          </optgroup>
        </select>
        <button @click="fetchProducts" class="refresh-btn">
          <i class="fas fa-sync-alt"></i>
        </button>
      </div>
    </div>
  </div>
  
 <div class="card-body">
  <!-- Loading State -->
  <div v-if="loading" class="loading-state">
    <div class="loading-spinner">
      <i class="fas fa-spinner fa-spin"></i>
    </div>
    <h4>Loading products...</h4>
    <p>Please wait while we fetch your products</p>
  </div>

  <!-- Products Views (when products exist) -->
  <div v-else-if="products.length > 0">
    <!-- Mobile Cards View (visible on small screens) -->
    <div class="mobile-products-view">
      <div v-for="(product, index) in filteredProducts" :key="product.id || index" class="product-card-mobile">
        <div class="product-card-header">
          <div class="product-image-mobile">
            <img 
              :src="product.imageUrl" 
              alt="Product" 
              @error="handleImageError"
            />
          </div>
          <div class="product-main-info">
            <h4 class="product-title-mobile">{{ product.title || 'Untitled' }}</h4>
            <p class="product-description-mobile">{{ truncateText(product.description || '', 60) }}</p>
            <div class="product-badges-mobile">
              <span class="category-badge-mobile">{{ product.category || 'No Category' }}</span>
              <span v-if="product.new" class="status-badge new">New</span>
              <span v-if="product.bestSelling" class="status-badge bestseller">Best Selling</span>
            </div>
          </div>
        </div>
        
        <div class="product-card-body">
          <div class="product-details-row">
            <div class="detail-item">
              <span class="detail-label">Price</span>
              <div class="price-info-mobile">
                <span class="price-mobile">€{{ product.price || '0.00' }}</span>
                <span v-if="product.discount" class="discount-mobile">-{{ product.discount }}%</span>
              </div>
            </div>
            <div class="detail-item">
              <span class="detail-label">Product #</span>
              <span class="detail-value">{{ index + 1 }}</span>
            </div>
          </div>
        </div>
        
        <div class="product-card-actions">
          <button 
            @click="editProduct(product)" 
            class="action-btn-mobile edit"
          >
            <i class="fas fa-edit"></i>
            <span>Edit</span>
          </button>
          <button 
            @click="deleteProduct(product.id)" 
            class="action-btn-mobile delete"
          >
            <i class="fas fa-trash"></i>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Desktop Table View (hidden on small screens) -->
    <div class="table-container desktop-table">
      <div class="table-responsive">
        <table class="products-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in filteredProducts" :key="product.id || index" class="product-row">
              <td class="row-number">{{ index + 1 }}</td>
              <td class="product-cell">
                <div class="product-info">
                  <div class="product-image">
                    <img 
                      :src="product.imageUrl" 
                      alt="Product" 
                      @error="handleImageError"
                    />
                  </div>
                  <div class="product-details">
                    <h4 class="product-title">{{ product.title || 'Untitled' }}</h4>
                    <p class="product-description">{{ truncateText(product.description || '', 50) }}</p>
                  </div>
                </div>
              </td>
              <td class="category-cell">
                <span class="category-badge">{{ product.category || 'No Category' }}</span>
              </td>
              <td class="price-cell">
                <div class="price-info">
                  <span class="price">€{{ product.price || '0.00' }}</span>
                  <span v-if="product.discount" class="discount">-{{ product.discount }}%</span>
                </div>
              </td>
              <td class="status-cell">
                <div class="status-badges">
                  <span v-if="product.new" class="status-badge new">New</span>
                  <span v-if="product.bestSelling" class="status-badge bestseller">Best Selling</span>
                  <span v-if="!product.new && !product.bestSelling" class="status-badge regular">Regular</span>
                </div>
              </td>
              <td class="actions-cell">
                <div class="action-buttons">
                  <button 
                    @click="editProduct(product)" 
                    class="action-btn edit"
                    title="Edit Product"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button 
                    @click="deleteProduct(product.id)" 
                    class="action-btn delete"
                    title="Delete Product"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- No Results State (when filtered results are empty) -->
    <div v-if="filteredProducts.length === 0" class="no-results-state">
      <div class="no-results-icon">
        <i class="fas fa-search"></i>
      </div>
      <h4>No products match your search</h4>
      <p>Try adjusting your search criteria or filters</p>
      <button @click="searchQuery = ''; filterCategory = ''" class="btn btn-outline-primary">
        <i class="fas fa-times"></i>Clear Filters
      </button>
    </div>
  </div>

  <!-- Empty State (when no products exist) -->
  <div v-else class="empty-state">
    <div class="empty-icon">
      <i class="fas fa-inbox"></i>
    </div>
    <h4>No products found</h4>
    <p>Start building your inventory by adding your first product</p>
    <button class="btn btn-primary">
      <i class="fas fa-plus"></i>Add Your First Product
    </button>
  </div>
</div>
</div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { db, storage, auth } from '@/firebase'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import productService from '@/services/productService'


export default {
  data() {
    return {
      username: '',
      password: '',
      loggedIn: false,
      error: false,
      loading: false,
      searchQuery: '',
      filterCategory: '',
      product: {
        title: '',
        description: '',
        price: null,
        category: '',
        imageUrl: '',
        discount: null,
        new: false,
        bestSelling: false,
      },
      imageFile: null,
      imagePreviewUrl: null,
      uploading: false,
      uploadProgress: 0,
      products: [],
      editingProduct: null,
    }
  },
  computed: {
    newProductsCount() {
      return this.products.filter(p => p.new).length
    },
    bestSellingCount() {
      return this.products.filter(p => p.bestSelling).length
    },
    filteredProducts() {
      let filtered = [...this.products]

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(product => 
          (product.title || '').toLowerCase().includes(query) ||
          (product.description || '').toLowerCase().includes(query) ||
          (product.category || '').toLowerCase().includes(query)
        )
      }

      if (this.filterCategory) {
        filtered = filtered.filter(product => product.category === this.filterCategory)
      }

      return filtered
    }
  },
  methods: {
     async login() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.username, this.password);
        this.loggedIn = true;
        this.error = false;
        this.fetchProducts(); // Fetch products after login
        console.log('Logged in as:', userCredential.user.email);
      } catch (err) {
        console.error('Login error:', err.message);
        this.error = true;
      }
    },
    async logout() {
      try {
        await signOut(auth);
        this.loggedIn = false;
        this.username = '';
        this.password = '';
        this.resetForm();
        console.log('Logged out successfully');
      } catch (err) {
        console.error('Logout error:', err.message);
      }
    },

    handleImageUpload(event) {
      this.imageFile = event.target.files[0]
      
      if (this.imageFile) {
        this.imagePreviewUrl = URL.createObjectURL(this.imageFile)
      }
    },
    handleImageError(event) {
      event.target.src = 'https://via.placeholder.com/60x60?text=Error'
    },
    async uploadImage() {
      if (!this.imageFile) return null
      
      this.uploading = true
      this.uploadProgress = 0
      
      try {
        const storageRef = ref(storage, `products/${Date.now()}_${this.imageFile.name}`)
        const uploadTask = uploadBytesResumable(storageRef, this.imageFile)
        
        return new Promise((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => {
              this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            },
            (error) => {
              console.error('Upload error:', error)
              this.uploading = false
              reject(error)
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                this.uploading = false
                resolve(downloadURL)
              } catch (error) {
                console.error('Error getting download URL:', error)
                this.uploading = false
                reject(error)
              }
            }
          )
        })
      } catch (error) {
        console.error('Error in uploadImage:', error)
        this.uploading = false
        throw error
      }
    },
   async addProduct() {
  try {
    if (!this.validateForm()) return

    if (this.editingProduct) {
      await this.updateProduct()
      return
    }
    
    const downloadURL = await this.uploadImage()
    if (!downloadURL) {
      alert('Error uploading image!')
      return
    }
    
    this.product.imageUrl = downloadURL
    
    const productData = {
      title: this.product.title,
      description: this.product.description,
      price: Number(this.product.price),
      category: this.product.category,
      imageUrl: this.product.imageUrl,
      discount: this.product.discount ? Number(this.product.discount) : 0,
      new: Boolean(this.product.new),
      bestSelling: Boolean(this.product.bestSelling),
      createdAt: Timestamp.now(),
    }

    console.log('Adding product:', productData)
    
    const docRef = await addDoc(collection(db, 'products'), productData)
    console.log('Product added with ID:', docRef.id)
    
    alert('Product added successfully!')
    
    // Clear cache after adding product
    productService.clearCache()
    
    this.resetForm()
    await this.fetchProducts()
  } catch (err) {
    console.error('Error adding product:', err)
    alert('Error adding product: ' + err.message)
    this.uploading = false
  }
},
       async fetchProducts() {
      this.loading = true
      try {
        // Force refresh for admin to get latest data
        this.products = await productService.getProducts(true)
      } catch (err) {
        console.error('Error fetching products:', err)
        alert('Error loading products: ' + err.message)
      } finally {
        this.loading = false
      }
    },
    editProduct(product) {
      console.log('Editing product:', product)
      this.product = { 
        title: product.title || '',
        description: product.description || '',
        price: product.price || null,
        category: product.category || '',
        imageUrl: product.imageUrl || '',
        discount: product.discount || null,
        new: Boolean(product.new),
        bestSelling: Boolean(product.bestSelling),
      }
      this.editingProduct = product.id
      this.imagePreviewUrl = product.imageUrl
      
      // Scroll to form
        document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth' })

    },
async updateProduct() {
  try {
    if (!this.editingProduct) return

    const productRef = doc(db, 'products', this.editingProduct)

    if (this.imageFile) {
      const downloadURL = await this.uploadImage()
      this.product.imageUrl = downloadURL
    }

    const updateData = {
      title: this.product.title,
      description: this.product.description,
      price: Number(this.product.price),
      category: this.product.category,
      imageUrl: this.product.imageUrl,
      discount: this.product.discount ? Number(this.product.discount) : 0,
      new: Boolean(this.product.new),
      bestSelling: Boolean(this.product.bestSelling),
    }

    console.log('Updating product:', updateData)
    await updateDoc(productRef, updateData)
    alert('Product updated successfully!')
    
    // Clear cache after updating
    productService.clearCache()
    
    this.cancelEdit()
    await this.fetchProducts()
  } catch (err) {
    console.error('Error updating product:', err)
    alert('Error updating product: ' + err.message)
  }
},
   async deleteProduct(productId) {
  if (!confirm('Are you sure you want to delete this product?')) return

  try {
    console.log('Deleting product:', productId)
    const productRef = doc(db, 'products', productId)
    await deleteDoc(productRef)
    alert('Product deleted successfully!')
    
    // Clear cache after deleting
    productService.clearCache()
    
    await this.fetchProducts()
  } catch (err) {
    console.error('Error deleting product:', err)
    alert('Error deleting product: ' + err.message)
  }
},
    cancelEdit() {
      this.editingProduct = null
      this.resetForm()
    },
    resetForm() {
      this.product = {
        title: '',
        description: '',
        price: null,
        category: '',
        imageUrl: '',
        discount: null,
        new: false,
        bestSelling: false,
      }
      this.imageFile = null
      this.imagePreviewUrl = null
      this.uploading = false
      this.uploadProgress = 0
    },
    validateForm() {
      if (!this.product.title) {
        alert('Please enter a product title!')
        return false
      }
      if (!this.product.description) {
        alert('Please enter a product description!')
        return false
      }
      if (this.product.price === null || this.product.price === '') {
        alert('Please enter a product price!')
        return false
      }
      if (!this.product.category) {
        alert('Please select a category!')
        return false
      }
      if (!this.imageFile && !this.editingProduct) {
        alert('Please select an image!')
        return false
      }
      return true
    },
    truncateText(text, length) {
      if (!text) return ''
      if (text.length <= length) return text
      return text.substring(0, length) + '...'
    }
  },
  async mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
        this.fetchProducts();
      } else {
        this.loggedIn = false;
      }
    });
  },
}
</script>

<style scoped>
/* Reset and Base Styles */
* {
  box-sizing: border-box;
}

.admin-panel {
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Login Styles */
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  padding: 50px;
  width: 100%;
  max-width: 450px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  width: 90px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  color: white;
  font-size: 2.5rem;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.login-header h2 {
  color: #2d3748;
  font-weight: 700;
  margin-bottom: 10px;
  font-size: 2rem;
}

.login-header .text-muted {
  color: #718096;
  font-size: 1rem;
}

.form-group {
  margin-bottom: 25px;
}

.input-group {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.input-group-prepend .input-group-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px;
  font-size: 1.1rem;
}

.form-control {
  border: none;
  padding: 15px 20px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
}

.form-control:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  background: #f8f9ff;
}

.login-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  padding: 15px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
}

.alert {
  border-radius: 12px;
  border: none;
  padding: 15px 20px;
  background: rgba(245, 101, 101, 0.1);
  color: #e53e3e;
  border-left: 4px solid #e53e3e;
}

/* Dashboard Layout */
.dashboard {
  min-height: 100vh;
  background: #f7fafc;
}

/* Top Navigation */
.top-nav {
  background: white;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.nav-brand {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
}

.nav-brand i {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px;
  border-radius: 12px;
  margin-right: 15px;
  font-size: 1.2rem;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #4a5568;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.mobile-menu-toggle:hover {
  background: #f7fafc;
  color: #667eea;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #4a5568;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
  gap: 8px;
}

.nav-link:hover,
.nav-link.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.time-display {
  background: #f7fafc;
  padding: 8px 15px;
  border-radius: 8px;
  color: #4a5568;
  font-weight: 500;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-info i {
  font-size: 2rem;
  color: #667eea;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  color: #2d3748;
  font-size: 0.95rem;
}

.user-role {
  font-size: 0.8rem;
  color: #718096;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 15px;
  background: none;
  border: 2px solid #e53e3e;
  color: #e53e3e;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 0.9rem;
}

.logout-btn:hover {
  background: #e53e3e;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(229, 62, 62, 0.3);
}

/* Main Content */
.main-content {
  min-height: calc(100vh - 70px);
}

.page-header {
  background: white;
  padding: 30px 0;
  border-bottom: 1px solid #e2e8f0;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 15px;
}

.page-subtitle {
  color: #718096;
  margin: 0;
  font-size: 1.1rem;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--accent-color);
}

.stat-card.primary {
  --accent-color: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.stat-card.success {
  --accent-color: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
}

.stat-card.warning {
  --accent-color: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
}

.stat-card.info {
  --accent-color: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
}

.stat-icon {
  width: 70px;
  height: 70px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: white;
  background: var(--accent-color);
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
  line-height: 1;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 1rem;
  color: #718096;
  font-weight: 500;
  margin-bottom: 8px;
}

.stat-change {
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
}

.stat-change.positive {
  color: #48bb78;
}

.stat-change.negative {
  color: #f56565;
}

/* Quick Actions */
.quick-actions-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.quick-action-btn {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  font-weight: 600;
  color: #4a5568;
}

.quick-action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: var(--hover-color);
}

.quick-action-btn.primary:hover {
  --hover-color: #667eea;
  color: #667eea;
}

.quick-action-btn.success:hover {
  --hover-color: #48bb78;
  color: #48bb78;
}

.quick-action-btn.warning:hover {
  --hover-color: #ed8936;
  color: #ed8936;
}

.quick-action-btn.info:hover {
  --hover-color: #4299e1;
  color: #4299e1;
}

.quick-action-btn i {
  font-size: 1.8rem;
}

/* Form Card */
.form-card,
.table-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  margin-bottom: 40px;
  overflow: hidden;
}

.card-header {
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  padding: 30px 40px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
}

.header-content .card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 5px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-content .card-subtitle {
  color: #718096;
  margin: 0;
  font-size: 1rem;
}

.header-stats {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.stat-badge {
  background: #e2e8f0;
  color: #4a5568;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.stat-badge.success {
  background: #c6f6d5;
  color: #22543d;
}

.card-body {
  padding: 40px;
}

/* Product Form */
.product-form .form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.form-section {
  background: #f7fafc;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.section-header {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-group.enhanced {
  margin-bottom: 25px;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.form-control.enhanced {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-control.enhanced:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-help {
  font-size: 0.875rem;
  color: #718096;
  margin-top: 5px;
}

.form-row-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.input-with-icon {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #718096;
  font-weight: 600;
}

.form-control.with-icon {
  padding-left: 40px;
}

/* Image Upload */
.image-upload-area {
  position: relative;
}

.file-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.file-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  border: 2px dashed #cbd5e0;
  border-radius: 12px;
  background: #f7fafc;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.file-label:hover {
  border-color: #667eea;
  background: #edf2f7;
}

.file-label i {
  font-size: 2rem;
  color: #667eea;
  margin-bottom: 10px;
}

.file-label span {
  font-weight: 500;
  color: #4a5568;
}

.file-label small {
  color: #718096;
  font-size: 0.875rem;
  margin-top: 5px;
}

/* Progress Bar */
.progress-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.progress-text {
  font-weight: 600;
  color: #667eea;
  font-size: 0.875rem;
  min-width: 40px;
}

/* Image Preview */
.image-preview {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  max-width: 300px;
  border: 2px solid #e2e8f0;
}

.image-preview img {
  width: 100%;
  height: auto;
  display: block;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-preview:hover .image-overlay {
  opacity: 1;
}

/* Custom Checkboxes */
.checkbox-grid {
  display: grid;
  gap: 15px;
}

.checkbox-item {
  position: relative;
}

.custom-checkbox {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 15px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  transition: all 0.3s ease;
  font-weight: 500;
}

.checkbox-label:hover {
  border-color: #667eea;
  background: #f7fafc;
}

.custom-checkbox:checked + .checkbox-label {
  border-color: #667eea;
  background: #edf2f7;
  color: #667eea;
}

.checkbox-icon {
  width: 20px;
  height: 20px;
  border: 2px solid #cbd5e0;
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
}

.custom-checkbox:checked + .checkbox-label .checkbox-icon {
  background: #667eea;
  border-color: #667eea;
}

.custom-checkbox:checked + .checkbox-label .checkbox-icon::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  font-size: 0.75rem;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.btn.enhanced {
  padding: 12px 30px;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  min-width: 150px;
  justify-content: center;
}

.btn-primary.enhanced {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary.enhanced:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.btn-secondary.enhanced {
  background: #e2e8f0;
  color: #4a5568;
}

.btn-secondary.enhanced:hover {
  background: #cbd5e0;
  transform: translateY(-2px);
}

.btn.loading {
  pointer-events: none;
  opacity: 0.8;
}

.loading-content,
.button-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Search and Filter */
.search-filter-group {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  min-width: 300px;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #718096;
  z-index: 2;
}

.search-input {
  width: 100%;
  padding: 12px 20px 12px 45px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.filter-select {
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  font-size: 0.95rem;
  min-width: 200px;
  transition: all 0.3s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
}

.refresh-btn {
  padding: 12px 15px;
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
}

.refresh-btn:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
  transform: rotate(180deg);
}

/* Table Styles */
.table-container {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.table-responsive {
  overflow-x: auto;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  min-width: 800px;
}

.products-table thead {
  background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
  color: white;
}

.products-table th {
  padding: 20px 15px;
  text-align: left;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.products-table tbody tr {
  border-bottom: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.products-table tbody tr:hover {
  background: #f7fafc;
}

.products-table td {
  padding: 20px 15px;
  vertical-align: middle;
}

.row-number {
  font-weight: 600;
  color: #718096;
  width: 60px;
}

/* Product Cell */
.product-info {
  display: flex;
  align-items: center;
  gap: 15px;
  min-width: 250px;
}

.product-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #e2e8f0;
  flex-shrink: 0;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-details {
  flex: 1;
  min-width: 0;
}

.product-title {
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 5px 0;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-description {
  color: #718096;
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Category Badge */
.category-badge {
  background: #edf2f7;
  color: #4a5568;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid #e2e8f0;
  white-space: nowrap;
}

/* Price Cell */
.price-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 80px;
}

.price {
  font-weight: 700;
  color: #2d3748;
  font-size: 1.1rem;
}

.discount {
  color: #48bb78;
  font-size: 0.875rem;
  font-weight: 600;
}

/* Status Badges */
.status-badges {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 100px;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
  width: fit-content;
}

.status-badge.new {
  background: #fef5e7;
  color: #d69e2e;
  border: 1px solid #f6e05e;
}

.status-badge.bestseller {
  background: #fed7d7;
  color: #c53030;
  border: 1px solid #feb2b2;
}

.status-badge.regular {
  background: #f7fafc;
  color: #718096;
  border: 1px solid #e2e8f0;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.action-btn.edit {
  background: #fef5e7;
  color: #d69e2e;
  border: 1px solid #f6e05e;
}

.action-btn.edit:hover {
  background: #ed8936;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(237, 137, 54, 0.3);
}

.action-btn.delete {
  background: #fed7d7;
  color: #c53030;
  border: 1px solid #feb2b2;
}

.action-btn.delete:hover {
  background: #e53e3e;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(229, 62, 62, 0.3);
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 80px 40px;
  color: #718096;
}

.loading-spinner {
  font-size: 3rem;
  margin-bottom: 20px;
  color: #667eea;
}

.loading-state h4 {
  color: #4a5568;
  margin-bottom: 10px;
}

/* Empty States */
.empty-state,
.no-results-state {
  text-align: center;
  padding: 80px 40px;
  color: #718096;
}

.empty-icon,
.no-results-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  color: #cbd5e0;
}

.empty-state h4,
.no-results-state h4 {
  color: #4a5568;
  margin-bottom: 10px;
  font-size: 1.5rem;
}

.empty-state p,
.no-results-state p {
  margin-bottom: 30px;
  font-size: 1rem;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .content-wrapper {
    padding: 30px 20px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 992px) {
  .mobile-menu-toggle {
    display: block;
  }
  
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-top: 1px solid #e2e8f0;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
  }
  
  .nav-links.show {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .nav-link {
    width: 100%;
    justify-content: flex-start;
  }
  
  .product-form .form-row {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .quick-actions-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  
  .form-row-split {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 15px;
  }
  
  .nav-brand {
    font-size: 1.3rem;
  }
  
  .nav-brand span {
    display: none;
  }
  
  .nav-actions {
    gap: 10px;
  }
  
  .time-display {
    display: none;
  }
  
  .user-details {
    display: none;
  }
  
  .logout-btn span {
    display: none;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .content-wrapper {
    padding: 20px 15px;
  }
  
  .card-header {
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .card-body {
    padding: 20px;
  }
  
  .form-section {
    padding: 20px;
  }
  
  .search-filter-group {
    flex-direction: column;
    width: 100%;
  }
  
  .search-box {
    min-width: 100%;
  }
  
  .filter-select {
    min-width: 100%;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .quick-actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px;
    margin: 15px;
  }
  
  .page-title {
    font-size: 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .quick-actions-grid {
    grid-template-columns: 1fr;
  }
  
  .products-table th,
  .products-table td {
    padding: 15px 8px;
  }
  
  .product-info {
    flex-direction: column;
    gap: 10px;
    text-align: center;
    min-width: 200px;
  }
  
  .action-buttons {
    justify-content: center;
  }
  
  .stat-card {
    flex-direction: column;
    text-align: center;
  }
  
  .btn.enhanced {
    min-width: 100%;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
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

.stat-card,
.form-card,
.table-card,
.quick-action-btn {
  animation: fadeInUp 0.6s ease forwards;
}

.stat-card:nth-child(1) { animation-delay: 0.1s; }
.stat-card:nth-child(2) { animation-delay: 0.2s; }
.stat-card:nth-child(3) { animation-delay: 0.3s; }
.stat-card:nth-child(4) { animation-delay: 0.4s; }

/* Print Styles */
@media print {
  .top-nav,
  .quick-actions-section,
  .form-card,
  .action-buttons {
    display: none !important;
  }
  
  .table-card {
    box-shadow: none !important;
    border: 1px solid #000 !important;
  }
  
  .page-header {
    border-bottom: 2px solid #000 !important;
  }
}
/* Mobile Products View */
.mobile-products-view {
  display: none;
}

.product-card-mobile {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.product-card-mobile:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.product-card-header {
  padding: 20px;
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.product-image-mobile {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #e2e8f0;
  flex-shrink: 0;
}

.product-image-mobile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-main-info {
  flex: 1;
  min-width: 0;
}

.product-title-mobile {
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  line-height: 1.3;
}

.product-description-mobile {
  color: #718096;
  margin: 0 0 12px 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.product-badges-mobile {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-badge-mobile {
  background: #edf2f7;
  color: #4a5568;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
}

.product-card-body {
  padding: 0 20px 20px 20px;
  border-top: 1px solid #f7fafc;
  background: #f7fafc;
}

.product-details-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 15px 0;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.detail-label {
  font-size: 0.8rem;
  color: #718096;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-weight: 600;
  color: #2d3748;
  font-size: 0.95rem;
}

.price-info-mobile {
  display: flex;
  align-items: center;
  gap: 8px;
}

.price-mobile {
  font-weight: 700;
  color: #2d3748;
  font-size: 1.1rem;
}

.discount-mobile {
  background: #c6f6d5;
  color: #22543d;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.product-card-actions {
  padding: 15px 20px;
  background: white;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 10px;
}

.action-btn-mobile {
  flex: 1;
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.action-btn-mobile.edit {
  background: #fef5e7;
  color: #d69e2e;
  border: 1px solid #f6e05e;
}

.action-btn-mobile.edit:hover {
  background: #ed8936;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(237, 137, 54, 0.3);
}

.action-btn-mobile.delete {
  background: #fed7d7;
  color: #c53030;
  border: 1px solid #feb2b2;
}

.action-btn-mobile.delete:hover {
  background: #e53e3e;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(229, 62, 62, 0.3);
}

/* Desktop Table */
.desktop-table {
  display: block;
}

/* Table Styles (existing styles remain the same) */
.table-container {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.table-responsive {
  overflow-x: auto;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  min-width: 800px;
}

.products-table thead {
  background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
  color: white;
}

.products-table th {
  padding: 20px 15px;
  text-align: left;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.products-table tbody tr {
  border-bottom: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.products-table tbody tr:hover {
  background: #f7fafc;
}

.products-table td {
  padding: 20px 15px;
  vertical-align: middle;
}

/* Responsive Breakpoints */
@media (max-width: 1024px) {
  .products-table th,
  .products-table td {
    padding: 15px 10px;
    font-size: 0.9rem;
  }
  
  .product-info {
    gap: 10px;
  }
  
  .product-image {
    width: 50px;
    height: 50px;
  }
  
  .product-title {
    font-size: 0.95rem;
  }
  
  .product-description {
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .desktop-table {
    display: none;
  }
  
  .mobile-products-view {
    display: block;
  }
  
  .search-filter-group {
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }
  
  .search-box,
  .filter-select {
    min-width: 100%;
  }
  
  .card-header {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }
  
  .header-stats {
    justify-content: flex-start;
  }
}

@media (max-width: 480px) {
  .product-card-header {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .product-image-mobile {
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }
  
  .product-details-row {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .action-btn-mobile {
    padding: 10px 15px;
    font-size: 0.85rem;
  }
  
  .product-badges-mobile {
    justify-content: center;
  }
  
  .search-filter-group {
    gap: 15px;
  }
}

@media (max-width: 360px) {
  .product-card-mobile {
    margin-bottom: 15px;
  }
  
  .product-card-header,
  .product-card-body,
  .product-card-actions {
    padding: 15px;
  }
  
  .product-card-actions {
    flex-direction: column;
  }
  
  .action-btn-mobile {
    justify-content: center;
  }
}
</style>