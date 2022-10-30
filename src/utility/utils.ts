import Joi from 'joi'
import jwt from 'jsonwebtoken'

export const registerSchema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().trim().lowercase().required(),
    gender: Joi.string().lowercase().required(),
    phone: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
    address: Joi.string().lowercase().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    confirm_password: Joi.ref('password')
}).with('password', 'confirm_password')

export const loginSchema = Joi.object().keys({
    email: Joi.string().trim().lowercase().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
})

export const depositSchema = Joi.object().keys({
    amount: Joi.string().required(),
    userId: Joi.string().required()
})

export const fundAccountSchema = Joi.object().keys({
    amount: Joi.number().required()
})

export const withdrawSchema = Joi.object().keys({
    amount: Joi.number().required()
})


export const generateToken = (user:{[key:string]: unknown }):unknown => {
    const pass = process.env.JWT_SECRET as string
    const jwToken = jwt.sign(user, pass, {expiresIn:'7d'})
    return jwToken
}

export const options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
}