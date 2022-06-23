<template>
  <div class="m-5 has-text-centered">
    <div class="subtitle has-text-centered has-text-info">         
      <div class="control" v-show="kanaksanStore.isLoading">
        <div>
          <br>
          <button :disabled="true" class="button is-warning is-loading"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useKanaksanStore } from "../stores/kanaksanStore";

const kanaksanStore = useKanaksanStore();

</script>

<style></style>
