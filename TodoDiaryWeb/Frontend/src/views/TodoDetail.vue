<template>
  <div class="todo-detail">
    <button @click="$router.back()" class="back-btn">← 返回列表</button>

    <div v-if="loading" class="loading">加载中...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="todo" class="todo-card">
      <div class="status" :class="todo.isCompleted ? 'completed' : 'active'">
        {{ todo.isCompleted ? '已完成' : '未完成' }}
      </div>

      <h1 class="title">{{ todo.title }}</h1>
      <div class="content">{{ todo.content }}</div>

      <div class="meta">
        <span>创建时间：{{ formatTime(todo.createdTime) }}</span>
      </div>

      <div class="actions">
        <button @click="handleEdit">编辑</button>
        <button @click="handleToggle">
          {{ todo.isCompleted ? '标记为未完成' : '标记为已完成' }}
        </button>
        <button @click="handleDelete" class="danger">删除</button>
      </div>

      <!-- 编辑表单（点击编辑时显示） -->
      <TodoForm
        v-if="showEditForm"
        :edit-todo="todo"
        @update-todo="handleUpdate"
        @cancel-edit="showEditForm = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTodoStore } from '../store/todos';
import TodoForm from '../components/TodoForm.vue';

// 路由和导航
const route = useRoute();
const router = useRouter();
const store = useTodoStore();

// 状态管理
const todo = ref(null);
const loading = ref(true);
const error = ref('');
const showEditForm = ref(false);

// 格式化时间
const formatTime = (time) => {
  return new Date(time).toLocaleString();
};

// 加载日记详情
const loadTodoDetail = async () => {
  try {
    const id = route.params.id;
    // Since we're using Pinia, we can get the todo from the store if it's already loaded
    const existingTodo = store.todos.find(t => t.id === id);
    if (existingTodo) {
      todo.value = existingTodo;
    } else {
      // If not in store, fetch it
      const res = await store.fetchTodos(); // This will fetch all todos
      const fetchedTodo = store.todos.find(t => t.id === id);
      if (fetchedTodo) {
        todo.value = fetchedTodo;
      } else {
        error.value = '日记不存在';
      }
    }
    error.value = '';
  } catch (err) {
    error.value = '获取日记失败，请重试';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// 初始化加载
onMounted(loadTodoDetail);

// 编辑按钮：显示表单
const handleEdit = () => {
  showEditForm.value = true;
};

// 更新日记
const handleUpdate = async (updatedTodo) => {
  try {
    await store.updateExistingTodo(updatedTodo.id, updatedTodo);
    todo.value = updatedTodo; // 本地更新
    showEditForm.value = false;
  } catch (err) {
    error.value = '更新失败，请重试';
    console.error(err);
  }
};

// 切换完成状态
const handleToggle = async () => {
  if (todo.value) {
    const updated = {
      ...todo.value,
      isCompleted: !todo.value.isCompleted
    };
    await store.updateExistingTodo(updated.id, updated);
    todo.value = updated; // 本地更新
  }
};

// 删除日记
const handleDelete = async () => {
  // console.log('handleDelete called');
  // console.log('todo.value:', todo.value);
  if (todo.value && confirm('确定要删除这条日记吗？')) {
    try {
      await store.removeTodo(todo.value.id);
      router.push('/'); // 删除后返回列表页
    } catch (err) {
      error.value = '删除失败，请重试';
      console.error(err);
    }
  }
};
</script>

<style scoped>
.todo-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}
.back-btn {
  background: none;
  border: none;
  color: #42b983;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}
.loading, .error {
  text-align: center;
  padding: 2rem;
}
.error {
  color: #ff4444;
}
.todo-card {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 1.5rem;
}
.status {
  display: inline-block;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}
.status.completed {
  background: #e6f4ea;
  color: #137333;
}
.status.active {
  background: #fff8e6;
  color: #c87941;
}
.title {
  margin: 0 0 1rem 0;
  color: #333;
}
.content {
  line-height: 1.6;
  color: #666;
  margin-bottom: 1.5rem;
  white-space: pre-line; /* 保留换行 */
}
.meta {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  padding-top: 1rem;
  border-top: 1px dashed #eee;
}
.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
.actions button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
.actions button.danger {
  background: #ff4444;
  color: white;
  margin-left: auto;
}
</style>