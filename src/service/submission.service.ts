import { Inject, Injectable } from '@nestjs/common';
import { AIProcessor } from './interface/aiProcessor';
import { MediaUploadProcessor } from 'src/infrastructure/mediaUploader/mediaUploadProcessor';
import { Submission } from 'src/domain/submission';
import { createUniqueId } from 'src/common/utils/createUniqueId.function';
import { ComponentType } from 'src/domain/vo/enum/componentType.enum';

@Injectable()
export class SubmissionService {
  constructor(
    @Inject('AI_PROCESSOR')
    private readonly aiProcessor: AIProcessor,
    @Inject('MEDIA_UPLOADER')
    private readonly mediaUploadProcessor: MediaUploadProcessor,
  ) {}

  async createSubmission(args: {
    studentId: string;
    studentName: string;
    componentType: ComponentType;
    submitText: string;
    videoFile?: Express.Multer.File;
  }) {
    //TODO submission 에 대한 조회 및 확인  componentType 에 대해서 있을 경우 이에대해서 변경
    const [mediaProcessedResult, aiSubmissionResult] = await Promise.allSettled(
      [
        this.mediaUploadProcessor.processAndUpload(args?.videoFile),
        this.aiProcessor.evaluateStudentEssay(args.submitText),
      ],
    );
    if (
      mediaProcessedResult.status === 'rejected' ||
      aiSubmissionResult.status === 'rejected'
    ) {
      //TODO 에러 관련 로그 저장 및 error throws
    }

    const newSubMission = Submission.createSubmission({
      id: createUniqueId(),
      componentType: args.componentType,
      submitText: args.submitText,
      result: aiSubmissionResult,
    });

    //TODO newSubmission 에대한 값 저장
    console.log(newSubMission);
  }
}
