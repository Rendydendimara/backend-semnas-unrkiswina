import express from 'express';
import kategoriMakalahRouter from './kategoriMakalah';
import makalahRouter from './makalah';
import pembayaranMakalahRouter from './pembayaranMakalah';
import userRouter from './user';
import videoPresentasiRouter from './videoPresentasi';

const router = express.Router();

router.use('/user', userRouter);
router.use('/makalah', makalahRouter);
router.use('/kategori-makalah', kategoriMakalahRouter);
router.use('/pembayaran-makalah', pembayaranMakalahRouter);
router.use('/video-presentasi', videoPresentasiRouter);

export default router;
