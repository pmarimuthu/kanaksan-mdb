<template>
  <nav-bar-component />
  <envelope-component />
  <footer-component />
</template>

<script setup lang='ts'>
import { onMounted } from "vue"

import NavBarComponent from "../../components/NavBarComponent.vue"
import EnvelopeComponent from "../../components/card/EnvelopeComponent.vue"
import FooterComponent from "../../components/FooterComponent.vue"

onMounted(() => {
})

</script>

<style scoped></style>
