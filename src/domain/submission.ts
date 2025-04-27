import { createUniqueId } from 'src/common/utils/createUniqueId.function';
import { ComponentType } from './vo/enum/componentType.enum';
import { SubmissionStatus } from './vo/enum/submissionStatus.enum';
import { SubmissionMedia } from './vo/submissionMedia';

export class Submission {
  public readonly id: string;
  public readonly studentId: string;
  public componentType: ComponentType;
  public submitText: string;
  public status: SubmissionStatus;
  public score: number;
  public result: any;
  public submissionMedia: SubmissionMedia;
  public createdAt: string;
  public updatedAt: string;

  constructor(args: {
    id: string;
    studentId: string;
    componentType: ComponentType;
    submitText: string;
    status: SubmissionStatus;
    score: number;
    result: any;
    submissionMedia: SubmissionMedia;
    createdAt: string;
    updatedAt: string;
  }) {
    this.id = args.id;
    this.studentId = args.studentId;
    this.componentType = args.componentType;
    this.submitText = args.submitText;
    this.status = args.status;
    this.score = args.score;
    this.result = args.result;
    this.submissionMedia = args.submissionMedia;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }

  static successSubmission(args: {
    id: string;
    studentId: string;
    componentType: ComponentType;
    submitText: string;
    score: number;
    videoUrl?: string;
    audioUrl?: string;
    result: any;
  }) {
    const now = new Date().toISOString();
    let submissionMedia = null;
    if (args.videoUrl || args.audioUrl) {
      submissionMedia = SubmissionMedia.createOf({
        id: createUniqueId(),
        submissionId: args.id,
        videoUrl: args.videoUrl,
        audioUrl: args.audioUrl,
      });
    }
    return new Submission({
      ...args,
      score: args.score,
      status: SubmissionStatus.SUCCESS,
      submissionMedia,
      createdAt: now,
      updatedAt: null,
    });
  }

  static failSubmission(args: {
    id: string;
    studentId: string;
    componentType: ComponentType;
    submitText: string;
  }) {
    const now = new Date().toISOString();
    return new Submission({
      ...args,
      result: null,
      score: 0,
      status: SubmissionStatus.FAILED,
      submissionMedia: null,
      createdAt: now,
      updatedAt: null,
    });
  }
}
