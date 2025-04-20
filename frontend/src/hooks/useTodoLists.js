"use client"

import { useState } from "react"
import api from "../api"
import { toast } from "sonner"

export default function useTodoLists() {
  const [todoLists, setTodoLists] = useState([])
  const [selectedList, setSelectedList] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [listToDelete, setListToDelete] = useState(null)

  const getTodoLists = () => {
    api.get("/api/todolists/")
      .then((res) => res.data)
      .then((data) => {
        setTodoLists(data)
        if (data.length > 0 && !selectedList) {
          setSelectedList(data[0])
        }
      })
      .catch((err) => toast.error(`Error fetching lists: ${err.message}`))
  }

  const handleDeleteList = (list) => {
    setListToDelete(list)
    setDeleteDialogOpen(true)
  }

  const deleteTodoList = (id) => {
    api.delete(`/api/todolists/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          toast.success("Todo list deleted successfully")
          if (selectedList?.id === id) {
            setSelectedList(null)
          }
        } else {
          toast.error("Failed to delete todo list")
        }
      })
      .then(() => getTodoLists())
      .catch((err) => toast.error(`Error deleting list: ${err.message}`))
      .finally(() => setDeleteDialogOpen(false))
  }

  const createTodoList = (formData) => {
    api.post("/api/todolists/", {
      title: formData.title,
      description: formData.description,
    })
    .then((res) => {
      if (res.status === 201) {
        toast.success("Todo list created successfully")
        getTodoLists()
        return true
      } else {
        toast.error("Failed to create todo list")
        return false
      }
    })
    .catch((err) => {
      toast.error(`Error creating list: ${err.message}`)
      return false
    })
  }

  return {
    todoLists,
    selectedList,
    setSelectedList,
    getTodoLists,
    handleDeleteList,
    deleteTodoList,
    createTodoList,
    deleteDialogOpen,
    setDeleteDialogOpen,
    listToDelete,
  }
}
