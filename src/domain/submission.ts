import { ComponentType } from './vo/enum/componentType.enum';
import { SubmissionStatus } from './vo/enum/submissionStatus.enum';
import { SubmissionMedia } from './vo/submissionMedia';

export class Submission {
  public readonly id: string;
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
    this.componentType = args.componentType;
    this.submitText = args.submitText;
    this.status = args.status;
    this.score = args.score;
    this.result = args.result;
    this.submissionMedia = args.submissionMedia;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }

  static Submit(args: {
    id: string;
    componentType: ComponentType;
    submitText: string;
    status: SubmissionStatus;
    result: any;
  }) {
    const now = new Date().toISOString();
    return new Submission({
      ...args,
      score: 0,
      status: SubmissionStatus.PENDING,
      submissionMedia: null,
      createdAt: now,
      updatedAt: null,
    });
  }

  finishEvalutate(args: { result: any; score: number }) {
    this.result = args.result;
    this.score = args.score;
    this.status = SubmissionStatus.SUCCESS;
    this.updatedAt = new Date().toISOString();
  }

  failEvaluate(result: any) {
    this.result = result;
    this.status = SubmissionStatus.FAILED;
    this.updatedAt = new Date().toISOString();
  }
}
