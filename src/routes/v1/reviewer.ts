import makalah from '../../config/multer/makalah';
import express from 'express';
import { updateStatusMakalahController } from '../../controller/Makalah/Admin';
import {
  addReviewerMakalahController,
  getMakalahByReviewerIdController,
  getListReviewerController,
} from '../../controller/Makalah/Reviewer';
import { asyncErrorHandler } from '../../middleware';
import { isAuth } from '../../middleware/userAuth';
const reviewerRouter = express.Router();

reviewerRouter.get(
  '/get-list-reviewer',
  asyncErrorHandler(isAuth('publikasi')),
  asyncErrorHandler(getListReviewerController)
);

reviewerRouter.get(
  '/get-makalah-reviewer/:reviewerId',
  asyncErrorHandler(isAuth('reviewer')),
  asyncErrorHandler(getMakalahByReviewerIdController)
);

reviewerRouter.post(
  '/change-status-makakah',
  asyncErrorHandler(isAuth('reviewer')),
  asyncErrorHandler(updateStatusMakalahController)
);

reviewerRouter.post(
  '/add-review',
  asyncErrorHandler(isAuth('reviewer')),
  makalah.single('makalah_word'),
  asyncErrorHandler(addReviewerMakalahController)
);

export default reviewerRouter;
