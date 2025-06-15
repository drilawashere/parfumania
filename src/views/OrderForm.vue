<template>
  <div class="order-form-container">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <!-- Progress indicator -->
          <div class="progress-indicator mb-4">
            <div class="step active">
              <div class="step-circle">
                <i class="fas fa-info-circle"></i>
              </div>
              <span class="step-label">Detajet</span>
            </div>
            <div class="step-line"></div>
            <div class="step">
              <div class="step-circle">
                <i class="fas fa-check"></i>
              </div>
              <span class="step-label">Konfirmimi</span>
            </div>
          </div>

          <div class="card shadow-lg">
            <div class="card-body p-5">
              <div class="text-center mb-5">
                <h2 class="form-title">Detajet e Porosisë</h2>
                <p class="form-subtitle">Plotësoni të dhënat tuaja për të përfunduar porosinë</p>
              </div>
              
              <div v-if="product" class="fade-in">
                <!-- Product Summary Card -->
                <div class="product-summary-card mb-5">
                  <div class="row align-items-center">
                    <div class="col-md-3">
                      <div class="product-image-wrapper">
                        <img 
                          v-if="product.imageUrl" 
                          :src="product.imageUrl" 
                          alt="Product" 
                          class="product-image"
                        >
                        <div v-else class="product-placeholder">
                          <i class="fas fa-image"></i>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <h5 class="product-title">{{ product.title }}</h5>
                      <p class="product-description">{{ product.description || 'Produkt cilësor me garanci të plotë' }}</p>
                    </div>
                    <div class="col-md-3 text-end">
                      <div class="price-tag">
                        <span class="price">{{ product.price }}€</span>
                        <small class="price-label">çmimi</small>
                      </div>
                    </div>
                  </div>
                </div>

                <form @submit.prevent="submitOrder" class="order-form">
                  <!-- Personal Information Section -->
                  <div class="form-section">
                    <h4 class="section-title">
                      <i class="fas fa-user me-2"></i>
                      Të dhënat personale
                    </h4>
                    
                    <div class="row">
                      <div class="col-md-6 mb-4">
                        <div class="floating-label-group">
                          <input 
                            type="text" 
                            class="floating-input"
                            :class="{ 'has-value': orderDetails.firstName }"
                            v-model="orderDetails.firstName"
                            required
                            id="firstName"
                          >
                          <label for="firstName" class="floating-label">Emri *</label>
                          <div class="input-highlight"></div>
                        </div>
                      </div>

                      <div class="col-md-6 mb-4">
                        <div class="floating-label-group">
                          <input 
                            type="text" 
                            class="floating-input"
                            :class="{ 'has-value': orderDetails.lastName }"
                            v-model="orderDetails.lastName"
                            required
                            id="lastName"
                          >
                          <label for="lastName" class="floating-label">Mbiemri *</label>
                          <div class="input-highlight"></div>
                        </div>
                      </div>
                    </div>

                    <div class="mb-4">
                      <div class="floating-label-group">
                        <input 
                          type="tel" 
                          class="floating-input"
                          :class="{ 'has-value': orderDetails.phone }"
                          v-model="orderDetails.phone"
                          pattern="[0-9+\-\s()]+"
                          required
                          id="phone"
                        >
                        <label for="phone" class="floating-label">Numri i Telefonit *</label>
                        <div class="input-highlight"></div>
                        <small class="form-text">Format: +355 69 123 4567</small>
                      </div>
                    </div>
                  </div>

                  <!-- Delivery Information Section -->
                  <div class="form-section">
                    <h4 class="section-title">
                      <i class="fas fa-map-marker-alt me-2"></i>
                      Adresa e dërgesës
                    </h4>
                    
                    <!-- State and City Selection -->
                    <div class="row">
                      <div class="col-md-6 mb-4">
                        <div class="floating-label-group">
                          <select 
                            class="floating-input"
                            :class="{ 'has-value': orderDetails.shteti }"
                            v-model="orderDetails.shteti"
                            required
                            id="shteti"
                            @change="onStateChange"
                          >
                            <option value="" disabled>Zgjidhni shtetin</option>
                            <option value="Kosova">Kosova</option>
                            <option value="Shqipëria">Shqipëria</option>
                            <option value="Maqedonia">Maqedonia</option>
                          </select>
                          <div class="input-highlight"></div>
                        </div>
                      </div>

                      <div class="col-md-6 mb-4">
                        <div class="floating-label-group">
                          <select 
                            class="floating-input"
                            :class="{ 'has-value': orderDetails.qyteti }"
                            v-model="orderDetails.qyteti"
                            required
                            id="qyteti"
                            :disabled="!orderDetails.shteti"
                          >
                            <option value="" disabled>Zgjidhni qytetin</option>
                            <option 
                              v-for="city in availableCities" 
                              :key="city" 
                              :value="city"
                            >
                              {{ city }}
                            </option>
                          </select>
                          <div class="input-highlight"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="mb-4">
                      <div class="floating-label-group">
                        <textarea 
                          class="floating-input textarea"
                          :class="{ 'has-value': orderDetails.address }"
                          v-model="orderDetails.address"
                          rows="3"
                          required
                          id="address"
                        ></textarea>
                        <label for="address" class="floating-label">Adresa e plotë *</label>
                        <div class="input-highlight"></div>
                        <small class="form-text">Përfshini rrugën, numrin dhe detaje të tjera</small>
                      </div>
                    </div>
                  </div>

                  <!-- Order Details Section -->
                  <div class="form-section">
                    <h4 class="section-title">
                      <i class="fas fa-shopping-cart me-2"></i>
                      Detajet e porosisë
                    </h4>
                    
                    <div class="row align-items-center">
                      <div class="col-md-6 mb-4">
                        <div class="quantity-selector">
                          <label class="quantity-label">Sasia</label>
                          <div class="quantity-controls">
                            <button 
                              type="button" 
                              class="qty-btn minus"
                              @click="decreaseQuantity"
                              :disabled="orderDetails.quantity <= 1"
                            >
                              <i class="fas fa-minus"></i>
                            </button>
                            <input 
                              type="number" 
                              class="qty-input"
                              v-model="orderDetails.quantity"
                              min="1"
                              max="99"
                              required
                            >
                            <button 
                              type="button" 
                              class="qty-btn plus"
                              @click="increaseQuantity"
                              :disabled="orderDetails.quantity >= 99"
                            >
                              <i class="fas fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div class="col-md-6 mb-4">
                        <div class="total-price-card">
                          <div class="total-label">Totali</div>
                          <div class="total-amount">{{ calculateTotal() }}€</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Submit Section -->
                  <div class="submit-section text-center">
                    <button 
                      type="submit" 
                      class="btn-submit"
                      :disabled="isSubmitting"
                      :class="{ 'submitting': isSubmitting }"
                    >
                      <span v-if="!isSubmitting" class="btn-content">
                        <i class="fas fa-credit-card me-2"></i>
                        Konfirmo Porosinë
                      </span>
                      <span v-else class="btn-content">
                        <div class="spinner"></div>
                        Duke procesuar...
                      </span>
                    </button>
                    
                    <div class="security-badge mt-3">
                      <i class="fas fa-shield-alt me-2"></i>
                      <small>Transaksioni është i sigurt dhe i mbrojtur</small>
                    </div>
                  </div>
                </form>
              </div>
              
              <div v-else class="loading-state">
                <div class="loading-animation">
                  <div class="loading-circle"></div>
                  <div class="loading-circle"></div>
                  <div class="loading-circle"></div>
                </div>
                <h5 class="loading-title">Duke ngarkuar...</h5>
                <p class="loading-subtitle">Ju lutemi prisni ndërsa ngarkohen detajet e produktit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderDetails: {
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        quantity: 1,
        shteti: '',
        qyteti: ''
      },
      product: null,
      isSubmitting: false,
      cities: {
        'Kosova': [
          'Prishtina', 'Prizren', 'Peja', 'Gjilani', 'Mitrovica', 'Ferizaj', 
          'Gjakova', 'Suhareka', 'Istog', 'Klinë', 'Skënderaj', 'Viti', 
          'Podujevë', 'Obiliq', 'Malishevë', 'Drenas', 'Kamenicë', 'Rahovec',
          'Hani i Elezit', 'Mamushë', 'Junik', 'Deçan', 'Novo Brdo'
        ],
        'Shqipëria': [
          'Tiranë', 'Durrës', 'Vlorë', 'Elbasan', 'Shkodër', 'Fier', 'Korçë',
          'Berat', 'Lushnjë', 'Pogradec', 'Kavajë', 'Gjirokastër', 'Sarandë',
          'Laç', 'Kukës', 'Lezhë', 'Pukë', 'Tropojë', 'Dibër', 'Bulqizë',
          'Mirditë', 'Krujë', 'Mamurras', 'Patos', 'Roskovec', 'Ballsh',
          'Mallakastër', 'Lushnjë', 'Divjakë', 'Rrogozhinë', 'Peqin', 'Librazhd',
          'Gramsh', 'Cërrik', 'Belsh', 'Prrenjas', 'Pustec', 'Maliq', 'Devoll',
          'Kolonjë', 'Përmet', 'Këlcyrë', 'Tepelenë', 'Memaliaj', 'Selenicë',
          'Himarë', 'Delvinë', 'Finiq', 'Dropull', 'Konispol', 'Malësi e Madhe',
          'Koplik', 'Bajram Curri', 'Has', 'Vau i Dejës'
        ],
        'Maqedonia': [
          'Shkup', 'Kumanovë', 'Ohër', 'Tetovë', 'Gostivar', 'Strumicë', 'Manastir',
          'Prilep', 'Veles', 'Kavadar', 'Dibër', 'Kërçovë', 'Kriva Pallankë',
          'Radovish', 'Gevgjeli', 'Delçevë', 'Butel', 'Çair', 'Kisela Vodë',
          'Saraj', 'Sopishte', 'Studeničan', 'Araçinovo', 'Ilinden', 'Petrovec',
          'Zelenikovo', 'Plasnicë', 'Lipkovo', 'Rankovce', 'Kratovë', 'Kriva Pallankë',
          'Probishtip', 'Sveti Nikole', 'Lozovo', 'Çashkë', 'Bogevgrad', 'Shtip',
          'Vinicë', 'Zrnovci', 'Karbinci', 'Konche', 'Makedonska Kamenica',
          'Pehçevo', 'Berovo', 'Vallandovë', 'Bogdanci', 'Dojran', 'Demir Kapijë',
          'Negotino', 'Rosoman', 'Dolneni', 'Kavadarci', 'Çaška'
        ]
      }
    }
  },
  computed: {
    availableCities() {
      return this.orderDetails.shteti ? this.cities[this.orderDetails.shteti] || [] : []
    }
  },
  created() {
    try {
      // Use history.state instead of $route.query
      const stateData = window.history.state && window.history.state.product;
      if (stateData) {
        this.product = stateData;
        this.orderDetails.quantity = this.product.quantity || 1;
        console.log('Received product data:', this.product);
      } else {
        console.error('No product data received');
        this.$router.push('/');
      }
    } catch (error) {
      console.error('Error parsing product data:', error);
      this.$router.push('/');
    }
  },
  methods: {
    onStateChange() {
      // Reset city when state changes
      this.orderDetails.qyteti = '';
    },
    
    async submitOrder() {
      this.isSubmitting = true;
      
      try {
        // Your bot token from @BotFather
        const BOT_TOKEN = '7710506046:AAF8LBVZHS4vxYxIzeaBPebRtxc_tgjh-6I';
        // Your chat ID from @userinfobot
        const CHAT_ID = '7687255327';
        
        // Format message for Telegram
        const message = `
🛍️ Porosi e Re e Marrë!

👤 Detajet e Klientit:

Emri: ${this.orderDetails.firstName} ${this.orderDetails.lastName}
Nr. Telefonit: ${this.orderDetails.phone}
Shteti: ${this.orderDetails.shteti}
Qyteti: ${this.orderDetails.qyteti}
Adresa: ${this.orderDetails.address}

📦 Detajet e Produktit:

Produkti: ${this.product.title}
Çmimi: ${this.product.price}€
Sasia: ${this.orderDetails.quantity}
Totali: ${this.calculateTotal()}€
        `.trim();

        // Send to Telegram
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
          })
        });

        if (!response.ok) {
          throw new Error('Failed to send to Telegram');
        }

        // Show success message
        this.showSuccessMessage();
        
        setTimeout(() => {
          this.$router.push('/');
        }, 2000);

      } catch (error) {
        console.error('Error submitting order:', error);
        alert('There was an error submitting your order. Please try again.');
      } finally {
        this.isSubmitting = false;
      }
    },
      
    showSuccessMessage() {
      // Create and show a success toast/modal
      const successElement = document.createElement('div')
      successElement.className = 'success-toast'
      successElement.innerHTML = `
        <div class="success-content">
          <i class="fas fa-check-circle"></i>
          <h4>Porosia u krye me sukses!</h4>
          <p>Do të kontaktoheni së shpejti për konfirmim</p>
        </div>
      `
      document.body.appendChild(successElement)
      
      setTimeout(() => {
        successElement.classList.add('show')
      }, 100)
      
      setTimeout(() => {
        successElement.remove()
      }, 3000)
    },
    
    calculateTotal() {
      if (!this.product || !this.product.price) return 0
      return (parseFloat(this.product.price) * this.orderDetails.quantity).toFixed(2)
    },
    
    increaseQuantity() {
      if (this.orderDetails.quantity < 99) {
        this.orderDetails.quantity++
      }
    },
    
    decreaseQuantity() {
      if (this.orderDetails.quantity > 1) {
        this.orderDetails.quantity--
      }
    }
  }
}
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.order-form-container {
  background: linear-gradient(135deg, #fafbfc 0%, #f4f6f8 100%);
  min-height: 100vh;
  position: relative;
}

.order-form-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(220, 38, 38, 0.03) 0%, transparent 50%);
  pointer-events: none;
}

