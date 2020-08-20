import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Holiday from "./Holiday";
import State from "./State";

@Entity('counties')
class County {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cod: string;

  @OneToMany(() => Holiday, holiday => holiday.county)
  holiday: Holiday;

  @Column()
  state_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default County;
