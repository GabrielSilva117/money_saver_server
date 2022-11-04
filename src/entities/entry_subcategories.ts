import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne} from "typeorm";
import { EntryCategories } from "./entry_categories";

@Entity('entry_subcategories')
export class EntrySubcategories extends BaseEntity {
  @PrimaryGeneratedColumn(
    'uuid'
  )
  id: string

  @ManyToOne(() => EntryCategories, entry_categories => entry_categories.id)
  entry_category: EntryCategories

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