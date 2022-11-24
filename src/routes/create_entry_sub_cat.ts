import { authorize } from '../../config/auth'
import express from 'express'
import { EntryCategories } from '../entities/entry_categories'
import { EntrySubcategories } from '../entities/entry_subcategories'

const router = express.Router()

router.post('/entry/category/sub', authorize, async (req, res) => {
  const { entryCatId, name, description } = req.body

  if (!entryCatId || !name || !description) {
    return res.status(403).json({
      msg: 'You must fill every required information'
    })
  }

  const entry = await EntryCategories.findOne({ where: { id: entryCatId } })

  if (!entry) {
    return res.status(404).json({
      msg: 'Invalid entry category Id!'
    })
  }

  const entrySubCat = await EntrySubcategories.create({
    entry_category: entryCatId,
    name: name,
    description: description
  })

  await entrySubCat.save()
  return res.status(201).json(entrySubCat)
})

export { router as Create_Entry_Subcat }
