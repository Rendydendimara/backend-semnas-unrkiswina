import express from 'express';
import makalah from '../../config/multer/makalah';
import {
  createMakalahController,
  updateMakalahController,
  deleteMakalahController,
  findMakalahByUserController,
  findMakalahByIdController,
  getListMakalahController,
} from '../../controller/Makalah/Makalah';
import {
  sendLOAMakalahByEmailPemakalahController,
  updateStatusMakalahController,
  uploadLOAMakalahController,
} from '../../controller/Makalah/Admin';
import { asyncErrorHandler } from '../../middleware';
import { isAuth } from '../../middleware/userAuth';

const makalahRouter = express.Router();

makalahRouter.post(
  '/create',
  asyncErrorHandler(isAuth('pemakalah')),
  makalah.fields([
    {
      name: 'makalah_word',
      maxCount: 1,
    },
    {
      name: 'makalah_pdf',
      maxCount: 1,
    },
  ]),
  asyncErrorHandler(createMakalahController)
);

makalahRouter.put(
  '/update/:makalahId',
  asyncErrorHandler(isAuth('pemakalah')),
  makalah.fields([
    {
      name: 'makalah_word',
      maxCount: 1,
    },
    {
      name: 'makalah_pdf',
      maxCount: 1,
    },
  ]),
  asyncErrorHandler(updateMakalahController)
);

makalahRouter.delete(
  '/:makalahId',
  asyncErrorHandler(isAuth('pemakalah')),
  asyncErrorHandler(deleteMakalahController)
);

makalahRouter.post(
  '/user',
  asyncErrorHandler(isAuth()),
  asyncErrorHandler(findMakalahByUserController)
);

makalahRouter.get(
  '/detail/:makalahId',
  asyncErrorHandler(isAuth()),
  asyncErrorHandler(findMakalahByIdController)
);

makalahRouter.post(
  '/admin/change-status',
  asyncErrorHandler(isAuth('admin')),
  asyncErrorHandler(updateStatusMakalahController)
);

makalahRouter.get(
  '/admin/list',
  asyncErrorHandler(isAuth('admin')),
  asyncErrorHandler(getListMakalahController)
);

makalahRouter.post(
  '/admin/upload-loa',
  asyncErrorHandler(isAuth('admin')),
  makalah.single('makalah_word'),
  asyncErrorHandler(uploadLOAMakalahController)
);

makalahRouter.get(
  '/admin/send-email-loa/:makalahId',
  asyncErrorHandler(isAuth('admin')),
  asyncErrorHandler(sendLOAMakalahByEmailPemakalahController)
);

export default makalahRouter;
