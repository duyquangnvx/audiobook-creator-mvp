"use client";

import { useState } from "react";
import { Edit, Plus, Trash2, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project, Voice } from "@/lib/types";

interface ProjectSettingsProps {
  project: Project;
  voices: Voice[];
  onUpdate: (project: Project) => void;
  onAddCharacter: () => void;
}

export function ProjectSettings({
  project,
  voices,
  onUpdate,
  onAddCharacter,
}: ProjectSettingsProps) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(project);

  const handleSave = () => {
    onUpdate(formData);
    setEditMode(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Project Info */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">
            Project Information
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={editMode ? handleSave : () => setEditMode(true)}
          >
            <Edit className="w-4 h-4" />
            {editMode ? "Save" : "Edit"}
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Name
            </label>
            {editMode ? (
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            ) : (
              <p className="text-foreground">{formData.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Author
            </label>
            {editMode ? (
              <Input
                value={formData.author || ""}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
              />
            ) : (
              <p className="text-foreground">{formData.author || "-"}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            {editMode ? (
              <Textarea
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
              />
            ) : (
              <p className="text-foreground">{formData.description || "-"}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Narrator Voice
            </label>
            {editMode ? (
              <Select
                value={formData.narratorVoiceId}
                onValueChange={(value) =>
                  setFormData({ ...formData, narratorVoiceId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.id} value={voice.id}>
                      {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="text-foreground">
                {voices.find((v) => v.id === formData.narratorVoiceId)?.name}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Characters */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Characters</h2>
          <Button variant="ghost" size="sm" onClick={onAddCharacter}>
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        <div className="space-y-3">
          {project.characters.map((char) => {
            const voice = voices.find((v) => v.id === char.voiceId);
            return (
              <div
                key={char.id}
                className="flex items-center justify-between p-4 bg-accent rounded-lg hover:bg-accent/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {char.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      {char.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {voice?.name}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-background rounded-lg transition-colors">
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </div>
            );
          })}

          {project.characters.length === 0 && (
            <div className="text-center py-8">
              <Mic className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No characters yet</p>
              <button
                onClick={onAddCharacter}
                className="text-primary text-sm font-medium mt-2 hover:text-primary/80"
              >
                Add your first character
              </button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
