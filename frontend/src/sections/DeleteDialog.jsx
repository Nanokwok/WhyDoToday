"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function DeleteDialog({ isOpen, onClose, listToDelete, onDelete }) {
  const title = listToDelete?.title || "this list"
  const id = listToDelete?.id

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete List</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{title}"? All tasks inside will be deleted. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="!bg-zinc-50 !text-zinc-500 hover:!text-zinc-700 border !border-zinc-300">
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => onDelete(id)} className="!bg-zinc-900">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
