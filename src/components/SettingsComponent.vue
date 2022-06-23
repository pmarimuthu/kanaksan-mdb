<template>
<section class="section"></section>
  <div class="columns is-centered centered is-variable">
    <div class="column is-8">
      <div class="m-5 has-text-centered">
        <p class="subtitle has-text-link"><i class="fas fa-sliders-h"></i>&nbsp;Settings</p>
      </div>
      <article class="panel is-info">
        <p class="panel-heading">{{ title }}</p>
        <p class="panel-tabs">
          <a :class="[tab.account.size, classTabAccount]" @click="onTab(0)">
            {{ tab.account.title }}
          </a>
          <a
            :class="[tab.preferences.size, classTabPreferences]"
            @click="onTab(1)"
          >
            {{ tab.preferences.title }}</a
          >
          <a :class="[tab.referral.size, classTabReferral]" @click="onTab(2)">
            {{ tab.referral.title }}</a
          >
          <a :class="[tab.contact.size, classTabContact]" @click="onTab(3)">
            {{ tab.contact.title }}</a
          >
        </p>
      </article>
      <div class="panel-block">
        <div v-if="tab.account.isVisible">
          <password-component />
        </div>
        <div v-if="tab.preferences.isVisible">
          {{ tab.preferences.title }}
        </div>
        <div v-if="tab.referral.isVisible">
          {{ tab.referral.title }}
        </div>
        <div v-if="tab.contact.isVisible">
          {{ tab.contact.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from "vue"
import { useKanaksanStore } from '../stores/kanaksanStore'

import PasswordComponent from "../components/PasswordComponent.vue"

const kanaksanStore = useKanaksanStore()

const title = ref("My Account")
const classTabAccount = ref("is-active")
const classTabPreferences = ref("")
const classTabReferral = ref("")
const classTabContact = ref("")

const tab = reactive({
  account: {
    title: "Account",
    size: "is-size-5",
    isActive: "is-active",
    isVisible: true,
  },
  preferences: {
    title: "Preferences",
    size: "is-size-5",
    isActive: "is-active",
    isVisible: false,
  },
  referral: {
    title: "Referral",
    size: "is-size-5",
    isActive: "is-active",
    isVisible: false,
  },
  contact: {
    title: "Contact",
    size: "is-size-5",
    isActive: "is-active",
    isVisible: false,
  },
})

onMounted(() => {
})

function onTab(tabIndex) {
  this.tab.account.isVisible = false
  this.tab.preferences.isVisible = false
  this.tab.referral.isVisible = false
  this.tab.contact.isVisible = false

  this.classTabAccount = ""
  this.classTabPreferences = ""
  this.classTabReferral = ""
  this.classTabContact = ""

  switch (tabIndex) {
    case 0: // Account
      this.tab.account.isVisible = !this.tab.account.isVisible
      this.classTabAccount = tab.account.isActive
      this.title = "My Account Settings"
      break

    case 1: // Preferences
      this.tab.preferences.isVisible = !this.tab.preferences.isVisible
      this.classTabPreferences = tab.preferences.isActive
      this.title = "My Preferences"
      break

    case 2: // Referral
      this.tab.referral.isVisible = !this.tab.referral.isVisible
      this.classTabReferral = tab.referral.isActive
      this.title = "My Referrals"
      break

    case 3: // Contact
      this.tab.contact.isVisible = !this.tab.contact.isVisible
      this.classTabContact = tab.contact.isActive
      this.title = "Contact Kanaksan Team"
      break

    default:
      break
  }
}
</script>

<style></style>
