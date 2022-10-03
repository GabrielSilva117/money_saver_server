import { MainDs } from './data_source'
import express from 'express'
import { Register_User } from './src/routes/register_user'

const app = express()
const port = process.env.port || '3000'

const main = async () => {
  try {
    MainDs.initialize()
    console.log('Connected to the Database')
    app.use(express.json())
    app.use([
      Register_User
    ])
    app.listen(port, () => {
      console.log(`Server running on ${port}`)
    })
  } catch (err) {
    console.error('An error occured! ' + err)
  }
}

main()

app.get('/', (req, res) => {
  res.write('<h1>Home Page</h1>')
})
