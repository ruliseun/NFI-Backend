import { Sequelize } from "sequelize";

const db = new Sequelize('app', '', '', {
    storage: "./database.sqlite",
    dialect: "sqlite",
    logging: false
})

const testDb = new Sequelize('app', '', '', {
    storage: "./database.sqlite",
    dialect: "sqlite",
    logging: false
})

export default process.env.PROD_ENV === 'test' ? testDb : db;