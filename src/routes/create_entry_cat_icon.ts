import { authorize } from '../../config/auth'
import { MainDs } from '../../data_source'
import express from 'express'
import { EntryCategories } from '../entities/entry_categories'
import { iconUpload } from '../../config/multer'

const router = express.Router()

router.put(
  '/entry/category/:entryId/icon',
  authorize,
  iconUpload.single('icon'),
  async (req, res) => {
    const entryId = req.params.entryId

    if (!entryId) {
      return res.status(403).json({
        msg: 'You must enter a valid entry id!'
      })
    }

    const entry = await EntryCategories.findOne({ where: { id: entryId } })

    if (!entry) {
      return res.status(403).json({
        msg: 'Invalid entry! Try again using the correct id.'
      })
    }

    const entryCat = await EntryCategories.update(
      { id: entryId },
      { icon: req.file?.filename }
    )

    return res.status(200).json(entryCat)
  }
)

export { router as Create_Entry_Cat_Icon }
