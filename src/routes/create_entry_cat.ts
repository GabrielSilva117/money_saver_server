import { accessTkn, authorize } from '../../config/auth'
import express from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { EntryCategories } from '../entities/entry_categories'

const router = express.Router()

router.post('/entry/category', authorize, async (req, res) => {
  const token = req.headers['usr'] as JwtPayload
  const { name, description, color } = req.body

  if (!name || !description || !color) {
    return res.status(403).json({
      msg: 'You must fill all the required info'
    })
  }

  if (!token) {
    return res.status(403).json({
      msg: 'Invalid or undefined token! try again,'
    })
  }

  const bearer = token.split(' ')[1]

  jwt.verify(bearer, accessTkn, async (err, decoded) => {
    if (err) {
      return res.status(403).json({
        msg: 'Invalid Token'
      })
    }

    const entryCategory = EntryCategories.create({
      user: decoded.id,
      name: name,
      description: description,
      color: color
    })
    await entryCategory.save()
    return res.status(201).json(entryCategory)
  })
  return
})

export { router as Entry_Category_Create }
