"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { ProjectsView } from "./projects/projects-view";
import { ProjectDetailView } from "./projects/project-detail-view";
import { VoicesManagement } from "./voices/voices-management";
import { CreateProjectModal } from "./modals/create-project-modal";
import { CreateVoiceModal } from "./modals/create-voice-modal";
import { DeleteConfirmModal } from "./modals/delete-confirm-modal";
import { Project, Voice } from "@/lib/types";
import { MOCK_PROJECTS, MOCK_VOICES } from "@/lib/data/mock-data";

export default function AudiobookCreatorApp() {
  const [currentView, setCurrentView] = useState<
    "projects" | "project-detail" | "voices"
  >("projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [voices, setVoices] = useState<Voice[]>(MOCK_VOICES);

  // Modal states
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateVoice, setShowCreateVoice] = useState(false);
  const [showAddCharacter, setShowAddCharacter] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    projectId?: string;
    projectName?: string;
  }>({ open: false });

  // Handlers
  const handleCreateProject = (data: {
    name: string;
    author: string;
    genres: string;
    description: string;
  }) => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: data.name,
      author: data.author,
      genres: data.genres
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean),
      description: data.description,
      narratorVoiceId: "nam-minh",
      characters: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProjects([newProject, ...projects]);
    setSelectedProject(newProject);
    setCurrentView("project-detail");
  };

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentView("project-detail");
  };

  const handleOpenSettings = (project: Project) => {
    setSelectedProject(project);
    setCurrentView("project-detail");
  };

  const handleDeleteProject = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setDeleteConfirm({
        open: true,
        projectId,
        projectName: project.name,
      });
    }
  };

  const confirmDeleteProject = () => {
    if (deleteConfirm.projectId) {
      setProjects(projects.filter((p) => p.id !== deleteConfirm.projectId));
      if (selectedProject?.id === deleteConfirm.projectId) {
        setSelectedProject(null);
        setCurrentView("projects");
      }
    }
    setDeleteConfirm({ open: false });
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(
      projects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
    setSelectedProject(updatedProject);
  };

  const handleCreateVoice = (data: {
    name: string;
    voiceId: string;
    volume: number;
    rate: number;
    pitch: number;
  }) => {
    const newVoice: Voice = {
      id: `voice-${Date.now()}`,
      ...data,
      isSystem: false,
    };
    setVoices([...voices, newVoice]);
  };

  const handleViewChange = (view: string) => {
    if (view === "projects") {
      setCurrentView("projects");
      setSelectedProject(null);
    } else if (view === "voices") {
      setCurrentView("voices");
      setSelectedProject(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar currentView={currentView} onViewChange={handleViewChange} />

      {/* Main Content */}
      <div className="ml-64 p-8">
        {currentView === "projects" && (
          <ProjectsView
            projects={projects}
            onCreateProject={() => setShowCreateProject(true)}
            onOpenProject={handleOpenProject}
            onOpenSettings={handleOpenSettings}
            onDeleteProject={handleDeleteProject}
          />
        )}

        {currentView === "project-detail" && selectedProject && (
          <ProjectDetailView
            project={selectedProject}
            voices={voices}
            onBack={() => setCurrentView("projects")}
            onUpdateProject={handleUpdateProject}
            onAddCharacter={() => setShowAddCharacter(true)}
          />
        )}

        {currentView === "voices" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Voices</h1>
              <p className="text-muted-foreground mt-1">
                Global voice library for all projects
              </p>
            </div>
            <VoicesManagement
              voices={voices}
              onCreateVoice={() => setShowCreateVoice(true)}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateProjectModal
        open={showCreateProject}
        onClose={() => setShowCreateProject(false)}
        onCreate={handleCreateProject}
      />

      <CreateVoiceModal
        open={showCreateVoice}
        onClose={() => setShowCreateVoice(false)}
        onCreate={handleCreateVoice}
      />

      <DeleteConfirmModal
        open={deleteConfirm.open}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteConfirm.projectName}"? This action cannot be undone.`}
        onClose={() => setDeleteConfirm({ open: false })}
        onConfirm={confirmDeleteProject}
      />
    </div>
  );
}
