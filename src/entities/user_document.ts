import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'
import { DocumentTypes } from './document_type'
import { Users } from './user'

@Entity('user_documents')
export class UserDocuments extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Users, (users) => users.id)
  user: Users

  @ManyToOne(() => DocumentTypes, (document_type) => document_type.id)
  document_type: DocumentTypes

  @Column({
    unique: true,
    length: 14
  })
  document_cod: string

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
