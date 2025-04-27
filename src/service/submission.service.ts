import { Inject, Injectable } from '@nestjs/common';
import { AIProcessor } from './interface/aiProcessor';
import { MediaUploadProcessor } from 'src/infrastructure/mediaUploader/mediaUploadProcessor';
import { ComponentType } from 'src/domain/vo/enum/componentType.enum';
import { Submission } from 'src/domain/submission';
import { createUniqueId } from 'src/common/utils/createUniqueId.function';
import { IStudentRepository } from 'src/service/interface/studentRepository.interface';
import { ISubmissionRepository } from 'src/service/interface/submissionRepository.interface';

@Injectable()
export class SubmissionService {
  constructor(
    @Inject('AI_PROCESSOR')
    private readonly aiProcessor: AIProcessor,
    @Inject('MEDIA_UPLOADER')
    private readonly mediaUploadProcessor: MediaUploadProcessor,
    @Inject('STUDENT_REPOSITORY')
    private readonly studentRepo: IStudentRepository,
    @Inject('SUBMISSION_REPOSITORY')
    private readonly submissionRepo: ISubmissionRepository,
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
      const failedSubmission = Submission.failSubmission({
        id: createUniqueId(),
        studentId: 'test',
        componentType: args.componentType,
        submitText: args.submitText,
      });
      await this.submissionRepo.save(failedSubmission);
      throw new Error('failed to process mediaProcess or AI submission');
    }

    const successSubMission = Submission.successSubmission({
      id: createUniqueId(),
      studentId: 'test',
      componentType: args.componentType,
      submitText: args.submitText,
      result: aiSubmissionResult.value,
      score: aiSubmissionResult.value.score,
      videoUrl: mediaProcessedResult.value?.videoUrl,
      audioUrl: mediaProcessedResult.value?.audioUrl,
    });
    await this.submissionRepo.save(successSubMission);

    return {
      result: 'ok',
      message: null,
      studentId: args.studentId,
      studentName: args.studentName,
      score: aiSubmissionResult.value?.score,
      feedback: aiSubmissionResult.value?.feedback,
      hightlights: aiSubmissionResult.value?.highlights,
      highlightSubmitText: aiSubmissionResult.value?.highlightSubmitText,
      mediaUrl: {
        audioUrl: mediaProcessedResult.value?.audioUrl,
        videoUrl: mediaProcessedResult.value?.videoUrl,
      },
    };
  }
}
