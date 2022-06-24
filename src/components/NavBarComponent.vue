<template>
  <MDBNavbar expand="lg" light bg="light" container>
    <MDBNavbarBrand href="#" @click="onLogo">
      <img src="/assets/logo.svg" alt="Kanaksan Logo" style="min-height: 4rem; max-height: 4rem" />
    </MDBNavbarBrand>
    <MDBNavbarToggler @click="collapse1 = !collapse1" target="#navbarSupportedContent"></MDBNavbarToggler>
    <MDBCollapse v-model="collapse1" id="navbarSupportedContent">
      <MDBNavbarNav class="mb-2 mb-lg-0">
        <MDBNavbarItem to="#" active v-show="!hasUser" @click="onNavBarItem('/login')">
          Login
        </MDBNavbarItem>
        <MDBNavbarItem to="#" v-if="hasUser" @click="onNavBarItem('/account')">
          Account
        </MDBNavbarItem>
        <MDBNavbarItem to="#" v-if="hasUser" @click="onNavBarItem('/profile')">
          My Profile
        </MDBNavbarItem>
        <MDBNavbarItem to="#" v-if="hasUser" @click="onNavBarItem('/profiles')">
          Profiles
        </MDBNavbarItem>

        <MDBNavbarItem v-if="hasUser" >
          <MDBDropdown class="nav-item" v-model="dropdown1">
            <MDBDropdownToggle tag="a" class="nav-link" @click="dropdown1 = !dropdown1;">
              Menu
            </MDBDropdownToggle>

            <MDBDropdownMenu aria-labelledby="dropdownMenuButton">
              <MDBDropdownItem to="#" @click="onNavBarItem('/settings')">Settings</MDBDropdownItem>
              <MDBDropdownItem href="#">Create Proxy User</MDBDropdownItem>
            </MDBDropdownMenu>

          </MDBDropdown>
        </MDBNavbarItem>

        <MDBNavbarItem to="#" @click="onNavBarItem('/blog')">
          Blog
        </MDBNavbarItem>
        <MDBNavbarItem to="#" @click="onNavBarItem('/about')">
          About
        </MDBNavbarItem>
      </MDBNavbarNav>

      <!-- Search form -->
      <form class="d-flex input-group w-auto">
        <input type="search" class="form-control" placeholder="Type query" aria-label="Search" />
        <MDBBtn outline="primary">
          Search
        </MDBBtn>
      </form>

    </MDBCollapse>
  </MDBNavbar>

</template>

<script setup lang='ts'>
import { MDBBtn } from 'mdb-vue-ui-kit'
import { MDBNavbar, MDBNavbarToggler, MDBNavbarBrand, MDBNavbarNav, MDBNavbarItem } from 'mdb-vue-ui-kit'
import { MDBCollapse } from 'mdb-vue-ui-kit'
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-vue-ui-kit'

import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useKanaksanStore } from '../stores/kanaksanStore'

const router = useRouter();
const kanaksanStore = useKanaksanStore()

const collapse1 = ref(false);
const dropdown1 = ref(false);

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

function onNavBarItem(itemName: string) {
  switch (itemName) {
    case '/account':
      if (kanaksanStore.authenticatedUser) {
        kanaksanStore.dialog.logout.isShow = true
        router.push('/account')
      }
      else {
        router.push('/')
      }
      break;

    case '/profile':
      if (kanaksanStore.authenticatedUser) {
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
})
</script>

<style>
</style>
