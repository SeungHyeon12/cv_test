import { Inject, Injectable } from '@nestjs/common';
import { AIProcessor } from './interface/aiProcessor';
import { MediaUploadProcessor } from 'src/infrastructure/mediaUploader/mediaUploadProcessor';

@Injectable()
export class SubmissionService {
  constructor(
    @Inject('AI_PROCESSOR')
    private readonly aiProcessor: AIProcessor,
    @Inject('MEDIA_UPLOADER')
    private readonly mediaUploadProcessor: MediaUploadProcessor,
  ) {}

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
