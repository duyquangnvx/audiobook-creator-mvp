"use client";

import { BookOpen, Mic, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-background border-r border-border p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Audiobook Creator
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Free TTS Platform</p>
      </div>

      <nav className="space-y-2">
        <button
          onClick={() => onViewChange("projects")}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium",
            currentView === "projects"
              ? "bg-primary/10 text-primary"
              : "text-foreground hover:bg-accent"
          )}
        >
          <BookOpen className="w-5 h-5" />
          <span>Projects</span>
        </button>

        <button
          onClick={() => onViewChange("voices")}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium",
            currentView === "voices"
              ? "bg-primary/10 text-primary"
              : "text-foreground hover:bg-accent"
          )}
        >
          <Mic className="w-5 h-5" />
          <span>Voices</span>
        </button>
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start gap-2">
            <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                100% Free TTS
              </div>
              <div className="text-xs text-gray-600">
                Powered by Edge TTS + Gemini AI
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
