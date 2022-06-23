
// stores/kanaksanStore.js

import { defineStore } from 'pinia'

export const useKanaksanStore = defineStore(
    'kanaksanStore', {
        state: () => ({
            isLoading: false,
            imageSrc: "https://source.unsplash.com/random/128x128",
            apiBaseURL: "http://localhost:8080",
            authenticatedUser: null,
            distinctFamilyHeadsInfo: [],
            distinctParentFamilyHeadsInfo: [],
            selectedUser: null,
            selectedUserAddresses: [],
            userIds: [],
            users: [],
            errors: [],
            levelMinusTwoUsers: [],
            levelMinusOneUsers: [],
            levelZeroUsers: [],
            levelOneUsers: [],
            levelTwoUsers: [],    
        }),
        actions: {
            setIsLoading(isLoading) {
                this.isLoading = isLoading
            },
            setImageSrc(imageSrc) {
                this.imageSrc = imageSrc
            },
            setAPIBaseURL(apiBaseURL) {
                this.apiBaseURL = apiBaseURL
            },
            setAuthenticatedUser(authenticatedUser) {
                this.authenticatedUser = authenticatedUser
            },
            setDistinctFamilyHeadsInfo(distinctFamilyHeadsInfo) {
                this.distinctFamilyHeadsInfo = distinctFamilyHeadsInfo
            },
            setDistinctParentFamilyHeadsInfo(distinctParentFamilyHeadsInfo) {
                this.distinctParentFamilyHeadsInfo = distinctParentFamilyHeadsInfo
            },
            setSelectedUserAddresses(selectedUserAddresses) {
                this.selectedUserAddresses = selectedUserAddresses;
            },
            setSelectedUser(selectedUser) {
                this.selectedUser = selectedUser
            },
            setUserIds(userIds) {
                this.userIds = userIds
            },
            setUsers(users) {
                this.users = users
            },
            setErrors(errors) {
                this.errors = errors
            },
            addError(error) {
                this.errors.push(error)
            },
            setLevelTwoUsers(users) {
                this.levelTwoUsers = users;
            },
            setLevelOneUsers(users) {
                this.levelOneUsers = users;
            },
            setLevelZeroUsers(users) {
                this.levelZeroUsers = users;
            },
            setLevelMinusOneUsers(users) {
                this.levelMinusOneUsers = users;
            },
            setLevelMInusTwoUsers(users) {
                this.levelMinusTwoUsers = users;
            },
            resetLevelUsers() {
                this.levelTwoUsers = []
                this.levelOneUsers = []
                this.levelZeroUsers = []
                this.levelMinusOneUsers = []
                this.levelMinusTwoUsers = []  
            },
            resetStoreUser() {
                this.authenticatedUser = null;
                this.selectedUser = null;
            }
        }
    }
)

export default useKanaksanStore
