import { Router } from 'express';
import {
  addWaterController,
  deleteWaterController,
  getWaterByDayController,
  getWaterByMonthController,
  patchWaterController,
} from '../controllers/water.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {validateBody } from "..//middlewares/validateBody.js";
import authenticate from '../middlewares/authenticate.js';
import { addWaterSchema, patchWaterSchema, queryDayWaterSchema, queryMonthWaterSchema } from '../validation/water.js';
import { validateQuery } from '../middlewares/validateQuery.js';

const waterRouter = Router();

waterRouter.use(authenticate);

waterRouter.get('/day', validateQuery(queryDayWaterSchema), ctrlWrapper(getWaterByDayController));
waterRouter.get('/month', validateQuery(queryMonthWaterSchema),ctrlWrapper(getWaterByMonthController));
waterRouter.post('/', validateBody(addWaterSchema), ctrlWrapper(addWaterController));
waterRouter.delete('/:id', ctrlWrapper(deleteWaterController));
waterRouter.patch('/:id', validateBody(patchWaterSchema), ctrlWrapper(patchWaterController));

export default waterRouter;
