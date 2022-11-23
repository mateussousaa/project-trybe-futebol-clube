import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Match from './Match';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Match.belongsTo(Team, { foreignKey: 'home_team', as: 'home_team' });
Match.belongsTo(Team, { foreignKey: 'away_team', as: 'away_team' });

Team.belongsTo(Match, { foreignKey: 'home_team', as: 'home_team_match' });
Team.belongsTo(Match, { foreignKey: 'away_team', as: 'away_team_match' });

export default Team;
