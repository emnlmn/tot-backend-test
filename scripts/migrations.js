const mysql = require('mysql2/promise')

const migrate = async (cfg) => {
    const connection = await mysql.createConnection(cfg)
    await connection.execute('CREATE TABLE users (email VARCHAR(255) NOT NULL, name VARCHAR(255), UNIQUE KEY email (email))')
    process.exit()
}

const databaseConfig = {
    host: 'mysql',
    user: 'dev',
    password: 'dev',
    database: 'test'
}

migrate(databaseConfig)

