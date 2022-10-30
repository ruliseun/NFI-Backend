"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = exports.RegisterUser = void 0;
const uuid_1 = require("uuid");
const userModel_1 = require("../model/userModel");
const utils_1 = require("../utility/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function RegisterUser(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validateUser = utils_1.registerSchema.validate(req.body, utils_1.options);
        if (validateUser.error) {
            return res.status(400).json({ Error: validateUser.error.details[0].message });
        }
        const checkForDuplicatEmail = await userModel_1.UserInstance.findOne({ where: { email: req.body.email } });
        if (checkForDuplicatEmail) {
            return res.status(409).json({ message: 'Email already exist' });
        }
        const checkForDuplicatePhone = await userModel_1.UserInstance.findOne({ where: { phone: req.body.phone } });
        if (checkForDuplicatePhone) {
            return res.status(409).json({ message: 'Phone number already exist' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(req.body.password, 8);
        const userRecord = await userModel_1.UserInstance.create({
            id: id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            gender: req.body.gender,
            phone: req.body.phone,
            address: req.body.address,
            password: hashedPassword
        });
        return res.status(201).json({ message: 'User created successfully', userRecord });
    }
    catch (error) {
        return res.status(500).json({ message: ' Fail to create', route: '/register' });
    }
}
exports.RegisterUser = RegisterUser;
async function LoginUser(req, res, next) {
    try {
        const validateUser = utils_1.loginSchema.validate(req.body, utils_1.options);
        if (validateUser.error) {
            return res.status(400).json({ Error: validateUser.error.details[0].message });
        }
        const User = await userModel_1.UserInstance.findOne({ where: { email: req.body.email } });
        if (!User) {
            return res.status(400).json({ message: 'User not found' });
        }
        const { id } = User;
        const token = (0, utils_1.generateToken)({ id });
        const validUser = await bcryptjs_1.default.compare(req.body.password, User.password);
        if (!validUser) {
            res.status(401).json({ message: "Password do not match" });
        }
        return res.status(200).json({ message: "Successfully logged in", token, User });
    }
    catch (error) {
        res.status(500).json({ message: 'Login failed', route: '/login' });
    }
}
exports.LoginUser = LoginUser;
