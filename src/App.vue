<script setup lang="ts">
import { dateZhCN, zhCN } from 'naive-ui'
</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <AppProvider>
      <n-el class="h-screen">
        <RouterView />
      </n-el>
    </AppProvider>
  </NConfigProvider>
</template>

<style scoped>
</style>
