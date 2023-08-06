const getPool = require('../../getDB.js');
const { generateError } = require('../../../helpers/generateError.js');

const getProductByPrice = async (min, max) => {
  let connection;

  try {
    connection = await getPool();

    const [result] = await connection.query(
      `
        SELECT * FROM product WHERE price BETWEEN ${min}.00 AND ${max}.00
        `,
      [min, max]
    );

    if (result.length === 0) {
      throw generateError(
        `No existe ningún producto en este rango de precios`,
        404
      );
    }
    return result;
  } finally {
    if (connection) connection.release;
  }
};

module.exports = { getProductByPrice };
