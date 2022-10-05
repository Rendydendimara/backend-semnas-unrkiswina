import express from 'express';
import imageBuktiPembayaran from '../../config/multer/imageBuktiPembayaran';
import {
  uploadBuktiPembayaranMakalahController,
  findPembayaranMakalahByMakalahController,
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

export default pembayaranMakalahRouter;
