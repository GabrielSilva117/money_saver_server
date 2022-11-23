import { accessTkn, authorize } from '../../config/auth'
import express from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Entries } from '../entities/entries'

const router = express.Router()

router.post('/user/new/entry', authorize, async (req, res) => {
  const token = req.headers['usr'] as JwtPayload
  const { entry_typ, entry_cat, value } = req.body

  if (!entry_typ || !entry_cat || !value) {
    return res.status(403).json({
      msg: 'You must fill the required information'
    })
  }

  if (!token) {
    return res.status(403).json({
      msg: 'Invalid Token!'
    })
  }

  const bearer = token.split(' ')[1]

  jwt.verify(bearer, accessTkn, async (err, decoded) => {
    if (err) {
      return res.status(403).json({
        msg: 'Expired or invalid token, try again!'
      })
    }
    const usr_entry = Entries.create({
      user: decoded.id,
      entry_type: entry_typ,
      entry_category: entry_cat,
      value: value
    })
    await usr_entry.save()
    return res.status(201).json(usr_entry)
  })
  return
})

export { router as User_Entry_Create }