.progress-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.step-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  border: 2px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.step.active .step-circle {
  background: #dc2626;
  border-color: #dc2626;
  color: white;
  box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.1);
}

.step-label {
  margin-top: 0.75rem;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

.step.active .step-label {
  color: #dc2626;
  font-weight: 600;
}

.step-line {
  width: 80px;
  height: 2px;
  background: #e5e7eb;
  margin: 0 1rem;
}

.card {
  border: none;
  border-radius: 24px;
  background: white;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  position: relative;
  z-index: 2;
}

.form-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
}

.form-subtitle {
  color: #6b7280;
  font-size: 1rem;
  font-weight: 400;
}

.fade-in {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.product-summary-card {
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.product-summary-card:hover {
  border-color: rgba(220, 38, 38, 0.2);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.product-image-wrapper {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 1;
  background: white;
  border: 1px solid #f3f4f6;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-image:hover {
  transform: scale(1.02);
}

.product-placeholder {
  width: 100%;
  height: 100%;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #d1d5db;
}

.product-title {
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
}

.product-description {
  color: #6b7280;
  margin-bottom: 0;
  font-size: 0.875rem;
  line-height: 1.5;
}

.price-tag {
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  border: 1px solid #fecaca;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.price-tag:hover {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
}

.price {
  font-size: 1.875rem;
  font-weight: 700;
  display: block;
  color: #dc2626;
}

.price-label {
  /* color: #991b1b; */
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
  font-size: 0.75rem;
}

.form-section {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #f3f4f6;
}

.form-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.section-title {
  color: #111827;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  font-size: 1.125rem;
}

.section-title i {
  color: #dc2626;
  width: 20px;
}

.floating-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.floating-input {
  width: 100%;
  padding: 2rem 1rem 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  outline: none;
  font-weight: 400;
}

.floating-input.textarea {
  resize: vertical;
  min-height: 120px;
  padding-top: 1.5rem;
}

.floating-input:focus,
.floating-input.has-value {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.floating-input:focus + .floating-label,
.floating-input.has-value + .floating-label {
  transform: translateY(-0.5rem) scale(0.875);
  color: #dc2626;
  font-weight: 500;
}

.floating-label {
  position: absolute;
  left: 1rem;
  top: 0.8rem;
  color: #6b7280;
  transition: all 0.3s ease;
  pointer-events: none;
  background: white;
  padding: 0 0.25rem;
  font-weight: 400;
}

.input-highlight {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: #dc2626;
  transition: all 0.3s ease;
  transform: translateX(-50%);
  border-radius: 1px;
}

.floating-input:focus ~ .input-highlight {
  width: 100%;
}

.form-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  font-weight: 400;
}

.quantity-selector {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
}

.quantity-selector:hover {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.quantity-label {
  display: block;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #111827;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.qty-btn {
  width: 44px;
  height: 44px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 0.875rem;
}

.qty-btn:not(:disabled):hover {
  border-color: #dc2626;
  background: #dc2626;
  color: white;
  transform: translateY(-1px);
}

.qty-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.qty-input {
  width: 80px;
  height: 44px;
  text-align: center;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  background: white;
  color: #111827;
}

.qty-input:focus {
  outline: none;
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.total-price-card {
  background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 16px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.total-price-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
}

.total-label {
  font-size: 0.875rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.total-amount {
  font-size: 2rem;
  font-weight: 700;
  color: white;
}

.submit-section {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid #f3f4f6;
}

.btn-submit {
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
  border: none;
  border-radius: 16px;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-width: 200px;
  box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.3);
}

.btn-submit:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(220, 38, 38, 0.4);
  background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%);
}

.btn-submit:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.btn-submit.submitting {
  pointer-events: none;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.security-badge {
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
}

.security-badge i {
  color: #10b981;
}

.loading-state {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-animation {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.loading-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #dc2626;
  animation: bounce 1.4s ease-in-out infinite both;
}

.loading-circle:nth-child(1) { animation-delay: -0.32s; }
.loading-circle:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { 
    transform: scale(0);
  } 40% { 
    transform: scale(1.0);
  }
}

.loading-title {
  color: #111827;
  margin-bottom: 1rem;
  font-weight: 600;
}

.loading-subtitle {
  color: #6b7280;
  font-weight: 400;
}

/* Success Toast */
:global(.success-toast) {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  z-index: 9999;
  opacity: 0;
  transition: all 0.3s ease;
  border: 1px solid #f3f4f6;
}

:global(.success-toast.show) {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

:global(.success-content) {
  text-align: center;
}

:global(.success-content i) {
  font-size: 3rem;
  color: #10b981;
  margin-bottom: 1rem;
}

:global(.success-content h4) {
  color: #111827;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

:global(.success-content p) {
  color: #6b7280;
  margin-bottom: 0;
  font-weight: 400;
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-title {
    font-size: 1.875rem;
  }
  
  .product-summary-card {
    padding: 1.5rem;
  }
  
  .product-summary-card .row {
    text-align: center;
  }
  
  .product-summary-card .col-md-3,
  .product-summary-card .col-md-6,
  .product-summary-card .col-md-3 {
    margin-bottom: 1rem;
  }
  
  .progress-indicator {
    margin-bottom: 1.5rem;
  }
  
  .step-line {
    width: 60px;
  }
  
  .quantity-controls {
    justify-content: space-between;
  }
  
  .btn-submit {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .card-body {
    padding: 2rem !important;
  }
  
  .form-title {
    font-size: 1.5rem;
  }
  
  .form-subtitle {
    font-size: 0.875rem;
  }
}
</style>