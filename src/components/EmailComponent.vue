<template>
<section class="section"></section>
  <div v-show='false'>
    <figure class="image">
      <img
        src="/assets/logo.svg"
        style="min-height: 12rem; max-height: 12rem"
      />
    </figure>
  </div>

  <div class="section">
    <article class="message is-info">
      <div class="message-header">
        <p></p>
        <span style="color: #fafafa; font-size: x-large"
          >Confirm Email Address</span
        >
        <p></p>
      </div>
      <div class="message-body has-text-centered centered">
        <h2 class="subtitle" style="color: blue">
          Welcome! You have successfully created new
          <span style="color: rgb(255, 105, 0); font-weight: bold"
            >Kanaksan</span
          >
          account!!
        </h2>
        <h2 class="subtitle" style="color: blue">
          Please confirm your email to start using the app.
        </h2>
        <button class="button is-success is-medium">Confirm Email</button>
      </div>

      <div class="message-header">
        <p></p>
        <div class="control">
          <div class="tags has-addons">
            <span class="tag is-white">Kanaksan</span>
            <span class="tag is-dark">&copy;2021</span>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang='ts'>
</script>

<style scoped></style>
