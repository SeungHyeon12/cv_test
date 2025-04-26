export interface AIProcessor {
  evaluateStudentEssay(essay: string): Promise<{
    score: number;
    feedback: string;
    highlights: string[];
  }>;
}
