<template>
  <nav-bar-component />
  <blog-component />
  <footer-component />
</template>

<script setup lang='ts'>
import { onMounted } from "vue"

import FooterComponent from "../components/FooterComponent.vue"
import BlogComponent from "../components/BlogComponent.vue"
import NavBarComponent from "../components/NavBarComponent.vue"

onMounted(() => {
})

</script>

<style scoped></style>
