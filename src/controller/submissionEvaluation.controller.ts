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

@Controller()
export class SubmissionEvaluationController {
  constructor() {}

  @Post('/v1/submissions')
  @UseInterceptors(FileInterceptor('videoFile'))
  @ApiConsumes('multipart/form-data')
  createSubmission(
    @Body() createSubmissionRequest: CreateSubmissionReqyestDTO,
    @UploadedFile() file: Express.Multer.File,
  ): string {
    console.log(createSubmissionRequest, file.buffer);
    return '';
  }
}
