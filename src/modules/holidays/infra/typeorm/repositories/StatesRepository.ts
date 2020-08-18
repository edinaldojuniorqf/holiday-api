import IStatesRepository from '@modules/holidays/repositories/IStatesRepository';
import ICreateStateDTO from '@modules/holidays/dtos/ICreateStateDTO';
import State from '../entities/State';
import { Repository, getRepository } from 'typeorm';

export default class StatesRepository implements IStatesRepository {
  private ormRepository: Repository<State>;

  constructor() {
    this.ormRepository = getRepository(State);
  }

  public async findAll(): Promise<State[]> {
    const states = await this.ormRepository.find();
    return states;
  }

  public async create(data: ICreateStateDTO | ICreateStateDTO[]): Promise<State | State[]> {
    if (data instanceof Array) {
      const states = data.map(item => this.ormRepository.create(item));
      await this.ormRepository.save(states);
      return states;
    } else {
      const state = this.ormRepository.create(data);
      await this.ormRepository.save(state);
      return state;
    }
  }

  async remove(data: State | State[]): Promise<State | State[]> {
    if (data instanceof Array) {
      const states = this.ormRepository.remove(data);
      return states;
    } else {
      const state = this.ormRepository.remove(data);
      return state;
    }
  }
}
