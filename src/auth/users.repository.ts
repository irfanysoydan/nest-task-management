import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
  // TaskRepository'nin amacı Task entity'si için özel methodlar yazmamızı sağlıyor.
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt(); //salt oluşturmanın amacı şifrelerin daha güvenli olmasıdır.
    const hashedPassword = await bcrypt.hash(password, salt); //salt hash'in başına eklenir. Bu sayede şifreler daha güvenli olur.

    const user = this.create({ username, password: hashedPassword });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        //23505 kodu unique constraint hatasıdır.
        throw new ConflictException('Kullanıcı adı zaten kullanılıyor.');
      } else {
        throw new InternalServerErrorException('Bir hata oluştu.');
      }
    }
  }
}
