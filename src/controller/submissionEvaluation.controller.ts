import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateSubmissionReqyestDTO } from './dto/request/createSubmission.request.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { SubmissionService } from 'src/service/submission.service';

@Controller()
export class SubmissionEvaluationController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post('/v1/submissions')
  @UseInterceptors(FileInterceptor('videoFile'))
  @ApiConsumes('multipart/form-data')
  async createSubmission(
    @Body() createSubmissionRequest: CreateSubmissionReqyestDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    await this.submissionService.createSubmission({
      ...createSubmissionRequest,
      studentId: 'sample',
      studentName: 'sample',
      videoFile: file,
    });
    return '';
  }
}
