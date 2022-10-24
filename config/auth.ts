import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

const accessTkn:string = process.env.ACCESS_TOKEN_SECRET || ''
export const refreshTkn:string = process.env.REFRESH_TOKEN_SECRET || ''

export const generateToken = async (data: any) => {
  return jwt.sign(data, accessTkn, { expiresIn: '15m' })
}

export const generateRefreshToken = async (data: any) => {
  return jwt.sign(data, refreshTkn)
}

export const authorize = (req, res, next) => {
  const token = req.headers['authorization']

  if (!token) {
    return res.sendStatus(403)
  }

  const bearer = token.split(' ')[1]

  jwt.verify(bearer, accessTkn, (error, decoded) => {
    if (error) {
      console.log(error)
      return res.sendStatus(403)
    }
    req.decoded = decoded
    next()
  })
}
