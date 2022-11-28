import { Router } from 'express';
import TeamService from '../services/team.service';
import TeamController from '../controllers/team.controller';

const teamsRouter = Router();

const service = new TeamService();
const controller = new TeamController(service);

teamsRouter.get('/', controller.getAllTeams);
teamsRouter.get('/:id', controller.getTeam);

export default teamsRouter;
