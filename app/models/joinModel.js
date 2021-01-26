const dbConnection = require('../lib/dbConnection');

module.exports = {
    getFinalResult: async (total) => {
        try {
            const conn = await dbConnection.connect();
            const result = await conn.sql(`
                SELECT a.animal,c.cor,p.pais FROM tbs_cores AS c
                INNER JOIN tbs_animais AS a ON c.total = a.total
                INNER JOIN tbs_paises AS p ON c.total = p.total
                LEFT JOIN tbs_cores_excluidas AS ce ON c.cor = ce.cor
                WHERE c.total = ${total} AND ce.total IS NULL
            `).execute()
            return result[0];
        } catch (err) {
            console.log(err.message);
        }
    }
}