/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck

import type { IconifyInfo, IconifyJSON } from '@iconify/types'

export { }

declare global {
  type PresentType = 'result' | 'normal'

  interface CollectionInfo extends IconifyInfo {
    id: string
    url?: string
    sampleIcons?: string[]
    prepacked?: IconifyJSON
  }

  interface CollectionCategoryInfo {
    name: string
    type: PresentType
    collections: CollectionInfo[]
  }

  interface CollectionMeta extends CollectionInfo {
    icons: string[]
    categories?: Record<string, string[]>
    variants?: Record<string, string[]>
  }
}
