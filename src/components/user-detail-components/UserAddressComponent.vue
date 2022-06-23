<script setup lang='ts'>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useKanaksanStore } from '../../stores/kanaksanStore'
import axios from 'axios'
import userdetail from '../../models/kanaksan/user-detail.json'
import UserBean from '../../models/user-bean'

const router = useRouter()
const kanaksanStore = useKanaksanStore()

const model = reactive({ userdetail })

const localModel = reactive({
    theAddress: {
        id: null,
        addressType: null,
        addressLine1: null,
        city: null,
        state: null,
        country: null,
        pincode: null,
        geoLatitude: null,
        geoLongitude: null,
        ipAddress: null,
        createdOn: null,
        updatedOn: null
    }
})

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

function onUserAddressType(actionCommand) {
    model.userdetail.flag.isFieldSaving = true
    model.userdetail.flag.loadingActionCommand = actionCommand

    model.userdetail.userAddressTypes.map((addressType) => {
        if(addressType.value === localModel.theAddress.addressType) {
            fetchUserAddresses(new UserBean(kanaksanStore.selectedUser.id, null, null, null, null))
            .then((result) => {
                if(!Array.isArray(result.data) || result.data.length == 0)
                    return;

                const fetchedAddresses = result.data
                kanaksanStore.setSelectedUserAddresses(fetchedAddresses)

                let isFound = false
                fetchedAddresses.map((fetchedAddress) => {
                    if(localModel.theAddress.addressType === fetchedAddress.addressType) {
                        isFound = true
                        localModel.theAddress = fetchedAddress
                        model.userdetail.flag.isFieldSaving = false
                    }
                })
                if(!isFound) {
                    localModel.theAddress = {}
                }
            })
            .catch((error) => {
                kanaksanStore.setErrors([ error ])
            })
            .finally(() => {
                model.userdetail.flag.isFieldSaving = false
            })
        }
    })

    model.userdetail.flag.isFieldSaving = true
    model.userdetail.flag.loadingActionCommand = actionCommand
}

function fetchUserAddresses(userBean) {    
    const URL = kanaksanStore.apiBaseURL + '/api/user-address/get'
    return axios.post(URL, userBean)
}

