<script setup lang="ts">
import { UiButton } from "@shared/ui";

const emit = defineEmits<{
  create: [];
}>();
</script>

<template>
  <UiButton @click="emit('create')">Новая заметка</UiButton>
</template>
