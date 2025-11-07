"use client";

import { Plus, Play, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Voice } from "@/lib/types";

interface VoicesManagementProps {
  voices: Voice[];
  onCreateVoice?: () => void;
}

export function VoicesManagement({
  voices,
  onCreateVoice,
}: VoicesManagementProps) {
  return (
    <div className="space-y-6">
      {onCreateVoice && (
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Voice Library</h2>
            <p className="text-muted-foreground mt-1">
              Manage custom voice configurations
            </p>
          </div>
          <Button onClick={onCreateVoice}>
            <Plus className="w-4 h-4" />
            New Voice
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {voices.map((voice) => (
          <Card key={voice.id} className="p-5 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-foreground">{voice.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {voice.voiceId}
                  </p>
                  {voice.isSystem && (
                    <Badge variant="default" className="mt-2">
                      System
                    </Badge>
                  )}
                </div>
                {!voice.isSystem && (
                  <button className="p-1 hover:bg-accent rounded">
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Volume</span>
                  <span className="font-medium text-foreground">
                    {voice.volume}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rate</span>
                  <span className="font-medium text-foreground">
                    {voice.rate}x
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pitch</span>
                  <span className="font-medium text-foreground">
                    {voice.pitch > 0 ? "+" : ""}
                    {voice.pitch} Hz
                  </span>
                </div>
              </div>

              <Button variant="secondary" size="sm" className="w-full">
                <Play className="w-4 h-4" />
                Preview
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
