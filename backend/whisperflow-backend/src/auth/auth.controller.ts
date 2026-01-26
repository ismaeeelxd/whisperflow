import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from '@whisperflow/shared';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  public async signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body.firebaseId);
  }
}
