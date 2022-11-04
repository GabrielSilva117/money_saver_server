import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne } from "typeorm";
import { Users } from "./user";

@Entity('entry_categories')
export class EntryCategories extends BaseEntity {
  @PrimaryGeneratedColumn(
    'uuid'
  )
  id: string

  @ManyToOne(() => Users, (users) => users.id)
  user: Users

  @Column({
    length: 20
  })
  name: string

  @Column({
    length: 255
  })
  description: string

  @Column({
    length: 9
  })
  color: string

  @Column({
    length: 30
  })
  icon: string

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