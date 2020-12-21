import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import AuthorRepository from 'src/authors/authors.repository';
import AuthCredentialDto from '../dto/auth-credential-dto';
import CreateUserDto from '../dto/create-user-dto';
import IJwtPayload from '../interfaces/jwt-payload.interface';
import IToken from '../interfaces/token.interface';
import User from '../user.entity';
import UserRepository from '../user.repository';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    @InjectRepository(AuthorRepository) private authorRepo: AuthorRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<IToken> {
    const user: User = await this.userRepo.createUser(createUserDto);
    const token = await this.jwtService.sign({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    return { token };
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<IToken> {
    let isCorrectPassword: boolean;
    const { email, password } = authCredentialDto;
    const user = await this.userRepo.getUserByEmail(email);

    if (user === undefined) throw new NotFoundException();
    isCorrectPassword = await user.comparePassword(password);
    if (isCorrectPassword && user.isAuthor) {
      const jwtPayload: IJwtPayload = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAuthor: user.isAuthor,
      };
      const author = await this.authorRepo.getAuthorByUser(user);
      console.log(author);
      const token = await this.jwtService.sign(jwtPayload);

      return { token };
    }
    throw new UnauthorizedException();
  }
}
