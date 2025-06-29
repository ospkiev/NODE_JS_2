import multer from 'multer';
import path   from 'node:path';
import crypto from 'node:crypto';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => {
    const ext   = path.extname(file.originalname);         // .png / .pdf …
    const safe  = path.basename(file.originalname, ext)     // без шляху
      .replace(/[^a-z0-9_\-]/gi, '_')      // sanitize
      .slice(0, 50);                       // <=50 символів
    const stamp = Date.now();
    const rand  = crypto.randomBytes(4).toString('hex');
    cb(null, `${stamp}-${rand}-${safe}${ext}`);             // 172987.png
  }
});

export const upload = multer({ storage });