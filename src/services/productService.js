import { db } from '@/firebase'
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore'

class ProductService {
  constructor() {
    this.cache = {
      products: [],
      lastFetch: null,
      cacheTimeout: 15 * 60 * 1000 // Increase to 15 minutes for higher limits
    }
  }

  async getProducts(forceRefresh = false) {
    const now = Date.now()
    const cacheExpired = !this.cache.lastFetch || (now - this.cache.lastFetch) > this.cache.cacheTimeout

    if (forceRefresh || cacheExpired || this.cache.products.length === 0) {
      console.log('🔥 Fetching products from Firebase...')
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(q)
        this.cache.products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        this.cache.lastFetch = now
        console.log(`✅ Fetched ${this.cache.products.length} products from Firebase`)
      } catch (error) {
        console.error('❌ Error fetching products:', error)
        throw error
      }
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
    if (!searchTerm || !this.cache.products.length) return []
    
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