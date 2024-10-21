<template>
  <div v-if="product" class="bg-white p-6 rounded-lg shadow-lg">
    <div class="flex flex-wrap">
      <div class="w-full md:w-1/2 pr-4">
        <div class="mb-4">
          <img :src="currentImage" :alt="product.title" class="w-full h-64 object-cover rounded-lg">
        </div>
        <div class="grid grid-cols-4 gap-2">
          <img 
            v-for="(image, index) in allImages" 
            :key="index" 
            :src="image" 
            :alt="`${product.title} ${index + 1}`" 
            class="w-full h-20 object-cover rounded cursor-pointer transition-opacity hover:opacity-75"
            @click="setCurrentImage(image)"
          >
        </div>
      </div>
      <div class="w-full md:w-1/2 mt-4 md:mt-0">
        <h1 class="text-2xl font-bold mb-2">{{ product.title }}</h1>
        <p class="text-xl text-gray-700 mb-4">${{ product.price.toFixed(2) }}</p>
        <p class="text-gray-600 mb-4">SKU: {{ product.sku }}</p>
        <p class="mb-4">{{ product.description }}</p>
        <button @click="addToCart" class="btn btn-primary">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { faker } from '@faker-js/faker';
import { useNotification } from '@kyvg/vue3-notification';

const { notify } = useNotification();
const route = useRoute();
const product = ref<any>(null);
const additionalImages = ref<string[]>([]);
const currentImage = ref('');

const allImages = computed(() => [product.value?.image, ...additionalImages.value]);

function setCurrentImage(image: string) {
  currentImage.value = image;
}

onMounted(() => {
  product.value = {
    id: route.params.id,
    title: faker.commerce.productName(),
    image: faker.image.url(),
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    sku: faker.string.alphanumeric(8).toUpperCase(),
  };
  
  additionalImages.value = Array.from({ length: 3 }, () => faker.image.url());
  currentImage.value = product.value.image;
});

function addToCart() {
  emit('add-to-cart', { id: product.value.id, title: product.value.title, price: product.value.price });
  notify({
    title: 'Added to Cart',
    text: `${product.value.title} has been added to your cart.`,
    type: 'success'
  });
}

const emit = defineEmits(['add-to-cart']);
</script>