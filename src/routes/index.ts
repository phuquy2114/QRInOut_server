import { Router } from 'express';
import UserRouter from './userRoute';
import PhotoRouter from './photoRoute'
// Init router and path
const router = Router();

// Add sub-routes
router.use('/employee', UserRouter);
router.use('/photo', PhotoRouter);

// Export the base-router
export default router;
