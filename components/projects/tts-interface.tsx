"use client";

import { useState } from "react";
import { Play, Download, Zap, Check, Loader, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Segment } from "@/lib/types";
import { MOCK_SEGMENTS } from "@/lib/data/mock-data";

export function TTSInterface() {
  const [inputText, setInputText] = useState("");
  const [useAI, setUseAI] = useState(true);
  const [showSegments, setShowSegments] = useState(false);
  const [segments, setSegments] = useState<Segment[]>(MOCK_SEGMENTS);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSegment, setCurrentSegment] = useState(1);
  const [showComplete, setShowComplete] = useState(false);

  const handleStartTTS = () => {
    if (useAI) {
      setShowSegments(true);
    } else {
      startProcessing();
    }
  };

  const startProcessing = () => {
    setShowSegments(false);
    setIsProcessing(true);
    setProgress(0);
    setCurrentSegment(1);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setShowComplete(true);
          return 100;
        }
        setCurrentSegment(Math.ceil((prev + 10) / 25));
        return prev + 10;
      });
    }, 500);
  };

  const getStatusIcon = (status: Segment["status"]) => {
    if (status === "complete")
      return <Check className="w-4 h-4 text-green-600" />;
    if (status === "processing")
      return <Loader className="w-4 h-4 text-blue-600 animate-spin" />;
    return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />;
  };

  if (showComplete) {
    return (
      <Card className="p-8">
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <Check className="w-10 h-10 text-green-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              TTS Complete!
            </h2>
            <p className="text-muted-foreground">
              Your audiobook is ready. Listen or download below.
            </p>
          </div>

          {/* Audio Player */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-4 mb-4">
              <button className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Play className="w-6 h-6 text-primary-foreground" />
              </button>
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-primary" />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>1:23</span>
                  <span>4:15</span>
                </div>
              </div>
              <button className="p-2 hover:bg-white rounded-lg transition-colors">
                <Volume2 className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-accent rounded-lg">
              <div className="text-2xl font-bold text-foreground">
                {segments.length}
              </div>
              <div className="text-sm text-muted-foreground">Segments</div>
            </div>
            <div className="p-4 bg-accent rounded-lg">
              <div className="text-2xl font-bold text-foreground">4:15</div>
              <div className="text-sm text-muted-foreground">Duration</div>
            </div>
            <div className="p-4 bg-accent rounded-lg">
              <div className="text-2xl font-bold text-foreground">3</div>
              <div className="text-sm text-muted-foreground">Voices</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => {
                setShowComplete(false);
                setInputText("");
              }}
            >
              New TTS
            </Button>
            <Button className="flex-1">
              <Download className="w-4 h-4" />
              Download MP3
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (isProcessing) {
    return (
      <Card className="p-8">
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Loader className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Processing TTS...
            </h2>
            <p className="text-muted-foreground">
              Segment {currentSegment} of {segments.length}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Segments Status */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {segments.map((segment, index) => (
              <div
                key={segment.id}
                className="flex items-center gap-3 p-3 bg-accent rounded-lg"
              >
                {getStatusIcon(segment.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      Segment {index + 1}
                    </span>
                    <Badge variant="secondary">{segment.speaker}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                    {segment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="destructive"
            className="w-full"
            onClick={() => setIsProcessing(false)}
          >
            Cancel Processing
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Input Text</h2>
            <div className="text-sm text-muted-foreground">
              {inputText.length} characters
            </div>
          </div>

          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your story text here..."
            rows={12}
            className="font-mono text-sm"
          />

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <label className="flex items-center gap-3 cursor-pointer">
              <Checkbox checked={useAI} onCheckedChange={(checked) => setUseAI(checked === true)} />
              <div>
                <div className="font-medium text-foreground flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  Use AI Segmentation
                </div>
                <div className="text-sm text-muted-foreground">
                  Automatically detect speakers and split by characters
                </div>
              </div>
            </label>

            <Button size="lg" onClick={handleStartTTS} disabled={!inputText}>
              <Play className="w-4 h-4" />
              Start TTS
            </Button>
          </div>
        </div>
      </Card>

      {/* Segments Preview Modal */}
      <Dialog open={showSegments} onOpenChange={setShowSegments}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Review Segments</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 flex-1 overflow-y-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-900">
                    AI Segmentation Complete
                  </div>
                  <div className="text-sm text-blue-700 mt-1">
                    Found {segments.length} segments. Review and edit if needed.
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {segments.map((segment, index) => (
                <div
                  key={segment.id}
                  className="border border-border rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-sm font-bold text-muted-foreground mt-1">
                      #{index + 1}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={segment.speaker === "narrator" ? "secondary" : "default"}>
                          {segment.speaker}
                        </Badge>
                        <button className="text-sm text-primary hover:text-primary/80">
                          Edit
                        </button>
                      </div>
                      <p className="text-foreground text-sm leading-relaxed">
                        {segment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowSegments(false)}>
              Cancel
            </Button>
            <Button onClick={startProcessing}>
              <Play className="w-4 h-4" />
              Confirm & Start TTS
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
