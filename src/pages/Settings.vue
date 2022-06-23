<template>
  <nav-bar-component />
  <settings-component />
  <footer-component />
</template>

<script setup lang='ts'>
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { useKanaksanStore } from '../stores/kanaksanStore'

import NavBarComponent from "../components/NavBarComponent.vue"
import SettingsComponent from "../components/SettingsComponent.vue"
import FooterComponent from "../components/FooterComponent.vue"

const router = useRouter()
const kanaksanStore = useKanaksanStore()

onMounted(() => {
  checkUser()
})

function checkUser() {
  if (kanaksanStore.authenticatedUser && kanaksanStore.authenticatedUser.id) return true
  this.$store.dispatch('doReset')
  router.push({ path: "/" })
}
</script>

<style scoped></style>
