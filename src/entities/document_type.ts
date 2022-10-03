import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany} from "typeorm";
import { User_documents } from "./user_document";

@Entity('document_types')
export class Document_types extends BaseEntity{
  @PrimaryGeneratedColumn(
    'uuid'
  )
  id: string

  @OneToMany(()=> User_documents, (user_documents) => user_documents.document_type)
  user_documents: User_documents[]

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