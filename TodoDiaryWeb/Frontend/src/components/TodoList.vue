<template>
  <div class="todo-list">
    <!-- 空状态提示 -->
    <div v-if="todos.length === 0" class="empty">
      暂无日记，点击"新增"创建第一条吧～
    </div>
    
    <!-- 循环渲染单个日记项 -->
    <TodoItem 
      v-for="todo in todos" 
      :key="todo.id" 
      :todo="todo"
      @edit="handleEdit"
      @delete="handleDelete"
      @toggle="handleToggle"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import TodoItem from './TodoItem.vue'; // 导入子组件

// 接收父组件传入的日记列表
const props = defineProps({
  todos: {
    type: Array,
    required: true,
    default: () => []
  }
});

// 向父组件传递事件（实现组件通信）
// const emit = emit();  // This line is incorrect and should be removed
const emit = defineEmits(['edit-todo', 'delete-todo', 'toggle-todo']);  // Correct way to use emit

// 编辑事件：传递当前日记数据
const handleEdit = (todo) => {
  emit('edit-todo', todo);
};

// 删除事件：传递日记ID
const handleDelete = (id) => {
  emit('delete-todo', id);
};

// 切换完成状态：传递日记ID
const handleToggle = (id) => {
  emit('toggle-todo', id);
};
</script>

<style scoped>
.todo-list {
  margin-top: 1.5rem;
}
.empty {
  text-align: center;
  padding: 2rem;
  color: #888;
  border: 1px dashed #ddd;
  border-radius: 4px;
}
</style>