import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import Holiday from "./Holiday";

@Entity('states')
class State {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cod: string;

  @Column()
  uf: string;

  @OneToMany(() => Holiday, holiday => holiday.state)
  holiday: Holiday;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default State;
