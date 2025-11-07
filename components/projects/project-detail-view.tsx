"use client";

import { useState } from "react";
import { ChevronLeft, Settings, Mic, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TTSInterface } from "./tts-interface";
import { ProjectSettings } from "./project-settings";
import { VoicesManagement } from "../voices/voices-management";
import { Project, Voice } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProjectDetailViewProps {
  project: Project;
  voices: Voice[];
  onBack: () => void;
  onUpdateProject: (project: Project) => void;
  onAddCharacter: () => void;
}

export function ProjectDetailView({
  project,
  voices,
  onBack,
  onUpdateProject,
  onAddCharacter,
}: ProjectDetailViewProps) {
  const [activeTab, setActiveTab] = useState<"tts" | "settings" | "voices">("tts");

  const tabs = [
    { id: "tts" as const, label: "TTS Interface", icon: Zap },
    { id: "settings" as const, label: "Settings", icon: Settings },
    { id: "voices" as const, label: "Voices", icon: Mic },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {project.name}
            </h1>
            {project.author && (
              <p className="text-muted-foreground mt-1">by {project.author}</p>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {project.genres?.map((genre) => (
            <Badge key={genre} variant="secondary">
              {genre}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "tts" && <TTSInterface />}
        {activeTab === "settings" && (
          <ProjectSettings
            project={project}
            voices={voices}
            onUpdate={onUpdateProject}
            onAddCharacter={onAddCharacter}
          />
        )}
        {activeTab === "voices" && <VoicesManagement voices={voices} />}
      </div>
    </div>
  );
}
