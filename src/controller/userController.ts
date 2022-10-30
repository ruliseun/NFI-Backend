import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid'
import { UserInstance } from '../model/userModel'
import { registerSchema, options, loginSchema, generateToken } from '../utility/utils'
import bcrypt from 'bcryptjs'

export async function RegisterUser(req: Request, res: Response, next: NextFunction) {
    const id = uuidv4()

    try{
        const validateUser = registerSchema.validate(req.body, options)

        if(validateUser.error){
            return res.status(400).json({Error: validateUser.error.details[0].message})
        }

        const checkForDuplicatEmail = await UserInstance.findOne({where: {email: req.body.email }})
        if(checkForDuplicatEmail){
         return res.status(409).json({ message: 'Email already exist' })
        }

        const checkForDuplicatePhone = await UserInstance.findOne({where: { phone:req.body.phone }})
        if(checkForDuplicatePhone){
         return res.status(409).json({ message: 'Phone number already exist' })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 8)
        
        const userRecord = await UserInstance.create({
            id: id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            gender: req.body.gender,
            phone: req.body.phone,
            address: req.body.address,
            password: hashedPassword
        })
        return res.status(201).json({message: 'User created successfully', userRecord})
    } catch (error) {
        return res.status(500).json({message: ' Fail to create', route: '/register'})
    }
}


export async function LoginUser(req: Request, res: Response, next: NextFunction) {

    try {
        const validateUser = loginSchema.validate(req.body, options)

        if(validateUser.error){
            return res.status(400).json({ Error: validateUser.error.details[0].message })
        }

        const User = await UserInstance.findOne({ where: { email: req.body.email }}) as unknown as {[key:string]:string}

        if(!User){
            return res.status(400).json({ message: 'User not found'})
        }
        
        const {id} = User
        const token = generateToken({id})
        const validUser = await bcrypt.compare(req.body.password, User.password);

        if(!validUser){
            res.status(401).json({ message: "Password do not match" })
        }
        
        return res.status(200).json({ message:"Successfully logged in", token, User })
        
    } catch (error) {
        res.status(500).json({message: 'Login failed', route: '/login'})
    }
}