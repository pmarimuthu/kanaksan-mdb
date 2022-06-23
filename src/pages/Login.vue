<template>
  <nav-bar-component />
  <login-component />
  <footer-component />
</template>

<script setup lang='ts'>
import { onMounted } from "vue"
import { useRouter } from "vue-router"

import FooterComponent from "../components/FooterComponent.vue"
import LoginComponent from "../components/LoginComponent.vue"
import NavBarComponent from "../components/NavBarComponent.vue"

const router = useRouter()

onMounted(() => {
})

</script>

<style scoped></style>
