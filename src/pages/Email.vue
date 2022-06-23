<template>
  <nav-bar-component />
  <email-component />
  <footer-component />
</template>

<script setup lang='ts'>
import { onMounted } from "vue"

import FooterComponent from "../components/FooterComponent.vue"
import NavBarComponent from "../components/NavBarComponent.vue"
import EmailComponent from "../components/EmailComponent.vue"

onMounted(() => {
})

</script>

<style scoped></style>
