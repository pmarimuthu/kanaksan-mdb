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

const userPreferencesBean = computed(() => {
    return {
        userId: user.value.id,
        visibilityLevel: user.value.userPreferences.visibilityLevel,
        language: user.value.userPreferences.language,
        advertisementOpt: user.value.userPreferences.advertisementOpt
    } 
})

function onUserPreferences(actionCommand) {
    if(isReadonly.value === true)
        return;
    
    model.userdetail.flag.isFieldSaving = true
    model.userdetail.flag.loadingActionCommand = actionCommand
    updateUserPreferences(userPreferencesBean.value)
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

function updateUserPreferences(userPreferencesBean) {
    if(!userPreferencesBean) return
    const URL = kanaksanStore.apiBaseURL + '/api/user-preferences/update'
    return axios.patch(URL, userPreferencesBean)
}
 
</script>

<template>
    <div class="columns is-centered">
        <div class="column is-8">
            <div class="container">
                <div class="bulma-control-mixin has-text-left">                   

                    <div class="field">
                        <label class="label has-text-link-dark">User Preferences</label>
                        <label class="label">Visibility Level</label>
                        <div class="control has-icons-left has-icons-right">
                            <div class="select is-fullwidth is-link">
                                <select class="has-text-link-dark" v-model="user.userPreferences.visibilityLevel" :disabled="isReadonly" @change.prevent="onUserPreferences('user-visibility-level')">
                                    <option v-for="visibility in model.userdetail.visibility" :key="visibility.value" :value="visibility.value">
                                        {{ visibility.text }}
                                    </option>
                                </select>
                                <span class="icon is-small is-left">
                                    <i class="material-icons">visibility</i>
                                </span>
                            </div>
                            <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-visibility-level' && model.userdetail.flag.isFieldSaving"></button></span>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Language</label>
                        <div class="control has-icons-left">
                            <div class="select is-fullwidth is-link">
                                <select class="has-text-link-dark" v-model="user.userPreferences.language" :disabled="isReadonly" @change.prevent="onUserPreferences('user-language')">
                                    <option v-for="language in model.userdetail.languages" :key="language.value" :value="language.value">
                                        {{ language.text }}
                                    </option>
                                </select>
                                <span class="icon is-small is-left">
                                    <i class="material-icons">language</i>
                                </span>
                            </div>
                            <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-language' && model.userdetail.flag.isFieldSaving"></button></span>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Advertisement Preference</label>
                        <div class="control has-icons-left">
                            <div class="select is-fullwidth is-link">
                                <select class="has-text-link-dark" v-model="user.userPreferences.advertisementOpt" :disabled="isReadonly" @change.prevent="onUserPreferences('user-advt-opt')">
                                    <option v-for="advertisementOpt in model.userdetail.advertisementOpts" :key="advertisementOpt.value" :value="advertisementOpt.value">
                                        {{ advertisementOpt.text }}
                                    </option>
                                </select>
                                <span class="icon is-small is-left">
                                    <i class="material-icons">live_tv</i>
                                </span>
                            </div>
                            <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-advt-opt' && model.userdetail.flag.isFieldSaving"></button></span>
                        </div>
                        <hr class="has-background-link">
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
