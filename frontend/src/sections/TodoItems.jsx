"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Calendar, AlertCircle, ImageIcon } from "lucide-react"
import DeleteTaskDialog from "./DeleteTaskDialog"

export default function TodoItems({
  items,
  selectedList,
  formatDate,
  toggleItemCompletion,
  deleteTodoItem,
  activeFilters,
  filterPriority,
  clearFilters,
}) {
  const [openDialog, setOpenDialog] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [expandedImage, setExpandedImage] = useState(null)
 
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

  const getImageUrl = (photo) => {
    if (!photo) return "/placeholder.svg"
    
    if (typeof photo === 'string' && (photo.startsWith('http://') || photo.startsWith('https://'))) {
      return photo
    }
    
    if (typeof photo === 'string') {
      if (photo.includes('image/upload')) {
        return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/${photo}`
      }
      return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${photo}`
    }
    
    if (photo && photo.url) {
      return photo.url
    }
    
    return "/placeholder.svg"
  }

  const handleDelete = (id, listId) => {
    deleteTodoItem(id, listId)
    setOpenDialog(false)
  }

  if (!selectedList) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 text-center">
        <div className="bg-zinc-100 rounded-full p-4 mb-4">
          <AlertCircle className="w-8 h-8 text-zinc-500" />
        </div>
        <h2 className="text-xl font-semibold mb-2">No list selected</h2>
        <p className="text-zinc-600 max-w-xs">Select a list from the sidebar or create a new one to get started.</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-zinc-100 rounded-full p-3 mb-3">
          <AlertCircle className="w-6 h-6 text-zinc-500" />
        </div>
        <h3 className="text-lg font-medium mb-1">No tasks found</h3>
        <p className="text-zinc-500 max-w-xs">
          {filterPriority
            ? "No tasks match your current filters. Try adjusting your filters or clear them."
            : "This list is empty. Add your first task by clicking the 'Add Task' button."}
        </p>
        {filterPriority && (
          <button
            onClick={clearFilters}
            className="mt-4 px-3 py-1.5 text-sm !bg-zinc-200 !text-zinc-800 rounded-lg hover:!bg-zinc-300"
          >
            Clear Filters
          </button>
        )}
      </div>
    )
  }

  return (
    <>
      <ul className="divide-y overflow-y-auto max-h-[calc(100vh-300px)]">
        {items.map((item) => (
          <li key={item.id} className="p-4 hover:bg-zinc-50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="pt-0.5">
                <input
                  type="checkbox"
                  checked={item.is_completed}
                  onChange={() =>
                    toggleItemCompletion(item, selectedList.id === "all" ? item.todolist : selectedList.id)
                  }
                  className="w-4 h-4 appearance-none rounded border border-zinc-300 bg-white checked:bg-zinc-900 relative
                    before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-2 before:h-1 before:border-b-2 before:border-l-2
                    before:border-white before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[-45deg] checked:before:block before:hidden"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <h3 className={`font-medium ${item.is_completed ? "line-through text-zinc-500" : ""}`}>
                      {item.title}
                    </h3>
                    
                    {item.photo && (
                      <div
                        onClick={() => {
                          setExpandedImage(item.photo)
                        }}
                        className="inline-flex items-center justify-center ml-2 p-1.5 text-zinc-400 hover:text-zinc-500 cursor-pointer transition-colors rounded-full hover:bg-zinc-100"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <div
                    onClick={() => {
                      setTaskToDelete(item)
                      setOpenDialog(true)
                    }}
                    className="inline-flex items-center justify-center p-1.5 text-zinc-400 hover:text-red-500 cursor-pointer transition-colors rounded-full hover:bg-zinc-100"
                  >
                    <X className="w-4 h-4" />
                  </div>
                </div>

                {item.description && (
                  <p className={`text-sm -mt-1 ${item.is_completed ? "text-zinc-400" : "text-zinc-600"}`}>
                    {item.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {selectedList.id === "all" && item.todolist_title && (
                    <span className="inline-flex items-center px-2 py-1 text-xs bg-zinc-200 text-zinc-800 rounded-full">
                      {item.todolist_title}
                    </span>
                  )}
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${
                      item.priority === "3"
                        ? "bg-red-100 text-red-800"
                        : item.priority === "2"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item.priority === "3" ? "High" : item.priority === "2" ? "Medium" : "Low"}
                  </span>

                  {item.due_date && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-zinc-100 text-zinc-800 rounded-full">
                      <Calendar className="w-3 h-3" />
                      {formatDate(item.due_date)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {taskToDelete && (
        <DeleteTaskDialog
          isOpen={openDialog}
          onClose={() => setOpenDialog(false)}
          taskToDelete={taskToDelete}
          onDelete={(id) => handleDelete(id, selectedList.id === "all" ? taskToDelete.todolist : selectedList.id)}
        />
      )}

      {expandedImage && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-70 z-50 flex items-center justify-center p-4"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh] w-full">
            <img
              src={getImageUrl(expandedImage)}
              alt="Expanded view"
              className="max-h-[90vh] max-w-full object-contain mx-auto rounded-lg"
            />
            <button
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
              onClick={(e) => {
                e.stopPropagation()
                setExpandedImage(null)
              }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
