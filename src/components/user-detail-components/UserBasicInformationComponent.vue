<script setup lang='ts'>
import { computed, reactive } from 'vue'
import { useKanaksanStore } from '../../stores/kanaksanStore'
import axios from 'axios'
import userdetail from '../../models/kanaksan/user-detail.json'
import UserBean from '../../models/user-bean'

const kanaksanStore = useKanaksanStore()

const model = reactive({ userdetail })

const dob = computed(() => {
    if(kanaksanStore.selectedUser.userInformation.dateOfBirth && 
        kanaksanStore.selectedUser.userInformation.dateOfBirth.length > 10)
    
    kanaksanStore.selectedUser.userInformation.dateOfBirth = 
        kanaksanStore.selectedUser.userInformation.dateOfBirth.substring(0, 10)

    return kanaksanStore.selectedUser.userInformation.dateOfBirth;
})

const user = computed(() => {
    return kanaksanStore.selectedUser
})

const isReadonly = computed(() => {
    //return ((kanaksanStore.authenticatedUser.userRoleMap.role != 'ADMIN') && (kanaksanStore.authenticatedUser.id !== kanaksanStore.selectedUser.id))
    // TODO
    false
})

const userBean = computed(() => {
    return new UserBean(user.value.id, user.value.phone, user.value.email, null, null)
})

function onUser(actionCommand) {
    if(isReadonly.value === true)
        return;
    
    model.userdetail.flag.isFieldSaving = true
    model.userdetail.flag.loadingActionCommand = actionCommand
    updateUser(userBean.value)
        .then((result) => {
            kanaksanStore.setErrors(
            result.data.hasError === true ? result.data.customErrorMessages : []
            )
            if(result.data.hasError === false) {
                kanaksanStore.setSelectedUser(result.data)
            }
        })
        .catch((error) => {
            kanaksanStore.setErrors([ error ])
        })
        .finally(() => {
            model.userdetail.flag.isFieldSaving = false
        })
}

function updateUser(userBean) {    
  if (!userBean) return
  const URL = kanaksanStore.apiBaseURL + "/api/user/update"
  return axios.patch(URL, userBean)
}
 
</script>

<template>
    <div class="columns is-centered">
        <div class="column is-8">
            <div class="container">
                <div class="bulma-control-mixin has-text-left">                   

                    <div class="field">
                        <label class="label has-text-link-dark">UUID</label>
                        <div class="control has-icons-left">
                            <input class="input" type="text" placeholder="User ID" v-model="user.id" :readonly="true">
                            <span class="icon is-small is-left">
                                <i class="material-icons" style="vertical-align: text-bottom">fingerprint</i>
                            </span>
                            <hr class="has-background-link">
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Phone</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="text" placeholder="Mobile Number" v-model="user.phone" :readonly="isReadonly" @keyup.enter.prevent="onUser('user-phone')">
                            <span class="icon is-small is-left">
                                <i class="material-icons" style="vertical-align: text-bottom">phone</i>
                            </span>
                            <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-phone' && model.userdetail.flag.isFieldSaving"></button></span>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="email" placeholder="Email input" v-model="user.email" :readonly="isReadonly" @keyup.enter.prevent="onUser('user-email')">
                            <span class="icon is-small is-left">
                                <i class="material-icons" style="vertical-align: text-bottom">email</i>
                            </span>
                            <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-email' && model.userdetail.flag.isFieldSaving"></button></span>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Member Since</label>
                        <div class="control">
                            <div class="control has-icons-left has-icons-right">
                                <input class="input" type="text" placeholder="Account Created On" :value="new Date(user.createdOn).toString()" :readonly="isReadonly">
                                <span class="icon is-small is-left">
                                    <i class="material-icons" style="vertical-align: text-bottom">calendar_month</i>
                                </span>
                                <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-createdOn' &&model.userdetail.flag.isFieldSaving"></button></span>
                            </div>
                        </div>
                        <hr class="has-background-link">
                    </div>

                    <div class="field" v-if="!isReadonly">
                        <label class="label">My Password</label>
                        <div class="control">
                            <div class="control has-icons-left has-icons-right">
                                <input class="input" type="password" placeholder="Password" v-model="user.userCredential.password" :readonly="isReadonly" @keyup.enter.prevent="onUserCredential('user-password')">
                                <span class="icon is-small is-left">
                                    <i class="material-icons" style="vertical-align: text-bottom">pattern</i>
                                </span>
                                <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-password' && model.userdetail.flag.isFieldSaving"></button></span>
                            </div>
                        </div>
                        <hr class="has-background-link">
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
