<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { copyText } from '@/utils/tools'

const props = defineProps<Props>()

const show = ref(false)

interface Props {
  collectionMeta?: CollectionMeta
  icon: string
}

function handleShowUseGuide() {
  console.warn('How to use the icon?')
}

async function handleCopy(text: string) {
  try {
    await copyText(text)
  }
  catch (err) {
    console.error(err)
  }
}

function openDrawer() {
  show.value = true
}

function closeDrawer() {
  show.value = false
}

defineExpose({
  openDrawer,
  closeDrawer,
})
</script>

<template>
  <n-drawer v-model:show="show" placement="bottom">
    <n-drawer-content closable>
      <div text-8xl>
        <Icon
          :key="props.icon"
          :icon="`${props.collectionMeta?.id}:${props.icon}`"
          :cache="true"
        />
      </div>
      <div mb2 py2 md:py4>
        <n-button text @click="handleShowUseGuide">
          How to use the icon?
        </n-button>
        <div flex="~ items-center gap-2" font-mono>
          <p>{{ `${props.collectionMeta?.id}:${props.icon}` }}</p>
          <n-button text quaternary @click="handleCopy(`${props.collectionMeta?.id}:${props.icon}`)">
            <template #icon>
              <AppIcon icon="tabler:copy" />
            </template>
          </n-button>
        </div>
        <div v-if="props.collectionMeta?.license">
          <a class="text-xs op-50 hover:op-100" :href="props.collectionMeta?.license.url" target="_blank">
            {{ props.collectionMeta?.license.title }}
          </a>
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped></style>
