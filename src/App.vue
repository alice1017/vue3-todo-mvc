<template>

  <section class="todoapp">

    <header class="header">
      <h1>Todos</h1>
      <todo-input @add="addTodo"/>
    </header>

    <section class="main" v-cloak>
      <todo-list :todos="todos" :filter="filter" @destroy="destroyTodo"/>
    </section>

    <footer class="footer" v-cloak>
      <span class="todo-count">{{ remaining }}</span>
      <todo-filters :selected="filter" @change="changeFilter" />
      <button class="clear-completed" @click="clearCompleted">Clear Completed</button>
    </footer>

  </section>

  <footer class="info"></footer>

</template>

<script setup>
import { ref, computed } from "vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFilters from "./components/TodoFilters.vue";

export default {
  name: 'App',
  components: {
    TodoInput,
    TodoList,
    TodoFilters
  }
}



export const todos = ref([
  { title: "todo 1", completed: false, editing: false, index: 0 },
  { title: "todo 2", completed: false, editing: false, index: 1 },
  { title: "todo 3", completed: false, editing: false, index: 2 }
]);
export const todoCount = ref(3);
export const filter = ref("All");



export const remaining = computed(() => {
  const items = todos.value.length;
  const info = items > 1 ? "items" : "item";
  return `${items} ${info} left`;
});



export function addTodo(newone) {
  todos.value.push(
    {
      title: newone,
      completed: false,
      editing: false,
      index: todoCount.value
    }
  );
  todoCount.value ++;
}

export function destroyTodo(todoIndex) {
  todos.value.splice(todoIndex, 1);
}

export function changeFilter(newone) {
  filter.value = newone;
}

export function clearCompleted() {
  const completedTodos = todos.value.filter(todo => todo.completed === true);
  for(const todo of completedTodos) {
    todos.value.splice(todo.index, 1);
  }
}
</script>
