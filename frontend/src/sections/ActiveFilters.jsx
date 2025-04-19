"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useMemo } from "react"

export default function ActiveFilters({ filterPriority, onClear, onRemovePriority }) {
  if (!filterPriority) return null

  const { priorityLabel, priorityColor } = useMemo(() => {
    let label = ""
    let color = ""

    switch (filterPriority) {
      case "3":
        label = "High"
        color = "bg-red-100 text-red-800"
        break
      case "2":
        label = "Medium"
        color = "bg-yellow-100 text-yellow-800"
        break
      case "1":
        label = "Low"
        color = "bg-green-100 text-green-800"
        break
      default:
        break
    }

    return { priorityLabel: label, priorityColor: color }
  }, [filterPriority])

  return (
    <div className="px-4 py-2 bg-zinc-50 border-b flex items-center flex-wrap gap-2">
      <span className="text-xs font-medium text-zinc-500">Active filters:</span>
      <span className={`px-2 py-0.5 text-xs rounded-full flex items-center gap-1 ${priorityColor}`}>
        Priority: {priorityLabel}
        <X onClick={onRemovePriority} className="w-3 h-3 cursor-pointer hover:!text-zinc-900 !text-zinc-500" />
      </span>
      <Button
        onClick={onClear}
        className="px-2 py-0.5 text-xs !bg-zinc-50 !border !border-zinc-200 !text-zinc-600 hover:!text-zinc-900 !ml-auto"
      >
        Clear all
      </Button>
    </div>
  )
}
