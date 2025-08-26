<script setup lang="ts">
function handleOpenGithub() {
  window.open('https://github.com/LukakaBot/ico', '_blank')
}
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-b-dashed bg-white">
    <div class="container-wrapper flex items-center justify-between gap-2 text-base font-semibold">
      <div class="flex items-center gap-4 text-xl">
        <p>Icō</p>
      </div>
      <div class="flex items-center gap-4">
        <n-button text @click="handleOpenGithub">
          <span class="i-mdi:github" />
        </n-button>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
