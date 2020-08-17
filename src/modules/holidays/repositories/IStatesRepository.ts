import State from '../infra/typeorm/entities/State';
import ICreateStateDTO from '../dtos/ICreateStateDTO';

export default interface IStatesRepository {
  findAll(): Promise<State[]>;
  create(data: ICreateStateDTO | ICreateStateDTO[]): Promise<State | State[]>;
  remove(data: State | State[]): Promise<State | State[]>;
}
