import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'
import { Entries } from './entries'
import { EntrySubcategories } from './entry_subcategories'

@Entity('entry_items')
export class EntryItems extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Entries, (entries) => entries.id)
  entry: Entries

  @ManyToOne(
    () => EntrySubcategories,
    (entry_subcategories) => entry_subcategories.id
  )
  entry_subcategory: EntrySubcategories

  @Column({
    length: 30
  })
  name: string

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  unit_value: number

  @Column({
    type: 'integer'
  })
  units: number

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
