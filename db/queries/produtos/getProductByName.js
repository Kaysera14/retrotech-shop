const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const getProductByName = async (letter) => {
    let connection; 

    try {
        connection = await getPool()

        const [result] = await connection.query(`
        SELECT * FROM product WHERE product_title LIKE '${letter}%'
        `, [letter]);

        if(result.length === 0) {
            throw generateError(`Esse produto não existe`, 404)
        }
        return result;
    } finally {
        if(connection) connection.release
    }
}

module.exports = { getProductByName }