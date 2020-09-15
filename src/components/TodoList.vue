<template>
  <ul class="todo-list">
    <template v-for="todo in filteredTodos" :key="todo.index">
      <li :class="{
        todo: true,
        completed: todo.completed,
        editing: todo.editing
      }">

        <div class="view">
          <input type="checkbox" class="toggle" v-model="todo.completed" />
          <label @dblclick="edit(todo)">{{ todo.title }}</label>
          <button class="destroy" @click="emitDestroyEvent(todo.index)"></button>
        </div>

        <input
          type="text"
          class="edit"
          v-model="todo.title"
          v-todo-focus="todo.editing"
          @bluer="doneEditing(todo)"
          @keydown.enter="doneEditing(todo)"
          @keydown.esc="cancelEditing(todo)"
        >
      </li>
    </template>
  </ul>
</template>

<script setup="props, { emit }">
import { ref, computed } from "vue";
import { isNotEmpty } from "../modules/helpers";

export default {
  name: "TodoList",
  props: {
    todos: Array,
    filter: String
  },
  directives: {
    "todo-focus": (el, binding) => {
      if (binding.value) el.focus();
    }
  }
}


export const filteredTodos = computed(() => {
  const filterStore = {
    All:       () => props.todos,
    Active:    () => props.todos.filter(todo => todo.completed === false),
    Completed: () => props.todos.filter(todo => todo.completed === true)
  };
  return filterStore[props.filter]();
});
const todoCache = ref("");



export function saveTodoCache(todo) {
  todoCache.value = todo.title;
}

export function edit(todo) {
  todo.editing = true;
  saveTodoCache(todo);
}

export function doneEditing(todo) {
  if (isNotEmpty(todo)) {
    todo.editing = false;
  }
}

export function cancelEditing(todo) {
  todo.editing = false;
  todo.title = todoCache.value;
}

export function emitDestroyEvent(todoIndex) {
  emit("destroy", todoIndex);
}
</script>
