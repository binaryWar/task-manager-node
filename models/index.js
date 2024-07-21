// const {Sequelize} =  require("sequelize");
// const models = {};
// const {databaseConfig} = require("../config/config");
// // console.log(JSON.stringify(databaseConfig) + " ============= ")
// const sequelize = new Sequelize( databaseConfig.dbName , databaseConfig.dbUserName , databaseConfig.dbPassword,{
//     host : 'localhost',
//     dialect : 'mysql'
// });

// async function testConnection(){
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// }

// testConnection();

// module.exports = {
//     sequelize,
//     models
// }
