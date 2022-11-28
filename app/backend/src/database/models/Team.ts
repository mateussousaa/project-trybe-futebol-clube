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

Match.belongsTo(Team, { foreignKey: 'id', as: 'home_team' });
Match.belongsTo(Team, { foreignKey: 'id', as: 'away_team' });

Team.hasMany(Match, { foreignKey: 'home_team', as: 'home_team' });
Team.hasMany(Match, { foreignKey: 'away_team', as: 'away_team' });

export default Team;
