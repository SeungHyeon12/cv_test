import { Body, Controller, Post } from '@nestjs/common';
import { CreateSubmissionReqyestDTO } from './dto/request/createSubmission.request.dto';

@Controller()
export class SubmissionEvaluationController {
  constructor() {}

  @Post('/v1/submissions')
  createSubmission(
    @Body() createSubmissionRequest: CreateSubmissionReqyestDTO,
  ): string {
    console.log(createSubmissionRequest);
    return '';
  }
}
