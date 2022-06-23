<template>
  <div class="block has-text-centered">
    <div class="control">
      <label class="checkbox">
      <input type="checkbox" id="checkboxTerms" v-model="model.isTerms" />
        {{ model.textIAgreeToThe }}
      <a href="#" v-on:click="onTermsAndConditions()">
        {{ model.textTermsAndConditions }}
      </a>
      </label>
    </div>
  </div>

  <!-- Conditional Widgets -->
  <div class="container is-mobile" v-show="model.isModalShow">
    <div class="is-pulled-left">
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="column px-2">
          <div class="modal-card">
            <header class="modal-card-head">
              <figure class="image">
                <img
                  src="/assets/logo.svg"
                  style="min-height: 6rem; max-height: 6rem"
                />
              </figure>
              <p class="modal-card-title">Terms and conditions</p>
              <button
                class="delete"
                aria-label="close"
                v-on:click="onModelClose(0)"
              ></button>
            </header>
            <section class="modal-card-body">
              <p align="justify">
                {{ model.theTermsAndConditions }}
              </p>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success" v-on:click="onModelClose(0)">
                Accept
              </button>
              <button class="button is-warning" v-on:click="onModelClose(1)">
                Decline
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Conditional Widgets -->
</template>

<script setup lang='ts'>
import { reactive } from "vue"
import { useKanaksanStore } from '../stores/kanaksanStore'

const kanaksanStore = useKanaksanStore()

const model = reactive({
  textIAgreeToThe: "I agree to the",
  textTermsAndConditions: "terms and conditions",
  textKanaksan: "Kanaksan",
  textUnI: "U&I",
  text2021: "@2021",
  isModalShow: false,
  isTerms: true,
  theTermsAndConditions: `No restrictions on using this application; However, it is the user's
        responsibility to use this application with necessary care. At
        this moment, this application is a trial version; and is primarily
        for educational purpose.`,
})

function onModelClose(code) {
  model.isTerms = code === 0
  model.isModalShow = false
}

function onTermsAndConditions() {
  model.isModalShow = true
}
</script>

<style>
</style>
