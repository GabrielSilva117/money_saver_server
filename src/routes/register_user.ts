import express from 'express'
import bcrypt from 'bcrypt'
import { Users } from '../entities/user'

const router = express.Router()

router.post('/register/user', async (req, res) => {
  const { first_name, last_name, birth_date, email, password, rpassword } =
    req.body

  if (
    !first_name ||
    !last_name ||
    !birth_date ||
    !email ||
    !password ||
    !rpassword
  ) {
    return res.status(403).json({
      msg: "You must fill all the required information"
    })
  }

  const verif_email = await Users.findOne({where:{email: email}})

  if (verif_email) {
    return res.status(403).json({msg: 'This email is already in use'})
  }

  if (password != rpassword) {
    return res.status(403).json({msg:'You must repeat the same password'})
  }

  if (password.length <= 4) {
    return res.status(403).json({msg: 'This password is too short'})
  }


  const user = Users.create({
    first_name,
    last_name,
    birth_date,
    email
  })

  try{
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        user.password = hash
        await user.save()
      })
    })
    return res.json({
      msg: 'User created successfully!'
    })
  } catch(err) {
    return res.status(403).json(err)
  }
})

export { router as Register_User }