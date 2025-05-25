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
            Credentials are incorrect.
          </div>
        </form>
      </div>
    </div>

    <!-- Main Dashboard -->
    <div v-else class="dashboard">
      <!-- Header -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <i class="fas fa-store mr-2"></i>Admin Dashboard
          </a>
          <div class="navbar-nav ml-auto">
            <span class="navbar-text mr-3">
              <i class="fas fa-user-circle mr-1"></i>Welcome, Admin
            </span>
            <button @click="logout" class="btn btn-outline-light btn-sm">
              <i class="fas fa-sign-out-alt mr-1"></i>Logout
            </button>
          </div>
        </div>
      </nav>

      <div class="container-fluid mt-4">
        <!-- Stats Cards -->
        <div class="row mb-4">
          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                      Total Products
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ products.length }}</div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-boxes fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                      New Products
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ newProductsCount }}</div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-plus-circle fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-info shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                      Best Selling
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">{{ bestSellingCount }}</div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-fire fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-warning shadow h-100 py-2">
              <div class="card-body">
                <div class="row no-gutters align-items-center">
                  <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                      Loading
                    </div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">
                      <span v-if="loading">
                        <i class="fas fa-spinner fa-spin"></i>
                      </span>
                      <span v-else>Ready</span>
                    </div>
                  </div>
                  <div class="col-auto">
                    <i class="fas fa-database fa-2x text-gray-300"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Add Product Form -->
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">
              <i class="fas fa-plus-circle mr-2"></i>
              {{ editingProduct ? 'Edit Product' : 'Add New Product' }}
            </h6>
          </div>
          <div class="card-body">
            <form @submit.prevent="addProduct" class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="title">Product Title *</label>
                  <input 
                    v-model="product.title" 
                    id="title"
                    type="text"
                    class="form-control" 
                    placeholder="Enter product title"
                    required 
                  />
                </div>

                <div class="form-group">
                  <label for="description">Description *</label>
                  <textarea 
                    v-model="product.description" 
                    id="description"
                    class="form-control" 
                    rows="4"
                    placeholder="Enter product description"
                    required 
                  ></textarea>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="price">Price (€) *</label>
                      <input 
                        v-model.number="product.price" 
                        id="price"
                        type="number" 
                        step="0.01"
                        class="form-control" 
                        placeholder="0.00"
                        required 
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="discount">Discount (%)</label>
                      <input 
                        v-model.number="product.discount" 
                        id="discount"
                        type="number" 
                        class="form-control" 
                        placeholder="0"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="category">Category *</label>
<select 
  v-model="product.category" 
  id="category"
  class="form-control" 
  required
>
  <option disabled value="">Select Category</option>
  <!-- Basic Categories -->
  <optgroup label="Basic Categories">
    <option>Parfume</option>
    <option>Kremra</option>
    <option>Deodorant</option>
    <option>Makeup</option>
    <option>Skincare</option>
  </optgroup>
  <!-- Brand Categories -->
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

              <div class="col-md-6">
                <div class="form-group">
                  <label for="imageUpload">Product Image *</label>
                  <input 
                    type="file" 
                    id="imageUpload" 
                    @change="handleImageUpload" 
                    class="form-control-file" 
                    accept="image/*" 
                    :required="!editingProduct"
                  />
                </div>

                <div v-if="uploadProgress > 0 && uploadProgress < 100" class="form-group">
                  <label>Upload Progress</label>
                  <div class="progress">
                    <div 
                      class="progress-bar progress-bar-striped progress-bar-animated" 
                      role="progressbar" 
                      :style="{width: uploadProgress + '%'}" 
                      :aria-valuenow="uploadProgress" 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    >
                      {{uploadProgress}}%
                    </div>
                  </div>
                </div>

                <div v-if="imagePreviewUrl" class="form-group">
                  <label>Image Preview</label>
                  <div class="image-preview-container">
                    <img :src="imagePreviewUrl" alt="Preview" class="img-fluid rounded shadow" />
                  </div>
                </div>

                <div class="form-group">
                  <div class="form-check">
                    <input 
                      v-model="product.new" 
                      type="checkbox" 
                      class="form-check-input" 
                      id="newProduct"
                    />
                    <label class="form-check-label" for="newProduct">
                      Mark as New Product
                    </label>
                  </div>
                </div>

                <div class="form-group">
                  <div class="form-check">
                    <input 
                      v-model="product.bestSelling" 
                      type="checkbox" 
                      class="form-check-input" 
                      id="bestSelling"
                    />
                    <label class="form-check-label" for="bestSelling">
                      Mark as Best Selling
                    </label>
                  </div>
                </div>

                <div class="form-group mt-4">
                  <button 
                    type="submit" 
                    class="btn btn-success btn-block"
                    :disabled="uploading"
                  >
                    <span v-if="uploading">
                      <i class="fas fa-spinner fa-spin mr-2"></i>Uploading...
                    </span>
                    <span v-else-if="editingProduct">
                      <i class="fas fa-save mr-2"></i>Update Product
                    </span>
                    <span v-else>
                      <i class="fas fa-plus mr-2"></i>Add Product
                    </span>
                  </button>
                  
                  <button 
                    v-if="editingProduct"
                    @click="cancelEdit"
                    type="button" 
                    class="btn btn-secondary btn-block mt-2"
                  >
                    <i class="fas fa-times mr-2"></i>Cancel Edit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Products Management -->
        <div class="card shadow">
          <div class="card-header py-3 d-flex justify-content-between align-items-center">
            <h6 class="m-0 font-weight-bold text-primary">
              <i class="fas fa-list mr-2"></i>Products Management ({{ products.length }} items)
            </h6>
            <div class="d-flex align-items-center">
              <input 
                v-model="searchQuery"
                type="text" 
                class="form-control form-control-sm mr-2" 
                placeholder="Search products..."
                style="width: 200px;"
              />
