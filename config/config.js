require("dotenv").config();

const databaseConfig = {
    dbName : process.env.DBName || 'taskDb',
    dbUserName : process.env.DBUserName || "user",
    dbPassword : process.env.DBPassword || "Password#123!",
    dbHost : process.env.Host || "localhost",
    dbPort : process.env.Port || "3306"
}

module.exports = {
    databaseConfig
}
