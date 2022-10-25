import express from 'express';
import makalah from '../../config/multer/makalah';
import {
  assignReviewerToReviewMakalahController,
  removeReviewerToReviewMakalahController,
} from '../../controller/Makalah/Publikasi';
import { updateStatusMakalahController } from '../../controller/Makalah/Admin';
import { asyncErrorHandler } from '../../middleware';
import { isAuth } from '../../middleware/userAuth';
import { getListMakalahController } from '../../controller/Makalah/Makalah';
const publikasiRouter = express.Router();

publikasiRouter.get(
  '/get-list-makalah',
  asyncErrorHandler(isAuth('publikasi')),
  asyncErrorHandler(getListMakalahController)
);

publikasiRouter.post(
  '/change-status-makakah',
  asyncErrorHandler(isAuth('publikasi')),
  asyncErrorHandler(updateStatusMakalahController)
);

publikasiRouter.post(
  '/assign-reviewer-makalah',
  asyncErrorHandler(isAuth('publikasi')),
  asyncErrorHandler(assignReviewerToReviewMakalahController)
);

publikasiRouter.get(
  '/remove-reviewer-makalah/:makalahId',
  asyncErrorHandler(isAuth('publikasi')),
  asyncErrorHandler(removeReviewerToReviewMakalahController)
);

export default publikasiRouter;
