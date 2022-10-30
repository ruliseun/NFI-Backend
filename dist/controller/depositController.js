"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Withdraw = exports.Deposit = exports.FundAcount = void 0;
const userModel_1 = require("../model/userModel");
const utils_1 = require("../utility/utils");
async function FundAcount(req, res, next) {
    try {
        const validateInput = utils_1.fundAccountSchema.validate(req.body, utils_1.options);
        if (validateInput.error) {
            return res.status(400).json({ Error: validateInput.error.details[0].message });
        }
        const verified = req.user;
        const loggedInUserId = verified?.id;
        const amountToFund = req.body.amount;
        const User = await userModel_1.UserInstance.findOne({ where: { id: loggedInUserId } });
        const { accountBalance } = User;
        if (Number(amountToFund) <= 0) {
            return res.status(400).json({ message: 'Invalid Amount' });
        }
        const newBalance = (Number(amountToFund) + Number(accountBalance)).toString();
        const record = await User?.update({
            accountBalance: newBalance
        });
        return res.status(200).json({
            message: 'Account funded successful',
            record
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Account fund failed' });
    }
}
exports.FundAcount = FundAcount;
async function Deposit(req, res, next) {
    // try{
    //     const validateInput = depositSchema.validate(req.body, options)
    //     if(validateInput.error){
    //         return res.status(400).json({ Error: validateInput.error.details[0].message })
    //     }
    //     const verified = req.user as unknown as {[key:string]:string}
    //     const loggedInUserId = verified?.id
    //     const sourceUser = await UserInstance.findOne({ where: { id: loggedInUserId }})
    //     const destinationUser = await UserInstance.findOne({ where: { id: req.body.userId }})
    //     console.log(sourceUser)
    //     const loggedInUserBalance = sourceUser?.accountBalance
    //     const amountToSend = req.body.amount
    //     if(Number(amountToSend) <= 0){
    //         return res.status(400).json({message: 'Invalid Amount'})
    //     }
    //     if(Number(amountToSend) > Number(loggedInUserBalance)){
    //         return res.status(400).json({message: 'Insufficient fund'})
    //     }
    //     const {accountBalance} = destinationUser as unknown as {[key:string]:string}
    //     const newSourceBalance = (Number(loggedInUserBalance) - Number(amountToSend)).toString()
    //     const newDestinationBalance = (Number(accountBalance) + Number(amountToSend)).toString()
    //     await sourceUser?.update({
    //         accountBalance: newSourceBalance
    //     })
    //     await destinationUser?.update({
    //         accountBalance: newDestinationBalance
    //     })
    //     return res.status(200).json({ message: `Deposit of ${amountToSend} successful`, sourceUser})
    // } catch (error) {
    //     return res.status(500).json({ message: 'Deposit failed' })
    // }
}
exports.Deposit = Deposit;
async function Withdraw(req, res, next) {
    try {
        const validateInput = utils_1.withdrawSchema.validate(req.body, utils_1.options);
        if (validateInput.error) {
            return res.status(400).json({ Error: validateInput.error.details[0].message });
        }
        const verified = req.user;
        const loggedInUserId = verified?.id;
        const amountToWithdraw = req.body.amount;
        const User = await userModel_1.UserInstance.findOne({ where: { id: loggedInUserId } });
        const { accountBalance } = User;
        if (Number(amountToWithdraw) <= 0) {
            return res.status(400).json({ message: 'Invalid Amount' });
        }
        if (Number(amountToWithdraw) > Number(accountBalance)) {
            return res.status(400).json({ message: 'Insufficient fund' });
        }
        const newBalance = (Number(accountBalance) - Number(amountToWithdraw)).toString();
        const record = await User?.update({
            accountBalance: newBalance
        });
        return res.status(200).json({
            message: `Withdrawal of ${amountToWithdraw} successful`,
            record
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Withdrawal Failed' });
    }
}
exports.Withdraw = Withdraw;
