import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Entry_categories } from "./entry_categories";
import { Tags } from "./tags";
import { User_documents } from "./user_document";

@Entity('users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn(
    'uuid'
  )
  id: string

  @OneToMany(() => User_documents, (user_documents) => user_documents.user)
  user_documents: User_documents[]

  @OneToMany(() => Tags, (tags) => tags.id)
  tags: Tags[]

  @Column({
    length: 40,
    nullable: false
  })
  first_name: string

  @Column({
    length: 80,
    nullable: false
  })
  last_name: string

  @Column({
    nullable: false
  })
  birth_date: Date

  @Column({
    unique: true,
    nullable: false,
    length: 50
  })
  email:string

  @Column({
    length: 255
  })
  password: string

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

