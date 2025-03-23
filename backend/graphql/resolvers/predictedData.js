const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = {
  Query: {
    async getPredictedData() {
      const res = await pool.query('SELECT * FROM predicted_data');
      return res.rows;
    },
  },
  Mutation: {
    async addPredictedData(_, { day_of_week, hour, dish, predicted_quantity}) {
      const res = await pool.query(
        'INSERT INTO predicted_data (day_of_week, hour, dish, predicted_quantity) VALUES ($1, $2, $3, $4) RETURNING *',
        [day_of_week, hour, dish, predicted_quantity]
      );
      return res.rows[0];
    },
  },
};
