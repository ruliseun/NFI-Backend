import { Request, Response, NextFunction } from 'express';
import { UserInstance } from '../model/userModel'
import { depositSchema, fundAccountSchema, options, withdrawSchema } from '../utility/utils'

export async function FundAcount(req: Request, res: Response, next: NextFunction) {
    try {
        const validateInput = fundAccountSchema.validate(req.body, options)

        if(validateInput.error){
            return res.status(400).json({ Error: validateInput.error.details[0].message })
        }

        const verified = req.user as {[key:string]:string}
        const loggedInUserId = verified?.id

        const amountToFund = req.body.amount

        const User = await UserInstance.findOne({ where: { id: loggedInUserId }})

        if(!User){
            return res.status(409).json({ message: 'Invalid User!'})
        }

        const { accountBalance } = User as unknown as {[key:string]:string}

        if(Number(amountToFund) <= 0){
            return res.status(400).json({message: 'Invalid Amount'})
        }

        const newBalance: string = (Number(amountToFund) + Number(accountBalance)).toString()

        const record = await User?.update({
            accountBalance: newBalance
        })

        return res.status(200).json({
            message: 'Account funded successful',
            record
        })

    } catch (error) {
        return res.status(500).json({ message: 'Account fund failed' })
    }
}


export async function Deposit(req: Request, res: Response, next: NextFunction) {
    try{
        const validateInput = depositSchema.validate(req.body, options)

        if(validateInput.error){
            return res.status(400).json({ Error: validateInput.error.details[0].message })
        }

        const verified = req.user as unknown as {[key:string]:string}
        const loggedInUserId = verified?.id

        const sourceUser: any = await UserInstance.findOne({ where: { id: loggedInUserId }})
        const destinationUser = await UserInstance.findOne({ where: { id: req.body.userId }})

        if(!destinationUser){
            return res.status(409).json({ message: 'Invalid User!. Destination account not found'})
        }

        const loggedInUserBalance = sourceUser?.accountBalance

        const amountToSend = req.body.amount

        if(Number(amountToSend) <= 0){
            return res.status(400).json({message: 'Invalid Amount'})
        }

        if(Number(amountToSend) > Number(loggedInUserBalance)){
            return res.status(400).json({message: 'Insufficient fund'})
        }

        const {accountBalance} = destinationUser as unknown as {[key:string]:string}

        const newSourceBalance = (Number(loggedInUserBalance) - Number(amountToSend)).toString()
        const newDestinationBalance = (Number(accountBalance) + Number(amountToSend)).toString()

        await sourceUser?.update({
            accountBalance: newSourceBalance
        })

        await destinationUser?.update({
            accountBalance: newDestinationBalance
        })

        return res.status(200).json({ message: `Deposit of ${amountToSend} successful`, sourceUser})

    } catch (error) {
        return res.status(500).json({ message: 'Deposit failed' })
    }
}

export async function Withdraw(req: Request, res: Response, next: NextFunction) {
    try{
        const validateInput = withdrawSchema.validate(req.body, options)

        if(validateInput.error){
            return res.status(400).json({ Error: validateInput.error.details[0].message })
        }

        const verified = req.user as {[key:string]:string}
        const loggedInUserId = verified?.id

        const amountToWithdraw = req.body.amount

        const User = await UserInstance.findOne({ where: { id: loggedInUserId }})

        if(!User){
            return res.status(409).json({ message: 'Invalid User!'})
        }

        const { accountBalance } = User as unknown as {[key:string]:string}

        if(Number(amountToWithdraw) <= 0){
            return res.status(400).json({message: 'Invalid Amount'})
        }

        if(Number(amountToWithdraw) > Number(accountBalance)){
            return res.status(400).json({ message: 'Insufficient fund' })
        }

        const newBalance = (Number(accountBalance) - Number(amountToWithdraw)).toString()

        const record = await User?.update({
            accountBalance: newBalance
        })

        return res.status(200).json({
            message: `Withdrawal of ${amountToWithdraw} successful`,
            record
        })

    } catch (error) {
        return res.status(500).json({ message: 'Withdrawal Failed' })
    }
}