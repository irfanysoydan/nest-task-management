import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      //forRoot ile veritabanı bağlantısı sağlanır.
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      autoLoadEntities: true, //Bu kod ile entitylerimizi otomatik olarak yükler. Yani entitylerimizi import etmeye gerek kalmaz.
      synchronize: true, //Bu kodu kullanırken dikkatli olmak gerekir. Çünkü bu kod ile veritabanı ile entitylerimizi eşleştirirken veritabanındaki verileri siler.
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
