<template>
  <div class="notification has-background-warning" v-if="messages && messages.length > 0">
    <button class="delete" v-on:click="messages = []"></button>
    <div v-for="(message, index) in messages" :key="index">

      <div class="control">
        <div class="control has-icons-left">        
        <label class="has-text-weight-semibold">
          <i class="material-icons">warning</i>
           {{ 1 + index}}. {{ message}}
        </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps({
  messages: {
    type: Array,
    required: true,
  },
})
</script>

<style></style>
