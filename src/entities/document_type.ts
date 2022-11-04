import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany} from "typeorm";
import { UserDocuments } from "./user_document";

@Entity('document_types')
export class DocumentTypes extends BaseEntity{
  @PrimaryGeneratedColumn(
    'uuid'
  )
  id: string

  @Column({
    length: 20,
    nullable: false
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