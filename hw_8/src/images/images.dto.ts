import { IsNumber, IsString } from 'class-validator';

export class ImageDto {
  @IsNumber()
  id: number;

  @IsString({
    message: 'Name must be a string',
  })
  name: string;

  @IsString({
    message: 'URL must be a string',
  })
  url: string;
}

export type TImagesDTO = Partial<ImageDto>;
