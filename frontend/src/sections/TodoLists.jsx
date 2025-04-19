"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"

export default function TodoLists({ todoLists, selectedList, setSelectedList, handleDeleteList, createTodoList }) {
  const [showCreateForm, setShowCreateForm] = useState(false)

  const handleCreateList = async (e) => {
    e.preventDefault()
    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
    }
  
    const success = await createTodoList(formData)
    if (success) {
      e.target.reset()
      setShowCreateForm(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">My Lists</h2>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-1 text-sm !bg-zinc-800 !text-zinc-50 px-2 py-1 rounded-lg hover:!bg-zinc-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> New List
          </Button>
        </div>
      </div>

      {showCreateForm && <CreateListForm onSubmit={handleCreateList} onCancel={() => setShowCreateForm(false)} />}

      <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
        {todoLists.length > 0 ? (
          <ul className="divide-y">
            <li
              className={`px-4 py-3 cursor-pointer transition-colors ${
                selectedList && selectedList.id === "all" ? "bg-zinc-100" : "hover:bg-zinc-50"
              }`}
              onClick={() =>
                setSelectedList({ id: "all", title: "View All Lists", description: "All your tasks in one place" })
              }
            >
              <div className="flex justify-between items-center">
                <span className="font-medium truncate">View All Lists</span>
              </div>
              <p className="text-xs !text-zinc-500 mt-1 truncate">All your tasks in one place</p>
            </li>
            {todoLists.map((list) => (
              <li
                key={list.id}
                className={`px-4 py-3 cursor-pointer transition-colors ${
                  selectedList && selectedList.id === list.id ? "bg-zinc-100" : "hover:bg-zinc-50"
                }`}
                onClick={() => setSelectedList(list)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium truncate">{list.title}</span>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteList(list)
                    }}
                    className="!text-zinc-1 hover:!text-red-500 !bg-zinc-900 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                {list.description && <p className="text-xs !text-zinc-500 mt-1 truncate">{list.description}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center text-zinc-500">
            <p>No lists yet. Create your first list!</p>
          </div>
        )}
      </div>
    </div>
  )
}

function CreateListForm({ onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="p-4 border-b bg-zinc-50">
      <h3 className="text-sm font-medium mb-2">Create New List</h3>
      <input
        type="text"
        name="title"
        placeholder="List Title"
        className="w-full border rounded-lg p-2 mb-2 text-sm"
        required
      />
      <textarea
        name="description"
        placeholder="Description (optional)"
        className="w-full border rounded-lg p-2 mb-3 text-sm"
        rows="2"
      />
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          onClick={onCancel}
          className="px-2 py-1 text-sm border !bg-zinc-50 !text-zinc-900 !border-zinc-300 rounded"
        >
          Cancel
        </Button>
        <Button type="submit" className="px-2 py-1 text-sm !bg-zinc-900 !text-zinc-50 rounded hover:!bg-zinc-800">
          Create
        </Button>
      </div>
    </form>
  )
}
