import express from 'express';
import { updateStatusVideoPresentasiController } from '../../controller/LinkPresentasi/Admin';
import {
  createVideoPresentasiController,
  deleteVideoPresentasiController,
  findVideoPresentasiByIdController,
  findVideoPresentasiByUserController,
  getListVideoPresentasiController,
  updateVideoPresentasiController,
} from '../../controller/LinkPresentasi/LinkPresentasi';
import { asyncErrorHandler } from '../../middleware';
import { isAuth } from '../../middleware/userAuth';

const videoPresentasiRouter = express.Router();

videoPresentasiRouter.post(
  '/create',
  asyncErrorHandler(isAuth('pemakalah')),
  asyncErrorHandler(createVideoPresentasiController)
);

videoPresentasiRouter.put(
  '/update/:videoPresentasiId',
  asyncErrorHandler(isAuth('pemakalah')),
  asyncErrorHandler(updateVideoPresentasiController)
);

videoPresentasiRouter.delete(
  '/:videoPresentasiId',
  asyncErrorHandler(isAuth('pemakalah')),
  asyncErrorHandler(deleteVideoPresentasiController)
);

videoPresentasiRouter.post(
  '/user',
  asyncErrorHandler(isAuth()),
  asyncErrorHandler(findVideoPresentasiByUserController)
);

videoPresentasiRouter.get(
  '/detail/:videoPresentasiId',
  asyncErrorHandler(isAuth()),
  asyncErrorHandler(findVideoPresentasiByIdController)
);

videoPresentasiRouter.post(
  '/admin/change-status',
  asyncErrorHandler(isAuth('admin')),
  asyncErrorHandler(updateStatusVideoPresentasiController)
);

videoPresentasiRouter.get(
  '/admin/list',
  asyncErrorHandler(isAuth()),
  asyncErrorHandler(getListVideoPresentasiController)
);

export default videoPresentasiRouter;
