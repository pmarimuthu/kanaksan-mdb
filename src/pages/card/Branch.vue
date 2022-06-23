<template>
  @Level {{ level }}
  <nav-bar-component />
  <branch-component />
  <footer-component />
</template>

<script setup lang='ts'>
import axios from "axios";
import { ref, onMounted } from "vue"
import { useKanaksanStore } from "../../stores/kanaksanStore";

import NavBarComponent from "../../components/NavBarComponent.vue"
import BranchComponent from "../../components/card/BranchComponent.vue"
import FooterComponent from "../../components/FooterComponent.vue"


import UserBean from "../../models/user-bean";

const level = ref(0)
const kanaksanStore = useKanaksanStore();

function getLevelUsers(level) {
  if (kanaksanStore.selectedUser.id) {
    const URL = kanaksanStore.apiBaseURL + "/api/user-level/" + level.value;
    return axios.post(
      URL,
      new UserBean(kanaksanStore.selectedUser.id, null, null, null, null)
    );
  }
}

onMounted(() => {
});

</script>

<style scoped></style>
