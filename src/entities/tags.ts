import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable
} from 'typeorm'
import { Entries } from './entries'
import { Users } from './user'

@Entity('tags')
export class Tags extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Users, (user) => user.id)
  user_id: Users

  @ManyToMany(() => Entries)
  entries: Entries

  @Column({
    length: 20,
    nullable: false
  })
  label: string

  @Column({
    length: 9,
    nullable: false
  })
  color: string

  @Column({
    default: true
  })
  active: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date
}
