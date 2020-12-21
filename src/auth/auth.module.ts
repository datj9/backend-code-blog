import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserRepository from './user.repository';
import JwtStategy from './services/jwt.strategy';
import AuthorRepository from 'src/authors/authors.repository';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  providers: [AuthService, JwtStategy],
  controllers: [AuthController],
  imports: [
    passportModule,
    JwtModule.register({
      secret: config.get('jwt.secret') || process.env.JWT_SECRET,
      signOptions: {
        expiresIn: config.get('jwt.expiresIn'),
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([AuthorRepository]),
  ],
  exports: [JwtStategy, passportModule],
})
export class AuthModule {}
