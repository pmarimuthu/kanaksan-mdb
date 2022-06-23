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
 
</script>

<template>
    <div class="columns is-centered">
        <div class="column is-8">
            <div class="container">
                <div class="bulma-control-mixin has-text-left">

                    <div v-if="!false">
                        <div class="field">
                            <label class="label">Account Status</label>
                            <div class="control">
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="text" placeholder="Account Verification Status" :value="'Is Account Verified : ' + user.userAccountStatus.isVerified" readonly>
                                    <span class="icon is-small is-left">
                                        <i v-if="kanaksanStore.selectedUser.userAccountStatus.isVerified" class="material-icons" style="vertical-align: text-bottom">verified_user</i>
                                        <i class="material-icons" style="vertical-align: text-bottom">privacy_tip</i>
                                    </span>
                                    <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-account-verified' && model.userdetail.flag.isFieldSaving"></button></span>
                                </div>
                            </div>
                        </div>

                        <div class="field">
                            <div class="control">
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="text" placeholder="Account Active Status" :value="'Is Account Active : ' + user.userAccountStatus.isActive" readonly>
                                    <span class="icon is-small is-left">
                                        <i v-if="kanaksanStore.selectedUser.userAccountStatus.isActive" class="material-icons">toggle_on</i>
                                        <i v-else class="material-icons">toggle_off</i>
                                    </span>
                                    <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-account-active' && model.userdetail.flag.isFieldSaving"></button></span>
                                </div>
                            </div>
                        </div>

                        <div class="field">
                            <div class="control">
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="text" placeholder="Account Locked Status" :value="'Is Account Locked : ' + user.userAccountStatus.isLocked" readonly>
                                    <span class="icon is-small is-left">
                                        <i v-if="kanaksanStore.selectedUser.userAccountStatus.isLocked" class="material-icons">lock</i>
                                        <i v-else class="material-icons">lock_open</i>
                                    </span>
                                    <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-account-locked' && model.userdetail.flag.isFieldSaving"></button></span>
                                </div>
                            </div>
                        </div>

                        <div class="field">
                            <div class="control">
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="text" placeholder="Account Blocked Status" :value="'Is Account Blocked : ' + user.userAccountStatus.isBlocked" readonly>
                                    <span class="icon is-small is-left">
                                        <i v-if="kanaksanStore.selectedUser.userAccountStatus.isBlocked" class="material-icons">block</i>
                                        <i v-else class="material-icons">check_circle</i>
                                    </span>
                                    <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-account-blocked' && model.userdetail.flag.isFieldSaving"></button></span>
                                </div>
                            </div>
                        </div>

                        <div class="field">
                            <div class="control">
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input" type="text" placeholder="Account Deleted Status" :value="'Is Account Deleted : ' + user.userAccountStatus.isDeleted" readonly>
                                    <span class="icon is-small is-left">
                                        <i v-if="kanaksanStore.selectedUser.userAccountStatus.isDeleted" class="material-icons">delete</i>
                                        <i v-else class="material-icons">check</i>
                                    </span>
                                    <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-account-deleted' && model.userdetail.flag.isFieldSaving"></button></span>
                                </div>
                            </div>
                            <hr class="has-background-link">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
