<template>
  <nav-bar-component />
  <footer-component />
</template>

<script setup lang='ts'>
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { useKanaksanStore } from '../stores/kanaksanStore'

import FooterComponent from "../components/FooterComponent.vue"
import NavBarComponent from "../components/NavBarComponent.vue"

const router = useRouter()
const kanaksanStore = useKanaksanStore()

onMounted(() => {
  kanaksanStore.resetStoreUser()
  kanaksanStore.$reset()
  localStorage.clear()
  router.push({ path: "/" })
})
</script>

<style scoped></style>
