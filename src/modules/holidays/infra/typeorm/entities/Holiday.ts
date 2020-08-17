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

enum HolidayType {
  National,
  State,
  Municipal
}

@Entity('holidays')
class Holiday {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: HolidayType;

  @Column()
  county_id: string;

  @ManyToOne(() => County, county => county.holiday)
  @JoinColumn({ name: 'county_id' })
  county: County;

  @Column()
  state_id: string;

  @ManyToOne(() => State, state => state.holiday)
  @JoinColumn({ name: 'state_id' })
  state: State;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Holiday;
