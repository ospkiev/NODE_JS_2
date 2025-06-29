import express from 'express';
import { Router } from 'express';

export const router = (upload, dir) => {
  const r = Router();
  r.post('/upload', upload.single('file'), (req, res) => {
    res.json({ filename: req.file.filename });
  });
  // Статично віддавати завантажені файли
  r.use('/uploads', express.static(dir));
  return r;
};