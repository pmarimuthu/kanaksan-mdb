<template>
  <nav-bar-component />
  <branch-component />
  <footer-component />
  
</template>

<script setup lang='ts'>
import axios from "axios";
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useKanaksanStore } from '../stores/kanaksanStore'

import FooterComponent from "../components/FooterComponent.vue"
import BranchComponent from "../components/BranchComponent.vue"
import NavBarComponent from "../components/NavBarComponent.vue"

import UserBean from "../models/user-bean";

const kanaksanStore = useKanaksanStore()
const router = useRouter()

onMounted(() => {
  checkUser()
})

function checkUser() {
  if (kanaksanStore.authenticatedUser && kanaksanStore.authenticatedUser.id) 
    return

  kanaksanStore.$reset()
  router.push({ path: "/" })
}

</script>

<style scoped></style>
