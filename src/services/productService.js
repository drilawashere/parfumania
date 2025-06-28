import { db } from '@/firebase'
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore'

class ProductService {
  constructor() {
    // Try to load cache from localStorage
    const cache = JSON.parse(localStorage.getItem('productCache') || '{}')
    this.cache = {
      products: cache.products || [],
      lastFetch: cache.lastFetch || null,
      cacheTimeout: 30 * 24 * 60 * 60 * 1000 // 30 days
    }
  }

async getProducts(forceRefresh = false) {
  const now = Date.now()
  const cacheExpired = !this.cache.lastFetch || (now - this.cache.lastFetch) > this.cache.cacheTimeout

  if (forceRefresh || cacheExpired || this.cache.products.length === 0) {
    console.log('🔥 Fetching products from Firebase...')
    const q = query(collection(db, 'products'), orderBy('title'))
    const snapshot = await getDocs(q)
    this.cache.products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    this.cache.lastFetch = now
    // Save to localStorage
    localStorage.setItem('productCache', JSON.stringify({
      products: this.cache.products,
      lastFetch: this.cache.lastFetch
    }))
    console.log(`✅ Fetched ${this.cache.products.length} products from Firebase`)
  } else {
    console.log('⚡ Using cached products - NO Firebase read!')
  }
  return this.cache.products
}
  async getBestSellingProducts() {
    const products = await this.getProducts()
    return products.filter(product => product.bestSelling === true)
  }

  async getNewProducts() {
    const products = await this.getProducts()
    return products.filter(product => product.new === true)
  }

  async getProductsByCategory(category) {
    const products = await this.getProducts()
    return products.filter(product => product.category === category)
  }

searchProducts(searchTerm) {
  if (!searchTerm || !this.cache.products.length) {
    console.log('🔍 Search: No search term or products cache is empty')
    return []
  }

  // Log where the products are coming from
  if (this.cache.products.length > 0) {
    console.log('🔍 Searching products from cache')
  } else {
    console.log('🔍 Searching products from Firebase (should not happen if cache works)')
  }

  const term = searchTerm.toLowerCase()
  return this.cache.products.filter(product =>
    (product.title && product.title.toLowerCase().includes(term)) ||
    (product.category && product.category.toLowerCase().includes(term)) ||
    (product.description && product.description.toLowerCase().includes(term))
  )
}
  clearCache() {
    this.cache.products = []
    this.cache.lastFetch = null
    console.log('🗑️ Product cache cleared')
  }

  async getProductById(id) {
    const products = await this.getProducts()
    return products.find(product => product.id === id)
  }
}

export default new ProductService()
