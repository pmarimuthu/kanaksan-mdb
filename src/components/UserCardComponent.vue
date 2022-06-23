<script setup lang='ts'>
import { computed, ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useKanaksanStore } from '../stores/kanaksanStore'
import userdetail from '../models/kanaksan/user-detail.json'

const props = defineProps({
  user: Object
})

const model = reactive({ userdetail })
const router = useRouter()
const kanaksanStore = useKanaksanStore()

onMounted(() => {
})

const isReadonly = computed(() => {
  return ((kanaksanStore.authenticatedUser.userRoleMap.role != 'ADMIN') && (kanaksanStore.authenticatedUser.id !== kanaksanStore.selectedUser.id))
})

const calculateAge = () => {
  if(props.user.userInformation.dateOfBirth) {
    const ageDifMs = Date.now() - new Date(props.user.userInformation.dateOfBirth).getTime();
    const ageDate = new Date(ageDifMs);
    let age = Math.abs(ageDate.getUTCFullYear() - 1970);
    if(age < 10)
      return '0' + age + '+';
    return age + '+';
  }
  return '?'
}

const tagGender = computed(() => {
  if(props && props.user && props.user.userInformation && props.user.userInformation.gender) {
    switch (props.user.userInformation.gender) {
      case 'MALE':
        return 'tag is-primary'
        break;

    case 'FEMALE':
        return 'tag is-danger'
        break;

      default:
        return 'tag is-info'
        break;
    }
  }
})

const tagMaritalStatusCode = computed(() => {
  if(props && props.user && props.user.userProfile && props.user.userProfile.maritalStatus) {
    switch (props.user.userProfile.maritalStatus) {
      case 'SINGLE':
        return 'tag is-info'
        break;

    case 'MARRIED':
        return 'tag is-link'
        break;
    
    case 'WIDOW':
        return 'tag is-dark'
        break;

      default:
        return 'tag is-info'
        break;
    }
  }
})

const maritalStatusCode = computed(() => {
  if(props && props.user && props.user.userProfile && props.user.userProfile.maritalStatus) {
    switch (props.user.userProfile.maritalStatus) {
      case 'SINGLE':
        return 'S'        
        break;

    case 'MARRIED':
        return 'M'        
        break;
    
    case 'WIDOW':
        return 'W'                
        break;

      default:
        return 'N'
        break;
    }
  }
})

const suffixName = computed(() => {
  // Lakshith M, S/o Marimuthu P
  
  if(! (props && props.user && props.user.userInformation))
    return 'N/A';

  let mainUsername = (props.user.userInformation.firstname ? props.user.userInformation.firstname : 'N/A')
    + ' ' + (props.user.userInformation.lastname ? props.user.userInformation.lastname : 'N/A')
  let treeUsername = ''
  let treeTypename = ''

  kanaksanStore.users.forEach(storeUser => {
    if(props.user.userFamilyMap.title === 'HEAD') {
      if(props.user.userFamilyMap.parentFamilyHeadId === storeUser.id) {
        treeUsername = storeUser.userInformation.firstname + ' ' + storeUser.userInformation.lastname
        if(props.user.userInformation.gender == 'MALE')
          treeTypename = 'S/o'
        else if(props.user.userInformation.gender == 'FEMALE')
          treeTypename = 'D/o'
      }
    }
    else if(props.user.userFamilyMap.familyHeadId === storeUser.id) {
      treeUsername = (storeUser.userInformation.firstname ? storeUser.userInformation.firstname : 'N/A') + 
        (storeUser.userInformation.lastname ? (' ' + storeUser.userInformation.lastname) :  ' N/A')
      if(props.user.userFamilyMap.title === 'SPOUSE') {
        if(props.user.userInformation.gender == 'MALE')
          treeTypename = 'H/o'
        else if(props.user.userInformation.gender == 'FEMALE')
          treeTypename = 'W/o'
      }
      else {
        if(props.user.userInformation.gender == 'MALE')
          treeTypename = 'S/o'
        else if(props.user.userInformation.gender == 'FEMALE')
          treeTypename = 'D/o'
      }
    }
  })

  const result = mainUsername + 
    (treeTypename ? ', ' + treeTypename : '') + 
    ' ' + treeUsername
  return result
})

