<template>
  <input
    class="new-todo"
    autocomplete="off"
    placeholder="What needs to be done?"
    v-model="todo"
    @keydown.enter="emitEvent(todo)"
    autofocus
  >
</template>

<script setup="props, { emit }">
import { ref } from "vue";
import { isNotEmpty } from "../modules/helpers";

export default {
  name: "TodoInput",
}



export const todo = ref("");
export const emitEvent = (newone) => {
  if (isNotEmpty(newone)) {
    emit("add", newone);
    todo.value = "";
  }
};
</script>
