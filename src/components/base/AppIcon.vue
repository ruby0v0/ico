<script lang="ts">
import { loadIcon } from 'iconify-icon'
import { LRUCache } from 'lru-cache'

const cache = new LRUCache<string, HTMLElement>({
  max: 1_000,
})

const mounted = new WeakSet<HTMLElement>()

function getIcon(name: string) {
  const el = cache.get(name)
  if (el) {
    if (!mounted.has(el)) {
      mounted.add(el)
      return el
    }
  }

  const icon = document.createElement('iconify-icon')
  icon.setAttribute('icon', name)
  cache.set(name, icon)
  mounted.add(icon)
  return icon
}

function unmountIcon(name: string, icon: HTMLElement) {
  mounted.delete(icon)
  cache.set(name, icon)
}
</script>

<script setup lang="ts">
/* eslint-disable import/first */
import type { CSSProperties } from 'vue'

const props = defineProps<Props>()

interface Props {
  icon: string
}

let node: HTMLElement | undefined

const el = ref<HTMLDivElement>()

const widthStyle = ref<CSSProperties>({})

onMounted(() => {
  const icon = props.icon
  node = getIcon(props.icon)
  el.value?.appendChild(node)
  loadIcon(icon)
    .then(({ width, height }) => {
      widthStyle.value = {
        width: `${(width ?? 16) / (height ?? 16)}em`,
      }
    })
    .catch(console.error)
})

onBeforeUnmount(() => {
  if (node) {
    unmountIcon(props.icon, node)
  }
})
</script>

<template>
  <div ref="el" class="icon-container" :style="widthStyle" />
</template>

<style scoped>
iconify-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
}

.icon-container {
  display: inline-block;
  vertical-align: middle;
  line-height: 1em !important;
  box-sizing: content-box;
}
</style>
