import express from 'express';
import kategoriMakalahRouter from './kategoriMakalah';
import makalahRouter from './makalah';
import pembayaranMakalahRouter from './pembayaranMakalah';
import userRouter from './user';

const router = express.Router();

router.use('/user', userRouter);
router.use('/makalah', makalahRouter);
router.use('/kategori-makalah', kategoriMakalahRouter);
router.use('/pembayaran-makalah', pembayaranMakalahRouter);

export default router;
