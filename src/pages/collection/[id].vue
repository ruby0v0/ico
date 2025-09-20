<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { getCollectionMeta } from '@/data'
import IconDrawer from './components/IconDrawer.vue'

interface Props {
  id: string
}

const props = defineProps<Props>()

const iconDrawerRef = ref<InstanceType<typeof IconDrawer>>()

const size = ref(200)

const selectIcon = ref('')

const collectionMeta = ref<CollectionMeta>()

function handleSelectIcon(icon: string) {
  selectIcon.value = icon
  iconDrawerRef.value?.openDrawer()
}

async function getData() {
  collectionMeta.value = await getCollectionMeta(props.id)
}

onMounted(() => {
  getData()
})
</script>

<template>
  <div flex="~ gap-4" min-h-screen>
    <div w-250px border="r #88888826">
      <span>123</span>
    </div>
    <div w-full of-x-hidden of-y-scroll>
      <div px5 py4>
        <n-el flex="~ wrap justify-center items-center">
          <div
            v-for="icon in collectionMeta?.icons.slice(0, size)" :key="icon"
            rounded p1 text-2xl
            @click="() => handleSelectIcon(icon)"
          >
            <n-popover trigger="hover">
              <template #trigger>
                <div class="no-dragging icon-border h-1em leading-none">
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
        </n-el>
        <div mt2 flex="~ justify-center gap-3">
          <n-button>load more</n-button>
          <n-button>load all ({{ collectionMeta?.icons.length }})</n-button>
        </div>
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
