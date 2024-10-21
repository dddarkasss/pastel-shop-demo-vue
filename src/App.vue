<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-pastel-pink p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">Pastel Shop</h1>
        <nav>
          <router-link to="/" class="mr-4">Home</router-link>
          <button @click="toggleCart" class="btn btn-secondary">
            Cart ({{ cartItemCount }})
          </button>
        </nav>
      </div>
    </header>

    <banner-carousel class="mb-4"></banner-carousel>

    <main class="flex-grow container mx-auto p-4 flex">
      <router-view class="flex-grow" @add-to-cart="addToCart"></router-view>
      
      <transition name="cart">
        <aside v-if="isCartOpen" class="w-1/4 bg-white p-4 shadow-lg fixed right-0 top-0 h-full overflow-y-auto">
          <h2 class="text-xl font-bold mb-4">Your Cart</h2>
          <div v-for="item in cart" :key="item.id" class="mb-4">
            <h3>{{ item.title }}</h3>
            <p>Price: ${{ item.price.toFixed(2) }}</p>
            <div class="flex items-center">
              <button @click="updateQuantity(item.id, -1)" class="btn btn-secondary">-</button>
              <span class="mx-2">{{ item.quantity }}</span>
              <button @click="updateQuantity(item.id, 1)" class="btn btn-secondary">+</button>
              <button @click="confirmRemoveItem(item.id)" class="btn btn-secondary ml-2">Remove</button>
            </div>
          </div>
          <div class="mt-4">
            <p class="font-bold">Total: ${{ cartTotal.toFixed(2) }}</p>
            <button class="btn btn-primary mt-2 w-full">Checkout</button>
          </div>
        </aside>
      </transition>
    </main>
  </div>
  <notifications position="top right" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useNotification } from '@kyvg/vue3-notification';
import BannerCarousel from './components/BannerCarousel.vue';

const { notify } = useNotification();

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

const cart = ref<CartItem[]>([]);
const isCartOpen = ref(false);

const cartItemCount = computed(() => cart.value.reduce((total, item) => total + item.quantity, 0));
const cartTotal = computed(() => cart.value.reduce((total, item) => total + item.price * item.quantity, 0));

function toggleCart() {
  isCartOpen.value = !isCartOpen.value;
}

function addToCart(product: { id: string; title: string; price: number }) {
  const existingItem = cart.value.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.value.push({ ...product, quantity: 1 });
  }
  notify({
    title: 'Added to Cart',
    text: `${product.title} has been added to your cart.`,
    type: 'success'
  });
}

function updateQuantity(id: string, change: number) {
  const item = cart.value.find(item => item.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      confirmRemoveItem(id);
    }
  }
}

function confirmRemoveItem(id: string) {
  if (confirm('Are you sure you want to remove this item from your cart?')) {
    cart.value = cart.value.filter(i => i.id !== id);
    notify({
      title: 'Item Removed',
      text: 'The item has been removed from your cart.',
      type: 'info'
    });
  }
}
</script>