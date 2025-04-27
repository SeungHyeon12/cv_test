import { Submission } from 'src/domain/submission';
import { SubmissionStatus } from 'src/domain/vo/enum/submissionStatus.enum';

export class Revision {
  public readonly id: string;
  public readonly submission: Submission;
  public revisedScore: number | null;
  public revisedResult: any;
  public submissionStatus: SubmissionStatus;
  public readonly createdAt: string;
  public readonly updatedAt: string;

  constructor(args: {
    id: string;
    submission: Submission;
    revisedScore: number | null;
    submissionStatus: SubmissionStatus;
    revisedResult: any | null;
    createdAt: string;
    updatedAt: string | null;
  }) {
    this.id = args.id;
    this.submission = args.submission;
    this.revisedScore = args.revisedScore;
    this.revisedResult = args.revisedResult;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }

  static successRevision(args: {
    id: string;
    submission: Submission;
    revisedScore: number;
    revisedResult: any;
    result: any;
  }) {
    const now = new Date().toISOString();
    return new Revision({
      ...args,
      revisedScore: args.revisedScore,
      revisedResult: args.revisedResult,
      submissionStatus: SubmissionStatus.SUCCESS,
      createdAt: now,
      updatedAt: null,
    });
  }

  static failRevision(args: {
    id: string;
    submission: Submission;
    result: any;
  }) {
    const now = new Date().toISOString();
    return new Revision({
      ...args,
      revisedScore: 0,
      revisedResult: null,
      submissionStatus: SubmissionStatus.SUCCESS,
      createdAt: now,
      updatedAt: null,
    });
  }
}
