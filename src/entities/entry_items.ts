import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Entries } from "./entries";
import { EntrySubcategories } from "./entry_subcategories";

@Entity('entry_items')
export class EntryItems extends BaseEntity {
  @PrimaryGeneratedColumn(
    'uuid'
  )
  id: string

  @ManyToOne(() => Entries, entries => entries.id)
  entry: Entries

  @ManyToOne(() => EntrySubcategories, entry_subcategories => entry_subcategories.id)
  entry_subcategory: EntrySubcategories

}