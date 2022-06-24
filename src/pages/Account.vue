<template>
  <nav-bar-component />
  <common-dialog v-bind="logoutModal" @emit-action="emitAction" />
  <footer-component />
</template>

<script lang="ts">
  enum UserResponse {
    CANCEL = 0,
    LOGOUT = 1,
  }
</script>

<script setup lang='ts'>
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { useKanaksanStore } from '../stores/kanaksanStore'

import FooterComponent from "../components/FooterComponent.vue"
import NavBarComponent from "../components/NavBarComponent.vue"
import CommonDialog from "../components/CommonDialog.vue"

const router = useRouter()
const kanaksanStore = useKanaksanStore()

const logoutModal = {
  toShow: kanaksanStore.dialog.logout.isShow,
  title: 'Confirmation',
  message: 'Are you sure you want to Logout?',
  okButtonTitle: 'Logout',
  cancelButtonTitle: 'Cancel'
}

onMounted(() => {
  if(kanaksanStore.authenticatedUser) {
    kanaksanStore.dialog.logout.isShow = true;
  }
  else {
    router.push('/')
  }
})

const emitAction = (actionInfo: any) => {
  console.log('actionInfo: ', actionInfo)
  if(actionInfo && actionInfo === UserResponse.LOGOUT) {
    kanaksanStore.resetStoreUser()
    kanaksanStore.$reset()
    localStorage.clear()
    router.push({ path: "/" })
  }
}

</script>

<style scoped></style>
