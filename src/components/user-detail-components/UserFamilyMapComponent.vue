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

function onUserFamilyMap(actionCommand) {
    if(isReadonly.value === true)
        return;
    
    model.userdetail.flag.isFieldSaving = true
    model.userdetail.flag.loadingActionCommand = actionCommand
    updateUserFamilyMap(userFamilyMapBean.value)
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

function updateUserFamilyMap(userFamilyMapBean) {
    if(!userFamilyMapBean) return
    const URL = kanaksanStore.apiBaseURL + '/api/user-family-map/update'
    return axios.patch(URL, userFamilyMapBean)

}
 
</script>

<template>
    <div class="columns is-centered">
        <div class="column is-8">
            <div class="container">

                <div class="bulma-control-mixin has-text-left">
                    

                    <div class="field">
                        <label class="label has-text-link-dark">User Family Tree Details</label>
                        
                        <label class="label">Your Title in the Family</label>
                        <div class="control has-icons-left">
                            <div class="select is-fullwidth is-link">
                                <select class="has-text-link-dark" v-model="user.userFamilyMap.title" :disabled="isReadonly" @change.prevent="onUserFamilyMap('user-family-member-title')">
                                    <option v-for="familyMemberTitle in model.userdetail.familyMemberTitle" :key="familyMemberTitle.key" :value="familyMemberTitle.value">
                                        {{ familyMemberTitle.text }}
                                    </option>
                                </select>
                                <span class="icon is-small is-left">
                                    <i class="material-icons" style="vertical-align: text-bottom">school</i>
                                </span>
                            </div>
                            <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-family-member-title' && model.userdetail.flag.isFieldSaving"></button></span>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Your Family Head ID</label>
                        <div class="control has-icons-left">
                            <div class="select is-fullwidth is-link">
                                <select class="has-text-link-dark" v-model="user.userFamilyMap.familyHeadId" :disabled="false" @change.prevent="onUserFamilyMap('user-family-head-id')">
                                    <option v-for="headInfo in kanaksanStore.distinctFamilyHeadsInfo" :key="headInfo[0]" :value="headInfo[0]">
                                        {{ headInfo[0] }} &nbsp; | &nbsp; {{ headInfo[1] }} ,&nbsp; {{ headInfo[2] }}
                                    </option>
                                </select>
                                <span class="icon is-small is-left">
                                    <i class="material-icons" style="vertical-align: text-bottom">fingerprint</i>
                                </span>
                            </div>
                            <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-family-head-id' && model.userdetail.flag.isFieldSaving"></button></span>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Parent Family Head ID</label>
                        <div class="control has-icons-left">
                            <div class="select is-fullwidth is-link">
                                <select class="has-text-link-dark" v-model="user.userFamilyMap.parentFamilyHeadId" :disabled="false" @change.prevent="onUserFamilyMap('user-parent-family-head-id')">
                                    <option v-for="headInfo in kanaksanStore.distinctParentFamilyHeadsInfo" :key="headInfo[0]" :value="headInfo[0]">
                                        {{ headInfo[0] }} &nbsp; | &nbsp; {{ headInfo[1] }} ,&nbsp; {{ headInfo[2] }}
                                    </option>
                                </select>
                                <span class="icon is-small is-left">
                                    <i class="material-icons" style="vertical-align: text-bottom">fingerprint</i>
                                </span>
                            </div>
                            <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-parent-family-head-id' && model.userdetail.flag.isFieldSaving"></button></span>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Live Status</label>
                        <div class="control has-icons-left">
                            <div class="select is-fullwidth is-link">
                                <select class="has-text-link-dark" v-model="user.userFamilyMap.liveStatus" :disabled="isReadonly" @change.prevent="onUserFamilyMap('user-family-map-live-status')">
                                    <option v-for="liveStatus in model.userdetail.liveStatus" :key="liveStatus.key" :value="liveStatus.value">
                                        {{ liveStatus.text }}
                                    </option>
                                </select>
                                <span class="icon is-small is-left">
                                    <i class="material-icons" style="vertical-align: text-bottom">play_circle</i>
                                </span>
                            </div>
                            <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-family-map-live-status' && model.userdetail.flag.isFieldSaving"></button></span>
                        </div>
                        <hr class="has-background-link">
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
