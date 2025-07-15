import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import AdmZip = require('adm-zip');
import { Worker } from 'worker_threads';
import { Mutex } from 'async-mutex';

interface SharedState {
  processed: number;
  skipped: number;
}

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

// Helper to recursively get all files in a directory
async function getAllFiles(dir: string): Promise<string[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map(async (dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getAllFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

@Injectable()
export class ZipService {
  constructor(private readonly configService: ConfigService) {}
  findAll(): { id: number; name: string; url: string }[] {
    console.log(this.configService.get('MODE'), '- is the current mode');
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

  async processZip(zipPath: string, tmpDir: string): Promise<{ processed: number; skipped: number; durationMs: number }> {
    // Extract zip to tmpDir
    const AdmZip = require('adm-zip');
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(tmpDir, true);
    // Recursively list image files in tmpDir
    const files = await getAllFiles(tmpDir);
    const imageFiles = files.filter(f => ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'].includes(path.extname(f).toLowerCase()));
    console.log('Image files found:', imageFiles);

    const state: SharedState = { processed: 0, skipped: 0 };
    const mutex = new Mutex();
    const t0 = performance.now();

    if (imageFiles.length === 0) {
      return { processed: 0, skipped: 0, durationMs: 0 };
    }

    await Promise.all(imageFiles.map(file => {
      console.log('Spawning worker for:', file);
      return new Promise((resolve) => {
        const worker = new Worker(path.join(__dirname, 'thumbnail.worker.js'), {
          workerData: { file, tmpDir }
        });
        worker.on('message', async (msg) => {
          await mutex.runExclusive(() => {
            if (msg === 'processed') state.processed++;
            else state.skipped++;
          });
          resolve(null);
        });
        worker.on('error', async (err) => {
          console.error('Worker failed to start for', file, err);
          await mutex.runExclusive(() => { state.skipped++; });
          resolve(null);
        });
        worker.on('exit', (code) => {
          if (code !== 0) {
            // Already counted as skipped in 'error' event
            resolve(null);
          }
        });
      });
    }));
    const durationMs = performance.now() - t0;
    return { processed: state.processed, skipped: state.skipped, durationMs };
  }
}
