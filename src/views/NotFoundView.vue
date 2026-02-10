<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = (): void => {
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Halaman yang kamu cari tidak ditemukan.</p>
    <button type="button" @click="goHome">Kembali ke Beranda</button>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem 2rem;
}

.not-found h1 {
  font-size: 6rem;
  margin-bottom: 0.5rem;
  color: #646cff;
}

.not-found p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.6);
}
</style>
