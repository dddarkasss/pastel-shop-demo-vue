<template>
  <div class="relative w-full h-64 overflow-hidden">
    <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <div v-for="(banner, index) in banners" :key="index" class="w-full flex-shrink-0">
        <img :src="banner.image" :alt="banner.title" class="w-full h-64 object-cover">
        <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
          <h2 class="text-3xl font-bold">{{ banner.title }}</h2>
        </div>
      </div>
    </div>
    <button @click="prevSlide" class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2">
      &lt;
    </button>
    <button @click="nextSlide" class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2">
      &gt;
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { faker } from '@faker-js/faker';

const banners = ref([
  { title: 'Summer Sale', image: faker.image.url() },
  { title: 'New Arrivals', image: faker.image.url() },
  { title: 'Special Offers', image: faker.image.url() },
]);

const currentSlide = ref(0);
const intervalId = ref<number | null>(null);

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % banners.value.length;
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + banners.value.length) % banners.value.length;
}

onMounted(() => {
  intervalId.value = setInterval(nextSlide, 5000);
});

onUnmounted(() => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
  }
});
</script>