# Audiobook Creator MVP

A modern, free TTS (Text-to-Speech) platform for creating audiobooks with AI-powered character voice assignment. Built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- 📚 **Project Management**: Create and manage multiple audiobook projects
- 🎙️ **Voice Library**: System and custom voice configurations with adjustable parameters
- 🤖 **AI Segmentation**: Automatically detect speakers and split text by characters
- 👥 **Character Management**: Assign different voices to different characters
- ⚡ **Real-time TTS**: Convert text to speech with progress tracking
- 🎨 **Modern UI**: Beautiful, responsive interface built with shadcn/ui
- 💯 **100% Free**: Powered by Edge TTS + Gemini AI

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **TTS Engine**: Edge TTS (planned integration)
- **AI**: Gemini AI (planned integration)

## Project Structure

```
audiobook-creator-mvp/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── slider.tsx
│   │   ├── checkbox.tsx
│   │   └── badge.tsx
│   ├── projects/           # Project-related components
│   │   ├── projects-view.tsx
│   │   ├── project-detail-view.tsx
│   │   ├── tts-interface.tsx
│   │   └── project-settings.tsx
│   ├── voices/             # Voice management components
│   │   └── voices-management.tsx
│   ├── modals/             # Modal components
│   │   ├── create-project-modal.tsx
│   │   ├── create-voice-modal.tsx
│   │   └── delete-confirm-modal.tsx
│   ├── sidebar.tsx         # Navigation sidebar
│   └── audiobook-creator-app.tsx  # Main app component
├── lib/
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── data/               # Mock data
│   │   └── mock-data.ts
│   └── utils.ts            # Utility functions
└── public/                 # Static files
```

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd audiobook-creator-mvp
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Usage

### Creating a Project

1. Click the "New Project" button on the Projects page
2. Fill in the project details:
   - **Name**: Project name (required)
   - **Author**: Author name
   - **Genres**: Comma-separated list of genres
   - **Description**: Brief project description
3. Click "Create Project"

### Managing Voices

1. Navigate to the "Voices" section in the sidebar
2. Click "New Voice" to create a custom voice
3. Configure voice parameters:
   - **Name**: Voice name
   - **Edge TTS Voice**: Base voice to use
   - **Volume**: 0-100%
   - **Rate**: 0.5x-2.0x speed
   - **Pitch**: -50 to +50 Hz
4. Preview and save

### TTS Interface

1. Open a project
2. Go to the "TTS Interface" tab
3. Paste your story text
4. Enable "AI Segmentation" to automatically detect speakers
5. Click "Start TTS" to begin conversion
6. Review segments if using AI segmentation
7. Monitor processing progress
8. Download the completed audiobook

### Project Settings

1. Open a project
2. Go to the "Settings" tab
3. Edit project information
4. Manage characters and assign voices
5. Configure narrator voice

## Component Overview

### Main Components

- **AudiobookCreatorApp**: Main application component with state management
- **Sidebar**: Navigation menu
- **ProjectsView**: Grid view of all projects
- **ProjectDetailView**: Tabbed view of project details
- **TTSInterface**: Text input and conversion interface
- **ProjectSettings**: Project configuration
- **VoicesManagement**: Voice library management

### UI Components (shadcn/ui)

All UI components are built with Radix UI primitives and styled with Tailwind CSS:

- **Button**: Primary action buttons
- **Card**: Content containers
- **Dialog**: Modal dialogs
- **Input/Textarea**: Form inputs
- **Select**: Dropdown selects
- **Slider**: Range sliders
- **Checkbox**: Checkboxes
- **Badge**: Status badges

## Customization

### Color Scheme

The app uses CSS variables for theming. Modify `app/globals.css` to change colors:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --secondary: 210 40% 96.1%;
  --destructive: 0 84.2% 60.2%;
  /* ... more colors */
}
```

### Adding New Features

1. Create components in appropriate directories
2. Define types in `lib/types/index.ts`
3. Add mock data in `lib/data/mock-data.ts`
4. Update main app component as needed

## Future Enhancements

- [ ] Edge TTS integration for real speech synthesis
- [ ] Gemini AI integration for smart speaker detection
- [ ] Audio player with waveform visualization
- [ ] Export to multiple audio formats
- [ ] Batch processing
- [ ] Cloud storage integration
- [ ] Collaborative editing
- [ ] Voice cloning capabilities

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Powered by Edge TTS and Gemini AI

---

Made with ❤️ for audiobook creators
