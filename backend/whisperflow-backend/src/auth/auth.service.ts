import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthResponse } from '@whisperflow/shared';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  public async signUp(firebaseId: string): Promise<AuthResponse> {
    //TODO: Delegate creation to user service with firebaseId;
    const token = await this.jwtService.signAsync({ firebaseId });
    return { accessToken: token };
  }
}
