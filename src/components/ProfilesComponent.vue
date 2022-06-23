<script setup lang='ts'>
import { ref, reactive, onMounted } from "vue";
import { useKanaksanStore } from "../stores/kanaksanStore";
import axios from "axios";
import UserCardComponent from "../components/UserCardComponent.vue";

const kanaksanStore = useKanaksanStore();

const model = reactive({
  flag: {
    isLoading: false,
    isLogin: true,
    isNewJoin: false,
    isReferralJoin: false,
  },
  times: []
});

const begin = ref(0)
const end = ref(0)

onMounted(() => {
  // showAuthInfo()

  doFetchUserIds(kanaksanStore.authenticatedUser.id)
  .then((result) => {
    kanaksanStore.userIds = result.data
    model.flag.isLoading = false       
    end.value = performance.now()
    fetchAllUsers()
  })
  .catch((error) => {
    kanaksanStore.setUsers([])
    kanaksanStore.setErrors([error.message])
    model.flag.isLoading = false
  })
  .finally(() => {})
})

const showAuthInfo = () => {
  console.log('Auth Id: ', localStorage.getItem("authId"))
  console.log('Auth Time: ', Math.abs((Date.now() - localStorage.getItem("authTime")) / (1000 * 60)))
}

const fetchAllUsers = () => {
  model.flag.isLoading = true
  kanaksanStore.users.length = 0
  let doFetchAllUser = []

  kanaksanStore.userIds.forEach(userId => {
    doFetchAllUser.push(doFetchUserId(userId))
  })

  begin.value = performance.now()  
  axios.all(doFetchAllUser)
    .then(axios.spread((...responses) => {
      kanaksanStore.users.length = 0
      responses.forEach(response => {
        kanaksanStore.users.push(response.data)
        if(responses.length === kanaksanStore.userIds.length)
          postFetchAll()
      });
    }))
    .catch((error) => {
      kanaksanStore.setUsers([])
      kanaksanStore.setErrors([error.message])
      postFetchAll()
    })
    .finally(() => {
      postFetchAll()
    })
}

const postFetchAll = () => {
  end.value = performance.now()
  model.flag.isLoading = false
}

const doFetchUserIds = (uuid) => {
  const URL = kanaksanStore.apiBaseURL + "/api/user/list-user-ids";
  return axios.post(URL, { 'id': uuid })
}

const doFetchUserId = (uuid) => {
  const URL = kanaksanStore.apiBaseURL + "/api/user/fetch-id";
  return axios.post(URL, { 'id': uuid })
}

</script>

<template>
  <section class="section"></section>
  <div class="m-5 has-text-centered">
    <div class="subtitle has-text-centered has-text-link">
      <i class="fas fa-sitemap"></i>&nbsp;Kanaksans
    </div>
    <div v-show="kanaksanStore.users.length > 0">&nbsp;&nbsp;<span class="has-text-danger">{{ end - begin }} &nbsp;&nbsp;[{{kanaksanStore.users.length}}]</span></div>
  </div>
  <div class="m-5 has-text-centered">
    <div class="subtitle has-text-centered has-text-info">
      <div class="control" v-show="model.flag.isLoading">
        <div>
          <br />
          <button
            :disabled="model.flag.isLoading"
            class="button is-danger is-loading"
          ></button>
        </div>
      </div>
    </div>
    <span v-if="!model.flag.isLoading && kanaksanStore.users.length === 0">
      No Data Found!
    </span>
    <span v-else>
      <span v-for="user in kanaksanStore.users" :key="user.id">
        <pre v-show="false">{{ user.id }} </pre>
        <user-card-component :user="user" />
      </span>
    </span>
  </div>
</template>

<style></style>
