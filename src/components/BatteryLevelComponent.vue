<template>
  <span class="tag is-primary is-light">
    <i v-if="battery.level < 0"></i>
    <i v-else-if="battery.level < 25" class="fas fa-battery-quarter">
      <sup>{{ "&nbsp;" + Math.round(battery.level) }}%</sup>
    </i>
    <i v-else-if="battery.level < 50" class="fas fa-battery-quarter">
      <sup>{{ "&nbsp;" + Math.round(battery.level) }}%</sup>
    </i>
    <i v-else-if="battery.level < 75" class="fas fa-battery-half">
      <sup>{{ "&nbsp;" + Math.round(battery.level) }}%</sup>
    </i>
    <i v-else-if="battery.level < 100" class="fas fa-battery-three-quarters">
      <sup>{{ "&nbsp;" + Math.round(battery.level) }}%</sup>
    </i>
    <i v-else class="fas fa-battery-full">
      <sup>{{ "&nbsp;" + Math.round(battery.level) }}%</sup>
    </i>
  </span>
</template>

<script setup lang='ts'>
import { onMounted, reactive } from "vue"

const battery = reactive({
  manager: null,
  level: -1,
  icon: "fas fa-battery-half",
})

function checkBattery() {
  navigator.getBattery().then((manager) => {
    battery.manager = manager
    manager.addEventListener("levelchange", () => {
      battery.level = Number(manager.level * 100)
    })
  })
}

onMounted(() => {
  setTimeout(() => {
    checkBattery()
  }, 1500)
})
</script>

<style></style>
