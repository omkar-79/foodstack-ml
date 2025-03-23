const actualDataResolvers = require('./actualData');
const predictedDataResolvers = require('./predictedData');
const dishDataResolvers = require('./dishData');

const resolvers = {
  Query: {
    ...actualDataResolvers.Query,
    ...predictedDataResolvers.Query,
    ...dishDataResolvers.Query,
  },
  Mutation: {
    ...actualDataResolvers.Mutation,
    ...predictedDataResolvers.Mutation,
    ...dishDataResolvers.Mutation,
  },
};

module.exports = resolvers;
