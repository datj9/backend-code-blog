import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import CreateUserDto from './dto/create-user-dto';
import IToken from './interfaces/token.interface';
import AuthCredentialDto from './dto/auth-credential-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createUseDto: CreateUserDto): Promise<IToken> {
    return this.authService.signUp(createUseDto);
  }

  @Post('signin')
  async signIn(@Body() authCredentialDto: AuthCredentialDto): Promise<IToken> {
    return this.authService.signIn(authCredentialDto);
  }
}
