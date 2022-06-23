<template>
  <nav class="navbar animated fadeInLeft is-fixed-top">
    <div class="navbar-brand">
      <a class="navbar-item" @click="onLogo">
        <img
          src="/assets/logo.svg"
          alt="Kanaksan Logo"
          style="min-height: 4rem; max-height: 4rem"
        />
      </a>
      <div
        class="navbar-burger"
        @click="showNav = !showNav"
        :class="{ 'is-active': showNav }"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="navbar-menu bg-color" :class="{ 'is-active': showNav }">
      <div class="navbar-end">
        <a
          v-show="!hasUser"
          class="navbar-item"
          v-on:click="onNavBarItem('/login')"
          >Login</a
        >
        <a
          v-show="hasUser"
          class="navbar-item"
          v-on:click="onNavBarItem('/logout')"
          >Logout</a
        >
        <a
          v-show="hasUser"
          class="navbar-item"
          v-on:click="onNavBarItem('/profile')"
          ><i class="fas fa-th"></i>&nbsp;Profile</a
        >
        <a
          v-show="hasUser"
          class="navbar-item"
          v-on:click="onNavBarItem('/profiles')"
          ><i class="fas fa-sitemap"></i>&nbsp;Kanaksans</a
        >
        <a
          v-show="hasUser"
          class="navbar-item"
          v-on:click="onNavBarItem('/settings')"
          ><i class="fas fa-sliders-h"></i>&nbsp;Settings</a
        >

        <a class="navbar-item" v-on:click="onNavBarItem('/blog')">
          <span class="material-icons">rss_feed</span>&nbsp;Blog
        </a>

        <label
          class="navbar-item is-clickable"
          v-on:click="onNavBarItem('/about')"
        >
          About
        </label>
        <label v-show="!hasUser" class="navbar-item">
          <span :class="[batteryLevelClass]"></span>
          {{ "&nbsp;" + Math.round(batteryLevel) }}%
        </label>
      </div>
    </div>
  </nav>
</template>

<script setup lang='ts'>
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useKanaksanStore } from '../stores/kanaksanStore'

const router = useRouter();
const kanaksanStore = useKanaksanStore()

const batteryLevel = ref(0);
const showNav = ref(false);
const batteryLevelClass = ref("fas fa-battery-empty");

const hasUser = computed(() => {
  if (kanaksanStore.authenticatedUser) return true;
  return false
})

function onLogo() {
  router.push({
    name: "Home",
    params: {},
  })
}

function checkBattery() {
  navigator.getBattery().then((manager) => {
    manager.addEventListener("levelchange", () => {
      batteryLevel.value = Number(manager.level * 100)

      const n = Number(batteryLevel.value)
      if (Number(n) < 25) batteryLevelClass.value = "fas fa-battery-empty"
      else if (Number(n) < 50)
        batteryLevelClass.value = "fas fa-battery-quarter"
      else if (Number(n) < 75) batteryLevelClass.value = "fas fa-battery-half"
      else batteryLevelClass.value = "fas fa-battery-full"
    })
  })
}

function onNavBarItem(itemName) {
  switch (itemName) {
    case '/logout':
      if (!confirm("Are you sure! you want to Logout."))
        return;
        
    case '/profile':
      if(kanaksanStore.authenticatedUser) {
        kanaksanStore.setSelectedUser(kanaksanStore.authenticatedUser)
        router.push('/profile')        
      }
      else {
        kanaksanStore.$reset()
        router.push('/')
      }
      break
  
    default:
      break
  }
  router.push(itemName)
}

onMounted(() => {
  checkBattery()
})
</script>

<style></style>
