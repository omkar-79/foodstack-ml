const { gql } = require('apollo-server');

const dishDataSchema = gql`
  type DishData {
    id: ID!
    dish: String!
    price: Int!
  }

  type Query {
    getDishData: [DishData]
  }

  type Mutation {
    addActualData(
      dish: String!
      price: Int!
    ): DishData
  }
`;

module.exports = dishDataSchema;
