<template>
  <div class="todo-form">
    <h2>{{ isEditing ? '编辑日记' : '新增日记' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">标题</label>
        <input
          type="text"
          id="title"
          v-model="form.title"
          required
          placeholder="请输入日记标题"
        />
      </div>
      
      <div class="form-group">
        <label for="content">内容</label>
        <textarea
          id="content"
          v-model="form.content"
          required
          rows="4"
          placeholder="请输入日记内容"
        ></textarea>
      </div>
      
      <div class="form-actions">
        <button type="submit" class="submit-btn">
          {{ isEditing ? '更新' : '添加' }}
        </button>
        <button 
          type="button" 
          class="cancel-btn" 
          @click="handleCancel"
          v-if="isEditing"
        >
          取消
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue';
import { defineEmits } from 'vue';

// 接收父组件传入的编辑数据（可选）
const props = defineProps({
  editTodo: {
    type: Object,
    default: null
  }
});

// 表单数据
const form = ref({
  title: '',
  content: ''
});

// 是否处于编辑状态
const isEditing = ref(!!props.editTodo);

// 监听编辑数据变化（如父组件传入新的编辑项）
watch(
  () => props.editTodo,
  (newVal) => {
    isEditing.value = !!newVal;
    if (newVal) {
      // 填充表单数据
      form.value = {
        title: newVal.title,
        content: newVal.content
      };
    } else {
      // 清空表单
      form.value = { title: '', content: '' };
    }
  },
  { immediate: true } // 初始化时执行
);

// 定义 emit 函数
const emit = defineEmits(['update-todo', 'add-todo', 'cancel-todo']);

// 提交表单
const handleSubmit = () => {
  if (isEditing.value) {
    // 编辑模式：传递原ID和新数据
    emit('update-todo', {
      id: props.editTodo.id,
      ...form.value,
      isCompleted: props.editTodo.isCompleted, // 保留原状态
      createdTime: props.editTodo.createdTime // 保留创建时间
    });
  } else {
    // 新增模式：传递表单数据（其他字段由后端生成）
    emit('add-todo', {
      ...form.value,
      isCompleted: false
    });
  }
  // 重置表单
  form.value = { title: '', content: '' };
};

// 取消编辑
const handleCancel = () => {
  emit('cancel-todo');
  form.value = { title: '', content: '' };
};
</script>

<style scoped>
.todo-form {
  border: 1px solid #eee;
  padding: 1.5rem;
  border-radius: 4px;
}
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
input, textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}
textarea {
  resize: vertical;
}
.form-actions {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
}
.submit-btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
.cancel-btn {
  background: #f5f5f5;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
</style>