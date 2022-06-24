<template>
  <nav-bar-component />
  <profile-component />
  <footer-component />
</template>

<script setup lang='ts'>
import { onMounted } from "vue"
import { useRouter } from 'vue-router'

import NavBarComponent from "../components/NavBarComponent.vue"
import ProfileComponent from "../components/ProfileComponent.vue"
import FooterComponent from "../components/FooterComponent.vue"
import useKanaksanStore from "../stores/kanaksanStore"

const router = useRouter()
const kanaksanStore = useKanaksanStore()

onMounted(() => {
  if(kanaksanStore.authenticatedUser) {
  }
  else {
    router.push('/')
  }
})

</script>

<style scoped></style>
