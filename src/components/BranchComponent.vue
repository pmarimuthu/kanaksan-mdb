

<script setup lang='ts'>
import axios from "axios";
import { ref, computed, onMounted, isReadonly } from "vue";
import { useRouter } from "vue-router";
import { useKanaksanStore } from "../stores/kanaksanStore";

import BranchUserCardComponent from "./BranchUserCardComponent.vue";

import UserBean from "../models/user-bean";

const kanaksanStore = useKanaksanStore();
const router = useRouter();

const isLoadingMinusTwo = ref(false);
const isLoadingMinusOne = ref(false);
const isLoadingZero = ref(false);
const isLoadingOne = ref(false);
const isLoadingTwo = ref(false);

const begin = ref(0)
const end = ref(0)

const beginMinusTwo = ref(0);
const beginMinusOne = ref(0);
const beginZero = ref(0);
const beginOne = ref(0);
const beginTwo = ref(0);
const endMinusTwo = ref(0);
const endMinusOne = ref(0);
const endZero = ref(0);
const endOne = ref(0);
const endTwo = ref(0);

const isLoading = computed(() => {
  return (
    isLoadingMinusTwo.value ||
    isLoadingMinusOne.value ||
    isLoadingZero.value ||
    isLoadingOne.value ||
    isLoadingTwo.value
  );
});

const memberName = computed(() => {
  return (
    kanaksanStore.selectedUser.userInformation.firstname +
    " " +
    kanaksanStore.selectedUser.userInformation.lastname
  );
});

const isUserMarried = computed(() => {
  if (
    kanaksanStore.selectedUser.userProfile &&
    kanaksanStore.selectedUser.userProfile.maritalStatus
  ) {
  }
  return true;
});

const getLevelUsers = (level) => {
  if (kanaksanStore.selectedUser.id) {
    const URL = kanaksanStore.apiBaseURL + "/api/user-level/" + level;
    return axios.post(
      URL,
      new UserBean(kanaksanStore.selectedUser.id, null, null, null, null)
    );
  }
};

if (kanaksanStore.selectedUser && kanaksanStore.selectedUser.id) {
  kanaksanStore.resetLevelUsers();

  isLoadingMinusTwo.value = true;
  begin.value = performance.now();
  beginMinusTwo.value = performance.now();
  getLevelUsers(-2)
    .then((result) => {
      for (const index in result.data) {
        const theUser = result.data[index];
        if (!theUser.hasError) kanaksanStore.levelMinusTwoUsers.push(theUser);
      }
      endMinusTwo.value = performance.now(); end.value = performance.now();
      isLoadingMinusTwo.value = false;
    })
    .catch((error) => {
      endMinusTwo.value = performance.now(); end.value = performance.now();
      isLoadingMinusTwo.value = false;
    })
    .finally(() => {});

  isLoadingMinusOne.value = true;
  beginMinusOne.value = performance.now();
  getLevelUsers(-1)
    .then((result) => {
      for (const index in result.data) {
        const theUser = result.data[index];
        if (!theUser.hasError) kanaksanStore.levelMinusOneUsers.push(theUser);
      }
      endMinusOne.value = performance.now(); end.value = performance.now();
      isLoadingMinusOne.value = false;
    })
    .catch((error) => {
      endMinusOne.value = performance.now(); end.value = performance.now();
      isLoadingMinusOne.value = false;
    })
    .finally(() => {});

  isLoadingZero.value = true;
  beginZero.value = performance.now();
  getLevelUsers(0)
    .then((result) => {
      for (const index in result.data) {
        const theUser = result.data[index];
        if (!theUser.hasError) kanaksanStore.levelZeroUsers.push(theUser);
      }
      endZero.value = performance.now(); end.value = performance.now();
      isLoadingZero.value = false;
    })
    .catch((error) => {
      endZero.value = performance.now(); end.value = performance.now();
      isLoadingOne.value = false;
    })
    .finally(() => {});

  isLoadingOne.value = true;
  beginOne.value = performance.now();
  getLevelUsers(1)
    .then((result) => {
      for (const index in result.data) {
        const theUser = result.data[index];
        if (!theUser.hasError) kanaksanStore.levelOneUsers.push(theUser);
      }
      endOne.value = performance.now(); end.value = performance.now();
      isLoadingOne.value = false;
    })
    .catch((error) => {
      endOne.value = performance.now(); end.value = performance.now();
      isLoadingOne.value = false;
    })
    .finally(() => {});

  isLoadingTwo.value = true;
  beginTwo.value = performance.now();
  getLevelUsers(2)
    .then((result) => {
      for (const index in result.data) {
        const theUser = result.data[index];
        if (!theUser.hasError) kanaksanStore.levelTwoUsers.push(theUser);
      }
      endTwo.value = performance.now(); end.value = performance.now();
      isLoadingTwo.value = false;
    })
    .catch((error) => {
      endTwo.value = performance.now(); end.value = performance.now();
      isLoadingTwo.value = false;
    })
    .finally(() => {});
}

onMounted(() => {
  checkUser();
});

const checkUser = () => {
  if (kanaksanStore.authenticatedUser && kanaksanStore.authenticatedUser.id)
    return;

  kanaksanStore.$reset();
  router.push({ path: "/" });
};
</script>

