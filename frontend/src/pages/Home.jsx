"use client"

import { useEffect, useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import api from "../api"

// Sections
import TodoLists from "@/sections/TodoLists"
import TodoItems from "@/sections/TodoItems"
import FilterPanel from "@/sections/FilterPanel"
import AddItemForm from "@/sections/AddItemForm"
import DeleteDialog from "@/sections/DeleteDialog"
import HeaderTitle from "@/sections/HeaderTitle"
import ActiveFilters from "@/sections/ActiveFilters"
import EmptyState from "@/sections/EmptyState"

// Hooks
import useTodoLists from "@/hooks/useTodoLists"
import useTodoItems from "@/hooks/useTodoItems"

export default function Home() {
  const {
    todoLists, selectedList, setSelectedList, getTodoLists,
    handleDeleteList, deleteTodoList, createTodoList,
    deleteDialogOpen, setDeleteDialogOpen, listToDelete,
  } = useTodoLists()

  const {
    todoItems, setTodoItems, showAddItemForm, setShowAddItemForm,
    getTodoItems, createTodoItem, deleteTodoItem,
    toggleItemCompletion, formatDate,
  } = useTodoItems()

  const [filterPriority, setFilterPriority] = useState(null)
  const [filterOpen, setFilterOpen] = useState(false)

  useEffect(() => { getTodoLists() }, [])
  useEffect(() => { if (selectedList) getTodoItems(selectedList.id) }, [selectedList])

  const handleCreateTodoItem = (formData) => {
    if (selectedList) createTodoItem(formData, selectedList.id)
  }

  const handleApplyFilters = () => {
    if (!selectedList) return
    const url = selectedList.id === "all"
      ? `/api/todoitems/${filterPriority ? `?priority=${filterPriority}` : ""}`
      : `/api/todoitems/?todolist=${selectedList.id}${filterPriority ? `&priority=${filterPriority}` : ""}`

    api.get(url)
      .then(res => setTodoItems(res.data))
      .then(() => toast.success("Filters applied"))
      .catch(err => toast.error(`Error: ${err.message}`))

    setFilterOpen(false)
  }

  const handleClearFilters = () => {
    setFilterPriority(null)
    if (selectedList) getTodoItems(selectedList.id)
    toast.success("Filters cleared")
  }

  const filteredItems = todoItems.filter(item => !filterPriority || item.priority === filterPriority)

  return (
    <div className="flex flex-col min-h-screen">
      <Header className="w-full z-10" />

      <div className="flex-1 w-full p-4 bg-zinc-50 text-zinc-900">
        <div className="max-w-7xl mx-auto">
          <DeleteDialog
            isOpen={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            listToDelete={listToDelete}
            onDelete={deleteTodoList}
          />

          <HeaderTitle
            filterOpen={filterOpen}
            filterPriority={filterPriority}
            onClick={() => setFilterOpen(!filterOpen)}
          />

          <FilterPanel
            isOpen={filterOpen}
            onClose={() => setFilterOpen(false)}
            filterPriority={filterPriority}
            setFilterPriority={setFilterPriority}
            clearFilters={handleClearFilters}
            applyFilters={handleApplyFilters}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <TodoLists
                todoLists={todoLists}
                selectedList={selectedList}
                setSelectedList={setSelectedList}
                handleDeleteList={handleDeleteList}
                createTodoList={createTodoList}
              />
            </div>

            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow h-full">
                {selectedList ? (
                  <>
                    <div className="p-4 border-b flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-semibold">{selectedList.title}</h2>
                        {selectedList.description && (
                          <p className="text-sm text-zinc-600 mt-1">{selectedList.description}</p>
                        )}
                      </div>
                      <Button
                        onClick={() => setShowAddItemForm(!showAddItemForm)}
                        className="flex items-center gap-1 !bg-zinc-800 !text-zinc-50 px-3 py-2 rounded-lg hover:!bg-zinc-700"
                      >
                        <Plus className="w-4 h-4" /> Add Task
                      </Button>
                    </div>

                    <ActiveFilters
                      filterPriority={filterPriority}
                      onClear={handleClearFilters}
                      onRemovePriority={() => setFilterPriority(null)}
                    />

                    {showAddItemForm && (
                      <AddItemForm
                        onSubmit={handleCreateTodoItem}
                        onCancel={() => setShowAddItemForm(false)}
                        selectedList={selectedList}
                      />
                    )}

                    <TodoItems
                      items={filteredItems}
                      selectedList={selectedList}
                      formatDate={formatDate}
                      toggleItemCompletion={toggleItemCompletion}
                      deleteTodoItem={deleteTodoItem}
                      filterPriority={filterPriority}
                      clearFilters={handleClearFilters}
                    />
                  </>
                ) : (
                  <EmptyState />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
