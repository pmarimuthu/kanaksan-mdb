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

const userInformationBean = computed(() => {
    return {
        	userId: user.value.id,
            firstname: user.value.userInformation.firstname,
            lastname: user.value.userInformation.lastname,
            gender: user.value.userInformation.gender,
            dateOfBirth: user.value.userInformation.dateOfBirth,
            profession: user.value.userInformation.profession,
    }
})

function onUserInformation(actionCommand) {
    if(isReadonly.value === true)
        return;
    
    model.userdetail.flag.isFieldSaving = true
    model.userdetail.flag.loadingActionCommand = actionCommand

    updateUserInformation(userInformationBean.value)
        .then((result) => {
            if(result.data.hasError === false) {
                kanaksanStore.selectedUser = result.data
            }
            kanaksanStore.setErrors(
                result.data.hasError ? result.data.customErrorMessages : []
            )
        })
        .catch((error) => {
            kanaksanStore.setErrors([ error ])
        })
        .finally(() => {
            model.userdetail.flag.isFieldSaving = false
        })
}

function updateUserInformation(userInformationBean) {
    if (!userInformationBean) return
    const URL = kanaksanStore.apiBaseURL + '/api/user-information/update'
    return axios.patch(URL, userInformationBean)
}
 
</script>

<template>
    <div class="columns is-centered">
        <div class="column is-8">
            <div class="container">
                <div class="bulma-control-mixin has-text-left">
                    <div class="field">
                        <label class="label has-text-link-dark">User Information</label>
                        <label class="label">Firstname</label>
                        <div class="control">
                            <div class="control has-icons-left">
                                <input class="input" type="text" placeholder="Firstname (Your name)" v-model="kanaksanStore.selectedUser.userInformation.firstname" :disabled="isReadonly" @keyup.enter.prevent="onUserInformation('user-firstname')">
                                <span class="icon is-small is-left">
                                    <i class="material-icons">badge</i>
                                </span>
                                <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-firstname' && model.userdetail.flag.isFieldSaving"></button></span>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Lastname</label>
                        <div class="control">
                            <div class="control has-icons-left">
                                <input class="input" type="text" placeholder="Lastname (Father's name)" v-model="kanaksanStore.selectedUser.userInformation.lastname" :disabled="isReadonly" @keyup.enter.prevent="onUserInformation('user-lastname')">
                                <span class="icon is-small is-left">
                                    <i class="material-icons">badge</i>
                                </span>
                                <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-lastname' && model.userdetail.flag.isFieldSaving"></button></span>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Gender</label>
                        <div class="control has-icons-left">
                            <div class="select is-fullwidth is-link">
                                <select class="has-text-link-dark" v-model="kanaksanStore.selectedUser.userInformation.gender" :disabled="isReadonly" @change.prevent="onUserInformation('user-gender')">
                                    <option v-for="gender in model.userdetail.gender" :key="gender.value" :value="gender.value">
                                        {{ gender.text }}
                                    </option>
                                </select>
                                <span class="icon is-small is-left">
                                    <i class="material-icons">male</i>
                                </span>
                            </div>
                            <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-gender' && model.userdetail.flag.isFieldSaving"></button></span>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Date of Birth</label>
                        <div class="control">
                            <div class="control has-icons-left">
                                <input class="input" type="date" placeholder="Date of Birth" v-model="kanaksanStore.selectedUser.userInformation.dateOfBirth" :disabled="isReadonly" @keyup.enter.prevent="onUserInformation('user-dateofbirth')">
                                <span class="icon is-small is-left">
                                    <i class="material-icons">calendar_month</i>
                                </span>
                                <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-dateofbirth' && model.userdetail.flag.isFieldSaving"></button></span>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Profession</label>
                        <div class="control has-icons-left">
                            <div class="select is-fullwidth is-link">
                                <select class="has-text-link-dark" v-model="kanaksanStore.selectedUser.userInformation.profession" :disabled="isReadonly" @change.prevent="onUserInformation('user-profession')">
                                    <option v-for="profession in model.userdetail.profession" :key="profession.value" :value="profession.value">
                                        {{ profession.text }}
                                    </option>
                                </select>
                                <span class="icon is-small is-left">
                                    <i class="material-icons">assignment_ind</i>
                                </span>
                            </div>
                            <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-profession' && model.userdetail.flag.isFieldSaving"></button></span>
                        </div>
                        <hr class="has-background-link">
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
