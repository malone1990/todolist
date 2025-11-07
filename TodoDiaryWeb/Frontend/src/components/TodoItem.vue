<template>
  <div class="todo-item" :class="{ completed: todo.isCompleted }">
    <h3>{{ todo.title }}</h3>
    <p class="content">{{ todo.content }}</p>
    <div class="actions">
      <button @click="$emit('edit', todo)">编辑</button>
      <button @click="$emit('delete', todo.id)">删除</button>
      <button @click="$emit('toggle', todo.id)">
        {{ todo.isCompleted ? '未完成' : '已完成' }}
      </button>
    </div>
    <div class="time">{{ formatTime(todo.createdTime) }}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// 接收父组件传入的todo数据
const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
});

// 格式化时间
const formatTime = (time) => {
  return new Date(time).toLocaleString();
};
</script>

<style scoped>
.todo-item {
  border: 1px solid #eee;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
}
.completed {
  background: #f5f5f5;
  text-decoration: line-through;
}
.actions button {
  margin-right: 0.5rem;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
}
.time {
  color: #666;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
</style>