<select v-model="filterCategory" class="form-control form-control-sm mr-2" style="width: 150px;">
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
              <button @click="fetchProducts" class="btn btn-sm btn-outline-primary">
                <i class="fas fa-sync-alt"></i> Refresh
              </button>
            </div>
          </div>
          <div class="card-body p-0">
            <!-- Loading State -->
            <div v-if="loading" class="text-center py-5">
              <i class="fas fa-spinner fa-spin fa-3x text-muted mb-3"></i>
              <br>
              <span class="text-muted">Loading products...</span>
            </div>

            <!-- Products Table -->
            <div v-else-if="products.length > 0" class="table-responsive">
              <table class="table table-striped table-hover mb-0">
                <thead class="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, index) in filteredProducts" :key="product.id || index">
                    <td class="align-middle">{{ index + 1 }}</td>
                    <td class="align-middle">
                      <img 
                        :src="product.imageUrl || 'https://via.placeholder.com/60x60?text=No+Image'" 
                        alt="Product" 
                        class="product-table-image rounded"
                        @error="handleImageError"
                      />
                    </td>
                    <td class="align-middle">
                      <div>
                        <strong>{{ product.title || 'Untitled' }}</strong>
                        <br>
                        <small class="text-muted">{{ truncateText(product.description || '', 50) }}</small>
                      </div>
                    </td>
                    <td class="align-middle">
                      <span class="badge badge-secondary">{{ product.category || 'No Category' }}</span>
                    </td>
                    <td class="align-middle">
                      <strong>€{{ product.price || '0.00' }}</strong>
                      <span v-if="product.discount" class="text-success">
                        <br><small>-{{ product.discount }}%</small>
                      </span>
                    </td>
                    <td class="align-middle">
                      <span v-if="product.new" class="badge badge-warning mr-1">New</span>
                      <span v-if="product.bestSelling" class="badge badge-danger">Best Selling</span>
                      <span v-if="!product.new && !product.bestSelling" class="badge badge-light">Regular</span>
                    </td>
                    <td class="align-middle">
                      <div class="btn-group" role="group">
                        <button 
                          @click="editProduct(product)" 
                          class="btn btn-warning btn-sm"
                          title="Edit Product"
                        >
                          <i class="fas fa-edit"></i>
                        </button>
                        <button 
                          @click="deleteProduct(product.id)" 
                          class="btn btn-danger btn-sm"
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

            <!-- No Products State -->
            <div v-else class="text-center py-5">
              <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
              <br>
              <h5 class="text-muted">No products found</h5>
              <p class="text-muted">Add your first product using the form above</p>
            </div>

            <!-- Filtered Results -->
            <div v-if="!loading && products.length > 0 && filteredProducts.length === 0" class="text-center py-5">
              <i class="fas fa-search fa-3x text-muted mb-3"></i>
              <br>
              <h5 class="text-muted">No products match your search</h5>
              <p class="text-muted">Try adjusting your search criteria</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, storage, auth } from '@/firebase'
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

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
        console.log('Fetching products...')
        const querySnapshot = await getDocs(collection(db, 'products'))
        console.log('Query snapshot size:', querySnapshot.size)
        
        this.products = []
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          console.log('Product data:', { id: doc.id, ...data })
          this.products.push({ id: doc.id, ...data })
        })
        
        console.log('Total products loaded:', this.products.length)
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
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
.admin-panel {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 2rem;
}

.login-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  padding: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.dashboard {
  background: #f8f9fc;
  min-height: 100vh;
}

.border-left-primary {
  border-left: 0.25rem solid #4e73df !important;
}

.border-left-success {
  border-left: 0.25rem solid #1cc88a !important;
}

.border-left-info {
  border-left: 0.25rem solid #36b9cc !important;
}

.border-left-warning {
  border-left: 0.25rem solid #f6c23e !important;
}

.text-xs {
  font-size: 0.7rem;
}

.text-gray-800 {
  color: #5a5c69 !important;
}

.text-gray-300 {
  color: #dddfeb !important;
}

.card {
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
  border: none;
}

.image-preview-container {
  max-width: 300px;
  max-height: 300px;
  overflow: hidden;
  border-radius: 8px;
  border: 2px dashed #e3e6f0;
  padding: 10px;
}

.product-table-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border: 2px solid #e3e6f0;
}

.btn-group .btn {
  margin-right: 5px;
}

.btn-group .btn:last-child {
  margin-right: 0;
}
</style>