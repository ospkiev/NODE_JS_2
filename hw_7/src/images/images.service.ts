import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const images = [
  {
    id: 1,
    name: 'Image 1',
    url: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Image 2',
    url: 'https://via.placeholder.com/150',
  },
];

@Injectable()
export class ImagesService {
  constructor(private readonly configService: ConfigService) {}

  findAll(): { id: number; name: string; url: string }[] {
    console.log(this.configService.get('MODE'), '- is the current mode'); // Example usage of ConfigService
    return images;
  }
  create(image: { id: number; name: string; url: string }): {
    id: number;
    name: string;
    url: string;
  } {
    images.push(image);
    return image;
  }
}
