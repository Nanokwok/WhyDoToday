"use client"

import { Button } from "@/components/ui/button"
import { X, Calendar, Plus, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export default function TodoItems({
  items,
  selectedList,
  formatDate,
  toggleItemCompletion,
  deleteTodoItem,
  newTagInputs,
  setNewTagInputs,
  handleTagInputChange,
  handleTagSubmit,
  addTagToItem,
  removeTagFromItem,
  tags,
  activeFilters,
  filterPriority,
  clearFilters,
}) {
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
          {activeFilters.length > 0 || filterPriority
            ? "No tasks match your current filters. Try adjusting your filters or clear them."
            : "This list is empty. Add your first task by clicking the 'Add Task' button."}
        </p>
        {(activeFilters.length > 0 || filterPriority) && (
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
    <ul className="divide-y overflow-y-auto max-h-[calc(100vh-300px)]">
      {items.map((item) => (
        <li key={item.id} className="p-4 hover:bg-zinc-50 transition-colors">
          <div className="flex items-start gap-3">
            <div className="pt-0.5">
              <input
                type="checkbox"
                checked={item.is_completed}
                onChange={() => toggleItemCompletion(item, selectedList.id)}
                className="w-4 h-4 rounded !border-zinc-300 !text-zinc-900 focus:!ring-zinc-500 !bg-white"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className={`font-medium ${item.is_completed ? "line-through text-zinc-500" : ""}`}>{item.title}</h3>
                <Button
                  onClick={() => deleteTodoItem(item.id, selectedList.id)}
                  className="text-zinc-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {item.description && (
                <p className={`text-sm mt-1 ${item.is_completed ? "text-zinc-400" : "text-zinc-600"}`}>
                  {item.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2 mt-2">
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

              {/* Tags Section */}
              <div className="mt-3">
                <div className="flex flex-wrap items-center gap-1">
                  {item.tags && item.tags.length > 0 ? (
                    item.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full flex items-center gap-1"
                      >
                        {tag.name}
                        <button
                          onClick={() => removeTagFromItem(item.id, tag.id, selectedList, () => {})}
                          className="!text-blue-700 hover:!text-blue-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-zinc-500">No tags</span>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      // Toggle tag input for this specific item
                      setNewTagInputs({
                        ...newTagInputs,
                        [item.id]: newTagInputs[item.id] || "",
                        [`${item.id}_visible`]: !newTagInputs[`${item.id}_visible`],
                      })
                    }}
                    className="ml-1 p-1 rounded-full !bg-zinc-100 hover:!bg-zinc-200 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Tag Input Dialog */}
                <Dialog
                  open={newTagInputs[`${item.id}_visible`]}
                  onOpenChange={(open) => {
                    setNewTagInputs({
                      ...newTagInputs,
                      [`${item.id}_visible`]: open,
                    })
                  }}
                >
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add Tag</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={(e) => {
                        handleTagSubmit(e, item.id)
                        // Hide the dialog after submitting
                        setNewTagInputs({
                          ...newTagInputs,
                          [`${item.id}_visible`]: false,
                        })
                      }}
                      className="flex flex-col gap-4 py-4"
                    >
                      <div className="flex flex-col gap-2">
                        <label htmlFor={`tag-input-${item.id}`} className="text-sm font-medium">
                          Tag Name
                        </label>
                        <input
                          id={`tag-input-${item.id}`}
                          type="text"
                          placeholder="Enter tag name..."
                          value={newTagInputs[item.id] || ""}
                          onChange={(e) => handleTagInputChange(item.id, e.target.value)}
                          className="w-full border rounded-lg p-2 text-sm"
                          autoFocus
                        />
                      </div>

                      {tags.length > 0 && (
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium">Or select an existing tag:</label>
                          <div className="flex flex-wrap gap-2">
                            {tags.slice(0, 8).map((tag) => (
                              <button
                                key={tag.id}
                                type="button"
                                onClick={() => {
                                  addTagToItem(item.id, tag.name)
                                  setNewTagInputs({
                                    ...newTagInputs,
                                    [`${item.id}_visible`]: false,
                                  })
                                }}
                                className="px-2 py-1 text-xs !bg-blue-100 !text-blue-800 rounded-full hover:!bg-blue-200"
                              >
                                {tag.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setNewTagInputs({
                              ...newTagInputs,
                              [`${item.id}_visible`]: false,
                            })
                          }}
                          className="mt-2"
                        >
                          Cancel
                        </Button>
                        <Button type="submit" className="mt-2 !bg-blue-500 !text-white hover:!bg-blue-600">
                          Add Tag
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
