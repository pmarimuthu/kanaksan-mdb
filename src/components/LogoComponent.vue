<template>
  <section class="section">
    <a @click="onLogo">
      <figure class="image">
        <img
          src="/assets/logo.svg"
          style="min-height: 12rem; max-height: 12rem"
        />
      </figure>
    </a>
  </section>
</template>

<script setup lang='ts'>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import useKanaksanStore from "../stores/kanaksanStore";

const router = useRouter();
const kanaksanStore = useKanaksanStore()

const model = reactive({
  flag: {
    isLoading: false,
  }
})

function onLogo() {
  router.push({
    name: "Home",
  });
}
</script>

<style></style>
