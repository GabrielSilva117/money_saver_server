import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany} from "typeorm";
import { EntryCategories } from "./entry_categories";
import { EntryTypes } from "./entry_types";

@Entity('entries')
export class Entries extends BaseEntity {
  @PrimaryGeneratedColumn(
    'uuid'
  )
  id: string

  @ManyToOne(() => EntryTypes, (entry_types) => entry_types.id)
  entry_type: EntryTypes

  @ManyToOne(() => EntryCategories, entry_categories => entry_categories.id)
  entry_category: EntryCategories

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