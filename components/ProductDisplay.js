app.component('product-display', {
    props: {
      premium: {
        type: Boolean,
        required: true
      },
      cartLength: {   
        type: Number,
        required: true
      }
    },
    template: 
    `<div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <img v-bind:src="image">
        </div>
        <div class="product-info">
          <h1>{{ title }}</h1>
  
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
  
          <p>Shipping: {{ shipping }}</p>
          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>
  
          <div 
            v-for="(variant, index) in variants" 
            :key="variant.id" 
            @mouseover="updateVariant(index)" 
            class="color-circle" 
            :style="{ backgroundColor: variant.color }">
          </div>
          
          <button 
            class="button" 
            :class="{ disabledButton: !inStock }" 
            :disabled="!inStock" 
            v-on:click="addToCart">
            Add to Cart
          </button>
  
          <button 
  class="button" 
  :class="{ disabledButton: variants[selectedVariant].cartCount === 0 }" 
  :disabled="variants[selectedVariant].cartCount === 0" 
  @click="removeFromCart">
  Remove Item
  </button>
  
        </div>
      </div>
    </div>`,
    data() {
      return {
          product: 'Pinkmin',
          brand: 'Majesty',
          selectedVariant: 0,
          details: ['Companion plant'],
          variants: [
            { id: 2234, color: 'orange', image: 'assets/images/what-do-you-think-orange-pikmin-will-do-v0-7a0uxfwe26na1.png', quantity: 5, cartCount: 0 },
            { id: 2235, color: 'yellow', image: 'assets/images/images.png', quantity: 0, cartCount: 0 },
            { id: 2236, color: 'blue', image: 'assets/images/d6g6lxg-38e7c5d3-bc0f-4c63-bc1a-2cece36df019.png', quantity: 30, cartCount: 0 },
          ]
      }
    },
    methods: {
      addToCart() {
        if (this.variants[this.selectedVariant].quantity > 0) {
          this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
          this.variants[this.selectedVariant].quantity--
          this.variants[this.selectedVariant].cartCount++
        }
      },
      removeFromCart() {
        if (this.variants[this.selectedVariant].cartCount > 0) {
          this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
          this.variants[this.selectedVariant].quantity++
          this.variants[this.selectedVariant].cartCount--
        }
      },
        updateVariant(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        shipping() {
          if (this.premium) {
            return 'Free'
          }
          return 2.99
        }
    }
  })