const phone = computed(() => {
  return props.user.phone
})

const email = computed(() => {
  return props.user.email
})

function onCardFooterAction(actionCommand) {
  model.userdetail.flag.isFieldSaving = true
  model.userdetail.flag.loadingActionCommand = actionCommand

  switch (actionCommand) {
    case 'bookmark':kanaksanStore.setSelectedUser(props.user)
      router.push('/card/bookmark')    
      break;

    case 'branch':
      kanaksanStore.setSelectedUser(props.user)
      router.push('/branch')
      break
      
    case 'envelope':
      kanaksanStore.setSelectedUser(props.user)
      router.push('/card/envelope')
      break

    case 'plane':
      kanaksanStore.setSelectedUser(props.user)
      router.push('/profile')
      break
  
    default:
      break;
  }

  model.userdetail.flag.isFieldSaving = false
}

function getKoththiramText() {
  if(!(props.user && props.user.userProfile && props.user.userProfile.koththiram))
    return 'N/A'

  const filteredKoththarams =  model.userdetail.koththiram.filter(koththiram => (props.user.userProfile.koththiram === koththiram.value))
  return filteredKoththarams.length > 0 ? filteredKoththarams[0].text : ''
}

</script>

<style></style>
<template>
  <div class="columns is-centered is-variable">
    <div class="column is-8">
      <div class="container">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-128x128">
                  <img :src="kanaksanStore.authenticatedUser ? kanaksanStore.authenticatedUser.imageSrc : ''" alt="Placeholder image" />
                </figure>
              </div>
              <div class="media-content">
                <p class="subtitle is-6 has-background-white-bis has-text-left">
                  <span>
                  <i class="material-icons" style="vertical-align: text-bottom">person</i>
                    &nbsp; <strong>{{ suffixName }}</strong>
                    
                  </span>
                  <span class="pl-6">
                  <i class="material-icons" style="vertical-align: text-bottom">group</i>
                    &nbsp; {{ getKoththiramText() }}
                  </span>
                </p>
                <p class="subtitle is-6 has-background-white-bis has-text-left">
                  <i class="fas fa-phone"></i> &nbsp; {{ phone }} &nbsp;&nbsp;&nbsp; <i class="fas fa-envelope"></i> &nbsp; {{ email }}
                </p>
                <p class="subtitle is-6 has-background-white-bis has-text-left">
                  <i class="material-icons" style="vertical-align: text-bottom"
                    >fingerprint</i
                  >&nbsp;{{ user.id.substring(0, 8) + ' ... ' + user.id.substring(user.id.length -4)}}
                </p>
              </div>
            </div>

            <div class="content">
              <div class="field is-grouped is-grouped-multiline">
                <div class="control">
                  <div class="tags has-addons">
                    <span :class="tagMaritalStatusCode">{{ maritalStatusCode }}</span> &nbsp;
                    <span class="tag is-info"> {{ calculateAge() }} </span>
                    <span :class="tagGender">
                      <i v-if="user.userInformation.gender === 'MALE'" class="material-icons">male</i>
                      <i v-else-if="user.userInformation.gender === 'FEMALE'" class="material-icons">female</i>
                    </span>
                  </div>
                </div>
                <br/>
                <time datetime="2018-5-8">15:51 PM - 8 May 2018</time>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <span
              class="card-footer-item is-clickable"
              @click="onCardFooterAction('bookmark')"
              ><i class="far fa-bookmark"></i
            ></span>
            <span
              class="card-footer-item is-clickable"
              @click="onCardFooterAction('branch')"
              ><i class="fas fa-code-branch"></i
            ></span>
            <span
              class="card-footer-item is-clickable"
              @click="onCardFooterAction('envelope')"
              ><abbr :title="user.email"><i class="far fa-envelope"></i
            ></abbr></span>
            <span
              class="card-footer-item is-clickable"
              @click="onCardFooterAction('plane')"
              ><i class="fas fa-paper-plane"></i
            ></span>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>