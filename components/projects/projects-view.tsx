"use client";

import { useState } from "react";
import { Plus, BookOpen, Mic, Settings, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Project } from "@/lib/types";

interface ProjectsViewProps {
  projects: Project[];
  onCreateProject: () => void;
  onOpenProject: (project: Project) => void;
  onOpenSettings: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
}

export function ProjectsView({
  projects,
  onCreateProject,
  onOpenProject,
  onOpenSettings,
  onDeleteProject,
}: ProjectsViewProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý các dự án audiobook của bạn
          </p>
        </div>
        <Button onClick={onCreateProject}>
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="p-6 space-y-4">
              {/* Thumbnail */}
              <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white opacity-80" />
              </div>

              {/* Info */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground line-clamp-1">
                  {project.name}
                </h3>
                {project.author && (
                  <p className="text-sm text-muted-foreground">
                    by {project.author}
                  </p>
                )}

                {/* Genres */}
                {project.genres && project.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.genres.map((genre) => (
                      <Badge key={genre} variant="secondary">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                  <span className="flex items-center gap-1">
                    <Mic className="w-4 h-4" />
                    {project.characters.length} characters
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span>
                    {new Date(project.updatedAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-border">
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={() => onOpenProject(project)}
                >
                  Open
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenSettings(project)}
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDeleteProject(project.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No projects found
          </h3>
          <p className="text-muted-foreground mb-6">
            Create your first audiobook project to get started
          </p>
          <Button onClick={onCreateProject}>
            <Plus className="w-4 h-4" />
            Create Project
          </Button>
        </div>
      )}
    </div>
  );
}
