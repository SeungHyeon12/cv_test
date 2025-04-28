import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SubmissionService } from 'src/service/submission.service';
import { CreateSubmissionResponseDTO } from 'src/controller/dto/response/createSubmission.response.dto';
import { CommonResponseDto } from 'src/common/response/commonResponseDTO';
import { AuthGuard } from '@nestjs/passport';
import { ApiCommonOkResponse } from 'src/common/response/decorator/commonOkResponse.deocrator';
import { CreateSubmissionRequestDTO } from 'src/controller/dto/request/createSubmission.request.dto';

@ApiTags('Submission')
@Controller('/v1/submissions')
export class SubmissionEvaluationController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('videoFile'))
  @ApiOperation({
    summary: '영상 및 데이터 feedback 요청',
  })
  @ApiCommonOkResponse(CreateSubmissionResponseDTO)
  @ApiConsumes('multipart/form-data')
  async createSubmission(
    @Body() createSubmissionRequest: CreateSubmissionRequestDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const data = await this.submissionService.createSubmission({
      ...createSubmissionRequest,
      studentId: 'sample',
      studentName: 'sample',
      videoFile: file,
    });

    return new CommonResponseDto<CreateSubmissionResponseDTO>({
      data: new CreateSubmissionResponseDTO(data),
    });
  }
}
