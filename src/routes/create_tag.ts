import { accessTkn, authorize } from '../../config/auth'
import express from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Tags } from '../entities/tags'

const router = express.Router()

router.post('/user/new/tag', authorize, async(req, res) =>{
  try {
    const token = req.headers['usr'] as JwtPayload || ''
    const { label, color } = req.body

    if (!token) {
      return res.status(403).json({
        msg: 'Invalid or expired token, try again!'
      })
    }

    if (!label || !color ) {
      return res.status(403).json({
        msg: 'You must fill the required information!'
      })
    }

    const bearer = token.split(' ')[1]

    jwt.verify(bearer, accessTkn, async (err, decoded) => {
      if (err) {
        return res.sendStatus
      }
      const tag = Tags.create({
        user_id: decoded.id,
        label: label,
        color: color
      })
      await tag.save()
      return res.status(201).json({
        msg: 'Tag created succefully!'
      })  
    })
    return
  } catch (err) {
    return res.status(500).json(err)
  }
})

export { router as User_Tag_Create }