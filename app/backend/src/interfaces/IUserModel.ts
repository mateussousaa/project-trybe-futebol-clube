import IUser from './IUser';

type findOneReturn = {
  dataValues: IUser
};

export default interface IUserModel {
  findOne(options: object): Promise<findOneReturn>
}
