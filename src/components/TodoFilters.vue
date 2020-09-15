<template>
  <ul class="filters">
    <template v-for="(filter, index) in filters" :key="index">
      <li>
        <a
          @click="emitChangeEvent(filter)"
          :class="{ link: true, selected: isSelected(filter) }"
        >
          {{ filter }}
        </a>
      </li>
    </template>
  </ul>
</template>

<script setup="props, { emit }">
import { computed } from "vue";

export default {
  name: "TodoFilters",
  props: {
    selected: String
  }
}



export const filters = [
  "All", "Active", "Completed"
];



export function emitChangeEvent(filter) {
  emit("change", filter);
}

export function isSelected(filter) {
  return props.selected === filter;
}
</script>

<style scoped>
.link {
  cursor: pointer;
}
</style>
