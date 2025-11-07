import { defineStore } from 'pinia'
import { getTodos, addTodo, updateTodo, deleteTodo } from '../api/todoApi'

export const useTodoStore = defineStore('todos', {
  state: () => ({
    todos: [],
    loading: false,
    error: null
  }),

  getters: {
    completedTodos: (state) => state.todos.filter(todo => todo.isCompleted),
    pendingTodos: (state) => state.todos.filter(todo => !todo.isCompleted),
    totalTodos: (state) => state.todos.length
  },

  actions: {
    async fetchTodos() {
      this.loading = true
      this.error = null
      try {
        const response = await getTodos()
        this.todos = response.data
      } catch (error) {
        this.error = 'Failed to fetch todos'
        console.error('Error fetching todos:', error)
      } finally {
        this.loading = false
      }
    },

    async addNewTodo(todo) {
      this.loading = true
      this.error = null
      try {
        const response = await addTodo(todo)
        this.todos.push(response.data)
      } catch (error) {
        this.error = 'Failed to add todo'
        console.error('Error adding todo:', error)
      } finally {
        this.loading = false
      }
    },

    async updateExistingTodo(id, todo) {
      this.loading = true
      this.error = null
      try {
        const response = await updateTodo(id, todo)
        const index = this.todos.findIndex(t => t.id === id)
        if (index !== -1) {
          this.todos[index] = response.data
        }
      } catch (error) {
        this.error = 'Failed to update todo'
        console.error('Error updating todo:', error)
      } finally {
        this.loading = false
      }
    },

    async removeTodo(id) {
      this.loading = true
      this.error = null
      try {
        await deleteTodo(id)
        this.todos = this.todos.filter(todo => todo.id !== id)
      } catch (error) {
        this.error = 'Failed to delete todo'
        console.error('Error deleting todo:', error)
      } finally {
        this.loading = false
      }
    }
  }
})
