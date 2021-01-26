const dbConnection = require('../lib/dbConnection');

module.exports = {
    insert: async (email, cod) => {
        const conn = await dbConnection.connect();
        const result = await conn.sql(`INSERT INTO tbs_email (email,cod) values('${email}','${cod}')`).execute()
        return cod;
    },
    getSumAndCod: async (cod) => {
        try {
            const conn = await dbConnection.connect();
            const result = await conn.sql(`SELECT * FROM tbs_cod_email WHERE cod = ${cod}`).execute()
            return result[0];
        } catch (err) {
            console.log(err.message);
        }
    }
}