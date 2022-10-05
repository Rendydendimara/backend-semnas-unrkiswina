import express from 'express';
import { getListKategoriMakalahController } from '../../controller/KategoriMakalah/KategoriMakalah';
import { asyncErrorHandler } from '../../middleware';

const kategoriMakalahRouter = express.Router();
kategoriMakalahRouter.get(
  '/list',
  asyncErrorHandler(getListKategoriMakalahController)
);

export default kategoriMakalahRouter;
