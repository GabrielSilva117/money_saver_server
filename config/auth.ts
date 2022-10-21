//import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import process from 'process'
//dotenv.config({ path: '../.env'})

export const ACCESS_TOKEN_SECRET =
  'ee00156974c025daa45291b7c3b87a00f4c6a930400a4f86aa0170d1a0c9d027b47e3d04fe87b5b917ffa583e756408b7a6e2e7c7705b7f191d690e9de629f16' //process.env.ACCESS_TOKEN_SECRET

export const REFRESH_TOKEN_SECRET =
  'bfa44d845334987dbd9bee3af2e714bd4a30cb3724a49d03a9ba303ef444010e7bafcdc1756c888d2f635cfd1913ea72ee4d529ab186782cfc11749cd764c388'

export const generateToken = async (data: any) => {
  return jwt.sign(data, ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

export const generateRefreshToken = async (data: any) => {
  return jwt.sign(data, REFRESH_TOKEN_SECRET)
}

export const authorize = (req, res, next) => {
  const token = req.headers['authorization']

  if (!token) {
    return res.sendStatus(403)
  }

  const bearer = token.split(' ')[1]

  jwt.verify(bearer, ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      console.log(error)
      return res.sendStatus(403)
    }
    req.decoded = decoded
    next()
  })
}
