"use client"

import { useState } from "react"
import api from "../api"
import { toast } from "sonner"

export default function useTags() {
  const [tags, setTags] = useState([])
  const [newTagInputs, setNewTagInputs] = useState({})
  const [activeFilters, setActiveFilters] = useState([])
  const [filterPriority, setFilterPriority] = useState(null)
  const [filterOpen, setFilterOpen] = useState(false)

  const getTags = () => {
    api
      .get("/api/tags/")
      .then((res) => res.data)
      .then((data) => setTags(data))
      .catch((err) => toast.error(`Error fetching tags: ${err.message}`))
  }

  const getItemsByTag = (tagName) => {
    if (activeFilters.includes(tagName)) {
      // Remove tag from filters if already active
      setActiveFilters(activeFilters.filter((tag) => tag !== tagName))
    } else {
      // Add tag to filters
      setActiveFilters([...activeFilters, tagName])
    }
  }

  const applyFilters = (selectedList, setTodoItems) => {
    if (activeFilters.length === 0 && !filterPriority) {
      // If no filters, just get all items for the selected list
      if (selectedList) {
        api
          .get(`/api/todoitems/?todolist=${selectedList.id}`)
          .then((res) => res.data)
          .then((data) => setTodoItems(data))
          .catch((err) => toast.error(`Error fetching items: ${err.message}`))
      }
      return
    }

    // Start with the base URL for the selected list
    let url = selectedList ? `/api/todoitems/?todolist=${selectedList.id}` : `/api/todoitems/`

    // Add tag filters if any
    if (activeFilters.length > 0) {
      url += `&tags=${activeFilters.join(",")}`
    }

    // Add priority filter if any
    if (filterPriority) {
      url += `&priority=${filterPriority}`
    }

    api
      .get(url)
      .then((res) => res.data)
      .then((data) => setTodoItems(data))
      .catch((err) => toast.error(`Error applying filters: ${err.message}`))
  }

  const clearFilters = (selectedList, getTodoItems) => {
    setActiveFilters([])
    setFilterPriority(null)
    if (selectedList) {
      getTodoItems(selectedList.id)
    }
    toast.success("Filters cleared")
  }

  const handleTagInputChange = (itemId, value) => {
    setNewTagInputs({
      ...newTagInputs,
      [itemId]: value,
    })
  }

  const handleTagSubmit = (e, itemId) => {
    e.preventDefault()
    const tagName = newTagInputs[itemId]
    if (tagName && tagName.trim()) {
      addTagToItem(itemId, tagName.trim())
      // Clear the input after submission
      setNewTagInputs({
        ...newTagInputs,
        [itemId]: "",
      })
    }
  }

  const addTagToItem = (itemId, tagName) => {
    // First check if tag exists
    const existingTag = tags.find((tag) => tag.name.toLowerCase() === tagName.toLowerCase())

    if (existingTag) {
      // Use existing tag
      linkTagToItem(itemId, existingTag.id)
    } else {
      // Create new tag
      api
        .post("/api/tags/", { name: tagName })
        .then((res) => {
          linkTagToItem(itemId, res.data.id)
          getTags()
          toast.success(`Tag "${tagName}" created`)
        })
        .catch((err) => toast.error(`Error creating tag: ${err.message}`))
    }
  }

  const linkTagToItem = (itemId, tagId) => {
    api
      .post("/api/todoitems/tags/", {
        todo_item: itemId,
        tag: tagId,
      })
      .then(() => {
        toast.success("Tag added to task")
      })
      .catch((err) => toast.error(`Error adding tag: ${err.message}`))
  }

  const removeTagFromItem = (itemId, tagId, selectedList, getTodoItems) => {
    api
      .delete(`/api/todoitems/${itemId}/tags/${tagId}/`)
      .then(() => {
        if (selectedList) {
          getTodoItems(selectedList.id)
        }
        toast.success("Tag removed from task")
      })
      .catch((err) => toast.error(`Error removing tag: ${err.message}`))
  }

  const filterItems = (todoItems) => {
    return todoItems.filter((item) => {
      if (activeFilters.length === 0 && !filterPriority) return true

      const hasActiveTag =
        activeFilters.length === 0 || (item.tags && item.tags.some((tag) => activeFilters.includes(tag.name)))

      const matchesPriority = !filterPriority || item.priority === filterPriority

      return hasActiveTag && matchesPriority
    })
  }

  return {
    tags,
    newTagInputs,
    activeFilters,
    filterPriority,
    filterOpen,
    setFilterOpen,
    setFilterPriority,
    setNewTagInputs,
    getTags,
    getItemsByTag,
    applyFilters,
    clearFilters,
    handleTagInputChange,
    handleTagSubmit,
    addTagToItem,
    removeTagFromItem,
    filterItems,
  }
}
