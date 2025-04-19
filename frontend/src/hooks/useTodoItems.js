"use client"

import { useState } from "react"
import api from "../api"
import { toast } from "sonner"

export default function useTodoItems() {
  const [todoItems, setTodoItems] = useState([])
  const [showAddItemForm, setShowAddItemForm] = useState(false)

  const getTodoItems = (listId) => {
    api
      .get(`/api/todoitems/?todolist=${listId}`)
      .then((res) => res.data)
      .then((data) => {
        setTodoItems(data)
      })
      .catch((err) => toast.error(`Error fetching items: ${err.message}`))
  }

  const createTodoItem = (formData, listId) => {
    const dueDate = formData.due_date ? new Date(formData.due_date).toISOString() : null

    api
      .post("/api/todoitems/", {
        title: formData.title,
        description: formData.description,
        due_date: dueDate,
        priority: formData.priority,
        todolist: listId,
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Todo item created successfully")
          setShowAddItemForm(false)
          getTodoItems(listId)
          return true
        } else {
          toast.error("Failed to create todo item")
          return false
        }
      })
      .catch((err) => {
        toast.error(`Error creating item: ${err.message}`)
        return false
      })
  }

  const deleteTodoItem = (id, listId) => {
    api
      .delete(`/api/todoitems/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          toast.success("Todo item deleted successfully")
          getTodoItems(listId)
        } else {
          toast.error("Failed to delete todo item")
        }
      })
      .catch((err) => toast.error(`Error deleting item: ${err.message}`))
  }

  const toggleItemCompletion = (item, listId) => {
    const endpoint = item.is_completed ? `/api/todoitems/${item.id}/reopen/` : `/api/todoitems/${item.id}/complete/`

    api
      .post(endpoint)
      .then(() => {
        getTodoItems(listId)
        toast.success(`Task marked as ${item.is_completed ? "reopened" : "completed"}`)
      })
      .catch((err) => toast.error(`Error updating task: ${err.message}`))
  }

  const formatDate = (dateString) => {
    if (!dateString) return "No due date"
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return {
    todoItems,
    setTodoItems,
    showAddItemForm,
    setShowAddItemForm,
    getTodoItems,
    createTodoItem,
    deleteTodoItem,
    toggleItemCompletion,
    formatDate,
  }
}
