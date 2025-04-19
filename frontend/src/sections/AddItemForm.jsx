"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import api from "../api"

export default function AddItemForm({ onSubmit, onCancel, selectedList }) {
  const [todoLists, setTodoLists] = useState([])
  const isViewingAll = selectedList && selectedList.id === "all"

  // Fetch lists for the dropdown if viewing all lists
  useEffect(() => {
    if (isViewingAll) {
      api
        .get("/api/todolists/")
        .then((res) => res.data)
        .then((data) => {
          setTodoLists(data)
        })
        .catch((err) => console.error("Error fetching lists:", err))
    }
  }, [isViewingAll])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
      due_date: e.target.due_date.value,
      priority: e.target.priority.value,
      todolist: isViewingAll ? e.target.todolist.value : null,
    }
    onSubmit(formData)
  }

  return (
    <div className="p-4 bg-zinc-50 border-b animate-in fade-in slide-in-from-top-4 duration-300">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Task Title</label>
            <input type="text" name="title" className="w-full border rounded-lg p-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input type="datetime-local" name="due_date" className="w-full border rounded-lg p-2 text-sm" />
          </div>
        </div>

        {isViewingAll && (
          <div>
            <label className="block text-sm font-medium mb-1">List</label>
            <select name="todolist" className="w-full border rounded-lg p-2 text-sm" required>
              {todoLists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.title}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description" className="w-full border rounded-lg p-2 text-sm" rows="2"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <div className="flex gap-2">
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="priority" value="1" className="sr-only peer" />
              <span className="px-3 py-1 text-sm rounded-lg bg-zinc-100 peer-checked:bg-green-500 peer-checked:text-white">
                Low
              </span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="priority" value="2" className="sr-only peer" defaultChecked />
              <span className="px-3 py-1 text-sm rounded-lg bg-zinc-100 peer-checked:bg-yellow-500 peer-checked:text-white">
                Medium
              </span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="radio" name="priority" value="3" className="sr-only peer" />
              <span className="px-3 py-1 text-sm rounded-lg bg-zinc-100 peer-checked:bg-red-500 peer-checked:text-white">
                High
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 text-sm border text-zinc-700 !border-zinc-300 !rounded-lg"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-3 py-1.5 text-sm !bg-zinc-900 !text-zinc-50 rounded-lg hover:!bg-zinc-800"
          >
            Add Task
          </Button>
        </div>
      </form>
    </div>
  )
}
