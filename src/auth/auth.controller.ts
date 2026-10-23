import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthTokensDto, LoginDto, SignupDto, SignupResponseDto } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create an account',
    description:
      'Hashes the password, creates the user and returns the new user together with a fresh token pair.',
  })
  @ApiBody({ type: SignupDto })
  @ApiCreatedResponse({
    description:
      'Account created. The payload is wrapped as `{ success: true, data }` by the global response interceptor.',
    type: SignupResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed or the account could not be created',
  })
  @ApiConflictResponse({
    description: 'An account with this email already exists',
  })
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Log in',
    description:
      'Validates the email/password pair and returns an access/refresh token pair.',
  })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description:
      'Authenticated. The payload is wrapped as `{ success: true, data }` by the global response interceptor.',
    type: AuthTokensDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid email or password',
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
