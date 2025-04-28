import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/controller/dto/request/createUser.request.dto';
import { UserService } from 'src/service/user.service';
import { CommonResponseDto } from 'src/common/response/commonResponseDTO';
import { IssueAccessTokenRequestDTO } from 'src/controller/dto/request/issueAccessToken.request.dto';
import { IssueAccessTokenResponseDTO } from 'src/controller/dto/response/issueAccessToken.response.dto';
import { ApiCommonOkResponse } from 'src/common/response/decorator/commonOkResponse.deocrator';

//sample 로 user 등록 및 Bearer token 을 발급받기 위한 controller
@ApiTags('User')
@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'accessToken 발급을 위한 유저등록록',
  })
  async createUser(@Body() createSubmissionRequest: CreateUserDTO) {
    await this.userService.createStudent(createSubmissionRequest.name);

    return new CommonResponseDto<null>({
      data: null,
    });
  }

  @Post('/accessToken')
  @ApiOperation({
    summary: 'accessToken 발급',
  })
  @ApiCommonOkResponse(IssueAccessTokenResponseDTO)
  async issueAccessToken(
    @Body() IssueAccessTokenRequest: IssueAccessTokenRequestDTO,
  ) {
    const accessToken = await this.userService.generateAccessToken(
      IssueAccessTokenRequest.userName,
    );
    return new IssueAccessTokenResponseDTO({ accessToken });
  }
}
