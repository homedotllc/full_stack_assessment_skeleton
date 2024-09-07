import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (confingService: ConfigService) => ({
        type: 'mysql',
        // getOrThrow will throw an error if env is not present
        host: confingService.getOrThrow('MYSQL_HOST'),
        port: confingService.getOrThrow('MYSQL_PORT'),
        database: confingService.getOrThrow('MYSQL_DATABASE'),
        username: confingService.getOrThrow('MYSQL_USER'),
        password: confingService.getOrThrow('MYSQL_PASSWORD'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
