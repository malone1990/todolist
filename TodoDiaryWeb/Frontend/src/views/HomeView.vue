<template>
  <div class="home">
    <h1>Todo日记列表</h1>
    <TodoForm @add-todo="handleAddTodo" />
    <TodoList
      :todos="todos"
      @edit-todo="handleEditTodo"
      @delete-todo="handleDeleteTodo"
      @toggle-todo="handleToggleTodo"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TodoList from '../components/TodoList.vue';
import TodoForm from '../components/TodoForm.vue';
import { useTodoStore } from '../store/todos';

// 响应式数据
const router = useRouter();
const store = useTodoStore();

// 获取todos数据
const todos = ref(store.todos);

// 初始化加载数据
onMounted(async () => {
  await store.fetchTodos();
});

// 监听store中的todos变化，保持组件同步
store.$subscribe((mutation, state) => {
  todos.value = state.todos;
});

// 添加日记
const handleAddTodo = async (todo) => {
  await store.addNewTodo(todo);
};

// 编辑日记（此处简化，实际可弹窗处理）
const handleEditTodo = (todo) => {
  // 跳转到 TodoDetail 页面并传递 id 参数
  router.push({ name: 'TodoDetail', params: { id: todo.id } });
};

// 删除日记
const handleDeleteTodo = async (id) => {
  await store.removeTodo(id);
};

// 切换完成状态
const handleToggleTodo = async (id) => {
  const todo = store.todos.find(t => t.id === id);
  if (todo) {
    const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
    await store.updateExistingTodo(id, updatedTodo);
  }
};
</script>