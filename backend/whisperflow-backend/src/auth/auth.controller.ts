import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignUpResponseDto } from './dtos/sign-up.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  public async signUp(@Body() body: SignUpDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(body.firebaseId);
  }
}
