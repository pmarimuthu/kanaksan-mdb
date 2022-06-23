<template>
  <div class="m-5 has-text-centered">
    <div class="subtitle has-text-centered has-text-info">         
      <div class="control" v-show="model.flag.isLoading">
        <div>
          <br>
          <button
            :disabled="model.flag.isLoading"
            class="button is-danger is-loading"              
          ></button>
        </div>
      </div>
    </div>
    <span v-for="user in kanaksanStore.users" :key="user.id">
      <pre v-show="false">{{ user.id }} </pre>
      <user-card-component :user="user" />
    </span>
  </div>
</template>

<script setup lang='ts'>
import { computed, onMounted, reactive } from "vue"
import { useKanaksanStore } from "../stores/kanaksanStore"
import axios from "axios"

import UserCardComponent from './UserCardComponent.vue'

const kanaksanStore = useKanaksanStore()

const model = reactive({
  actionCommand: "Login",
  flag: {
    isLoading: false,
  },
})

const URL = computed(() => {
  return kanaksanStore.apiBaseURL + "/api/app/health"
})

onMounted(() => {
  doCheckHealth()
})

function doCheckHealth() {
  const threadHealthCheck = setInterval(() => {
    axios
      .get("http://localhost:8080/api/app/health")
      .then((result) => {
        if (result.data === "Healthy!! App Up & Running.") {
          kanaksanStore.setIsHealthy(true)
          kanaksanStore.setErrors([])
          clearInterval(threadHealthCheck)
          onHealthOkProceed()
        } else {
          kanaksanStore.setIsHealthy(false)
          kanaksanStore.setErrors(["Service not available"])
        }
      })
      .catch((error) => {
        kanaksanStore.setIsHealthy(false)
        kanaksanStore.setErrors([ error ])
        clearInterval(threadHealthCheck)
      })
  }, 100)
}

function onHealthOkProceed() {
  if(localStorage.getItem('authId') && localStorage.getItem('authUserName')) {
    if (kanaksanStore.authenticatedUser && kanaksanStore.authenticatedUser.id) {
      model.flag.isLoading = false
      router.push("/profile")
    }
  }
}

</script>

<style></style>
