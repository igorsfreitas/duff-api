import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'beer_types' })
export class BeerType {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  min_temperature: number;

  @Column()
  max_temperature: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
