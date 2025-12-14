export enum UseCase {
  BLOG_WRITING = 'Blog Writing',
  YOUTUBE_SCRIPT = 'YouTube Script',
  STUDY_HELP = 'Study Help',
  BUSINESS_IDEA = 'Business Idea',
  RESUME_HELP = 'Resume Help',
}

export enum Tone {
  PROFESSIONAL = 'Professional',
  SIMPLE = 'Simple',
  CREATIVE = 'Creative',
  FRIENDLY = 'Friendly',
  CUSTOM = 'Custom',
}

export enum Platform {
  CHATGPT = 'ChatGPT',
  GEMINI = 'Gemini',
  CLAUDE = 'Claude',
}

export interface GeneratedPromptData {
  promptText: string;
  explanation: string;
  howToUse: string;
  expectedResult: string;
}

export interface PromptRequest {
  useCase: UseCase;
  tone: Tone;
  customTone?: string; // Optional custom tone input
  platform: Platform;
  topic?: string; // Optional specific topic input
}