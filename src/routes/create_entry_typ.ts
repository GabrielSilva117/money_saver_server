import { accessTkn, authorize } from '../../config/auth'
import express from 'express'
import { EntryTypes } from '../entities/entry_types'

const router = express.Router()

router.post('/new/entry/type', authorize, async (req, res) => {
  const { name, description } = req.body

  if (!name || !description) {
    return res.status(403).json({
      msg: 'You must fill all the required information'
    })
  }

  const entryType = EntryTypes.create({
    name: name,
    description: description
  })

  await entryType.save()
  return res.status(201).json(entryType)
})

export { router as Entry_Type_Create }
