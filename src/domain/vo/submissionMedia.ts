export class SubmissionMedia {
  public readonly id: string;
  public readonly submissionId: string;
  public videoUrl?: string;
  public audioUrl?: string;
  public createdAt: string;

  constructor(args: {
    id: string;
    submissionId: string;
    videoUrl: string;
    audioUrl?: string;

    createdAt: string;
  }) {
    this.id = args.id;
    this.submissionId = args.submissionId;
    this.videoUrl = args.videoUrl;
    this.audioUrl = args.audioUrl;
    this.createdAt = args.createdAt;
  }

  static createOf(args: {
    id: string;
    submissionId: string;
    videoUrl: string;
    audioUrl?: string;
  }) {
    return new SubmissionMedia({
      ...args,
      createdAt: new Date().toISOString(),
    });
  }
}
