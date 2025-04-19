"use client"

import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

export default function HeaderTitle({ filterOpen, filterPriority, onClick }) {
  return (
    <div className="flex justify-between items-center mb-6 mt-10">
      <div>
      <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-zinc-500 to-zinc-600 text-transparent bg-clip-text">
        Why <span className="text-slate-900">Do</span> (It) <span className="text-slate-900">To</span>day?
      </h2>

        <p className="mt-2">Tomorrow's the Best Option… Probably!</p>
      </div>
      <Button
        onClick={onClick}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg ${
          filterOpen || filterPriority ? "!bg-zinc-800 !text-zinc-50" : "!bg-zinc-200 !text-zinc-800"
        }`}
      >
        <Filter className="w-4 h-4" />
        <span>Filter</span>
        {filterPriority && (
          <span className="ml-1 bg-zinc-700 text-zinc-50 px-1.5 py-0.5 rounded-full text-xs">1</span>
        )}
      </Button>
    </div>
  )
}
