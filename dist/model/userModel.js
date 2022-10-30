"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'First Name cannot be empty'
            },
            notEmpty: {
                msg: 'Please provide a first name'
            }
        }
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Last Name cannot be empty'
            },
            notEmpty: {
                msg: 'Please provide a last name'
            }
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Email cannot be empty'
            },
            isEmail: {
                msg: 'Please provide a valid Email'
            }
        }
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Gender cannot be empty'
            },
            notEmpty: {
                msg: 'Please provide a gender'
            }
        }
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Phone Number cannot be empty'
            },
            notEmpty: {
                msg: 'Please provide a phone number'
            }
        }
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Address cannot be empty'
            },
            notEmpty: {
                msg: 'Please provide address'
            }
        }
    },
    accountBalance: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 0.0
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Password cannot be empty'
            },
            notEmpty: {
                msg: 'Please provide a password'
            }
        }
    }
}, {
    sequelize: database_config_1.default,
    tableName: 'Users'
});
