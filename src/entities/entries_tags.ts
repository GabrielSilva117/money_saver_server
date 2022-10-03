import { Entity, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import { Entries } from "./entries";
import { Tags } from "./tags";

@Entity('entries_tags')
export class Entries_tags extends BaseEntity {
  @PrimaryColumn()
  entryId: string

  @ManyToOne(() => Entries, (entries) => entries.id)
  entry: Entries

  @PrimaryColumn()
  tagId: string
  
  @ManyToOne(() => Tags, (tags) => tags.id)
  tag: Tags
}