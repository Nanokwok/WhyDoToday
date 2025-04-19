"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function DeleteTaskDialog({ isOpen, onClose, taskToDelete, onDelete }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the task "{taskToDelete?.title}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="!bg-zinc-50 !text-zinc-500 hover:!text-zinc-700 border !border-zinc-300"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => onDelete(taskToDelete?.id)}
            className="!bg-zinc-900"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
