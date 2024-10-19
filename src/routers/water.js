import { Router } from "express";
import { addWaterController, deleteWaterController, getWaterByDayController, getWaterByMonthController, patchWaterController} from "../controllers/water.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
// import validateBody from "../middlewares/validateBody.js";
// import isValidId from "../middlewares/isValidId.js";;
import authenticate from "../middlewares/authenticate.js";

const waterRouter = Router();

waterRouter.use(authenticate);

waterRouter.get('/day', ctrlWrapper(getWaterByDayController));
waterRouter.get('/month', ctrlWrapper(getWaterByMonthController));
waterRouter.post('/', ctrlWrapper(addWaterController));
waterRouter.delete('/:id', ctrlWrapper(deleteWaterController));
waterRouter.patch('/:id', ctrlWrapper(patchWaterController));
//need to add isValidId, validateQuery and validationSchemas

export default waterRouter;