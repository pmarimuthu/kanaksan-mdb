<template>
  <section class="section"></section>
  <div class="m-5 has-text-centered">
    <p class="subtitle has-text-centered has-text-link">
      <i class="fas fa-th"></i>&nbsp;Profile
    </p>
  </div>
  <div class="m-5 has-text-centered">
    <span>
      <slot>my-slot</slot>
      <user-detail-component />
    </span>
  </div>
</template>

<script setup lang='ts'>
import { onMounted } from "vue";
import { useKanaksanStore } from "../stores/kanaksanStore"
import { useRouter } from "vue-router"
import UserDetailComponent from "./UserDetailComponent.vue"

const kanaksanStore = useKanaksanStore()
const router = useRouter()

if (!kanaksanStore.selectedUser || !kanaksanStore.selectedUser.id) {
  kanaksanStore.$reset()
  router.push("/")
}

</script>

<style></style>
