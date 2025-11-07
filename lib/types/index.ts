export interface Voice {
  id: string;
  name: string;
  voiceId: string;
  volume: number;
  rate: number;
  pitch: number;
  isSystem: boolean;
}

export interface Character {
  id: string;
  name: string;
  voiceId: string;
}

export interface Project {
  id: string;
  name: string;
  author?: string;
  genres?: string[];
  description?: string;
  narratorVoiceId: string;
  characters: Character[];
  createdAt: string;
  updatedAt: string;
}

export interface Segment {
  id: string;
  speaker: string;
  content: string;
  status: 'pending' | 'processing' | 'complete';
}

export interface EdgeTTSVoice {
  id: string;
  label: string;
}
