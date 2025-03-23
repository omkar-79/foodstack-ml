const { mergeTypeDefs } = require('@graphql-tools/merge');
const actualDataSchema = require('./actualData');
const predictedDataSchema = require('./predictedData');
const dishDataSchema = require('./dishData');

const typeDefs = mergeTypeDefs([actualDataSchema, predictedDataSchema, dishDataSchema]);

module.exports = typeDefs;
