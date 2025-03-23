const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = {
  Query: {
    async getDishData() {
      const res = await pool.query('SELECT * FROM dish_data');
      return res.rows;
    },
  },
  Mutation: {
    async addDishData(_, { dish, price }) {
      const res = await pool.query(
        'INSERT INTO dish_data (dish, price) VALUES ($1, $2) RETURNING *',
        [dish, price]
      );
      return res.rows[0];
    },
  },
};
