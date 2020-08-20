import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import County from './County';
import State from './State';

export enum HolidayType {
  National = 'National',
  State = 'State',
  Municipal = 'Municipal'
}

@Entity('holidays')
class Holiday {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  day: Number

  @Column()
  month: Number

  @Column()
  county_id: string | null;

  @ManyToOne(() => County, county => county.holiday)
  @JoinColumn({ name: 'county_id' })
  county: County;

  @Column()
  state_id: string | null;

  @ManyToOne(() => State, state => state.holiday)
  @JoinColumn({ name: 'state_id' })
  state: State;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Holiday;
