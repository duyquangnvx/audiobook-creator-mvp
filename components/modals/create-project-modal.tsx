"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: {
    name: string;
    author: string;
    genres: string;
    description: string;
  }) => void;
}

export function CreateProjectModal({
  open,
  onClose,
  onCreate,
}: CreateProjectModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    genres: "",
    description: "",
  });

  const handleSubmit = () => {
    onCreate(formData);
    setFormData({ name: "", author: "", genres: "", description: "" });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Project Name <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="e.g., Truyện Kiều"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Author
            </label>
            <Input
              placeholder="e.g., Nguyễn Du"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Genres{" "}
              <span className="text-muted-foreground text-xs">
                (comma separated)
              </span>
            </label>
            <Input
              placeholder="e.g., Classic, Poetry"
              value={formData.genres}
              onChange={(e) =>
                setFormData({ ...formData, genres: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <Textarea
              rows={3}
              placeholder="Brief description of your project..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!formData.name}>
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