function onUserAddress(actionCommand) {
    if(isReadonly.value === true || !localModel.theAddress.addressType)
        return
    
    model.userdetail.flag.isFieldSaving = true
    model.userdetail.flag.loadingActionCommand = actionCommand

    patchUserAddress(localModel.theAddress)
    .then((result) => {
        if(result.data.hasError === false) {
            //kanaksanStore.selectedUser = result.data
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

function patchUserAddress(userAddressBean) {
    if (!userAddressBean) return
    const URL = kanaksanStore.apiBaseURL + '/api/user-address/patch/' + kanaksanStore.selectedUser.id 
    return axios.patch(URL, userAddressBean)
}

function getUserAddresTypes() {
    let addressTypes = [];
    if(kanaksanStore.selectedUser.userAddresses && kanaksanStore.selectedUser.userAddresses.length > 0)
        kanaksanStore.selectedUser.userAddresses.forEach(address => {
            addressTypes.push(address.addressType)
        });
        
    return addressTypes
}

function onGeoLocation(actionCommand) {
    if(!localModel.theAddress.addressType)
        return
    
    model.userdetail.flag.isFieldSaving = true
    model.userdetail.flag.loadingActionCommand = actionCommand
    navigator.geolocation.getCurrentPosition(position => {
        localModel.theAddress.geoLatitude = position.coords.latitude
        localModel.theAddress.geoLongitude = position.coords.longitude
        model.userdetail.flag.isFieldSaving = false

        patchUserAddress(localModel.theAddress)
        .then((result) => {
            if(result.data.hasError === false) {
            //kanaksanStore.selectedUser = result.data
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
    },
    error => {
        model.userdetail.flag.isFieldSaving = false
    }
  );
}

onMounted(() => {
    getUserAddresTypes()
})
 
</script>

<template>
    <div class="columns is-centered py-0">
        <div class="column is-8">
            <div class="container">
                <div class="bulma-control-mixin has-text-left">
                    <div class="field">
                        <label class="label has-text-link-dark">User Address(s)</label>
                        <label class="label">Address Type</label>
                        <div class="control has-icons-left has-icons-right">
                            <div class="select is-fullwidth is-link">
                                <select class="has-text-link-dark" v-model="localModel.theAddress.addressType" @change.prevent="onUserAddressType('user-address-type')">
                                    <option v-for="userAddressType in model.userdetail.userAddressTypes" :key="userAddressType.value" :value="userAddressType.value">
                                        {{ userAddressType.text }}
                                    </option>
                                </select>
                                <span class="icon is-small is-left">
                                    <i class="material-icons">home</i>
                                </span>
                            </div>
                            <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-address-type' && model.userdetail.flag.isFieldSaving"></button></span>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Address Line</label>
                        <div class="control">
                            <div class="control has-icons-left">
                                <input class="input" type="text" placeholder="Address Line" v-model="localModel.theAddress.addressLine1" @keyup.enter.prevent="onUserAddress('user-address-line')">
                                <span class="icon is-small is-left">
                                    <i class="material-icons">apartment</i>
                                </span>
                                <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-address-line' && model.userdetail.flag.isFieldSaving"></button></span>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">City</label>
                        <div class="control">
                            <div class="control has-icons-left">
                                <input class="input" type="text" placeholder="City" v-model="localModel.theAddress.city" @keyup.enter.prevent="onUserAddress('user-address-city')">
                                <span class="icon is-small is-left">
                                    <i class="material-icons">location_city</i>
                                </span>
                                <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-address-city' && model.userdetail.flag.isFieldSaving"></button></span>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">State</label>
                        <div class="control">
                            <div class="control has-icons-left">
                                <input class="input" type="text" placeholder="State" v-model="localModel.theAddress.state" @keyup.enter.prevent="onUserAddress('user-address-state')">
                                <span class="icon is-small is-left">
                                    <i class="material-icons">museum</i>
                                </span>
                                <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-address-state' && model.userdetail.flag.isFieldSaving"></button></span>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Country</label>
                        <div class="control">
                            <div class="control has-icons-left">
                                <input class="input" type="text" placeholder="Country" v-model="localModel.theAddress.country" @keyup.enter.prevent="onUserAddress('user-address-country')">
                                <span class="icon is-small is-left">
                                    <i class="material-icons">flag</i>
                                </span>
                                <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-address-country' && model.userdetail.flag.isFieldSaving"></button></span>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Pincode</label>
                        <div class="control">
                            <div class="control has-icons-left">
                                <input class="input" type="text" placeholder="Pincode" v-model="localModel.theAddress.pincode" @keyup.enter.prevent="onUserAddress('user-address-pincode')">
                                <span class="icon is-small is-left">
                                    <i class="material-icons">local_post_office</i>
                                </span>
                                <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-address-pincode' && model.userdetail.flag.isFieldSaving"></button></span>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label has-icons-right"> Geo Location (Latitude/Longitue)
                            <span class="icon is-small is-right is-clickable has-text-danger" @click="onGeoLocation('user-geolocation')">
                                &nbsp;&nbsp; <i class="material-icons">my_location</i>
                            </span>
                        </label>
                    </div>

                    <div class="field">
                        <div class="control">
                            <div class="control has-icons-left">
                                <input class="input" type="text" placeholder="Geo Latitude" v-model="localModel.theAddress.geoLatitude" :disabled="true" @keyup.enter.prevent="onGeoLocation('user-geo-latitude')">
                                <span class="icon is-small is-left">
                                    <i class="material-icons">location_on</i>
                                </span>
                                <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-geolocation' && model.userdetail.flag.isFieldSaving"></button></span>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <div class="control">
                            <div class="control has-icons-left">
                                <input class="input" type="text" placeholder="Geo Logitude" v-model="localModel.theAddress.geoLongitude" :disabled="true" @keyup.enter.prevent="onGeoLocation('user-geo-longitude')">
                                <span class="icon is-small is-left">
                                    <i class="material-icons">location_on</i>
                                </span>
                                <span class="icon">&nbsp;<button class="button is-loading is-warning" v-if="model.userdetail.flag.loadingActionCommand === 'user-geolocation' && model.userdetail.flag.isFieldSaving"></button></span>
                            </div>
                        </div>
                    </div>
                    <hr class="has-background-link">
                    
                </div>
            </div>
        </div>
    </div>
    
</template>
