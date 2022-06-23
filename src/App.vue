<template>
  <router-view :key="$route.fullPath" />
</template>

<script setup lang='ts'>
import axios from "axios"
import { onMounted } from "vue"
import UserBean from "./models/user-bean"
import { useKanaksanStore } from "./stores/kanaksanStore"

const kanaksanStore = useKanaksanStore()

onMounted(() => {
  getUserIds()
  getDistinctHeadsInfo()
})

const getUserIds = () => {
  fetchUserIds()
    .then((result) => {
      if (result.data) {
        kanaksanStore.setUserIds(result.data)
      }
    })
    .catch((error) => {
      kanaksanStore.setUserIds([])
    })
    .finally(() => {
      kanaksanStore.setUserIds([])
    })
}

const getDistinctHeadsInfo = () => {
  kanaksanStore.setIsLoading(true)
  kanaksanStore.setDistinctFamilyHeadsInfo([])
  kanaksanStore.setDistinctParentFamilyHeadsInfo([])

  fetchDistinctFamilyHeadsInfo()
    .then((result) => {
      if (result.data) {
        kanaksanStore.setDistinctFamilyHeadsInfo(result.data)
        kanaksanStore.setIsLoading(false)
      }
    })
    .catch((error) => {
      kanaksanStore.setDistinctFamilyHeadsInfo([])
      kanaksanStore.setIsLoading(false)
    })
    .finally(() => {})

  fetchDistinctParentFamilyHeadsInfo(localStorage.getItem("authId"))
    .then((result) => {
      if (result.data) {
        kanaksanStore.setDistinctParentFamilyHeadsInfo(result.data)
        kanaksanStore.setIsLoading(false)
      }
    })
    .catch((error) => {
      kanaksanStore.setDistinctParentFamilyHeadsInfo([])
      kanaksanStore.setIsLoading(false)
    })
    .finally(() => {})
}

const fetchDistinctFamilyHeadsInfo = () => {
  const URL =
    kanaksanStore.apiBaseURL +
    "/api/user-family-map/distinct-family-heads-info"
  return axios.post(URL)
}

const fetchDistinctParentFamilyHeadsInfo = () => {
  const URL =
    kanaksanStore.apiBaseURL +
    "/api/user-family-map/distinct-parent-family-heads-info"
  return axios.post(URL)
}

function fetchUserById(uuid) {
  if (!uuid) return
  const URL = kanaksanStore.apiBaseURL + "/api/user/get"
  return axios.post(URL, new UserBean(uuid, null, null, null, null))
}

const fetchUserIds = () => {
  const URL = kanaksanStore.apiBaseURL + "/api/user/list-user-ids"
  return axios.post(URL)
}
</script>

<style>
</style>
