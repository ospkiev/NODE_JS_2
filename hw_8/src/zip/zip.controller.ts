import { Controller, Post, UploadedFile, UseInterceptors, Res, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import { Response } from 'express';
import { ZipService } from './zip.service';
import { Express } from 'express';
import * as fs from 'fs/promises';
import * as path from 'path';
import { ClientGrpcProxy } from '@nestjs/microservices';

@Controller('zip')
export class ZipController {
  constructor(private readonly zipService: ZipService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
    fileFilter: (req, file, cb) => {
      if (extname(file.originalname) === '.zip') cb(null, true);
      else cb(new HttpException('Only zip files are allowed!', HttpStatus.BAD_REQUEST), false);
    },
  }))
  async uploadZip(@UploadedFile() file: any, @Res() res: Response) {
    console.log('file', file);
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    const requestId = uuidv4();
    // Create a unique temp directory in /tmp
    const tmpDir = path.join('/tmp', `zip_${requestId}`);
    await fs.mkdir(tmpDir, { recursive: true });
    try {
      const stats = await this.zipService.processZip(file.path, tmpDir);
      await fs.rm(tmpDir, { recursive: true, force: true });
      await fs.rm(file.path, { force: true });
      return res.json(stats);
    } catch (err) {
      await fs.rm(tmpDir, { recursive: true, force: true });
      await fs.rm(file.path, { force: true });
      throw new HttpException('Failed to process zip: ' + (err?.message || err), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
