import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth';
import { SocialModule } from './social';
import { ContactModule } from './contact';
import { StackModule } from './stack';
import { JobModule } from './job';
import { ProjectModule } from './project';
import { PrismaModule } from '@app/shared/prisma';
import { StorageModule } from '@app/shared/storage';
import { UserModule } from '@app/shared/user';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ContactModule,
    SocialModule,
    JobModule,
    ProjectModule,
    StackModule,
    PrismaModule,
    UserModule,
    StorageModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        // forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
