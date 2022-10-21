//import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import process from 'process'
//dotenv.config({ path: '../.env'})

export const test =
  'ee00156974c025daa45291b7c3b87a00f4c6a930400a4f86aa0170d1a0c9d027b47e3d04fe87b5b917ffa583e756408b7a6e2e7c7705b7f191d690e9de629f16' //process.env.ACCESS_TOKEN_SECRET

export const scret_K = '698dc19d489c4e4db73e28a713eab07b'

export const generateToken = async (data: any) => {
 return jwt.sign(data, test, { expiresIn: '15m' })
}

export const decodeToken = async (token: any) => {
  const data = await jwt.verify(token, test)
  return data
}

export const authorize = (req, res, next) => {
  const token = req.headers['authorization']

  if (!token) {
    return res.sendStatus(403)
  }

  const bearer = token.split(' ')[1]

  jwt.verify(bearer, test, (error, decoded) => {
    if (error) {
      console.log(error)
      return res.status(500).json({
        msg: 'Invalid or expired token'
      })
    }
    req.decoded = decoded
    next()
  })
}
/*
export class validatePword = async (pword: string, user_pword: string) => {
  bcrypt.compare(pword, user_pword, async(err, result) => {
    ...
  })
}
*/
