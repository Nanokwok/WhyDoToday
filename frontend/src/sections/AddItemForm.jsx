"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import api from "../api"

export default function AddItemForm({ onSubmit, onCancel, selectedList }) {
  const [todoLists, setTodoLists] = useState([])
  const isViewingAll = selectedList?.id === "all"

  useEffect(() => {
    if (isViewingAll) {
      api.get("/api/todolists/")
        .then((res) => setTodoLists(res.data))
        .catch((err) => console.error("Error fetching lists:", err))
    }
  }, [isViewingAll])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))
    if (!isViewingAll) delete formData.todolist
    onSubmit(formData)
  }

  return (
    <div className="p-4 bg-zinc-50 border-b animate-in fade-in slide-in-from-top-4 duration-300">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Task Title" name="title" required />
          <InputField label="Due Date (optional)" name="due_date" type="datetime-local" />
        </div>

        {isViewingAll && (
          <SelectField label="List" name="todolist" options={todoLists} />
        )}

        <TextAreaField label="Description (optional)" name="description" />

        <PriorityField />

        <div className="flex justify-end gap-2">
          <Button type="button" onClick={onCancel} className="px-3 py-1.5 text-sm !bg-zinc-50 border !text-zinc-700 !border-zinc-300 !rounded-lg">
            Cancel
          </Button>
          <Button type="submit" className="px-3 py-1.5 text-sm !bg-zinc-900 !text-zinc-50 rounded-lg hover:!bg-zinc-800">
            Add Task
          </Button>
        </div>
      </form>
    </div>
  )
}

function InputField({ label, name, type = "text", required = false }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input type={type} name={name} required={required} className="w-full border rounded-lg p-2 text-sm" />
    </div>
  )
}

function SelectField({ label, name, options }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select name={name} required className="w-full border rounded-lg p-2 text-sm">
        {options.map((list) => (
          <option key={list.id} value={list.id}>
            {list.title}
          </option>
        ))}
      </select>
    </div>
  )
}

function TextAreaField({ label, name }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea name={name} rows="2" className="w-full border rounded-lg p-2 text-sm" />
    </div>
  )
}

function PriorityField() {
  const priorities = [
    { value: "1", label: "Low", color: "green" },
    { value: "2", label: "Medium", color: "yellow", defaultChecked: true },
    { value: "3", label: "High", color: "red" },
  ]
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Priority (optional)</label>
      <div className="flex gap-2">
        {priorities.map(({ value, label, color, defaultChecked }) => (
          <label key={value} className="flex items-center gap-1 cursor-pointer">
            <input type="radio" name="priority" value={value} defaultChecked={defaultChecked} className="sr-only peer" />
            <span className={`px-3 py-1 text-sm rounded-lg bg-zinc-100 peer-checked:bg-${color}-500 peer-checked:text-white`}>
              {label}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
