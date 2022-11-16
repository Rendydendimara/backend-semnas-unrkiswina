import { getStatisticsController } from '../../controller/Shared/Shared';
import express from 'express';
import { asyncErrorHandler } from '../../middleware';

const sharedRouter = express.Router();
sharedRouter.get('/statistic', asyncErrorHandler(getStatisticsController));

export default sharedRouter;
