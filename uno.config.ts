import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'container-wrapper': 'container mx-auto p-4 md:p-5',
    'color-base': 'text-gray-700 dark:text-gray-300',
  },
  presets: [
    presetAttributify(),
    presetIcons(),
    presetWind3(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {
      primary: 'var(--theme-color)',
    },
  },
})
