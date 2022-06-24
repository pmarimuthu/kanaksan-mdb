<template>
  <div class="d-flex align-items-center justify-content-center" style="height: 350px;">
    <div class="text-center">
      <MDBBtn color="primary" aria-controls="toShow" @click="toggleLocalShow">
        Logout
      </MDBBtn>
    </div>
  </div>

  <MDBModal id="toShow" tabindex="-1" v-model="localShow">
    <MDBModalHeader>
      <MDBModalTitle> {{ props.title }} </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody> {{ props.message }}</MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" @click="sendOption(UserResponse.CANCEL)">{{ props.cancelButtonTitle }}</MDBBtn>
      <MDBBtn color="primary" @click="sendOption(UserResponse.LOGOUT)">{{ props.okButtonTitle }}</MDBBtn>
    </MDBModalFooter>
  </MDBModal>
</template>

<script lang="ts">
enum UserResponse {
  CANCEL = 0,
  LOGOUT = 1,
}
</script>

<script setup lang="ts">
import { MDBModal, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-vue-ui-kit';
import { ref, onMounted } from 'vue';
import { useKanaksanStore } from '../stores/kanaksanStore'
const kanaksanStore = useKanaksanStore()

const props = defineProps({
  toShow: Boolean,
  title: String,
  message: String,
  okButtonTitle: String,
  cancelButtonTitle: String
})

const emit = defineEmits(['emitAction'])

const localShow = ref(false)

const toggleLocalShow = () => {
  localShow.value = !localShow.value
}

const sendOption = (option: Number) => {
  localShow.value = false
  if (option && option === UserResponse.LOGOUT) {
    emit('emitAction', option)
  }
}

onMounted(() => {
  console.log('localShow.value: ', localShow.value)
})

</script>