import { authorize } from '../../config/auth'
import { imgUpload } from '../../config/multer'
import express from 'express'
import { Entries } from '../entities/entries'
import { EntryImages } from '../entities/entry_images'

const router = express.Router()

router.post(
  '/entry/img',
  authorize,
  imgUpload.single('entryImg'),
  async (req, res) => {
    const entryId = req.body.entryId
    let imgName = req.file?.filename 

    if (!entryId) {
      return res.status(403).json({
        msg: 'You need to especify the entry that will receive the image'
      })
    }

    if (!imgName) {
      return res.status(403).json({
        msg: 'You need to upload the entry image'
      })
    }

    imgName = `/uploads/imgs/${req.file?.filename}`

    const entry = await Entries.findOne({ where: { id: entryId } })

    if (!entry) {
      return res.status(403).json({
        msg: 'Invalid entry id! Try again using the correct ID'
      })
    }

    const entryImg = await EntryImages.create({
      entry: entryId,
      image_path: imgName
    })

    await entryImg.save()
    return res.status(201).json(entryImg)
  }
)

export { router as Entry_Img_Create }
