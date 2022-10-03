import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany} from "typeorm";
import { Entry_categories } from "./entry_categories";
import { Entry_types } from "./entry_types";

@Entity('entries')
export class Entries extends BaseEntity {
  @PrimaryGeneratedColumn(
    'uuid'
  )
  id: string

  @ManyToOne(() => Entry_types, (entry_types) => entry_types.id)
  entry_type: Entry_types

  @ManyToOne(() => Entry_categories, entry_categories => entry_categories.id)
  entry_category: Entry_categories

  @Column({
    type: "decimal", precision: 10, scale: 2
  })
  value: number

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