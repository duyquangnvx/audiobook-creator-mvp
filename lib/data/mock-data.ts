import { Voice, Project, Segment, EdgeTTSVoice } from "@/lib/types";

export const MOCK_VOICES: Voice[] = [
  {
    id: 'nam-minh',
    name: 'Nam Minh',
    voiceId: 'vi-VN-NamMinhNeural',
    volume: 100,
    rate: 1.0,
    pitch: 0,
    isSystem: true
  },
  {
    id: 'hoai-my',
    name: 'Hoài My',
    voiceId: 'vi-VN-HoaiMyNeural',
    volume: 100,
    rate: 1.0,
    pitch: 0,
    isSystem: true
  },
  {
    id: 'voice-custom-1',
    name: 'Giọng Nam Trầm',
    voiceId: 'vi-VN-NamMinhNeural',
    volume: 90,
    rate: 0.9,
    pitch: -10,
    isSystem: false
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'project-1',
    name: 'Truyện Kiều',
    author: 'Nguyễn Du',
    genres: ['Classic', 'Poetry'],
    description: 'Tác phẩm văn học kinh điển của Việt Nam',
    narratorVoiceId: 'nam-minh',
    characters: [
      { id: 'char-1', name: 'Thúy Kiều', voiceId: 'hoai-my' },
      { id: 'char-2', name: 'Kim Trọng', voiceId: 'voice-custom-1' }
    ],
    createdAt: '2025-01-15T10:30:00Z',
    updatedAt: '2025-01-20T14:22:00Z'
  },
  {
    id: 'project-2',
    name: 'Tây Du Ký',
    author: 'Ngô Thừa Ân',
    genres: ['Fantasy', 'Adventure'],
    description: 'Hành trình Tây Thiên thỉnh kinh',
    narratorVoiceId: 'nam-minh',
    characters: [
      { id: 'char-3', name: 'Tôn Ngộ Không', voiceId: 'voice-custom-1' },
      { id: 'char-4', name: 'Đường Tăng', voiceId: 'nam-minh' }
    ],
    createdAt: '2025-01-10T08:15:00Z',
    updatedAt: '2025-01-18T16:45:00Z'
  }
];

export const MOCK_SEGMENTS: Segment[] = [
  {
    id: 'seg-1',
    speaker: 'narrator',
    content: 'Trăm năm trong cõi người ta, chữ tài chữ mệnh khéo là ghét nhau. Trải qua một cuộc bể dâu, những điều trông thấy mà đau đớn lòng.',
    status: 'complete'
  },
  {
    id: 'seg-2',
    speaker: 'Thúy Kiều',
    content: 'Thiếp tên là Kiều, tự là Thúy, vốn con nhà nghèo ở quận Vũ Khê này.',
    status: 'complete'
  },
  {
    id: 'seg-3',
    speaker: 'narrator',
    content: 'Kim Trọng nghe thấy lời nàng nói, trong lòng càng thêm cảm động.',
    status: 'processing'
  },
  {
    id: 'seg-4',
    speaker: 'Kim Trọng',
    content: 'Nàng ơi, duyên ta đã định từ trời, xin hãy tin vào lời thề non hẹn biển của ta.',
    status: 'pending'
  }
];

export const EDGE_TTS_VOICES: EdgeTTSVoice[] = [
  { id: 'vi-VN-NamMinhNeural', label: 'Nam Minh (Male)' },
  { id: 'vi-VN-HoaiMyNeural', label: 'Hoài My (Female)' }
];
