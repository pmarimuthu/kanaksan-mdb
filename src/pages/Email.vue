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
import useKanaksanStore from "../stores/kanaksanStore";
import { useRouter } from "vue-router";

const kanaksanStore = useKanaksanStore()
const router = useRouter();

onMounted(() => {
  if(kanaksanStore.authenticatedUser) {
    kanaksanStore.dialog.logout.isShow = true;
  }
  else {
    router.push('/')
  }
})

</script>

<style scoped></style>
