import { Users } from './src/entities/user'
import { DataSource } from 'typeorm'
import { User_documents } from './src/entities/user_document'
import { Document_types } from './src/entities/document_type'
import { Tags } from './src/entities/tags'
import { Entries_tags } from './src/entities/entries_tags'
import { Entries } from './src/entities/entries'
import { Entry_types } from './src/entities/entry_types'
import { Entry_categories } from './src/entities/entry_categories'
import { Entry_items } from './src/entities/entry_items'
import { Entry_images } from './src/entities/entry_images'
import { Entry_subcategories } from './src/entities/entry_subcategories'

export const MainDs = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: undefined,
  database: 'money_saver',
  synchronize: false,
  logging: true,
  entities: [
    Users,
    User_documents,
    Document_types,
    Tags,
    Entries_tags,
    Entries,
    Entry_types,
    Entry_categories,
    Entry_items,
    Entry_images,
    Entry_subcategories
  ],
  subscribers: [],
  migrations: [],
  migrationsTableName: './migrations/create_entity.ts'
})
