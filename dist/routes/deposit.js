"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = require("../controller/transactionController");
const auth_1 = require("../middleware/auth");
var router = express_1.default.Router();
router.post('/creditAccount', auth_1.auth, transactionController_1.FundAcount);
router.post('/deposit', auth_1.auth, transactionController_1.Deposit);
router.post('/withdraw', auth_1.auth, transactionController_1.Withdraw);
exports.default = router;
