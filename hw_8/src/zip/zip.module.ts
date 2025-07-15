import { Module } from '@nestjs/common';
import { ZipService } from './zip.service';
import { ZipController } from './zip.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ZipController],
  providers: [ZipService, ConfigService],
})
export class ZipModule {}
