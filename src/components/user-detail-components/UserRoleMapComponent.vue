<script setup lang='ts'>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useKanaksanStore } from '../../stores/kanaksanStore'
import axios from 'axios'
import userdetail from '../../models/kanaksan/user-detail.json'

const router = useRouter()
const kanaksanStore = useKanaksanStore()

const model = reactive({ userdetail })

const user = computed(() => {
    if(kanaksanStore.selectedUser.userInformation.dateOfBirth && 
        kanaksanStore.selectedUser.userInformation.dateOfBirth.length > 10)

        kanaksanStore.selectedUser.userInformation.dateOfBirth = 
            kanaksanStore.selectedUser.userInformation.dateOfBirth.substring(0, 10)

    return kanaksanStore.selectedUser
})

const isReadonly = computed(() => {
    //return ((kanaksanStore.authenticatedUser.userRoleMap.role != 'ADMIN') && (kanaksanStore.authenticatedUser.id !== kanaksanStore.selectedUser.id))
    // TODO
    false
})

function onUserRoleMap(actionCommand) {
    if(isReadonly.value === true)
        return;
    
    model.userdetail.flag.isFieldSaving = true
    model.userdetail.flag.loadingActionCommand = actionCommand
    updateUserRoleMap(userRoleMapBean.value)
        .then((result) => {
            kanaksanStore.setErrors(result.data.hasError ? result.data.customErrorMessages : [])
            if(result.data.hasError === false) {
                kanaksanStore.selectedUser = result.data
            }
        })
        .catch((error) => {
            kanaksanStore.setErrors([ error ])
        })
        .finally(() => {
            model.userdetail.flag.isFieldSaving = false
        })
}

function updateUserRoleMap(userRoleMapBean) {
    if(!userRoleMapBean) return
    const URL = kanaksanStore.apiBaseURL + '/api/user-role-map/update'
    return axios.patch(URL, userRoleMapBean)

}

const userRoleMapBean = computed(() => {
    return {
        id: user.value.id,
        userId: user.value.userRoleMap.userId,
        role: user.value.userRoleMap.role
    }
})
 
</script>

<template>
    <div class="columns is-centered">
        <div class="column is-8">
            <div class="container">

                <div class="bulma-control-mixin has-text-left">
                    

                    <div class="field">
                        <label class="label has-text-link-dark">User Role Map Details</label>
                        <label class="label">User Role Map</label>
                        <div class="control has-icons-left">
                            <div class="select is-fullwidth is-link">
                                <select class="has-text-link-dark" v-model="user.userRoleMap.role" :disabled="isReadonly" @change.prevent="onUserRoleMap('user-rolemap-role')">
                                    <option v-for="role in model.userdetail.roleMap" :key="role.key" :value="role.value">
                                        {{ role.text }}
                                    </option>
                                </select>
                                <span class="icon is-small is-left">
                                    <i class="material-icons" style="vertical-align: text-bottom">badge</i>
                                </span>
                            </div>
                            <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-rolemap-role' && model.userdetail.flag.isFieldSaving"></button></span>
                        </div>
                        <hr class="has-background-link">
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
