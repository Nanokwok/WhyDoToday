"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import api from "../api"
import { ImagePlus, Loader2 } from "lucide-react"

export default function AddItemForm({ onSubmit, onCancel, selectedList }) {
  const [todoLists, setTodoLists] = useState([])
  const [photoPreview, setPhotoPreview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const isViewingAll = selectedList && selectedList.id === "all"

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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData()
    formData.append("title", e.target.title.value)
    formData.append("description", e.target.description.value)

    if (e.target.due_date.value) {
      formData.append("due_date", e.target.due_date.value)
    }

    formData.append("priority", e.target.priority.value)

    if (isViewingAll && e.target.todolist.value) {
      formData.append("todolist", e.target.todolist.value)
    }

    if (e.target.photo.files[0]) {
      formData.append("photo", e.target.photo.files[0])
    }

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
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
            <label className="block text-sm font-medium mb-1">Due Date (optional)</label>
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
          <label className="block text-sm font-medium mb-1">Description (optional)</label>
          <textarea name="description" className="w-full border rounded-lg p-2 text-sm" rows="2"></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Photo (optional)</label>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer px-3 py-2 border rounded-lg hover:bg-zinc-100">
                <ImagePlus className="w-4 h-4" />
                <span className="text-sm">Upload Photo</span>
                <input type="file" name="photo" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
              {photoPreview && <span className="text-sm text-green-600">Photo selected</span>}
            </div>
            {photoPreview && (
              <div className="mt-2">
                <img
                  src={photoPreview || "/placeholder.svg"}
                  alt="Preview"
                  className="h-24 w-auto object-cover rounded-lg border"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Priority (optional)</label>
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
            disabled={isLoading}
            className="px-3 py-1.5 text-sm !bg-zinc-50 border !text-zinc-700 !border-zinc-300 !rounded-lg"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="px-3 py-1.5 text-sm !bg-zinc-900 !text-zinc-50 rounded-lg hover:!bg-zinc-800"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Task'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
