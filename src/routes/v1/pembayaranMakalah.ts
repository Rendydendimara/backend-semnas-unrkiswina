import express from 'express';
import imageBuktiPembayaran from '../../config/multer/imageBuktiPembayaran';
import {
  uploadBuktiPembayaranMakalahController,
  findPembayaranMakalahByMakalahController,
  getListPembayaranMakalahController,
  findPembayaranMakalahByIdController,
} from '../../controller/PembayaranMakalah/PembayaranMakalah';
import {
  updateStatusPembayaranMakalahController,
  updatePembayaranMakalahController,
} from '../../controller/PembayaranMakalah/Admin';
import { asyncErrorHandler } from '../../middleware';
import { isAuth } from '../../middleware/userAuth';

const pembayaranMakalahRouter = express.Router();

pembayaranMakalahRouter.post(
  '/upload-bukti-pembayaran',
  asyncErrorHandler(isAuth('pemakalah')),
  imageBuktiPembayaran.single('bukti_transfer'),
  asyncErrorHandler(uploadBuktiPembayaranMakalahController)
);

pembayaranMakalahRouter.post(
  '/find-by-makalah',
  asyncErrorHandler(isAuth('pemakalah')),
  asyncErrorHandler(findPembayaranMakalahByMakalahController)
);

pembayaranMakalahRouter.post(
  '/admin/update/:makalahId',
  asyncErrorHandler(isAuth('admin')),
  asyncErrorHandler(updatePembayaranMakalahController)
);

pembayaranMakalahRouter.post(
  '/admin/change-status',
  asyncErrorHandler(isAuth('admin')),
  asyncErrorHandler(updateStatusPembayaranMakalahController)
);

pembayaranMakalahRouter.get(
  '/admin/list',
  asyncErrorHandler(isAuth('admin')),
  asyncErrorHandler(getListPembayaranMakalahController)
);

pembayaranMakalahRouter.get(
  '/detail/:pembayaranMakalahId',
  asyncErrorHandler(isAuth()),
  asyncErrorHandler(findPembayaranMakalahByIdController)
);

export default pembayaranMakalahRouter;
