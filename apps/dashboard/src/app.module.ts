import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { SocialModule } from './social';
import { ContactModule } from './contact';
import { StackModule } from './stack';
import { JobModule } from './job';
import { ProjectModule } from './project';
import { PrismaModule } from '@app/shared/prisma';
import { StorageModule } from '@app/shared/storage';
import { ProfileModule } from './profile/profile.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@app/shared/strategies';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      sortSchema: true,
    }),
    ContactModule,
    SocialModule,
    JobModule,
    ProjectModule,
    StackModule,
    PrismaModule,
    StorageModule,
    ProfileModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
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
    JwtStrategy,
  ],
})
export class AppModule {}
