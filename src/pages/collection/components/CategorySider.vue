<script setup lang="ts">
import { collections } from '@/data'

const route = useRoute()

const router = useRouter()

const current = computed(() => route.path.split('/').at(-1))
</script>

<template>
  <div class="hidden h-full flex-none overflow-y-overlay md:block" w-250px border="r base">
    <div border="base b">
      <n-button size="large" text @click="() => router.push('/')">
        <AppIcon class="px-4 py-3 text-xl" icon="tabler:home" />
      </n-button>
    </div>
    <RouterLink
      v-for="collection in collections"
      :key="collection.id"
      class="flex border-b border-base px-3 py-1"
      :to="`/collection/${collection.id}`"
    >
      <div
        class="flex-auto py-1"
        :class="collection.id === current ? 'text-primary' : ''"
      >
        <div class="text-base leading-tight">
          {{ collection.name }}
        </div>
        <div class="mt-1 block text-xs op-50">
          {{ `${collection.total} icons` }}
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>

</style>
