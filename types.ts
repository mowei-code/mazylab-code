export enum Platform {
  Web = 'Web',
}

export interface Project {
  id: string;
  name: string;
  platform: Platform;
  date: string;
}

export type HistoryItem = {
  id: number;
  title: string;
  date: string;
  prompt: string;
  generatedCode: string;
  language: string;
};
