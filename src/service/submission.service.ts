import { Injectable } from '@nestjs/common';

@Injectable()
export class SubmissionService {
  constructor() {}

  async createSubmission(args: {
    studentId: number;
    studentName: string;
    componentType: string;
    submitText: string;
    videoFile: Buffer;
  }) {
    return args;
  }
}
