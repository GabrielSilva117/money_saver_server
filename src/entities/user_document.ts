import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";
import { Document_types } from "./document_type";
import { Users } from "./user";

@Entity('user_documents')
export class User_documents extends BaseEntity {
  @PrimaryGeneratedColumn(
    'uuid'
  )
  id: string

  @ManyToOne(() => Users, (users) => users.user_documents)
  user: Users

  @ManyToOne(() => Document_types, (document_type) => document_type.user_documents)
  document_type: Document_types

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
