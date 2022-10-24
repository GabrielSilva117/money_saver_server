import { MainDs } from './data_source'
import express from 'express'
import { Register_User } from './src/routes/register_user'
import { User_Authenticate } from './src/routes/login'

const app = express()
const port = process.env.PORT || '3000'

const main = async () => {
  try {
    MainDs.initialize()
    console.log('Connected to the Database')
    app.use(express.json())
    app.use([Register_User, User_Authenticate])
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
