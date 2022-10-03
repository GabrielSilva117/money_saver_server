import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { Entries } from "./entries";

@Entity('entry_types')
export class Entry_types extends BaseEntity{
  @PrimaryGeneratedColumn(
    'uuid'
  )
  id: string

  @Column({
    length: 50,
    nullable: false
  })
  name: string

  @Column({
    length: 255,
    nullable: false
  })
  description: string

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