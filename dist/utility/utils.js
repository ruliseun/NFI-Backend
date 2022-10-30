"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.generateToken = exports.withdrawSchema = exports.fundAccountSchema = exports.depositSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.registerSchema = joi_1.default.object().keys({
    firstname: joi_1.default.string().required(),
    lastname: joi_1.default.string().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    gender: joi_1.default.string().lowercase().required(),
    phone: joi_1.default.string().length(11).pattern(/^[0-9]+$/).required(),
    address: joi_1.default.string().lowercase().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    confirm_password: joi_1.default.ref('password')
}).with('password', 'confirm_password');
exports.loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/)
});
exports.depositSchema = joi_1.default.object().keys({
    amount: joi_1.default.string().required(),
    userId: joi_1.default.string().required()
});
exports.fundAccountSchema = joi_1.default.object().keys({
    amount: joi_1.default.number().required()
});
exports.withdrawSchema = joi_1.default.object().keys({
    amount: joi_1.default.number().required()
});
const generateToken = (user) => {
    const pass = process.env.JWT_SECRET;
    const jwToken = jsonwebtoken_1.default.sign(user, pass, { expiresIn: '7d' });
    return jwToken;
};
exports.generateToken = generateToken;
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
