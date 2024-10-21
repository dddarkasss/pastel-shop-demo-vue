<template>
  <div>
    <div class="mb-4">
      <button @click="toggleView" class="btn btn-primary">
        {{ isGridView ? 'List View' : 'Grid View' }}
      </button>
    </div>
    <div :class="{ 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4': isGridView, 'space-y-4': !isGridView }">
      <div v-for="product in products" :key="product.id" class="bg-white p-4 rounded-lg shadow-md">
        <router-link :to="{ path: `/product/${product.id}` }">
          <img :src="product.image" :alt="product.title" class="w-full h-48 object-cover mb-2 rounded">
          <h2 class="text-lg font-semibold">{{ product.title }}</h2>
        </router-link>
        <p class="text-gray-600">${{ product.price.toFixed(2) }}</p>
        <button @click="addToCart(product)" class="btn btn-primary mt-2">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { faker } from '@faker-js/faker';
import { useNotification } from '@kyvg/vue3-notification';

const { notify } = useNotification();

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  sku: string;
}

const products = ref<Product[]>([]);
const isGridView = ref(true);

function generateProducts(count: number): Product[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    image: faker.image.url(),
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    sku: faker.string.alphanumeric(8).toUpperCase(),
  }));
}

onMounted(() => {
  products.value = generateProducts(20);
});

function toggleView() {
  isGridView.value = !isGridView.value;
}

function addToCart(product: Product) {
  emit('add-to-cart', { id: product.id, title: product.title, price: product.price });
  notify({
    title: 'Added to Cart',
    text: `${product.title} has been added to your cart.`,
    type: 'success'
  });
}

const emit = defineEmits(['add-to-cart']);
</script>