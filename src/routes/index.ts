import express from 'express';
import routerV1 from './v1';

const mainRouter = express.Router();

mainRouter.use('/v1', routerV1);

// default fallback routes (stable)
mainRouter.use(routerV1);

export default mainRouter;
