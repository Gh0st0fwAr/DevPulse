<script setup lang="ts">
import { useTaskStore } from "@entities/task";
import { parseTags } from "@shared/lib";
import { UiButton, UiInput, UiModal } from "@shared/ui";
import { reactive, ref } from "vue";
import { createTaskSchema } from "../model/schema";

const open = defineModel<boolean>("open", { default: false });

const initialForm = {
  title: "",
  description: "",
  tags: "",
  deadline: "",
  plannedSessions: "1",
};

const form = reactive({ ...initialForm });

const errors = ref<Partial<Record<keyof typeof form, string>>>({});
const taskStore = useTaskStore();

function resetForm(): void {
  Object.assign(form, initialForm);
  errors.value = {};
}

function submit(): void {
  const result = createTaskSchema.safeParse(form);

  if (!result.success) {
    const nextErrors: Partial<Record<keyof typeof form, string>> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && field in form) {
        nextErrors[field as keyof typeof form] = issue.message;
      }
    }
    errors.value = nextErrors;
    return;
  }

  taskStore.addTask({
    title: result.data.title,
    description: result.data.description,
    tags: parseTags(result.data.tags ?? ""),
    deadline: result.data.deadline?.trim() ? result.data.deadline : null,
    plannedSessions: result.data.plannedSessions,
  });

  resetForm();
  open.value = false;
}
</script>

<template>
  <UiModal :open="open" title="Новая задача" @close="open = false">
    <form class="flex flex-col gap-3" @submit.prevent="submit">
      <UiInput
        v-model="form.title"
        label="Заголовок *"
        :error="errors.title"
      />
      <UiInput
        v-model="form.description"
        label="Описание"
        :error="errors.description"
      />
      <UiInput
        v-model="form.tags"
        label="Теги"
        placeholder="vue, typescript, pinia"
        :error="errors.tags"
      />
      <UiInput
        v-model="form.deadline"
        label="Дедлайн"
        type="date"
        :error="errors.deadline"
      />
      <UiInput
        v-model="form.plannedSessions"
        label="Плановые сессии помодоро *"
        type="number"
        :error="errors.plannedSessions"
      />
      <div class="mt-2 flex justify-end gap-2">
        <UiButton variant="ghost" type="button" @click="open = false">
          Отмена
        </UiButton>
        <UiButton type="submit">Создать</UiButton>
      </div>
    </form>
  </UiModal>
</template>
