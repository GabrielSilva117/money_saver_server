import express from 'express'
import { Users } from '../entities/user'
import bcrypt from 'bcrypt'
import { authorize, decodeToken, generateToken } from '../../config/auth'
import { JwtPayload } from 'jsonwebtoken'

const router = express.Router()

router.post('/user/authenticate', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        msg: 'You must fill the required information to log in'
      })
    }

    const user = await Users.findOne({ where: { email: email } })

    if (!user) {
      return res.status(400).json({
        msg: 'You must use a valid email'
      })
    }
    
    bcrypt.compare(password, user.password, async (err, result) => {
      if (!result || err) {
        return res.status(400).json({
          msg: "Invalid password! Try again."
        })
      }
      const token = await generateToken({
        id: user.id,
        email: email,
        first_name: user.first_name,
        last_name: user.last_name
      })
  
      return res.status(201).json({
        token: token,
        data: {
          email: email,
          first_name: user.first_name,
          last_name: user.last_name
        }
      })
    })  
    return  
  } catch (err) {
    console.error(err)
    return res.status(500).send('An error occured: ' + err)
  }
})

router.post('/refresh-token', async (req, res, next) => {
  try {
    const { token } = req.body || req.query || req.headers['x-access-token']
    const { id } = (await decodeToken(token)) as JwtPayload
    const user = await Users.findOneBy({ id: id })

    if (!user) {
      return res.status(404).json({
        msg: 'User not found!'
      })
    }

    const token_Data = await generateToken({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    })

    return res.status(201).json({
      token: token,
      data: {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      }
    })
  } catch (err) {
    return res.status(500).send(err)
  }
})

router.post('/api/posts', authorize, (req, res) => {
  res.json({test: 'sample test'})
})


export { router as User_Authenticate }
