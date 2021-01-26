const tp = require('tedious-promises');
const dbConfig = {
    "server": process.env.DB_HOST,
    "userName": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "options": {
        "database": process.env.DB_BASE,
        "encrypt": true,
    }
}

module.exports = {
    connect: async () => {
        return tp.setConnectionConfig(dbConfig);
    }
}