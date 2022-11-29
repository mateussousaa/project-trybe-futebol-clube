import { RequestHandler } from 'express';
import HttpException from '../utils/HttpException';

const validateCreateMatches: RequestHandler = async (req, res, next) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
  if (!homeTeam || !awayTeam || !homeTeamGoals || !awayTeamGoals) {
    throw new HttpException(400, 'invalid fields');
  }

  if (homeTeam === awayTeam) {
    throw new HttpException(422, 'It is not possible to create a match with two equal teams');
  }

  next();
};

export default validateCreateMatches;
