<template>
  <nav-bar-component />
    <about-component />
  <footer-component />
</template>

<script setup lang='ts'>
import { onMounted } from "vue"
import { useKanaksanStore } from '../stores/kanaksanStore'

import FooterComponent from "../components/FooterComponent.vue"
import AboutComponent from "../components/AboutComponent.vue"
import NavBarComponent from "../components/NavBarComponent.vue"

const kanaksanStore = useKanaksanStore()

onMounted(() => {
})
</script>

<style scoped>
</style>
