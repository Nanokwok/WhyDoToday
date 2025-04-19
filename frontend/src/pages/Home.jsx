"use client"

import { useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Filter, Plus, AlertCircle, X } from "lucide-react"
import { toast } from "sonner"

// Custom Hooks
import useTodoLists from "@/hooks/useTodoLists"
import useTodoItems from "@/hooks/useTodoItems"
import { useState } from "react"

// Components
import TodoLists from "@/sections/TodoLists"
import TodoItems from "@/sections/TodoItems"
import FilterPanel from "@/sections/FilterPanel"
import AddItemForm from "@/sections/AddItemForm"
import DeleteDialog from "@/sections/DeleteDialog"

function Home() {
  // Initialize hooks
  const {
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
  } = useTodoLists()

  const {
    todoItems,
    setTodoItems,
    showAddItemForm,
    setShowAddItemForm,
    getTodoItems,
    createTodoItem,
    deleteTodoItem,
    toggleItemCompletion,
    formatDate,
  } = useTodoItems()

  const [filterPriority, setFilterPriority] = useState(null)
  const [filterOpen, setFilterOpen] = useState(false)

  // Load initial data
  useEffect(() => {
    getTodoLists()
  }, [])

  // Load todo items when selected list changes
  useEffect(() => {
    if (selectedList) {
      getTodoItems(selectedList.id)
    }
  }, [selectedList])

  // Handle creating a new todo item
  const handleCreateTodoItem = (formData) => {
    if (selectedList) {
      createTodoItem(formData, selectedList.id)
    }
  }

  // Apply filters handler
  const handleApplyFilters = () => {
    if (selectedList) {
      let url = `/api/todoitems/?todolist=${selectedList.id}`
      if (filterPriority) {
        url += `&priority=${filterPriority}`
      }
      
      api
        .get(url)
        .then((res) => res.data)
        .then((data) => setTodoItems(data))
        .catch((err) => toast.error(`Error applying filters: ${err.message}`))
    }
    setFilterOpen(false)
    toast.success("Filters applied")
  }

  // Clear filters handler
  const handleClearFilters = () => {
    setFilterPriority(null)
    if (selectedList) {
      getTodoItems(selectedList.id)
    }
    toast.success("Filters cleared")
  }

  // Filter items
  const filteredItems = todoItems.filter((item) => {
    if (!filterPriority) return true
    return item.priority === filterPriority
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Header className="w-full z-10" />
      <div className="flex-1 w-full p-4 bg-zinc-50 text-zinc-900">
        <div className="max-w-7xl mx-auto">
          {/* Delete Dialog */}
          <DeleteDialog
            isOpen={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            listToDelete={listToDelete}
            onDelete={deleteTodoList}
          />

          <div className="flex justify-between items-center mb-6 mt-10">
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-600 text-transparent bg-clip-text">
              Why Do (It) Today?
            </h2>

            {/* Filter Button */}
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  filterOpen || filterPriority
                    ? "!bg-zinc-800 !text-zinc-50"
                    : "!bg-zinc-200 !text-zinc-800"
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
                {filterPriority && (
                  <span className="ml-1 bg-zinc-700 text-zinc-50 px-1.5 py-0.5 rounded-full text-xs">
                    1
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Filter Panel */}
          <FilterPanel
            isOpen={filterOpen}
            onClose={() => setFilterOpen(false)}
            filterPriority={filterPriority}
            setFilterPriority={setFilterPriority}
            clearFilters={handleClearFilters}
            applyFilters={handleApplyFilters}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Todo Lists Section */}
            <div className="md:col-span-1">
              <TodoLists
                todoLists={todoLists}
                selectedList={selectedList}
                setSelectedList={setSelectedList}
                handleDeleteList={handleDeleteList}
                createTodoList={createTodoList}
              />
            </div>

            {/* Todo Items Section */}
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
                        className="flex items-center gap-1 !bg-zinc-800 !text-zinc-50 px-3 py-2 rounded-lg hover:!bg-zinc-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" /> Add Task
                      </Button>
                    </div>

                    {/* Active Filters Display */}
                    {filterPriority && (
                      <div className="px-4 py-2 bg-zinc-50 border-b flex items-center flex-wrap gap-2">
                        <span className="text-xs font-medium text-zinc-500">Active filters:</span>
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full flex items-center gap-1 ${
                            filterPriority === "3"
                              ? "bg-red-100 text-red-800"
                              : filterPriority === "2"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          Priority: {filterPriority === "3" ? "High" : filterPriority === "2" ? "Medium" : "Low"}
                          <Button
                            onClick={() => setFilterPriority(null)}
                            className="hover:!text-zinc-900 !text-zinc-500 !rounded-full"
                          >
                            <X className="w-2 h-2" />
                          </Button>
                        </span>
                        <Button
                          onClick={handleClearFilters}
                          className="px-2 py-0.5 text-xs !text-zinc-600 hover:!text-zinc-900 !ml-auto"
                        >
                          Clear all
                        </Button>
                      </div>
                    )}

                    {/* Add Task Form */}
                    {showAddItemForm && (
                      <AddItemForm onSubmit={handleCreateTodoItem} onCancel={() => setShowAddItemForm(false)} />
                    )}

                    {/* Task List */}
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
                  <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                    <div className="bg-zinc-100 rounded-full p-4 mb-4">
                      <AlertCircle className="w-8 h-8 text-zinc-500" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">No list selected</h2>
                    <p className="text-zinc-600 max-w-xs">
                      Select a list from the sidebar or create a new one to get started.
                    </p>
                  </div>
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

export default Home