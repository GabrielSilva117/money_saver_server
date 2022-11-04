import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany} from "typeorm";
import { EntriesTags } from "./entries_tags";
import { Users } from "./user";

@Entity('tags')
export class Tags extends BaseEntity {
  @PrimaryGeneratedColumn(
    'uuid'
  )
  id: string

  @ManyToOne(() => Users, (user) => user.id)
  user_id: Users  

  @Column({
    length: 20,
    nullable: false
  })
  label: string

  @Column({
    length: 9,
    nullable: false
  })
  color: string
  
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