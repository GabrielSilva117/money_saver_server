import { authorize } from '../../config/auth'
import express from 'express'
import { Entries } from '../entities/entries'
import { Tags } from '../entities/tags'

const router = express.Router()

router.post('/entry/tags', authorize, async (req, res) => {
  const { entryId, tagId } = req.body

  if (!entryId || !tagId) {
    return res.status(403).json({
      msg: 'You need fill the required information'
    })
  }

  const entry = await Entries.findOne({ where: { id: entryId } })

  if (!entry) {
    return res.status(404).json({
      msg: 'Invalid Entry ID! Try again using the correct one.'
    })
  }

  const tag = await Tags.findOne({ where: { id: tagId } })

  if (!tag) {
    return res.status(404).json({
      msg: 'Invalid Tag ID! Try again using a valid ID'
    })
  }

  entry.tags = [tag]

  await entry.save()
  return res.status(200).json(entry)
})

export { router as Connect_Entry_Tags }