import multer from 'multer'
import path from 'path'

const iconStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/icons/'))
  },
  filename(req, file, cb) {
    // console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const imgStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/imgs/'))
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

export const iconUpload = multer({
  storage: iconStorage,
  limits: { fileSize: 100000 }
})
export const imgUpload = multer({
  storage: imgStorage,
  limits: { fileSize: 100000 }
})