<template>
  <section class="section"></section>

  <div class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container subtitle has-text-centered">
        <i class="fas fa-code-branch has-text-link">&nbsp;&nbsp;Branch</i>
        &nbsp;&nbsp;<span class="has-text-danger">{{ (end - begin) /1000 }}</span>
      </div>
    </div>
  </div>

  <div v-show="isLoading" class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container has-text-centered">
        <button
          :disabled="isLoading"
          class="button is-danger is-loading"
        ></button>
      </div>
    </div>
  </div>

  <!-- Level: -2 -->
  <div class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container subtitle">
        <i class="fas fa-code-branch has-text-link"
          >&nbsp;&nbsp;{{ memberName }}'s grandparent family</i
        >&nbsp;&nbsp;<span class="has-text-danger">{{ (endMinusTwo - beginMinusTwo) /1000 }}</span>
      </div>
    </div>
  </div>
  <div v-show="isLoadingMinusTwo" class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container has-text-centered">
        <button :disabled="true" class="button is-warning is-loading"></button>
      </div>
    </div>
  </div>
  <div v-if="!isLoadingMinusTwo && kanaksanStore.levelMinusTwoUsers.length > 0">
    <span v-for="user in kanaksanStore.levelMinusTwoUsers" :key="user.id">
      <branch-user-card-component :user="user" />
    </span>
  </div>
  <div v-else class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container subtitle has-text-danger">No data found!</div>
    </div>
  </div>
  <div class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container">
        <hr class="has-background-link" />
      </div>
    </div>
  </div>

  <!-- Level: -1 -->
  <div class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container subtitle">
        <i class="fas fa-code-branch has-text-link"
          >&nbsp;&nbsp;{{ memberName }}'s parent family</i
        >&nbsp;&nbsp;<span class="has-text-danger">{{ (endMinusOne - beginMinusOne) /1000 }}</span>
      </div>
    </div>
  </div>
  <div v-show="isLoadingMinusOne" class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container has-text-centered">
        <button :disabled="true" class="button is-warning is-loading"></button>
      </div>
    </div>
  </div>
  <div v-if="!isLoadingMinusOne && kanaksanStore.levelMinusOneUsers.length > 0">
    <span v-for="user in kanaksanStore.levelMinusOneUsers" :key="user.id">
      <branch-user-card-component :user="user" />
    </span>
  </div>
  <div v-else class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container subtitle has-text-danger">No data found!</div>
    </div>
  </div>
  <div class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container">
        <hr class="has-background-link" />
      </div>
    </div>
  </div>

  <!-- Level: 0 -->
  <div class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container subtitle">
        <i class="fas fa-code-branch has-text-link"
          >&nbsp;&nbsp;{{ memberName }}'s family</i
        >&nbsp;&nbsp;<span class="has-text-danger">{{ (endZero - beginZero) /1000 }}</span>
      </div>
    </div>
  </div>
  <div v-show="isLoadingZero" class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container has-text-centered">
        <button :disabled="true" class="button is-warning is-loading"></button>
      </div>
    </div>
  </div>
  <div v-if="!isLoadingZero && kanaksanStore.levelZeroUsers.length > 0">
    <span v-for="user in kanaksanStore.levelZeroUsers" :key="user.id">
      <branch-user-card-component :user="user" />
    </span>
  </div>
  <div v-else class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container subtitle has-text-danger">No data found!</div>
    </div>
  </div>
  <div class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container">
        <hr class="has-background-link" />
      </div>
    </div>
  </div>

  <!-- Level: +1 -->
  <div class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container subtitle">
        <i class="fas fa-code-branch has-text-link"
          >&nbsp;&nbsp;{{ memberName }}'s children</i
        >&nbsp;&nbsp;<span class="has-text-danger">{{ (endOne - beginOne) /1000 }}</span>
      </div>
    </div>
  </div>
  <div v-show="isLoadingOne" class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container has-text-centered">
        <button :disabled="true" class="button is-warning is-loading"></button>
      </div>
    </div>
  </div>
  <div v-if="!isLoadingOne && kanaksanStore.levelOneUsers.length > 0">
    <span v-for="user in kanaksanStore.levelOneUsers" :key="user.id">
      <branch-user-card-component :user="user" />
    </span>
  </div>
  <div v-else class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container subtitle has-text-danger">No data found!</div>
    </div>
  </div>
  <div class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container">
        <hr class="has-background-link" />
      </div>
    </div>
  </div>

  <!-- Level: +2 -->
  <div class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container subtitle">
        <i class="fas fa-code-branch has-text-link"
          >&nbsp;&nbsp;{{ memberName }}'s grandchildren</i
        >&nbsp;&nbsp;<span class="has-text-danger">{{ (endTwo - beginTwo) /1000 }}</span>
      </div>
    </div>
  </div>
  <div v-if="isLoadingTwo" class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container has-text-centered">
        <button :disabled="true" class="button is-warning is-loading"></button>
      </div>
    </div>
  </div>
  <div v-else-if="kanaksanStore.levelTwoUsers.length > 0">
    <span v-for="user in kanaksanStore.levelTwoUsers" :key="user.id">
      <branch-user-card-component :user="user" />
    </span>
  </div>
  <div v-else class="columns is-centered is-variable px-2">
    <div class="column is-8">
      <div class="container subtitle has-text-danger">No data found!</div>
    </div>
  </div>
  <br />
</template>

<style></style>
