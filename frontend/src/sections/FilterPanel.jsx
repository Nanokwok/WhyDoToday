"use client"

import { Button } from "@/components/ui/button"
import { X, AlertCircle } from "lucide-react"

export default function FilterPanel({
  isOpen,
  onClose,
  filterPriority,
  setFilterPriority,
  clearFilters,
  applyFilters,
}) {
  if (!isOpen) return null

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Filter Tasks</h3>
        <Button onClick={onClose} className="!text-zinc-500 hover:!text-zinc-700">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> Priority
          </h4>
          <div className="flex gap-2">
            <Button
              onClick={() => setFilterPriority(filterPriority === "1" ? null : "1")}
              className={`px-2 py-1 text-sm rounded-full transition-colors ${
                filterPriority === "1"
                  ? "!bg-green-500 !text-white"
                  : "!bg-green-100 !text-green-800 hover:!bg-green-200"
              }`}
            >
              Low
            </Button>
            <Button
              onClick={() => setFilterPriority(filterPriority === "2" ? null : "2")}
              className={`px-2 py-1 text-sm rounded-full transition-colors ${
                filterPriority === "2"
                  ? "!bg-yellow-500 !text-white"
                  : "!bg-yellow-100 !text-yellow-800 hover:!bg-yellow-200"
              }`}
            >
              Medium
            </Button>
            <Button
              onClick={() => setFilterPriority(filterPriority === "3" ? null : "3")}
              className={`px-2 py-1 text-sm rounded-full transition-colors ${
                filterPriority === "3" ? "!bg-red-500 !text-white" : "!bg-red-100 !text-red-800 hover:!bg-red-200"
              }`}
            >
              High
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button
          onClick={clearFilters}
          className="px-3 py-1.5 text-sm !text-zinc-900 border !border-zinc-300 rounded-lg hover:!bg-zinc-100"
        >
          Clear All
        </Button>
        <Button
          onClick={() => {
            applyFilters()
            onClose()
          }}
          className="px-3 py-1.5 text-sm !bg-zinc-900 !text-zinc-50 rounded-lg hover:!bg-zinc-800"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  )
}
