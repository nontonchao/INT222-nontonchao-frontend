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
</template>

<style scoped>
</style>
