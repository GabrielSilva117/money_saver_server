import express from 'express'
import { Users } from '../entities/user'
import bcrypt from 'bcrypt'
import { authorize, refreshTkn, generateRefreshToken, generateToken, accessTkn } from '../../config/auth'
import jwt from 'jsonwebtoken'

const router = express.Router()

let refreshTokens: string[] = []

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
      const AccessToken = await generateToken({
        id: user.id,
        email: email,
        first_name: user.first_name,
        last_name: user.last_name
      })

      const RefreshToken = await generateRefreshToken({
        id: user.id,
        email: email,
        first_name: user.first_name,
        last_name: user.last_name
      })

      refreshTokens.push(RefreshToken)
  
      return res.status(201).json({
        AccessToken: AccessToken,
        data: {
          email: email,
          first_name: user.first_name,
          last_name: user.last_name
        },
        RefreshToken: RefreshToken
      })
    })  
    return  
  } catch (err) {
    console.error(err)
    return res.status(500).send('An error occured: ' + err)
  }
})

router.post('/refresh-token', async (req, res) => {
  const RefreshToken: string = req.body.token
  if(!RefreshToken) return res.status(400).json({
    msg: "Invalid or expired Token. Try again!"
  })
  console.log(refreshTokens, RefreshToken)
  if(!refreshTokens.includes(RefreshToken)) return res.status(403).json({
    msg: "Invalid Token"
  })
  jwt.verify(RefreshToken, refreshTkn, async (error, decoded) => {
    if (error) return res.status(403)
    const accessToken = await generateToken(decoded)
    return res.status(200).json({
      AccessToken: accessToken
    })
  })
  return
})

router.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.RefreshToken)
  res.status(200).json({
    msg: "User logged out successfully"
  })
})

router.post('/api/posts', authorize, (req, res) => {
  res.json({auth: 'User authorized'})
})

export { router as User_Authenticate }
