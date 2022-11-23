import { MainDs } from './data_source'
import express from 'express'
import { Register_User } from './src/routes/register_user'
import { User_Authenticate } from './src/routes/login'
import { User_Document_Create } from './src/routes/create_user_doc'
import { User_Tag_Create } from './src/routes/create_tag'
import { Create_Entry_Cat_Icon } from './src/routes/create_entry_cat_icon'
import { Entry_Category_Create } from './src/routes/create_entry_cat'
import { Entry_Type_Create } from './src/routes/create_entry_typ'

const app = express()
const port = process.env.PORT || 8000

const main = async () => {
  try {
    MainDs.initialize()
    console.log('Connected to the Database')
    app.use(express.json())
    app.use([Register_User, User_Authenticate, User_Document_Create, User_Tag_Create])
      Entry_Category_Create,
      Entry_Type_Create,
      Create_Entry_Cat_Icon,
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`)
    })
  } catch (err) {
    console.error('An error occured! ' + err)
  }
}

main()

app.get('/', (req, res) => {
  res.write('<h1>Home Page</h1>')
})
