<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { getCollectionMeta } from '@/data'
import IconDrawer from './IconDrawer.vue'

interface Props {
  id: string
}

const props = defineProps<Props>()

const collectionMeta = ref<CollectionMeta>()

const id = computed(() => collectionMeta.value?.id)
const url = computed(() => collectionMeta.value?.url || collectionMeta.value?.author.url)
const npm = computed(() => id.value != null ? `https://www.npmjs.com/package/@iconify-json/${id.value}` : '')

async function getData() {
  collectionMeta.value = await getCollectionMeta(props.id)
}

watch(() => props.id, () => {
  getData()
})

onMounted(() => {
  getData()
})

const size = ref(200)

const iconDrawerRef = ref<InstanceType<typeof IconDrawer>>()

const selectIcon = ref('')

function handleSelectIcon(icon: string) {
  selectIcon.value = icon
  iconDrawerRef.value?.openDrawer()
}

function handleLoadMore() {
  size.value += 100
}

function handleLoadAll() {
  size.value = collectionMeta.value?.total || size.value
}
</script>

<template>
  <div w-full of-x-hidden of-y-scroll>
    <div px5 py4>
      <div class="flex select-none items-center gap-1 text-xl text-gray-900 dark:text-gray-200">
        <div class="whitespace-no-wrap overflow-hidden">
          {{ collectionMeta?.name }}
        </div>
        <a
          v-if="url"
          i-la-external-link-square-alt-solid
          class="text-base op-25"
          hover="op-100 text-primary"
          :href="url"
          target="_blank"
        />
        <a
          v-if="npm"
          i-la-npm
          class="text-base op-25"
          hover="op-100 text-primary"
          :href="npm"
          target="_blank"
        />
      </div>
      <div class="block text-xs op-50">
        {{ collectionMeta?.author.name }}
      </div>
      <div v-if="collectionMeta?.license">
        <n-button class="op-50 hover:op-100" text size="tiny">
          {{ collectionMeta.license.title }}
        </n-button>
      </div>
      <div flex="~ wrap justify-center items-center">
        <div
          v-for="icon in collectionMeta?.icons.slice(0, size)" :key="icon"
          rounded p1 text-2xl
          @click="() => handleSelectIcon(icon)"
        >
          <n-popover trigger="hover">
            <template #trigger>
              <div class="no-dragging icon-border h-1em cursor-pointer leading-none">
                <Icon
                  :key="icon"
                  :icon="`${collectionMeta?.id}:${icon}`"
                  text-2xl
                />
              </div>
            </template>
            <span text-primary>{{ icon }}</span>
          </n-popover>
        </div>
      </div>
      <div mt2 class="text-center">
        <div flex="~ justify-center gap-3">
          <n-button @click="handleLoadMore">
            load more
          </n-button>
          <n-button @click="handleLoadAll">
            load all ({{ collectionMeta?.total! - size }})
          </n-button>
        </div>
        <p class="color-fade pt-4 text-sm">
          {{ collectionMeta?.total }} icons
        </p>
      </div>
    </div>
    <IconDrawer ref="iconDrawerRef" :collection-meta="collectionMeta" :icon="selectIcon" />
  </div>
</template>

<style scoped>
.icon-border {
  position: relative;
}

.icon-border:hover::before {
  content: '';
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border-radius: 4px;
  border: 1px solid var(--primary-color);
  opacity: 0.4;
}
</style>
