import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne} from "typeorm";
import { Entry_categories } from "./entry_categories";

@Entity('entry_subcategories')
export class Entry_subcategories extends BaseEntity {
  @PrimaryGeneratedColumn(
    'uuid'
  )
  id: string

  @ManyToOne(() => Entry_categories, entry_categories => entry_categories.id)
  entry_category: Entry_categories

  @Column({
    length: 30
  })
  name: string

  @Column({
    length: 255
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