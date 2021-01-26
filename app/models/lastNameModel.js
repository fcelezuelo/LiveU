const dbConnection = require('../lib/dbConnection');

module.exports = {
    insert: async (lastName, cod) => {
        const conn = await dbConnection.connect();
        await conn.sql(`INSERT INTO tbs_sobrenome (sobrenome,cod) values('${lastName}','${cod}')`).execute()
        return cod;
    },
    getSumAndCod: async (cod) => {
        try {
            const conn = await dbConnection.connect();
            const result = await conn.sql(`SELECT * FROM tbs_cod_sobrenome WHERE cod = ${cod}`).execute()
            return result[0];
        } catch (err) {
            console.log(err.message);
        }
    }
}