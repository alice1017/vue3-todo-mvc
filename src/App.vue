<template>

  <section class="todoapp" v-cloak>

    <header class="header">
      <h1>Todos</h1>
      <todo-input @add="addTodo"/>
    </header>

    <section class="main" v-show="todos.length" v-cloak>
      <todo-list :todos="todos" :filter="filter" @destroy="destroyTodo"/>
    </section>

    <footer class="footer" v-show="todos.length" v-cloak>
      <span class="todo-count">{{ remaining }}</span>
      <todo-filters :selected="filter" @change="changeFilter" />
      <button class="clear-completed" @click="clearCompleted" v-show="hasCompletedTodo">Clear Completed</button>
    </footer>

  </section>

  <footer class="info">
    <p>Double-click to edit a todo</p>
    <p>Written by <a href="http://evanyou.me">Evan You</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>

</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { LocalStorageManager } from "./modules/storage";
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



const storageManager = new LocalStorageManager("todos-vue3");

//export const todos = ref([
//  { title: "todo 1", completed: false, editing: false, index: 0 },
//  { title: "todo 2", completed: false, editing: false, index: 1 },
//  { title: "todo 3", completed: false, editing: false, index: 2 }
//]);
//export const todoCount = ref(3);

export const todos = ref([]);
export const todoCount = ref(0);
export const filter = ref("All");



export const remaining = computed(() => {
  const items = todos.value.length;
  const info = items > 1 ? "items" : "item";
  return `${items} ${info} left`;
});

export const hasCompletedTodo = computed(() => {
  const completed = todos.value.filter(todo => todo.completed === true);
  console.log(completed);
  return completed.length > 0;
});



onMounted(() => {
  const hasValue = storageManager.hasValue();
  if (hasValue) {
    todos.value = storageManager.get();
  }
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
  storageManager.set(todos.value);
  todoCount.value ++;
}

export function destroyTodo(todo) {
  const index = todos.value.indexOf(todo);
  todos.value.splice(index, 1);

  if (todos.length === 0) {
    todoCount.value = 0;
  }
  else {
    storageManager.set(todos.value);
  }
}

export function changeFilter(newone) {
  filter.value = newone;
}

export function clearCompleted() {
  const completedTodos = todos.value.filter(todo => todo.completed === true);
  for(const todo of completedTodos) {
    todos.value.splice(todo.index, 1);
  }
  storageManager.set(todos.value);
}
</script>
