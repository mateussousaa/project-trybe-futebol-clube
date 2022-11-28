import { Router } from 'express';
import loginRoute from './login.route';
import teamsRouter from './team.route';

const router = Router();
router.use('/login', loginRoute);
router.use('/teams', teamsRouter);

export default router;
