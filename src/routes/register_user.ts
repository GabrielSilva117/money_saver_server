import express from 'express'
import bcrypt from 'bcrypt'
import { Users } from '../entities/user'
import { scret_K, test } from '../../config/auth'

const router = express.Router()

router.post('/register/user', async (req, res) => {
  const { first_name, last_name, birth_date, email, password, rpassword } =
    req.body

  let error:string[] = []

  if (
    !first_name ||
    !last_name ||
    !birth_date ||
    !email ||
    !password ||
    !rpassword
  ) {
    return res.json({
      msg: "You must fill all the information"
    })
  } else {
    const verif_email = await Users.findOne({where:{email: email}})

    if (verif_email) {
      error.push('This email is already in use')
    }

    if (password != rpassword) {
      error.push('You must repeat the same password')
    }

    if (password.length <= 4) {
      error.push('This password is too short')
    }
  }
  if (error.length > 0) {
    return res.json(error)
  }

  const user = Users.create({
    first_name,
    last_name,
    birth_date,
    email,
    password
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
    return res.json(err)
  }
})

export { router as Register_User }