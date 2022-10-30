import { DataTypes, Model} from 'sequelize'
import db from '../config/database.config'

interface UserAttribute {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    gender: string;
    phone: string; 
    address: string;
    accountBalance: string;
    password: string
}

export class UserInstance extends Model<UserAttribute> {}

UserInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 0.0
    },
    password: {
        type: DataTypes.STRING,
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
    sequelize: db,
    tableName: 'Users'
})
