<script setup lang="ts">
import CategorySider from './components/CategorySider.vue'
import IconSet from './components/IconSet.vue'

interface Props {
  id: string
}

defineProps<Props>()
</script>

<template>
  <div flex="~ gap-4" class="h-full flex flex-auto overflow-hidden">
    <CategorySider />
    <IconSet :id="id" />
  </div>
</template>

<style scoped>

</style>
