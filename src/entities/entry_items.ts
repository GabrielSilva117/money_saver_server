import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Entries } from "./entries";
import { Entry_subcategories } from "./entry_subcategories";

@Entity('entry_items')
export class Entry_items extends BaseEntity {
  @PrimaryGeneratedColumn(
    'uuid'
  )
  id: string

  @ManyToOne(() => Entries, entries => entries.id)
  entry: Entries

  @ManyToOne(() => Entry_subcategories, entry_subcategories => entry_subcategories.id)
  entry_subcategory: Entry_subcategories

}