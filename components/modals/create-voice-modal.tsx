"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { EDGE_TTS_VOICES } from "@/lib/data/mock-data";

interface CreateVoiceModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: {
    name: string;
    voiceId: string;
    volume: number;
    rate: number;
    pitch: number;
  }) => void;
}

export function CreateVoiceModal({
  open,
  onClose,
  onCreate,
}: CreateVoiceModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    voiceId: "vi-VN-NamMinhNeural",
    volume: 100,
    rate: 1.0,
    pitch: 0,
  });

  const handleSubmit = () => {
    onCreate(formData);
    setFormData({
      name: "",
      voiceId: "vi-VN-NamMinhNeural",
      volume: 100,
      rate: 1.0,
      pitch: 0,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Custom Voice</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Voice Name <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="e.g., Giọng Nam Trầm"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Edge TTS Voice
            </label>
            <Select
              value={formData.voiceId}
              onValueChange={(value) =>
                setFormData({ ...formData, voiceId: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EDGE_TTS_VOICES.map((voice) => (
                  <SelectItem key={voice.id} value={voice.id}>
                    {voice.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Volume: {formData.volume}%
            </label>
            <Slider
              value={[formData.volume]}
              onValueChange={([value]) =>
                setFormData({ ...formData, volume: value })
              }
              min={0}
              max={100}
              step={1}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Rate: {formData.rate}x
            </label>
            <Slider
              value={[formData.rate * 10]}
              onValueChange={([value]) =>
                setFormData({ ...formData, rate: value / 10 })
              }
              min={5}
              max={20}
              step={1}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Pitch: {formData.pitch > 0 ? "+" : ""}
              {formData.pitch} Hz
            </label>
            <Slider
              value={[formData.pitch + 50]}
              onValueChange={([value]) =>
                setFormData({ ...formData, pitch: value - 50 })
              }
              min={0}
              max={100}
              step={1}
            />
          </div>

          {/* Preview Section */}
          <div className="bg-accent rounded-lg p-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Preview Text
            </label>
            <Textarea
              rows={3}
              defaultValue="Xin chào, đây là giọng đọc mẫu. Chúc bạn một ngày tốt lành."
              className="mb-3"
            />
            <Button variant="secondary" size="sm">
              <Play className="w-4 h-4" />
              Play Preview
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!formData.name}>
            Create Voice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
