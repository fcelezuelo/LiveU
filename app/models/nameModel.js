const dbConnection = require('../lib/dbConnection');

module.exports = {
    insert: async (name, cod) => {
        try {
            const conn = await dbConnection.connect();
            await conn.sql(`INSERT INTO tbs_nome (nome,cod) values('${name}','${cod}')`).execute()
            return cod;
        } catch (err) {
            console.log(err.message);
        }
    },
    getSumAndCod: async (cod) => {
        try {
            const conn = await dbConnection.connect();
            const result = await conn.sql(`SELECT * FROM tbs_cod_nome WHERE cod = ${cod}`).execute()
            return result[0];
        } catch (err) {
            console.log(err.message);
        }
    }
}