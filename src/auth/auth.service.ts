import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    //Burada dönen değer bir promise'dir. Promise içinde bir obje vardır. Bu objenin içinde accessToken adında bir string vardır.
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({
      where: { username: username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken }; //Burada obje yapmanın asıl sebebi güvenlik amaçlıdır. Eğer sadece string döndürürsek, bu string'in içinde başka bir şey olabilir. Örneğin bir token olabilir. Bu yüzden obje döndürüyoruz.
    } else {
      throw new UnauthorizedException('Kullanıcı adı veya şifre hatalı.');
    }
  }
}
