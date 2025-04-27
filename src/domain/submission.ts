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

  static createSubmission(args: {
    id: string;
    studentId: string;
    componentType: ComponentType;
    submitText: string;
    result: any;
  }) {
    const now = new Date().toISOString();
    return new Submission({
      ...args,
      score: 0,
      status: SubmissionStatus.SUCCESS,
      submissionMedia: null,
      createdAt: now,
      updatedAt: null,
    });
  }
}
