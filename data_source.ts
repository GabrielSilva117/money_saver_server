import { Users } from './src/entities/user'
import { DataSource } from 'typeorm'
import { UserDocuments } from './src/entities/user_document'
import { DocumentTypes } from './src/entities/document_type'
import { Tags } from './src/entities/tags'
import { EntriesTags } from './src/entities/entries_tags'
import { Entries } from './src/entities/entries'
import { EntryTypes } from './src/entities/entry_types'
import { EntryCategories } from './src/entities/entry_categories'
import { EntryItems } from './src/entities/entry_items'
import { EntryImages } from './src/entities/entry_images'
import { EntrySubcategories } from './src/entities/entry_subcategories'

export const MainDs = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: undefined,
  database: 'money_saver',
  synchronize: true,
  logging: true,
  entities: [
    Users,
    UserDocuments,
    DocumentTypes,
    Tags,
    EntriesTags,
    Entries,
    EntryTypes,
    EntryCategories,
    EntryItems,
    EntryImages,
    EntrySubcategories
  ],
  subscribers: [],
  migrations: [],
  migrationsTableName: './migrations/create_entity.ts'
})
