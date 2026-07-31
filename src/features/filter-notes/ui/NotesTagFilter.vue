<script setup lang="ts">
import { UiInput } from '@shared/ui'

/**
 * TODO: фильтр списка заметок по тегу.
 * modelValue = текущий тег-фильтр.
 */
const model = defineModel<string>({ default: '' })
</script>

<template>
  <UiInput
    v-model="model"
    label="Фильтр по тегу"
    placeholder="например: vue"
  />
</template>
