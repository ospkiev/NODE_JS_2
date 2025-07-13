import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { ParseIntPipe } from '../pipes/parseIntPipe.pipe';
import { AuthGuard } from 'src/guards/authGuard';
import { LoggingInterceptor } from 'src/interceptors/interceptor';
import { TImagesDTO } from './images.dto';

@Controller('images')
@UseInterceptors(LoggingInterceptor)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query('pageNumber', ParseIntPipe) pageNumber: number) {
    console.log('controller');
    console.log('controller pageNumber', pageNumber);
    return this.imagesService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  create(@Body() dto: TImagesDTO) {
    if (
      typeof dto.id !== 'number' ||
      typeof dto.name !== 'string' ||
      typeof dto.url !== 'string'
    ) {
      throw new Error('Invalid image data: id, name, and url are required.');
    }
    return this.imagesService.create({
      id: dto.id,
      name: dto.name,
      url: dto.url,
    });
  }
}
