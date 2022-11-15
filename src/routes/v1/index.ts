import express from 'express';
import kategoriMakalahRouter from './kategoriMakalah';
import makalahRouter from './makalah';
import pembayaranMakalahRouter from './pembayaranMakalah';
import publikasiRouter from './publikasi';
import userRouter from './user';
import videoPresentasiRouter from './videoPresentasi';
import reviewerRouter from './reviewer';
import utilsRouter from './utils';
const router = express.Router();

router.use('/user', userRouter);
router.use('/makalah', makalahRouter);
router.use('/kategori-makalah', kategoriMakalahRouter);
router.use('/pembayaran-makalah', pembayaranMakalahRouter);
router.use('/video-presentasi', videoPresentasiRouter);
router.use('/publikasi', publikasiRouter);
router.use('/reviewer', reviewerRouter);
router.use('/utils', utilsRouter);

export default router;
