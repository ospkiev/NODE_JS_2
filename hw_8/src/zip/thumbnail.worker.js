const { workerData, parentPort } = require('worker_threads');
const sharp = require('sharp');
const { join, basename } = require('path');

(async () => {
  const { file, tmpDir } = workerData;
  try {
    const thumbPath = join(tmpDir, 'thumb_' + basename(file));
    await sharp(file)
      .resize(150, 150, { fit: 'inside' })
      .toFile(thumbPath);
    parentPort.postMessage('processed');
  } catch (e) {
    parentPort.postMessage('skipped');
    console.error('Failed to process', file, e);
  }
})(); 