"use client"

import { Button } from "@/components/ui/button"
import { X, AlertCircle } from "lucide-react"

const priorities = [
  { level: "1", label: "Low", active: "green-500", inactive: "green-100", text: "green-800" },
  { level: "2", label: "Medium", active: "yellow-500", inactive: "yellow-100", text: "yellow-800" },
  { level: "3", label: "High", active: "red-500", inactive: "red-100", text: "red-800" },
]

export default function FilterPanel({ isOpen, onClose, filterPriority, setFilterPriority }) {
  if (!isOpen) return null

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Filter Tasks</h3>
        <Button onClick={onClose} className="!bg-zinc-50 !text-zinc-500 hover:!text-zinc-700">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> Priority
          </h4>
          <div className="flex gap-2">
            {priorities.map(({ level, label, active, inactive, text }) => (
              <Button
                key={level}
                onClick={() => setFilterPriority(filterPriority === level ? null : level)}
                className={`px-2 py-1 text-sm rounded-full transition-colors ${
                  filterPriority === level
                    ? `!bg-${active} !text-white`
                    : `!bg-${inactive} !text-${text} hover:!bg-${inactive.replace("100", "200")}`
                }`}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
