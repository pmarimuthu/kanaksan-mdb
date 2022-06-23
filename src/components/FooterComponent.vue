<template>
  <div class="block has-text-centered centered">
    <terms-and-conditions />
    <p>
      <strong>{{ model.textKanaksan }}</strong> by
      <a href="https://kanaksan.com">{{ model.textUnI }}</a>
    </p>
    <p class="has-text-info">
      <a href="mailto:team.kanaksan@gmail.com">Kanaksan Team</a> {{ model.text2021 }}
    </p>
  </div>
  <br>
</template>

<script setup lang='ts'>
import { reactive } from "vue"
import TermsAndConditions from "./TermsAndConditions.vue";

const model = reactive({
  textKanaksan: "Kanaksan",
  textUnI: "U&I",
  text2021: "@2021",
  textEmail: "team.kanaksan@gmail.com",
})
</script>

<style></style>
