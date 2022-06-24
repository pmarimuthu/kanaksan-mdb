<template>
  <nav-bar-component />
  <profiles-component />
  <footer-component />
  
</template>

<script setup lang='ts'>
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { useKanaksanStore } from '../stores/kanaksanStore'

import FooterComponent from "../components/FooterComponent.vue"
import ProfilesComponent from "../components/ProfilesComponent.vue"
import NavBarComponent from "../components/NavBarComponent.vue"

const kanaksanStore = useKanaksanStore()
const router = useRouter()

onMounted(() => {
  if(kanaksanStore.authenticatedUser) {
  }
  else {
    router.push('/')
  }
})
</script>

<style scoped></style>
