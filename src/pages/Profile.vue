<template>
  <nav-bar-component />
  <profile-component />
  <footer-component />
</template>

<script setup lang='ts'>
import { onMounted } from "vue"

import NavBarComponent from "../components/NavBarComponent.vue"
import ProfileComponent from "../components/ProfileComponent.vue"
import FooterComponent from "../components/FooterComponent.vue"

onMounted(() => {
})

</script>

<style scoped></style>
