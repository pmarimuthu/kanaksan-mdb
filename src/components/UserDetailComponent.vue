<script setup lang='ts'>
import { computed, reactive } from 'vue'
import axios from 'axios'
import { useKanaksanStore } from '../stores/kanaksanStore'

import UserAddressComponent from "./user-detail-components/UserAddressComponent.vue"
import UserFamilyMapComponent from './user-detail-components/UserFamilyMapComponent.vue'
import UserProfileComponent from './user-detail-components/UserProfileComponent.vue'
import UserInformationComponent from './user-detail-components/UserInformationComponent.vue'
import UserPreferencesComponent from './user-detail-components/UserPreferencesComponent.vue'
import UserAccountStatusComponent from './user-detail-components/UserAccountStatusComponent.vue'
import UserBasicInformationComponent from './user-detail-components/UserBasicInformationComponent.vue'
import UserCardComponent from './UserCardComponent.vue'
import UserRoleMapComponent from './user-detail-components/UserRoleMapComponent.vue'

import userdetail from '../models/kanaksan/user-detail.json'

const kanaksanStore = useKanaksanStore()
const model = reactive({ userdetail })

const isReadonly = () => {
  if(kanaksanStore.authenticatedUser.userRoleMap.role === 'ADMIN' || kanaksanStore.authenticatedUser.id === kanaksanStore.selectedUser.id)
    return false

  return true
}

const isAdmin = computed(() => {
    return kanaksanStore.authenticatedUser.userRoleMap.role == 'ADMIN';
})

const secondNamePrefix = computed(() => {
    let prefix = '';

    if(kanaksanStore.selectedUser.userInformation.gender && kanaksanStore.selectedUser.userFamilyMap.title) {

        switch(kanaksanStore.selectedUser.userFamilyMap.title) {
            case 'HEAD':
                prefix = kanaksanStore.selectedUser.userInformation.gender === 'MALE' ? 'S/o' : 'W/o'
                break

            case 'SPOUSE':
                prefix = kanaksanStore.selectedUser.userInformation.gender === 'MALE' ? 'H/o' : 'W/o'
                break

            case 'SON':
            case 'DAUGHTER':
                prefix = kanaksanStore.selectedUser.userInformation.gender === 'MALE' ? 'S/o' : 'D/o'
                break
        }
    }

    return prefix
})

</script>

<template>
    <div class="control" v-show="model.userdetail.flag.isLoading">
        <button :disabled="model.userdetail.flag.isLoading" class="button is-danger is-loading"></button>
    </div>
    
    <user-card-component :user="kanaksanStore.selectedUser" />
    <user-basic-information-component class="mb-0" />
    <user-account-status-component class="mb-0" v-if="!isReadonly"/>
    <user-role-map-component class="mb-0" v-if="isAdmin" />
    <user-preferences-component class="mb-0" />
    <user-information-component class="mb-0" />
    <user-profile-component class="mb-0" />
    <user-family-map-component class="mb-0" />
    <user-address-component class="mb-0" />
</template>
