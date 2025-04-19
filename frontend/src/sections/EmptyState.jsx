"use client"

import { AlertCircle } from "lucide-react"

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16 text-center">
      <div className="bg-zinc-100 rounded-full p-4 mb-4">
        <AlertCircle className="w-8 h-8 text-zinc-500" />
      </div>
      <h2 className="text-xl font-semibold mb-2">No list selected</h2>
      <p className="text-zinc-600 max-w-xs">
        Select a list from the sidebar or create a new one to get started.
      </p>
    </div>
  )
}
