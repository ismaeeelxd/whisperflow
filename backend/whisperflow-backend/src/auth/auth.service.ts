import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpResponseDto } from './dtos/sign-up.response.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  public async signUp(firebaseId: string): Promise<SignUpResponseDto> {
    //TODO: Delegate creation to user service with firebaseId;
    const token = await this.jwtService.signAsync(
      { firebaseId },
      { expiresIn: '3d' },
    );
    return { accessToken: token };
  }
}
