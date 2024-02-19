import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default antfu(
  {
    unocss: true,
    formatters: true,
    rules: {
      'vue/attribute-hyphenation': 'off',
      'vue/v-on-event-hyphenation': 'off',
    }
  },
  nuxt,
)
