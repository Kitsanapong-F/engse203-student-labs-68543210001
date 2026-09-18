import { Router } from 'express';
import * as controller from '../controllers/requestController.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();

router.get('/', asyncHandler(controller.listRequests));
router.get('/:id', asyncHandler(controller.getRequestById));
router.post('/', validateRequest, asyncHandler(controller.createRequest));
router.put('/:id', asyncHandler(controller.updateRequestStatus));
router.delete('/:id', asyncHandler(controller.deleteRequest));

export default router;
