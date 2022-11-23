import { authorize, accessTkn } from '../../config/auth'
import express from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Users } from '../entities/user'
import { UserDocuments } from '../entities/user_document'

const router = express.Router()

router.post('/user/documents', authorize, async (req, res) => {
  try {
    const token = req.headers['usr'] as JwtPayload
    const { document_code, document_typeId } = req.body

    console.log(document_code, document_typeId)

    if (!token) {
      return res.sendStatus(403)
    }

    if (!document_code || !document_typeId) {
      return res.status(403).json({
        msg: 'Invalid Document code or Type Id'
      })
    }

    const bearer = token.split(' ')[1]

    await jwt.verify(bearer, accessTkn, async (err, decoded) => {
      if (err) {
        return res.status(403).json({
          msg: 'invalid or expired token'
        })
      }
      const usr_doc = UserDocuments.create({
        user: decoded.id,
        document_type: document_typeId,
        document_cod: document_code
      })

      await usr_doc.save()

      return res.status(201).json({
        UserDocument: usr_doc
      })
    })
    return
  } catch (err) {
    console.error(err)
    return res.sendStatus(500)
  }
})

export { router as User_Document_Create }
