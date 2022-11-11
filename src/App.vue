<script setup>
import Navbar from './components/navbar.vue';
import Footer from './components/footer.vue';

</script>

<template>
  <div>
    <Navbar />
    <div>
      <router-view></router-view>
    </div>
    <Footer />
  </div>

  <link rel="stylesheet" href="/src/assets/fonts/font-awesome.min.css">
  <link rel="stylesheet" href="/src/assets/css/Navbar---Apple-1.css">
  <link rel="stylesheet" href="/src/assets/css/Navbar---Apple.css">
  <link rel="stylesheet" href="/src/assets/css/Navbar-Right-Links-Dark.css">
  <link rel="stylesheet" href="/src/assets/css/styles.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300&display=swap" rel="stylesheet">
</template>

<style scoped>

</style>
