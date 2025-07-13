import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, ConfigService],
})
export class ImagesModule {}
