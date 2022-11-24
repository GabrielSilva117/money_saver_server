import { authorize } from '../../config/auth'
import express from 'express'
import { Entries } from '../entities/entries'
import { EntryItems } from '../entities/entry_items'
import { EntrySubcategories } from '../entities/entry_subcategories'

const router = express.Router()

router.post('/entry/items', authorize, async (req, res) => {
  const { entryId, entrySubId, name, unit_value, units } = req.body

  if (!entryId || !entrySubId || !name || !unit_value || !units) {
    return res.status(403).json({
      msg: 'You must fill the required information'
    })
  }

  const entry = await Entries.findOne({ where: { id: entryId } })

  if (!entry) {
    return res.status(404).json({
      msg: 'Invalid entry Id!'
    })
  }

  const entrySub = await EntrySubcategories.findOne({
    where: { id: entrySubId }
  })

  if (!entrySub) {
    return res.status(404).json({
      msg: 'Invalid entry subcategory Id!'
    })
  }

  const entryItem = await EntryItems.create({
    entry: entry,
    entry_subcategory: entrySub,
    name: name,
    unit_value: unit_value,
    units: units
  })

  await entryItem.save()
  return res.status(201).json(entryItem)
})

export { router as Create_Entry_Item}