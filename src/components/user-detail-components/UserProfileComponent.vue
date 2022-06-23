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
    return false
})

const userFamilyMapBean = computed(() => {
    return {
        	//id: null,
            parentFamilyHeadId: user.value.userFamilyMap.parentFamilyHeadId,
            familyHeadId: user.value.userFamilyMap.familyHeadId,
            title: user.value.userFamilyMap.title,
            liveStatus: user.value.userFamilyMap.liveStatus,
            userId: user.value.id,
    }
})

function onUserProfile(actionCommand) {
    if(isReadonly.value === true)
        return;
    
    model.userdetail.flag.isFieldSaving = true
    model.userdetail.flag.loadingActionCommand = actionCommand
    updateUserProfile(userProfileBean.value)
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

function updateUserProfile(userProfileBean) {
    if(!userProfileBean) return
    const URL = kanaksanStore.apiBaseURL + '/api/user-profile/update'
    return axios.patch(URL, userProfileBean)
}

const userProfileBean = computed(() => {
    return {
        	userId: user.value.id,
            maritalStatus: user.value.userProfile.maritalStatus,
            religion: user.value.userProfile.religion,
            caste: user.value.userProfile.caste,
            subcaste: user.value.userProfile.subcaste,
            koththiram: user.value.userProfile.koththiram,
            placeOfBirth: user.value.userProfile.placeOfBirth,
            birthTimestamp: user.value.userProfile.birthTimestamp,
            raasi: user.value.userProfile.raasi,
            natchaththiram: user.value.userProfile.natchaththiram
    }
})
 
</script>

<template>
    <div class="columns is-centered">
        <div class="column is-8">
            <div class="container">

                <div class="bulma-control-mixin has-text-left">

                    <div class="field">
                        <label class="label has-text-link-dark">User Profile Details</label>
                        <label class="label">Marital Status</label>
                        <div class="control has-icons-left">
                            <div class="select is-fullwidth is-link">
                                <select class="has-text-link-dark" v-model="user.userProfile.maritalStatus" :disabled="isReadonly" @change.prevent="onUserProfile('user-marital-status')">
                                    <option v-for="maritalStatus in model.userdetail.maritalStatus" :key="maritalStatus.value" :value="maritalStatus.value">
                                        {{ maritalStatus.text }}
                                    </option>
                                </select>
                                <span class="icon is-small is-left">
                                    <i class="material-icons">star_outline</i>
                                </span>
                            </div>
                            <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-marital-status' && model.userdetail.flag.isFieldSaving"></button></span>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Religion</label>
                        <div class="control has-icons-left">
                            <div class="select is-fullwidth is-link">
                                <select class="has-text-link-dark" v-model="user.userProfile.religion" :disabled="isReadonly" @change.prevent="onUserProfile('user-religion')">
                                    <option v-for="religion in model.userdetail.religion" :key="religion.value" :value="religion.value">
                                        {{ religion.text }}
                                    </option>
                                </select>
                                <span class="icon is-small is-left">
                                    <i class="material-icons">temple_hindu</i>
                                </span>
                            </div>
                            <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-religion' && model.userdetail.flag.isFieldSaving"></button></span>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Caste</label>
                        <div class="control has-icons-left">
                            <div class="select is-fullwidth is-link">
                                <select class="has-text-link-dark" v-model="user.userProfile.caste" :disabled="isReadonly" @change.prevent="onUserProfile('user-caste')">
                                    <option v-for="caste in model.userdetail.caste" :key="caste.value" :value="caste.value">
                                        {{ caste.text }}
                                    </option>
                                </select>
                                <span class="icon is-small is-left">
                                    <i class="fas fa-om"></i>
                                </span>
                            </div>
                            <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-caste' && model.userdetail.flag.isFieldSaving"></button></span>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Subcaste</label>
                        <div class="control has-icons-left">
                            <div class="select is-fullwidth is-link">
                                <select class="has-text-link-dark" v-model="user.userProfile.subcaste" :disabled="isReadonly" @change.prevent="onUserProfile('user-subcaste')">
                                    <option v-for="subcaste in model.userdetail.subcaste" :key="subcaste.value" :value="subcaste.value">
                                        {{ subcaste.text }}
                                    </option>
                                </select>
                                <span class="icon is-small is-left">
                                    <i class="fas fa-om"></i>
                                </span>
                            </div>
                            <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-subcaste' && model.userdetail.flag.isFieldSaving"></button></span>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Koththiram</label>
                        <div class="control has-icons-left">
                            <div class="select is-fullwidth is-link">
                                <select class="has-text-link-dark" v-model="user.userProfile.koththiram" :disabled="isReadonly" @change.prevent="onUserProfile('user-koththiram')">
                                    <option v-for="koththiram in model.userdetail.koththiram" :key="koththiram.value" :value="koththiram.value">
                                        {{ koththiram.text }}
                                    </option>
                                </select>
                                <span class="icon is-small is-left">
                                    <i class="fas fa-om"></i>
                                </span>
                            </div>
                            <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-koththiram' && model.userdetail.flag.isFieldSaving"></button></span>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Place of Birth</label>
                        <div class="control">
                            <div class="control has-icons-left">
                                <input class="input" type="text" placeholder="Place of Birth" v-model="user.userProfile.placeOfBirth" :readonly="isReadonly" @keyup.enter.prevent="onUserProfile('user-placeofbirth')">
                                <span class="icon is-small is-left">
                                    <i class="material-icons">location_city</i>
                                </span>
                                <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-placeofbirth' && model.userdetail.flag.isFieldSaving"></button></span>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Birth Timestamp</label>
                        <div class="control">
                            <div class="control has-icons-left">
                                <input class="input" type="datetime-local" placeholder="Birth Timestamp" v-model="user.userProfile.birthTimestamp" :readonly="isReadonly" @keyup.enter.prevent="onUserProfile('user-birth-timestamp')">
                                <span class="icon is-small is-left">
                                    <i class="material-icons">schedule</i>
                                </span>
                                <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-birth-timestamp' && model.userdetail.flag.isFieldSaving"></button></span>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Raasi</label>
                        <div class="control has-icons-left">
                            <div class="select is-fullwidth is-link">
                                <select class="has-text-link-dark" v-model="user.userProfile.raasi" :disabled="isReadonly" @change.prevent="onUserProfile('user-raasi')">
                                    <option v-for="raasi in model.userdetail.raasi" :key="raasi.value" :value="raasi.value">
                                        {{ raasi.text }}
                                    </option>
                                </select>
                                <span class="icon is-small is-left">
                                    <i class="fas fa-star"></i>
                                </span>
                            </div>
                            <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-raasi' && model.userdetail.flag.isFieldSaving"></button></span>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Natchaththiram</label>
                        <div class="control has-icons-left">
                            <div class="select is-fullwidth is-link">
                                <select class="has-text-link-dark" v-model="user.userProfile.natchaththiram" :disabled="isReadonly" @change.prevent="onUserProfile('user-natchaththiram')">
                                    <option v-for="natchaththiram in model.userdetail.natchaththiram" :key="natchaththiram.value" :value="natchaththiram.value">
                                        {{ natchaththiram.text }}
                                    </option>
                                </select>
                                <span class="icon is-small is-left">
                                    <i class="fas fa-star"></i>
                                </span>
                            </div>
                            <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-natchaththiram' && model.userdetail.flag.isFieldSaving"></button></span>
                        </div>
                        <hr class="has-background-link">
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
